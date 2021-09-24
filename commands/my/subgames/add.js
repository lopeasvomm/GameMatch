const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const userSubgames = statements.getAllUserSubgames.all(interaction.user.id);
    const subgameIDs = Array.from(
      new Set(
        interaction.options
          .getString("id")
          .split(",")
          .map((id) => parseInt(id))
      )
    );
    const subgames = statements.getSubgamesByIds.all(subgameIDs.join(","));
    const userGames = statements.getUserGames.all(interaction.user.id);
    let added = 0;
    let alreadyAdded = 0;
    let notFound = subgameIDs.length - subgames.length;
    for (const subgame of subgames) {
      if (userSubgames.some((r) => r.subgame_id === subgame.id)) {
        alreadyAdded++;
      } else if (userGames.some((r) => r.game_id === subgame.game_id)) {
        added++;
        statements.insertUserSubgame.run(
          interaction.user.id,
          subgame.game_id,
          subgame.id
        );
      }
    }
    interaction.followUp({
      content:
        `Added \`${added}\` subgames.\n` +
        (alreadyAdded
          ? `\`${alreadyAdded}\` subgames were already added.\n`
          : "") +
        (notFound ? `\`${notFound}\` subgames not found.` : ""),
    });
  },
};
