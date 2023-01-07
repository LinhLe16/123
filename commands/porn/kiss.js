const neko = require("nekos-fun")
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "kiss",
    aliases: ['kiss'],
    
    async execute(client, message, args) {
        const url = await neko.sfw.kiss()

        const exampleEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setImage(url)


        
            
             message.reply({embeds: [exampleEmbed]})
      
        
        
        
    }
}