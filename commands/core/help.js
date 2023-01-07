const { MessageEmbed, MessageActionRow, MessageSelectMenu, Message } = require('discord.js');
const fs = require('fs');
const prefix = "!"
module.exports = {
    name: 'help', // name of the command
    description: 'Show all available bot commands', // description of the command
    async execute(client, message, args) {
        const dirs = []; // define dirs variable as an empty array
        const categories =  []; // define categories variable as an empty array
    
        fs.readdirSync('./commands/').forEach((dir) => { // use readirSync function from fs module
            let commands = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js')); // read each "category" folders inside "commands" folder and then filter out js files
            const cmds = commands.map((command) => { // map the commands files
                let file = require(`../../commands/${dir}/${command}`);
                return { // return an object with properties
                    name: dir, // category name,
                    commands: { // command object with name, description and aliases properties
                        name: file.name, // command name
                        description: file.description, // command description
                        aliases: file.aliases // command aliases
                    }
                }
            });
    
            categories.push(cmds.filter(cat => cat.name === dir)); // push the categories of commands to the "categories" array
        });
    
    
        let page = 0; // define the page variable as 0
        const emojis = { // an object which stores the emoji for each category for the menu options & embed 
            "core": "<:info:967237866101043221>",
            "porn": "🔞",
            "moderation": "<:modsilver:967236630186446948>",
            "utility": "<:level:980446249822064680>"
        };
    
        const description = { // an object which stores the description for each category for the embed
            "core": "nope",
            "fun": "nope",
            "moderation": "nope",
        }
    
        const menuOptions = [ // an array for the options of the dropdown menu (will push other options objects into it later)
            {
                label: 'home',
                description: 'Home page',
                emoji: '🏠',
                value: 'home'
            }
        ]
    
        categories.forEach(cat => { // push all category name to "dirs" array
            dirs.push(cat[0].name);
        });
    
        /* Help Embed */
        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Help Menu')
        .setDescription(`My prefix: \`${prefix}\`\nSelect a category to view the commands`)
    
        dirs.forEach((dir) => { // for each dir in the dirs array
            embed.addField( 
                `${emojis[dir] || ''} ${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`, // field name included emoji and category name with first letter capitalized
                `${description[dir] ? description[dir] : `${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()} Commands`}` // description taken from the description object, if the category isn't in the description object, then it will be a default text that we set
            ) // add a field to the help menu home page.
    
            menuOptions.push({ // push the menu select options for each category into the "menuOptions" array
                label: `${dir}`, // label of the select menu option
                description: `${dir} commands page`, // description of the select menu option
                emoji: `${emojis[dir] || ''}`, // emoji of the select menu option
                value: `${page++}` // the value of the select menu option which increase one for every select menu option using the ++ operator
            })
        });
    
        const row = new MessageActionRow().addComponents( // create a new MessageActionRow and add components
            new MessageSelectMenu() // make a new MessageSelectMenu
            .setCustomId('select') // custom id of the select menu
            .setPlaceholder('Click to see my category') // the placeholder of the select menu
            .addOptions(menuOptions) // add the "menuOptions" array which includes all categories of select menu options
        );
    
        var msg = await message.reply({ embeds: [embed], components: [row], fetchReply: true }); // send the embed with await for edit embed later
    
        const filter = i => !i.user.bot; // filter bot from using the dropdown menu
        const collector = message.channel.createMessageComponentCollector({ // create a message component collector 
            filter, // apply the filter
            componentType: 'SELECT_MENU', // type of the collector is select menu
            time: 30000 // time of the collector is 30s
        });
    
        collector.on('collect', async (i) => {
            if(i.user.id !== message.author.id) return i.reply({ content: `This help page is not for you! Use the command \`${prefix}help\` yourself!`, ephemeral: true }); // if click menu user is not the message author then return an ephemeral message
            i.deferUpdate(); // use this so your select menu won't load slowly when u select an option
    
            const value = i.values[0]; // the value that collector collects
    
            if(i.customId !== 'select') return; // if collected value's component custom id is not equals to "select" then return
    
            if(value && value !== 'home') { // if there is value collected and the value is not equals to "home"
                embed.fields = []; // set the fields to empty
                embed.setTitle(`${emojis[categories[value][0].name] ? emojis[categories[value][0].name] : ''} Help Menu | ${categories[value][0].name}`) // set the title as category name and the emoji in the front
    
                categories[value].forEach(cmd => { // use the colected value as the index of the element of the categories array. For each commands of that category....
                    embed.addField( // add a field to the embed
                        `\`${prefix}${cmd.commands.name}\``, // field name is the command name
                        `${cmd.commands.description || 'No descriptinon'}`, // value is the description of the command
                        true // set field inline to true
                    )
                });
                
                msg = await msg.edit({ embeds: [embed], components: [row], fetchReply: true }); // edit the embed
            }
    
            if(value === 'home') { // if the collected value is equals to "home"
                embed.fields = []; // set the embed fields to empty
                embed.setTitle('Help Menu')
    
                dirs.forEach(dir => { // for each dir in the dirs array
                    embed.addField( // add field to the help embed
                        `${emojis[dir] || ''} ${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`, // emoji and category name with first letter capitallized
                        `${description[dir] ? description[dir] : `${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()} commands` }` // description of the category
                    )
                });
    
                msg = await msg.edit({ embeds: [embed], components: [row], fetchReply: true }); // edit the embed
            }
    
        });
    
        collector.on('end', async () => { // when the collector stopped 
            msg = await msg.edit({ embeds: [embed], components: [], fetchReply: true }); // remove the select menu from the embed
        });
    }}