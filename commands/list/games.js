const { statements, transactions } = require("../../db");
const formatGames = require("../../util/formatGames");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const platformID = interaction.options.getInteger("platform", false);
    const platform = statements.getPlatform.get(platformID);
    if (platformID && !platform)
      return interaction.followUp({
        content: "Invalid platform.",
      });
    const page = interaction.options.getInteger("page") || 1;
    const perPage = 20;
    const firstIndex = (page - 1) * perPage;
    const lastIndex = (page - 1) * perPage + perPage;

    if (page < 1)
      return interaction.followUp({ content: "Invalid page number." });

    let all = statements.getGames.all();
    if (platform) all = all.filter((r) => r.platform === platform.id);
    const results = all.slice(firstIndex, lastIndex);
    if (!results.length)
      return interaction.followUp({ content: "No results." });
    const content = Object.entries(transactions.mapGamesToPlatforms(results))
      .map(
        ([platform, games]) => `${platform}:\n` + formatGames(games).join("\n")
      )
      .join("\n\n");
    interaction.followUp({
      content: `Page ${page}/${Math.ceil(all.length / perPage)}\n` + content,
    });
  },
};
