const { statements } = require("../../db");
const formatSubgames = require("../../util/formatSubgames");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const gameID = interaction.options.getInteger("game");
    const game = statements.getGameById.get(gameID);
    if (!game)
      return interaction.followUp({
        prompt: "Invalid game.",
      });
    const page = interaction.options.getInteger("page") || 1;
    const perPage = 10;
    const firstIndex = (page - 1) * perPage;
    const lastIndex = (page - 1) * perPage + perPage;

    if (page < 1)
      return interaction.followUp({ content: "Invalid page number." });

    const all = statements.getSubgames.all(gameID);
    const results = all.slice(firstIndex, lastIndex);
    if (!results.length)
      return interaction.followUp({ content: "No results." });
    interaction.followUp({
      content:
        `${game.name} - Page ${page}/${Math.ceil(all.length / perPage)}\n` +
        formatSubgames(results).join("\n"),
    });
  },
};
