const randomFox = require('random-fox-img');

const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "fox",
    aliases: ['fox'],
    
    async execute(client, message, args) {


        const res = await randomFox();
        const img = res.data.message
      
    
        const exampleEmbed = new MessageEmbed()
            .setColor('RANDOM')
            
            .setImage(img)


        
            
             message.reply({embeds: [exampleEmbed]})
      
        
        
        
    }
}