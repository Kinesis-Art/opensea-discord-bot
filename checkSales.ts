import 'dotenv/config';
import Discord, { TextChannel } from 'discord.js';
import fetch from 'node-fetch';
import { ethers } from "ethers";

const OPENSEA_SHARED_STOREFRONT_ADDRESS = '0x495f947276749Ce646f68AC8c248420045cb7b5e';

const discordBot = new Discord.Client();

const discordSetup = async (): Promise<TextChannel> => {
  return new Promise<TextChannel>((resolve, reject) => {
    ['DISCORD_BOT_TOKEN', 'DISCORD_CHANNEL_ID'].forEach((envVar) => {
      if (!process.env[envVar]) reject(`${envVar} not set`)
    })

    discordBot.login(process.env.DISCORD_BOT_TOKEN);
    discordBot.on('ready', async () => {
      const channel = await discordBot.channels.fetch(process.env.DISCORD_CHANNEL_ID!);
      resolve(channel as TextChannel);
    });
  })
}

const buildAtlanta = (id: any) => (

  new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle("Atlanta #" + id)
	.setURL("https://opensea.io/assets/0xeb113c5d09bfc3a7b27a75da4432fb3484f90c6a/" + (1000000 + id))
  .setImage("https://kinesis.art/api/image/" + id)
  .setThumbnail("https://kinesis.art/api/generator/" + id)
  .addField("OpenSea", "https://opensea.io/assets/0xeb113c5d09bfc3a7b27a75da4432fb3484f90c6a/" + id)
  .addField("View", "https://kinesis.art/api/generator/" + id)
  .addField("Export GIF", "https://kinesis.art/api/gif/" + id)
)

const buildKafka = (id: any) => (

  new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle("Kafka #" + id)
	.setURL("https://opensea.io/assets/0xeb113c5d09bfc3a7b27a75da4432fb3484f90c6a/" + (1000000 + id))
  .setImage("https://kinesis.art/api/image/" + (1000000 + id))
  .setThumbnail("https://kinesis.art/api/generator/" + (1000000 + id))
  .addField("OpenSea", "https://opensea.io/assets/0xeb113c5d09bfc3a7b27a75da4432fb3484f90c6a/" + (1000000 + id))
  .addField("View", "https://kinesis.art/api/generator/" + (1000000 + id))
  .addField("Export GIF", "https://kinesis.art/api/gif/"  + (1000000 + id))
)



async function start(){
  const channel = await discordSetup();
}

start();

discordBot.on('ready', () => {
  console.log(discordBot.user.tag)
});

discordBot.on('message', async message => {
  if (message.content.startsWith('!atlanta')) {
    const tokens = message.content.split(" ");
    if(tokens.length != 2 ) message.reply("Invalid command: please follow format '!project id'");
    else if (isNaN(parseInt(tokens[1])) || parseInt(tokens[1]) >= 3600 || parseInt(tokens[1]) < 0) message.reply("Invalid ID: please follow format '!project id'");
    else { message.reply(buildAtlanta(parseInt(tokens[1]))); }
  }
  else if (message.content.startsWith('!kafka')) {
    const tokens = message.content.split(" ");
    if(tokens.length != 2 ) message.reply("Invalid command: please follow format '!project id'");
    else if (isNaN(parseInt(tokens[1])) || parseInt(tokens[1]) >= 2800 || parseInt(tokens[1]) < 0) message.reply("Invalid ID: please follow format '!project id'");
    else { message.reply(buildKafka(parseInt(tokens[1]))); }
  }
});
