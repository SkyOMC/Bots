const { SlashCommandBuilder } = require('discord.js')
module.exports = [
    (new SlashCommandBuilder()
    .setName("test")
    .setDescription("testing if the bot actually works")).toJSON(),
    (new SlashCommandBuilder()
    .setName("rules")
    .setDescription("sends the rules")).toJSON(),
    (new SlashCommandBuilder()
    .setName("apply")
    .setDescription("sends the staff app embed")).toJSON()
]