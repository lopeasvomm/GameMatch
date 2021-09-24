const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const user = interaction.options.getUser("user");
    transactions.getUser(user.id);
    const userGames = statements.getUserGames.all(user.id);
    const gameIDs = Array.from(
      new Set(
        interaction.options
          .getString("games")
          .split(",")
          .map((id) => parseInt(id))
      )
    );
    const games = statements.getGamesByIds.all(gameIDs.join(","));
    let removed = 0;
    for (const game of games) {
      if (userGames.some((r) => r.game_id === game.id)) {
        removed++;
        statements.deleteUserGame.run(user.id, game.id);
      }
    }
    interaction.followUp({
      content: `Removed \`${removed}\` games.`,
    });
  },
};
