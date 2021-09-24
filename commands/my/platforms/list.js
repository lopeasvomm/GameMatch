const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const platforms = statements.getUserPlatforms.all(interaction.user.id);
    if (platforms.length === 0)
      return interaction.followUp({
        content: "You don't have any platforms yet.",
      });
    interaction.followUp({
      content:
        `Your platforms:\n` +
        platforms.map((r) => `${r.id}: ${r.name}`).join("\n"),
    });
  },
};
