const tmi = require('tmi.js');
require('dotenv').config()


// console.log(process.env.TWITCH_OAUTH_TOKEN, process.env.TWITCH_USERNAME)

const client = new tmi.Client({
    options:{debug:true},
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: ['Crason8']
})

client.connect()

client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages
    if(self) return;

    if(message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, Yo what's up!?`);
    }
    console.log(`${tags['display-name']}; ${message}`)
});