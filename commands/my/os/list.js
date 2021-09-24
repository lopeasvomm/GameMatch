const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const oss = statements.getUserOs.all(interaction.user.id);
    if (oss.length === 0)
      return interaction.followUp({
        content: "You don't have any operating systems yet.",
      });
    interaction.followUp({
      content:
        `Your operating systems:\n` +
        oss.map((r) => `${r.id}: ${r.name}`).join("\n"),
    });
  },
};
