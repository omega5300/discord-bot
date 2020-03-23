const { config } =  require("dotenv")
config()

const { Client, RichEmbed } = require('discord.js')

const client = new Client()

const prefix = '!!'

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("message", async (message) => {
console.log(message.content);
  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send(`🚀 pong to ${message.author.username}`);
    // message.reply('pong!');
  }

  if (message.content.startsWith(`${prefix}kick`)) {
    if (message.member.hasPermission(["KICK_MEMBERS"])) {
      const member = message.mentions.members.first();
      if (member) {
        const kickedMember = await member.kick();
        console.log(kickedMember.user.username);
        message.channel.send(`${kickedMember.user.username} has been kicked`);
      }
    } else {
      message.reply("You don't have permission to this");
    }
  }

  if (message.startsWith(`${prefix}delete`)) {
    try {
      await message.delete(1000);
      message.reply(`${prefix}delete`).then(d_msg => d_msg.delete(1000))
    } catch (error) {
      console.log(error);
    }
  }
  
});

client.login(process.env.TOKEN);