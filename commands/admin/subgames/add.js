const { statements } = require("../../../db");

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
        content: "Invalid game.",
      });
    const name = interaction.options.getString("name");
    const players = interaction.options.getInteger("players");
    const free = interaction.options.getBoolean("free", false) || false;
    const subgame = statements.insertSubgame.get(
      game.id,
      name,
      players,
      free ? 1 : 0
    );
    interaction.followUp({
      content: `Subgame \`${subgame.name}\` (\`${game.name}\`) added with ID \`${subgame.id}\`.`,
    });
  },
};
