const { Client, GatewayIntentBits } = require("discord.js")


const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on("ready", () => {
    console.log(`logged is as ${client.user.tag}`);
})

//const discordToken = process.env.DISCORD_TOKEN
//console.log("discord token:::", discordToken)

client.login("MTE3OTc5MTIyMDM5MDc2ODcyMA.GH-Hew.hFdB4jPhNchKHr5245NHPRAl40DyFLLMjHzW24")


client.on("messageCreate", msg => {
    if (msg.author.bot) return
    if (msg.content == "hello") {
        msg.reply("Hello, xin chao dai ka!")
    }
})