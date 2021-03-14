const Discord = require("discord.js")
const client = new Discord.Client()

const prefix = "dbot "

client.on("ready", () => {
  console.log("Bot has started.")
}) 

client.on("message", async message => {
  // If the message is sent by a bot, we ignore it.
  if(message.author.bot) return;
  // If the message does not start with a prefix, we ignore it.
  if(message.content.indexOf(prefix) !== 0) return;
  // Get the arguments of the command.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  // Gets the command.
  const command = args.shift().toLowerCase();
  // dbot tell me a story
  // Command: tell
  // Args: ["me", "a", "story"] 
  if (command == "hello") {
    message.channel.send("Hi " + message.author.username + "!")
  }
  if (command == "say") {
    message.channel.send(args.join(" "))
    message.delete()
  }
  if (command == "ban") {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.reply("You do not have the permission to use that command!")
    }
    // Gets the first ping and stores it in a variable
    var member = message.mentions.members.first()
    // Tries to ban the member
    member.ban().then(() => {
      // If it works, say it works
      return message.reply("Successfully banned " + member.user.username + "!")
    }).catch(() => {
      // Tell them it doesn't work if it's not possible
      message.reply("Sorry, I could not ban that user!")
    })
  }
  if (command == "kick") {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.reply("You do not have the permission to use that command!")
    }
    // Gets the first ping and stores it in a variable
    var member = message.mentions.members.first()
    // Tries to ban the member
    member.kick().then(() => {
      // If it works, say it works
      return message.reply("Successfully kicked " + member.user.username + "!")
    }).catch(() => {
      // Tell them it doesn't work if it's not possible
      message.reply("Sorry, I could not kick that user!")
    })
  }
  if (command == "id") {
    var member = message.mentions.members.first()
    message.reply("That user's ID is " + member.id + ".")
  }
})

/*

dbot say hello, world!
Command: say
Args: ["hello,", "world"]

Send a message into the chat:
message.channel.send("Something in here")

Reply to the user's message (@user text):
message.reply("Something in here")

Delete the user's message:
message.delete()

Get the command writer's username:
message.author.username

*/

client.login(process.env.TOKEN)