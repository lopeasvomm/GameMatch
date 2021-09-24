const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const userGames = statements.getUserGames.all(interaction.user.id);
    const gameIDs = Array.from(
      new Set(
        interaction.options
          .getString("id")
          .split(",")
          .map((id) => parseInt(id))
      )
    );
    const games = statements.getGamesByIds.all(gameIDs.join(","));
    let added = 0;
    let alreadyAdded = 0;
    let notFound = gameIDs.length - games.length;
    for (const game of games) {
      if (userGames.some((r) => r.game_id === game.id)) {
        alreadyAdded++;
      } else {
        added++;
        statements.insertUserGame.run(interaction.user.id, game.id);
      }
    }
    interaction.followUp({
      content:
        `Added \`${added}\` games.\n` +
        (alreadyAdded
          ? `\`${alreadyAdded}\` games were already added.\n`
          : "") +
        (notFound ? `\`${notFound}\` games not found.` : ""),
    });
  },
};
