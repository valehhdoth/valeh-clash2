const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Clash of Clans Web Portal is RUNNING!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` API Token Status: ${process.env.COC_API_TOKEN ? 'LIVE KEY DETECTED ✅' : 'MOCK MODE ACTIVE (Default) ⚡'}`);
  console.log(`=========================================`);
});
