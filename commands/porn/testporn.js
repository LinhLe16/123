const neko = require("nekos-fun")
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "blowjob",
    aliases: ['blj'],
    
    async execute(client, message, args) {
        const url = await neko.nsfw.blowjob()

        const exampleEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Blowjob")
            .setImage(url)


        if (message.channel.nsfw){
            
             message.reply({embeds: [exampleEmbed]})
        }
        else return message.reply({content:"vo nsfw di nhoc"})
        
        
    }
}