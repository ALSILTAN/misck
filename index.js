const fs = require("node:fs");
const path = require("node:path");
const db = require("pro.db");
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('Server Started');
});

require('events').EventEmitter.defaultMaxListeners = 9999999;
const { Client, Events, EmbedBuilder, GatewayIntentBits,AttachmentBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, Message } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
  	GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.MessageContent,
  	GatewayIntentBits.GuildVoiceStates
	]
})

process.on("uncaughtException" , error => {
return;
})

process.on("unhandledRejection" , error => {
return;
})

process.on("rejectionHandled", error => {
return;
})

client.Success = '<:Success:1060203853108219936>';
client.Failed  = '<:Failed:1060203668869234748>';

client.ŚÇ  = new Collection();
client.Çɱɗ = new Collection()

module.exports = client;

fs.readdirSync('./Handlers').forEach(async Handler => {
	require(`./Handlers/${Handler}`)(client)
})

client.on('messageCreate', async Message => {
  try {
if(db.get(`whitelist_${Message.guild.id}`).includes(Message.author.id)) return;
let Db = db.get(`ANTILINKS_${Message.guild.id}`)
if (Db === true) {
 if (Message.content.includes('www.') || Message.content.includes('discord.gg') || Message.content.includes('https://') || Message.content.includes('http://') || Message.content.includes('.xyz') || Message.content.includes('youtube') || Message.content.includes('.php')) {  
   await Message.member.timeout(60_0000)
   Message.delete()
  Message.channel.send({ content: `Links is Blocked Here ${Message.author}` })
   Message.author.send('You have been given as much time as possible due to sending links')
       }}
    }catch (err) {return;}
   })

client.on('guildMemberAdd', async Member => {
if(db.get(`whitelist_${Member.guild.id}`).includes(Member.author.id)) return;
const Antibot = await db.fetch(`Antibots_${Member.guild.id}`)
if (Antibot !== true) return;
if(Member.user.bot) return Member.ban({ reason: 'Protection By PrimeBot' });
});

client.on("messageCreate", async (message) => {
  try {
  if(db.get(`whitelist_${message.guild.id}`).includes(message.author.id)) return;
  if (db.get(`AntiBadwords_${message.guild.id}`) === true) {
  let Badwords = await db.fetch(`badwords_${message.guild.id}`);
    if (!Badwords || Badwords === null) return;
    for (let i = 0; i < Badwords.length; i++) {
      if (message.content.toLowerCase().includes(Badwords[i].trim())) {
      message.member.timeout(60_0000)
        return message.delete();
      }
    }
          }}
catch (err) {return;}
})    

client.on("messageCreate", message => { 
 if(message.content === `<@${client.user.id}>`) {
const embed = new EmbedBuilder()
   .setDescription(`**Hey Iam Axlo Host
 Thank You For Using Me My Prefix is /Help**`)
   .setTitle(`Bot Info My ${client.user.username}`)
   .setColor(`#fc0101`)
   .setAuthor({name: message.guild.name,iconURL: message.guild.iconURL({dynamic:true})})
   .setFooter({ text: `Requested by ${message.author.tag}` , iconURL: 
    message.author.displayAvatarURL({dynamic:true})})
   .setTimestamp()
   message.reply({ embeds: [embed] })
   }
});

client.on("messageCreate", message => {
  if (message.mentions.members.size > 0) {
    if (message.author.bot) return;
    message.mentions.members.forEach(member => {
      if (member.nickname && member.nickname.startsWith("[AFK] ")) {
       const reason =  db.get(`AFK_${member.id}`)
        message.channel.send(`**${member.displayName} is Reason : ${reason}.**`);
      }
    });
  }
});

client.on("messageCreate", async message => {
  if (!message.guild || message.author.bot) return;
  if (message.member.displayName && message.member.displayName.startsWith("[AFK] ")) {
      message.member.setNickname(message.member.displayName.replace("[AFK] ", ""));
      const welcome = await message.reply("👋 Welcome Back, you're no Longer AFK");
      setTimeout(() => {
     db.delete(`AFK_${message.member.id}`)
      welcome.delete()
      }, 5000)
  }
});

client.on('messageCreate', async message => {
       if(message.content.startsWith('join')) {
        if(!message.member.permissions.has('ManageGuild')) return message.channel.send({ content: `:x: ${message.author}, This Command Required **ManageGuild** Permission` })
        await client.emit('guildMemberAdd', message.member)
        message.react('✅');
    }
});

client.on('messageCreate', async message => {
       if(message.content.startsWith('leave')) {
        if(!message.member.permissions.has('ManageGuild')) return message.channel.send({ content: `:x: ${message.author}, This Command Required **ManageGuild** Permission` })
        await client.emit('guildMemberRemove', message.member)
        message.react('✅')
    }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.guilds.cache.forEach(guild => {
    if (guild.memberCount < 1) {
      console.log(`Leaving guild: ${guild.name} - member count: ${guild.memberCount}`);
      guild.leave();
    }
  });
});

client.login(process.env.token).catch((err) => {
  console.log(err)
});
////////////////

