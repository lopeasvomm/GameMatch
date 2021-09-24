const { Util } = require("discord.js");
const { statements, transactions } = require("../../../db");
const formatSubgames = require("../../../util/formatSubgames");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: async (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const gameID = interaction.options.getInteger("game");
    const game = statements.getGameById.get(gameID);
    if (!game)
      return interaction.followUp({
        content: "Invalid game.",
      });
    const subgames = statements.getUserSubgames.all(
      interaction.user.id,
      game.id
    );
    if (subgames.length === 0)
      return interaction.followUp({
        content: `You don't have any subgames for \`${game.name}\`.`,
      });
    const content = formatSubgames(subgames).join("\n");
    if (content.length > 1900) {
      const msgs = Util.splitMessage(content, { char: "\n", maxLength: 1900 });
      await interaction.followUp({
        content: `${game.name} - Your subgames:`,
      });
      for (const msg of msgs) {
        await interaction.followUp({ content: msg });
      }
    } else {
      interaction.followUp({
        content: `${game.name} - Your subgames:\n` + content,
      });
    }
  },
};
