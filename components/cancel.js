const { MessageActionRow } = require("discord.js");

module.exports = {
  name: "cancel",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ButtonInteraction} interaction
   **/
  run: (client, interaction) => {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.reply({
        content: "You can't clear data from other users.",
        ephemeral: true,
      });
    interaction.message.edit({
      components: [
        new MessageActionRow().addComponents(
          interaction.message.components[0].components.map((r) =>
            r.setDisabled(true)
          )
        ),
      ],
    });
    interaction.reply({
      content: "Canceled.",
    });
  },
};
