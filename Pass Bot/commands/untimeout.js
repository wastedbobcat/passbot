const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Removes timeout from a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to remove timeout from')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        try {
            await member.timeout(null);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('🔓 Timeout Removed')
                    .setDescription(`${target.tag} is no longer timed out.`)
                    .setColor(0x2ecc71)]
            });
        } catch (err) {
            console.error(err);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('❌ Could not remove timeout')
                    .setColor(0xff0000)],
                flags: 64
            });
        }
    },
};
