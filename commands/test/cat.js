const randomCat = require('random-cat-img');

const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "cat",
    aliases: ['cat'],
    
    async execute(client, message, args) {


        const res = await randomCat();
        const img = res.data.message
      
    
        const exampleEmbed = new MessageEmbed()
            .setColor('RANDOM')
            
            .setImage(img)


        
            
             message.reply({embeds: [exampleEmbed]})
      
        
        
        
    }
}