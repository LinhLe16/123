const client = require('../index');
const activities_list = [
    "For Rule Breakers", 
    "The purple names",
    "#general", 
    "The mods do their job"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    console.log("Bot online!");

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], { type: 'WATCHING' }); // sets bot's activities to one of the phrases in the arraylist.
    }, 1000); // Runs this every 10 seconds.
});
