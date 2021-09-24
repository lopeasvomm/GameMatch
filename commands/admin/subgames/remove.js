const { statements } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const id = interaction.options.getInteger("id");
    const subgame = statements.getSubgame.get(id);
    if (!subgame)
      return interaction.followUp({
        content: "Subgame with that ID doesn't exist.",
      });
    statements.deleteUserSubgamesBySubgame.run(id);
    statements.deleteSubgame.run(id);
    interaction.followUp({
      content: `Subgame \`${subgame.name}\` removed.`,
    });
  },
};
