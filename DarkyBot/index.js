/// start of index /// SkyOPG /// start of index ///
const { 
    Client, 
    REST,
    EmbedBuilder, 
    ButtonBuilder, 
    ActionRowBuilder, 
    ModalBuilder,
    TextInputBuilder, 
    Routes, 
    ButtonStyle,
    TextInputStyle
} = require("discord.js");
const { QuickDB } = require('quick.db');
const { client: { token } } = require('./config');
const commands = require("./commandsList");

// Client Class
class DarkyClient extends Client{
    constructor(options){
        super(options);
        this.db = new QuickDB();
    }
    connect(){
        this.login(token);
        this.reload()
    }
    async reload(){
        const rest = new REST().setToken(token);

        try{
            await rest.put(Routes.applicationCommands("1139615668988289154"),
        { body: commands }
        )
    } catch(er) {
        console.error(er)
    }
    }
}
// Client Class

new DarkyClient({ intents: [ "Guilds" ] })
.on("ready", ({ user: {username} }) => console.log(`ready on ${username}`))
.on("interactionCreate",async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const cmd = interaction.commandName;

    switch(cmd){
        case "test": {
            await interaction.reply("hi")
        } break;
        case "rules": {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: "Rules", iconURL: interaction.guild.iconURL() })
                    .addFields(
                        { name: "💬 Language", value: "This is an English-speaking server, so please speak English." },
                        { name: "🤗 Be Respectful", value: "Try to generally be kind to everyone since toxicity is generally frowned upon. However, don't expect to not be trolled if you aren't following rules." },
                        { name: "🏛️ Controversial Conversations", value: "No political, religious, and/or controversial topics are allowed." },
                        { name: "🔞 SFW", value: "SFW is allowed, but any form of NSFW that is too sexual and/or revealing of private parts is prohibited and will result in a ramification." },
                        { name: "🚫 Illegal Topics", value: "Avoid topics/words and/or but not limited to promotion/related to destruction/pain, weapons, doxxing, ddosing, crime, illegal things, suicidal thoughts, dark/provocative humor, etc." },
                        { name: "➡️ Guidelines", value: "[Discord Community Guidelines](https://discord.com/guidelines) and [Terms of Service](https://discord.com/terms) apply." },
                        { name: "❌ Staff Have Final Say", value: "We may at any time at our sole discretion modify these rules with or without your consent. Any such modification will be effective immediately upon public posting. Also, we reserve the right to remove you at any time we decide. Therefore, if you wish to remain, we highly suggest that you be made aware of everything here to avoid such." },
                        { name: "👤 End of channel", value: "This is the end of the channel, please scroll up for rules" }
                    )
                    .setColor("Blue")
                ]
            })
        } break;
        case "apply": {
            await interaction.reply({ 
                embeds: [
                new EmbedBuilder()
                .setAuthor({ name: "| Staff Apps", iconURL: interaction.guild.iconURL()})
                .setColor("Blue")
                .setDescription("__**REQUIREMENTS**__\n- Age: `14+`\n- Experience: `2months and above`\n- Join Date: `1week and above`\n### NOTE: only move on if you meet the requirements above")
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel("Apply")
                        .setEmoji("📝")
                        .setCustomId("apply")
                        .setStyle(ButtonStyle.Primary)
                    )
                ]
            })
        }
    }
})
.on("interactionCreate", async interaction => {
    if(!interaction.isButton()) return;
    const cid = interaction.customId;

    switch(cid){
        case "apply": {
            const modal = new ModalBuilder()
            .setCustomId("application")
            .setTitle("Staff Application")
            .addComponents(
                new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                    .setLabel("What's Your name?")
                    .setPlaceholder("Sky")
                    .setCustomId("name")
                    .setStyle(TextInputStyle.Short)
                ),
                new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                    .setLabel("What's Your Timezone?")
                    .setPlaceholder("GMT+1")
                    .setCustomId("time")
                    .setStyle(TextInputStyle.Short)
                ),
                new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                    .setLabel("What makes you our optimal choice?")
                    .setPlaceholder("too much text to display...")
                    .setCustomId("choice")
                    .setStyle(TextInputStyle.Paragraph)
                ),
                new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                    .setLabel("rate your activity in the server")
                    .setPlaceholder("6/10")
                    .setCustomId("scale")
                    .setStyle(TextInputStyle.Short)
                ),
            )
            await interaction.showModal(modal);
        } break;
    }
})
.on("interactionCreate", async interaction => {
    if(!interaction.isModalSubmit()) return;
    const cid = interaction.customId;

    switch(cid){
        case "application": {
            interaction.reply({ embed: [
                new EmbedBuilder()
                .setAuthor({ name: "| App Submitted", iconURL: interaction.guild.iconURL() })
            ] })
        } break;
    }
})
.connect()
/// end of index /// SkyOPG /// end of index ///