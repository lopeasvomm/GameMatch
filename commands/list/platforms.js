const { statements } = require("../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const page = interaction.options.getInteger("page") || 1;
    const perPage = 10;
    const firstIndex = (page - 1) * perPage;
    const lastIndex = (page - 1) * perPage + perPage;

    if (page < 1)
      return interaction.followUp({ content: "Invalid page number." });

    const all = statements.getPlatforms.all();
    const results = all.slice(firstIndex, lastIndex);
    if (!results.length)
      return interaction.followUp({ content: "No results." });
    interaction.followUp({
      content:
        `Page ${page}/${Math.ceil(all.length / perPage)}\n` +
        results.map((r) => `${r.id}: ${r.name}`).join("\n"),
    });
  },
};
