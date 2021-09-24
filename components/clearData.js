const { MessageActionRow } = require("discord.js");
const { transactions } = require("../db");

module.exports = {
  name: "clearData",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ButtonInteraction} interaction
   **/
  run: async (client, interaction) => {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.reply({
        content: "You can't clear data from other users.",
        ephemeral: true,
      });
    await interaction.deferReply();
    const userID = interaction.user.id;
    transactions.clearUserData(userID);

    interaction.message.edit({
      components: [
        new MessageActionRow().addComponents(
          interaction.message.components[0].components.map((r) =>
            r.setDisabled(true)
          )
        ),
      ],
    });
    interaction.followUp({
      content: "Cleared all your data.",
    });
  },
};
