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
    let removed = 0;
    for (const subgame of subgames) {
      if (userSubgames.some((r) => r.subgame_id === subgame.id)) {
        removed++;
        statements.deleteUserSubgame.run(interaction.user.id, subgame.id);
      }
    }
    interaction.followUp({
      content: `Removed \`${removed}\` subgames.`,
    });
  },
};
