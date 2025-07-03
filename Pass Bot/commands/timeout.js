const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Times out a user for a number of seconds')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to timeout')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Number of seconds to timeout')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const seconds = interaction.options.getInteger('seconds');
        const member = await interaction.guild.members.fetch(target.id);

        try {
            await member.timeout(seconds * 1000);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('⏳ User Timed Out')
                    .setDescription(`${target.tag} has been timed out for ${seconds} seconds.`)
                    .setColor(0x3498db)]
            });
        } catch (err) {
            console.error(err);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('❌ Could not timeout user')
                    .setColor(0xff0000)],
                flags: 64
            });
        }
    },
};
