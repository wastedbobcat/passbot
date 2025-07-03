const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to ban')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        if (!member.bannable) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('❌ Cannot ban this user')
                    .setColor(0xff0000)],
                flags: 64
            });
        }

        await member.ban();
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle('✅ User Banned')
                .setDescription(`${target.tag} has been banned.`)
                .setColor(0xff0000)]
        });
    },
};
