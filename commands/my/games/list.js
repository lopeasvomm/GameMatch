const { Util } = require("discord.js");
const { statements, transactions, db } = require("../../../db");
const formatGames = require("../../../util/formatGames");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: async (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const games = statements.getUserGames.all(interaction.user.id);
    if (games.length === 0)
      return interaction.followUp({
        content: "You don't have any games yet.",
      });
    const platforms = transactions.mapGamesToPlatforms(games);

    const content = Object.entries(platforms)
      .map(
        ([platform, games]) => `${platform}:\n` + formatGames(games).join("\n")
      )
      .join("\n\n");
    if (content.length > 1900) {
      const msgs = Util.splitMessage(content, { char: "\n", maxLength: 1900 });
      await interaction.followUp({
        content: `Your games:`,
      });
      for (const msg of msgs) {
        await interaction.followUp({ content: msg });
      }
    } else {
      interaction.followUp({
        content: `Your games:\n` + content,
      });
    }
  },
};
