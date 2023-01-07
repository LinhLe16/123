const neko = require("nekos-fun")
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "hentai",
    aliases: ['hent'],
    
    async execute(client, message, args) {
        const url = await neko.nsfw.hentai()

        const exampleEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setImage(url)


        if (message.channel.nsfw){
            
             message.reply({embeds: [exampleEmbed]})
        }
        else return message.reply({content:"vo nsfw di nhoc"})
        
        
    }
}