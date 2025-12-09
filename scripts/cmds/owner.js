const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.0",
    author: "Ｓｏｊｉｂ ◉‿◉ Edit by Sajib",
    shortDescription: "Display bot and owner information",
    longDescription: "Shows detailed info including bot name, prefix, and owner's personal information.",
    category: "Special",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const mention = [{ id, tag: name }];

    // 🛠 Convert Google Drive view link to direct download link
    const fileId = "1QQ4rcb5mnLytHKuavPxOjx0rF-YuOTaS";
    const directURL = `https://files.catbox.moe/ymp7ob.mp4`;

    // ⏬ Download the file temporarily
    const filePath = path.join(__dirname, "owner-video.mp4");
    const response = await axios({
      url: directURL,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const info = 
`━━━━━━━━━━━━━━━━
👋𝓗𝓮𝓵𝓵𝓸 𝓑𝓪𝓫𝔂𝓼, ${name}

📌 🌸🌺 𝓑𝓞𝓣 𝓑𝓐𝓑𝓨 𝓘𝓝𝓕𝓞 🌺🌸
✭ 𝓝𝓪𝓶𝓮 ➳ ◦•●😇𝑾𝒂𝒈𝒖𝒓𝒊 𝑪𝒉𝒂𝒏😉●•◦
✭ 𝓟𝓻𝓮𝓯𝓲𝔁 ➳ +
૮₍꜆꜄ ˃ ³ ˂ ₎a:. ヽ (* ´з ｀ *) ﾉ +. ღ
👤 🥀🌸 𝓞𝓦𝓝𝓔𝓡 𝓘𝓝𝓕𝓞 🌸🥀
✭ 𝓝𝓪𝓶𝓮 ➳ 😪 𝑺𝑨𝑱𝑰𝑩 😪
✭ 𝓖𝓮𝓷𝓭𝓮𝓻 ➳ 𝑴𝒂𝒍𝒆 😷
✭ 𝓐𝓰𝓮 ➳ 18+
✭ 𝓢𝓽𝓪𝓽𝓾𝓼 ➳ 𝑴𝒊𝒏𝒈𝒂𝒍𝒆 😋✨
✭ 𝓐𝓭𝓾𝓬𝓪𝓽𝓲𝓲𝓷 ➳ 𝑺𝑻𝑼𝑫𝑬𝑵𝑻 😕
✭ 𝓛𝓸𝓬𝓪𝓽𝓲𝓸𝓷 ➳ 𝑱𝑬𝑺𝑺𝑶𝑹𝑬 𝑩𝑬𝑵𝑨𝑷𝑶𝑳𝑬⚡
✭ 𝓕𝓑 𝓛𝓲𝓷𝓴 ➳ https://www.facebook.com/share/16WZtvPKJY/
✭ 𝓘𝓷𝓼𝓽𝓪 𝓛𝓲𝓷𝓴 ➳https://www.instagram.com/itzsajib78?igsh=MTd6Zm1qc3BvdGM4dQ==
━━━━━━━━━━━━━━━━━`;

    message.reply({
      body: info,
      mentions: mention,
      attachment: fs.createReadStream(filePath)
    });
  }
};
