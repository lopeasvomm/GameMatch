const { statements } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const id = interaction.options.getInteger("id");
    const game = statements.getGameById.get(id);
    if (!game)
      return interaction.followUp({
        content: "Game with that ID doesn't exist.",
      });
    statements.deleteUserGamesByGame.run(id);
    statements.deleteUserSubgamesByGame.run(id);
    statements.deleteGame.run(id);
    statements.deleteAllSubgames.run(id);
    interaction.followUp({
      content: `Game \`${game.name}\` removed.`,
    });
  },
};
