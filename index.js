const tmi = require("tmi.js");
require("dotenv").config();

const reputation = {};
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: ["Crason8"],
});

if (client.channels) {
  console.log(client.opts.channels.toString().split("#")[1]);
}

client.connect();

client.on("message", (channel, tags, message, self) => {
  const reputationRegex = /(\+\+|--)/g;

  if (reputationRegex.test(message)) {
    const [user, operator] = message.split(reputationRegex);

    if (!(user in reputation)) {
      reputation[user] = 0;
    }

    if (operator === "++") {
      reputation[user]++;
    } else {
      reputation[user]--;
    }

    client.say(
      channel,
      `@${tags.username}, ${user} now has a reputation of ${reputation[user]}`
    );
    return;
  }
  sdsd;

  // Ignore echoed messages
  // if(self || !message.startsWith('!')) {
  //     return;
  // }

  const args = message.slice(1).split(" ");
  const command = args.shift().toLowerCase();
  if (command === "echo") {
    client.say(channel, `@${tags.username}, you said: "${args.join(" ")}"`);
  }
  if (command === "hello") {
    client.say(channel, `@${tags.username}, Yo what's up?`);
  }
  if (command === "dice") {
    const result = Math.floor(Math.random() * 6) + 1;
    client.say(channel, `@${tags.username}, You rolled a ${result}.`);
  }
  if (message) {
    console.log("message:", message.includes(("what" || "which") && "server"));
  }
});