module.exports = {
  name: "interactionCreate",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Interaction} interaction
   **/
  run: async (client, interaction) => {
    if (interaction.isCommand()) {
      if (interaction.channel.type === "DM")
        return interaction.reply({
          content: "You can't run commands in DMs!"
        })
      const { commandName } = interaction;
      if (client.commands.has(commandName)) {
        await interaction.deferReply();
        client.commands.get(commandName).run(client, interaction);
      } else interaction.reply(`Command not found.`);
    } else if (interaction.isMessageComponent()) {
      if (client.components.has(interaction.customId)) {
        const component = client.components.get(interaction.customId);
        component.run(client, interaction);
      }
    }
  },
};
