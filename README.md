# 🏰 Clash of Clans Canlı Portal & Analiz Merkezi (TH1 - TH18)

Supercell resmi API'si ile tam entegre, canlı klan savaşı takibi, 3D Town Hall evrimi (TH1-TH18), Kahraman Ekipman Sinerji Laboratuvarı, çok dilli (Azerbaycanca, Türkçe, İngilizce) destek ve **Noble IP Proxy** altyapısına sahip modern web uygulaması.

---

## 🌟 Öne Çıkan Özellikler

- **🌍 3 Dil Desteği (i18n)**:
  - 🇦🇿 **Azərbaycan dili**
  - 🇹🇷 **Türkçe**
  - 🇬🇧 **English**
  - Dil tercihi çerez (`coc_lang`) ve `localStorage` üzerinde saklanır. Sayfa yenilense de seçilen dil korunur.
- **🏛️ Eksiksiz Belediye Binası Desteği (TH1'den TH18'e)**:
  - Belediye Binası 1'den Belediye Binası 18'e kadar tüm seviyeler.
  - İnteraktif zaman çizelgesi kaydırıcısı (slider), imza silahları, maksimum duvar, kahraman, büyü ve savunma sınırları.
  - Doğru ve yüksek çözünürlüklü şeffaf PNG görselleri.
- **🛡️ Noble IP Proxy Desteği**:
  - Supercell API statik IP koruması için `PROXY_URL` desteği.
  - Proxy adresi: `https://p-4aff1b42.noble-ip.com:3129/`
  - Güvenli server-side proxy tünellemesi ve otomatik fallback mekanizması (çökme veya beyaz ekran yaşanmaz).
- **⚔️ Canlı Savaş Arenası & CWL**:
  - Gerçek zamanlı savaş durumları, yıkım yüzdesi, yıldız sayıları, kalan süre geri sayım sayaçları.
  - 8 Klanlı Klan Savaş Ligi (CWL) grupları ve Klan Başkenti baskın geçmişi.
- **🧪 Kahraman & Ekipman Sinerji Laboratuvarı**:
  - Barbar Kral, Okçu Kraliçe, Büyük Koruyucu, Kraliyet Şampiyonu ve Minyon Prensi için ekipman kombinasyonları simülatörü.
- **🏆 Lig & Sıralama Ansiklopedisi**:
  - Ana Köy, İnşaatçı Üssü ve Klan Başkenti dünya ve ülke liderlik tabloları.
- **☁️ Vercel & GitHub Uyumlu**:
  - Serverless dağıtım için hazır `api/index.js` ve `vercel.json` yapılandırması.

---

## 🚀 Kurulum ve Çalıştırma

### 1. Gereksinimler
- **Node.js**: v18+ veya üzeri
- **npm** veya **yarn**

### 2. Projeyi Klonlayın veya İndirin
```bash
git clone <repo-url>
cd "coc web site test"
```

### 3. Bağımlılıkları Yükleyin
```bash
npm install
```

### 4. Çevre Değişkenlerini (`.env`) Ayarlayın
`.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```
`.env` dosyasını düzenleyin:
```env
COC_API_TOKEN=your_supercell_jwt_token_here
PROXY_URL=https://p-4aff1b42.noble-ip.com:3129/
PORT=3000
SESSION_SECRET=your_secret_key_here
ADMIN_USER=admin
ADMIN_PASS=supercell2026
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm start
# veya
node server.js
```
Tarayıcınızda açın: `http://localhost:3000`

---

## 🌐 Dil Değiştirme Sistemi (i18n)

Site menüsünde ve altbilgide yer alan dil seçici (🇦🇿 AZ | 🇹🇷 TR | 🇬🇧 EN) ile anında geçiş yapabilirsiniz. 

Dil sözlükleri:
- `src/locales/tr.json` (Türkçe)
- `src/locales/az.json` (Azərbaycan)
- `src/locales/en.json` (English)

---

## ☁️ Vercel Üzerine Deploy Etme

1. Projeyi GitHub repository'nize push edin:
   ```bash
   git init
   git add .
   git commit -m "feat: Clash of Clans Portal TH1-TH18 & i18n & Proxy"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
2. [Vercel](https://vercel.com) paneline gidin ve **New Project** butonuna tıklayın.
3. GitHub reponuzu bağlayın.
4. **Environment Variables** bölümüne:
   - `COC_API_TOKEN` = Supercell API Token
   - `PROXY_URL` = `https://p-4aff1b42.noble-ip.com:3129/`
   - `SESSION_SECRET` = Güçlü bir rastgele metin
5. **Deploy** butonuna tıklayın. Siteniz saniyeler içinde yayında olacaktır!

---

## 📜 Lisans & Yasal Uyarı

Bu proje Supercell ile bağlantılı değildir, Supercell tarafından onaylanmamış veya özel olarak desteklenmemiştir. Daha fazla bilgi için [Supercell Hayran İçeriği Politikası](https://supercell.com/en/fan-content-policy/)'nı inceleyin.

Clash of Clans® Supercell'in tescilli ticari markasıdır.
