const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionrole')
        .setDescription('Posts an embed in a channel with a reaction role')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to send the embed to')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Embed title')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Embed text (you can copy multi-line rules here)')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Role to give when user reacts')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Emoji to react with')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title');
        const text = interaction.options.getString('text');
        const role = interaction.options.getRole('role');
        const emoji = interaction.options.getString('emoji');

        // Create the embed
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(text)
            .setColor(0x3498db);

        // Send the embed to the target channel
        const message = await channel.send({ embeds: [embed] });

        // React with the emoji
        await message.react(emoji);

        // Setup a collector for reactions
        const collector = message.createReactionCollector({ dispose: true });

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === emoji) {
                const member = await message.guild.members.fetch(user.id);
                await member.roles.add(role);
            }
        });

        collector.on('remove', async (reaction, user) => {
            if (reaction.emoji.name === emoji) {
                const member = await message.guild.members.fetch(user.id);
                await member.roles.remove(role);
            }
        });

        await interaction.reply({ content: `✅ Posted embed in ${channel} with reaction ${emoji} for role ${role}`, flags: 64 });
    },
};

