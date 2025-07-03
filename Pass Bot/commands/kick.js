const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to kick')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        if (!member.kickable) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('❌ Cannot kick this user')
                    .setColor(0xff0000)],
                flags: 64
            });
        }

        await member.kick();
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle('✅ User Kicked')
                .setDescription(`${target.tag} has been kicked.`)
                .setColor(0xffa500)]
        });
    },
};
