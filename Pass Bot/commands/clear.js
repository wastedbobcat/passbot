const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears a number of messages in this channel')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete (1-100)')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        if (amount < 1 || amount > 100) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('⚠️ Invalid amount')
                    .setDescription('Please input a number between 1 and 100.')
                    .setColor(0xff0000)],
                flags: 64
            });
        }

        try {
            await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('🧹 Messages Cleared')
                    .setDescription(`Cleared ${amount} messages.`)
                    .setColor(0x95a5a6)]
            });
        } catch (err) {
            console.error(err);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('❌ Could not delete messages')
                    .setColor(0xff0000)],
                flags: 64
            });
        }
    },
};
