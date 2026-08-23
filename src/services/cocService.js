try { require('dotenv').config(); } catch (e) {}
const https = require('https');
const tls = require('tls');
const { URL } = require('url');
let mockData;
try { mockData = require('./mockData'); } catch(e) { mockData = {}; }
let configService;
try { configService = require('./configService'); } catch(e) { configService = { loadSettings: () => ({}) }; }

function sanitizeTag(rawTag) {
  if (!rawTag) return '';
  let clean = rawTag.trim().toUpperCase();
  if (!clean.startsWith('#')) {
    clean = '#' + clean;
  }
  return clean;
}

function encodeTag(tag) {
  return encodeURIComponent(sanitizeTag(tag));
}

class CoCService {
  constructor() {
    this.defaultProxyUrl = 'https://noble:fp_0dac676dbad46ebf@p-4aff1b42.noble-ip.com:3129/';
  }

  getToken() {
    const settings = configService.loadSettings ? configService.loadSettings() : {};
    if (settings.customApiToken && settings.customApiToken.trim().length > 20) {
      return settings.customApiToken.trim();
    }
    return (process.env.COC_API_TOKEN || '').trim();
  }

  getProxyUrl() {
    return (process.env.PROXY_URL || this.defaultProxyUrl || '').trim();
  }

  isConfigured() {
    const t = this.getToken();
    return Boolean(t && t.length > 20);
  }

  /**
   * Universal, zero-dependency Supercell API requester with Noble IP TLS-tunnel support
   */
  request(endpointPath, method = 'GET', postData = null) {
    return new Promise((resolve, reject) => {
      const token = this.getToken();
      if (!token) return reject(new Error('COC_API_TOKEN is not configured'));

      const proxyUrl = this.getProxyUrl();
      const pathWithPrefix = endpointPath.startsWith('/v1') ? endpointPath : `/v1${endpointPath.startsWith('/') ? '' : '/'}${endpointPath}`;

      if (proxyUrl && proxyUrl.startsWith('http')) {
        // Route through Noble IP TLS Proxy
        try {
          const parsed = new URL(proxyUrl);
          const proxyHost = parsed.hostname;
          const proxyPort = parseInt(parsed.port) || 3129;
          const auth = parsed.username ? Buffer.from(`${decodeURIComponent(parsed.username)}:${decodeURIComponent(parsed.password)}`).toString('base64') : '';

          const proxySocket = tls.connect({
            host: proxyHost,
            port: proxyPort,
            servername: proxyHost,
            rejectUnauthorized: false
          }, () => {
            const connectReq = `CONNECT api.clashofclans.com:443 HTTP/1.1\r\nHost: api.clashofclans.com:443\r\n` +
              (auth ? `Proxy-Authorization: Basic ${auth}\r\n` : '') +
              `\r\n`;
            proxySocket.write(connectReq);
          });

          proxySocket.once('data', (data) => {
            if (!data.toString().includes('200')) {
              proxySocket.destroy();
              return reject(new Error(`Proxy CONNECT error: ${data.toString().split('\r\n')[0]}`));
            }

            const targetSocket = tls.connect({
              socket: proxySocket,
              servername: 'api.clashofclans.com',
              rejectUnauthorized: false
            }, () => {
              const bodyStr = postData ? JSON.stringify(postData) : '';
              const headers = [
                `${method} ${pathWithPrefix} HTTP/1.1`,
                'Host: api.clashofclans.com',
                `Authorization: Bearer ${token}`,
                'Accept: application/json',
                'User-Agent: ClashPortal/2.0',
                'Connection: close'
              ];
              if (postData) {
                headers.push('Content-Type: application/json');
                headers.push(`Content-Length: ${Buffer.byteLength(bodyStr)}`);
              }
              headers.push('', '');

              targetSocket.write(headers.join('\r\n') + bodyStr);
            });

            let responseData = '';
            targetSocket.on('data', (d) => responseData += d.toString());
            targetSocket.on('end', () => {
              const [headerPart, ...bodyParts] = responseData.split('\r\n\r\n');
              let body = bodyParts.join('\r\n\r\n');

              // Handle chunked transfer encoding if present
              if (headerPart && headerPart.toLowerCase().includes('transfer-encoding: chunked')) {
                try {
                  let dechunked = '';
                  let remaining = body;
                  while (remaining.length > 0) {
                    const match = remaining.match(/^([0-9a-fA-F]+)\r\n/);
                    if (!match) break;
                    const chunkSize = parseInt(match[1], 16);
                    if (chunkSize === 0) break;
                    const start = match[0].length;
                    dechunked += remaining.substr(start, chunkSize);
                    remaining = remaining.substr(start + chunkSize + 2);
                  }
                  if (dechunked.length > 0) body = dechunked;
                } catch(e) {}
              }

              const statusMatch = headerPart.match(/HTTP\/[\d.]+\s+(\d+)/);
              const statusCode = statusMatch ? parseInt(statusMatch[1]) : 0;

              if (statusCode >= 200 && statusCode < 300) {
                try {
                  resolve(JSON.parse(body.trim()));
                } catch(e) {
                  reject(new Error('Invalid JSON response: ' + body.slice(0, 100)));
                }
              } else {
                try {
                  const errJson = JSON.parse(body.trim());
                  const err = new Error(errJson.message || errJson.reason || `HTTP ${statusCode}`);
                  err.status = statusCode;
                  err.data = errJson;
                  reject(err);
                } catch(e) {
                  const err = new Error(`HTTP ${statusCode}`);
                  err.status = statusCode;
                  reject(err);
                }
              }
            });

            targetSocket.on('error', reject);
          });

          proxySocket.on('error', reject);
          proxySocket.setTimeout(12000, () => {
            proxySocket.destroy();
            reject(new Error('Proxy connection timed out (12s)'));
          });
        } catch(err) {
          reject(err);
        }
      } else {
        // Direct HTTPS call
        const bodyStr = postData ? JSON.stringify(postData) : '';
        const req = https.request({
          hostname: 'api.clashofclans.com',
          path: pathWithPrefix,
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'User-Agent': 'ClashPortal/2.0',
            ...(postData ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyStr) } : {})
          },
          timeout: 8000
        }, (res) => {
          let body = '';
          res.on('data', d => body += d);
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              try { resolve(JSON.parse(body)); } catch(e) { reject(new Error('Invalid JSON')); }
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${body}`));
            }
          });
        });
        req.on('error', reject);
        if (bodyStr) req.write(bodyStr);
        req.end();
      }
    });
  }

  // ==========================================
  // 1. PLAYERS ENDPOINTS
  // ==========================================
  async getPlayer(rawTag) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { ...mockData.mockPlayer, tag: tag || mockData.mockPlayer.tag, _source: 'mock' };
    }
    try {
      const data = await this.request(`/players/${encodeTag(tag)}`);
      return { ...data, _source: 'live' };
    } catch (err) {
      console.warn(`[CoC API] getPlayer failed (${err.message}). Returning mock.`);
      return { ...mockData.mockPlayer, tag, _source: 'fallback', _error: err.message };
    }
  }

  async verifyPlayerToken(rawTag, token) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { tag, token, status: token === '123456' ? 'ok' : 'invalid', _source: 'mock' };
    }
    try {
      const data = await this.request(`/players/${encodeTag(tag)}/verifytoken`, 'POST', { token: (token || '').trim() });
      return { ...data, _source: 'live' };
    } catch (err) {
      return { tag, token, status: 'error', message: err.message, _source: 'fallback' };
    }
  }

  // ==========================================
  // 2. CLANS ENDPOINTS
  // ==========================================
  async getClan(rawTag) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { ...mockData.mockClan, tag: tag || mockData.mockClan.tag, _source: 'mock' };
    }
    try {
      const data = await this.request(`/clans/${encodeTag(tag)}`);
      return { ...data, _source: 'live' };
    } catch (err) {
      console.warn(`[CoC API] getClan failed (${err.message}). Returning mock.`);
      return { ...mockData.mockClan, tag, _source: 'fallback', _error: err.message };
    }
  }

  async getClanMembers(rawTag) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { items: mockData.mockClan.memberList, _source: 'mock' };
    }
    try {
      const data = await this.request(`/clans/${encodeTag(tag)}/members`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { items: mockData.mockClan.memberList, _source: 'fallback' };
    }
  }

  async getCurrentWar(rawTag) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { ...mockData.mockCurrentWar, _source: 'mock' };
    }
    try {
      const data = await this.request(`/clans/${encodeTag(tag)}/currentwar`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { ...mockData.mockCurrentWar, _source: 'fallback' };
    }
  }

  async getWarLog(rawTag) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { items: mockData.mockWarLog, _source: 'mock' };
    }
    try {
      const data = await this.request(`/clans/${encodeTag(tag)}/warlog`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { items: mockData.mockWarLog, _source: 'fallback' };
    }
  }

  async getClanCWLGroup(rawTag) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { state: 'notInWar', _source: 'mock' };
    }
    try {
      const data = await this.request(`/clans/${encodeTag(tag)}/currentwar/leaguegroup`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { state: 'notInWar', _error: err.message, _source: 'fallback' };
    }
  }

  async getCWLWar(warTag) {
    if (!this.isConfigured()) return { state: 'notInWar', _source: 'mock' };
    try {
      const data = await this.request(`/clanwarleagues/wars/${encodeTag(warTag)}`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { state: 'notInWar', _error: err.message, _source: 'fallback' };
    }
  }

  async getClanCapitalRaids(rawTag) {
    const tag = sanitizeTag(rawTag);
    if (!this.isConfigured()) {
      return { items: [], _source: 'mock' };
    }
    try {
      const data = await this.request(`/clans/${encodeTag(tag)}/capitalraidseasons?limit=10`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { items: [], _error: err.message, _source: 'fallback' };
    }
  }

  async searchClans(query = {}) {
    if (!this.isConfigured()) {
      let filtered = [...mockData.mockClansList];
      if (query.name) filtered = filtered.filter(c => c.name.toLowerCase().includes(query.name.toLowerCase()));
      if (query.minMembers) filtered = filtered.filter(c => c.members >= parseInt(query.minMembers));
      return { items: filtered, _source: 'mock' };
    }

    try {
      const params = new URLSearchParams();
      if (query.name) params.append('name', query.name);
      if (query.minMembers) params.append('minMembers', query.minMembers);
      if (query.maxMembers) params.append('maxMembers', query.maxMembers);
      if (query.minClanLevel) params.append('minClanLevel', query.minClanLevel);
      if (query.minClanPoints) params.append('minClanPoints', query.minClanPoints);
      if (query.warFrequency) params.append('warFrequency', query.warFrequency);
      if (query.locationId) params.append('locationId', query.locationId);
      if (query.labelIds) params.append('labelIds', query.labelIds);
      params.append('limit', query.limit || '24');

      const data = await this.request(`/clans?${params.toString()}`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { items: mockData.mockClansList, _source: 'fallback' };
    }
  }

  // ==========================================
  // 3. LOCATIONS & RANKINGS
  // ==========================================
  async getLocations() {
    if (!this.isConfigured()) {
      return { items: [{ id: 'global', name: 'Global', isCountry: false }, { id: 32000239, name: 'Türkiye', isCountry: true, countryCode: 'TR' }], _source: 'mock' };
    }
    try {
      const data = await this.request(`/locations`);
      return { ...data, _source: 'live' };
    } catch (err) {
      return { items: [{ id: 'global', name: 'Global', isCountry: false }, { id: 32000239, name: 'Türkiye', isCountry: true, countryCode: 'TR' }], _source: 'fallback' };
    }
  }

  async getRankings(type = 'players', locationId = 'global') {
    if (!this.isConfigured()) {
      return {
        players: mockData.mockRankings.players,
        clans: mockData.mockRankings.clans,
        _source: 'mock'
      };
    }

    try {
      const locId = (locationId === 'tr' || locationId === '32000239') ? '32000239' : (locationId || 'global');
      let endpoint = 'rankings/players';
      if (type === 'clans') endpoint = 'rankings/clans';
      else if (type === 'players-builder-base') endpoint = 'rankings/players-builder-base';
      else if (type === 'clans-builder-base') endpoint = 'rankings/clans-builder-base';
      else if (type === 'capitals') endpoint = 'rankings/capitals';

      const data = await this.request(`/locations/${locId}/${endpoint}?limit=25`);
      return { items: data.items, _source: 'live' };
    } catch (err) {
      console.warn(`[CoC API] Rankings fetch failed for ${type} (${err.message}).`);
      return {
        players: mockData.mockRankings.players,
        clans: mockData.mockRankings.clans,
        _source: 'fallback'
      };
    }
  }

  // ==========================================
  // 4. LEAGUES
  // ==========================================
  async getLeagues() {
    if (!this.isConfigured()) return { items: [], _source: 'mock' };
    try {
      const data = await this.request(`/leagues`);
      return { ...data, _source: 'live' };
    } catch (err) { return { items: [], _source: 'fallback' }; }
  }

  async getWarLeagues() {
    if (!this.isConfigured()) return { items: [], _source: 'mock' };
    try {
      const data = await this.request(`/warleagues`);
      return { ...data, _source: 'live' };
    } catch (err) { return { items: [], _source: 'fallback' }; }
  }

  async getCapitalLeagues() {
    if (!this.isConfigured()) return { items: [], _source: 'mock' };
    try {
      const data = await this.request(`/capitalleagues`);
      return { ...data, _source: 'live' };
    } catch (err) { return { items: [], _source: 'fallback' }; }
  }

  async getBuilderBaseLeagues() {
    if (!this.isConfigured()) return { items: [], _source: 'mock' };
    try {
      const data = await this.request(`/builderbaseleagues`);
      return { ...data, _source: 'live' };
    } catch (err) { return { items: [], _source: 'fallback' }; }
  }

  async getLegendSeasons() {
    if (!this.isConfigured()) return { items: [], _source: 'mock' };
    try {
      const data = await this.request(`/leagues/29000022/seasons`);
      return { ...data, _source: 'live' };
    } catch (err) { return { items: [], _source: 'fallback' }; }
  }

  // ==========================================
  // 5. LABELS
  // ==========================================
  async getClanLabels() {
    if (!this.isConfigured()) return { items: mockData.mockClan.labels || [], _source: 'mock' };
    try {
      const data = await this.request(`/labels/clans`);
      return { ...data, _source: 'live' };
    } catch (err) { return { items: mockData.mockClan.labels || [], _source: 'fallback' }; }
  }

  async getPlayerLabels() {
    if (!this.isConfigured()) return { items: mockData.mockPlayer.labels || [], _source: 'mock' };
    try {
      const data = await this.request(`/labels/players`);
      return { ...data, _source: 'live' };
    } catch (err) { return { items: mockData.mockPlayer.labels || [], _source: 'fallback' }; }
  }

  // ==========================================
  // 6. GOLD PASS
  // ==========================================
  async getGoldPass() {
    if (!this.isConfigured()) {
      return { ...mockData.mockGoldPass, _source: 'mock' };
    }
    try {
      const data = await this.request(`/goldpass/seasons/current`);
      return { ...mockData.mockGoldPass, ...data, _source: 'live' };
    } catch (err) {
      return { ...mockData.mockGoldPass, _source: 'fallback' };
    }
  }
}

module.exports = new CoCService();
