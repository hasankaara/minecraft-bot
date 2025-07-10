const mineflayer = require('mineflayer');
const express = require('express');
const chalk = require('chalk');
const axios = require('axios');
const { status } = require('minecraft-server-util');

process.on('uncaughtException', err => console.error("💥 Uncaught Exception:", err));
process.on('unhandledRejection', reason => console.error("💥 Unhandled Rejection:", reason));

const app = express();
app.get("/", (_, res) => res.send("Bot aktif!"));
app.listen(3000, () => console.log(chalk.blue("🌐 Bot web sunucusu açık")));

const pushoverUserKey = "YOUR_PUSHOVER_USER_KEY";
const pushoverApiToken = "YOUR_PUSHOVER_APİ_TOKEN";

// 🔧 BURAYA KENDİ SUNUCU VE PORTLARINI GİR
const servers = [
  {
    name: "bot1",
    host: 'senin_sunucunun_ip_adresi',
    port: senin_sunucunun_portu,
    username: 'bot_2',
    version: 'sunucunun_sürümü'
  },
  {
    name: "bot2",
    host: 'senin_sunucunun_ip_adresi',
    port: senin_suncunun_portu,
    username: 'bot_2',
    version: 'sunucun_sürümü'
  }
];

// Bildirim durumu tutulur
const isNotificationSentMap = {};

function startBot(serverConfig) {
  let bot;
  let movementTimeout;

  if (!(serverConfig.name in isNotificationSentMap)) {
    isNotificationSentMap[serverConfig.name] = false;
  }

  const movePatterns = [
    () => bot.setControlState('jump', true),
    () => bot.setControlState('forward', true),
    () => bot.setControlState('back', true),
    () => bot.setControlState('left', true),
    () => bot.setControlState('right', true),
  ];

  function randomMove() {
    bot.clearControlStates();
    const action = movePatterns[Math.floor(Math.random() * movePatterns.length)];
    action();
    setTimeout(() => bot.clearControlStates(), 500);
  }

  function scheduleNextMovement() {
    const delay = Math.floor(Math.random() * 3000) + 9000;
    movementTimeout = setTimeout(() => {
      try {
        randomMove();
      } catch (_) {}
      scheduleNextMovement();
    }, delay);
  }

  function scheduleRightTurn() {
    setTimeout(() => {
      if (bot.entity) {
        bot.look(bot.entity.yaw + Math.PI / 2, bot.entity.pitch).catch(() => {});
      }
      scheduleRightTurn();
    }, 60000);
  }

  async function sendNotifications(message) {
    try {
      await axios.post("https://api.pushover.net/1/messages.json", {
        token: pushoverApiToken,
        user: pushoverUserKey,
        message
      });
      console.log(chalk.green("📱 Pushover bildirimi gönderildi!"));
    } catch (err) {
      console.error(chalk.red("❌ Bildirim gönderilemedi:"), err.message);
    }
  }

  function setupBot() {
    console.log(chalk.gray(`[${serverConfig.name}] Bot başlatılıyor...`));

    bot = mineflayer.createBot({
      host: serverConfig.host,
      port: serverConfig.port,
      username: serverConfig.username,
      version: serverConfig.version
    });

    bot.once('spawn', () => {
      console.log(chalk.cyan(`✅ [${serverConfig.name}] Bot sunucuya girdi!`));
      isNotificationSentMap[serverConfig.name] = false;
      scheduleNextMovement();
      scheduleRightTurn();
    });

    bot.on('death', () => {
      console.log(chalk.red(`[${serverConfig.name}] Bot öldü, 3 saniye sonra yeniden doğuyor...`));
      setTimeout(() => bot.spawn(), 3000);
    });

    bot.on('end', async (reason) => {
      clearTimeout(movementTimeout);
      bot.removeAllListeners();

      console.log(chalk.yellow(`⚠️ [${serverConfig.name}] Bağlantı kesildi: "${reason}"`));

      try {
        await status(serverConfig.host, serverConfig.port, { timeout: 5000 });
        console.log(chalk.gray(`[${serverConfig.name}] Sunucu açık, bildirim gönderilmiyor.`));
        isNotificationSentMap[serverConfig.name] = false;
      } catch {
        if (!isNotificationSentMap[serverConfig.name]) {
          await sendNotifications(`⚠️ [${serverConfig.name}] Sunucu kapalı görünüyor. Bot bağlantıyı kaybetti.`);
          isNotificationSentMap[serverConfig.name] = true;
        } else {
          console.log(chalk.gray(`[${serverConfig.name}] Bildirim zaten gönderildi, tekrar atmıyor.`));
        }
      }

      setTimeout(setupBot, Math.floor(Math.random() * 5000) + 5000);
    });

    bot.on('error', (err) => {
      console.log(chalk.red(`❌ [${serverConfig.name}] Bot hatası: ${err.message}`));
      clearTimeout(movementTimeout);
      setTimeout(setupBot, 5000);
    });

    bot.on('kicked', (reason) => {
      console.log(chalk.red(`👮 [${serverConfig.name}] Bot atıldı: ${reason}`));
    });
  }

  setupBot();
}

// 🔁 Tüm botları sırayla başlat
servers.forEach(server => {
  console.log(chalk.magenta(`[${server.name}] Başlatma fonksiyonu tetiklendi.`));
  setTimeout(() => startBot(server), Math.random() * 2000);
});
