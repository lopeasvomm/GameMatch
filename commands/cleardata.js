const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "cleardata",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    interaction.followUp({
      content:
        "Are you sure you want to clear all data connected to your account?",
      components: [
        new MessageActionRow().addComponents([
          new MessageButton()
            .setLabel("Yes")
            .setCustomId("clearData")
            .setStyle("DANGER"),
          new MessageButton()
            .setLabel("No")
            .setCustomId("cancel")
            .setStyle("SUCCESS"),
        ]),
      ],
    });
  },
};
