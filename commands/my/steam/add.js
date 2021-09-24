const { db, transactions, statements } = require("../../../db");
const {
  getSteamInfo,
  resolveSteamID,
  getSteamGames,
  formatSteamAccount,
} = require("../../../util/steam");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: async (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const url = interaction.options.getString("url");
    const id = await resolveSteamID(url);
    const info = await getSteamInfo(id);
    if (!info) {
      return interaction.followUp({
        content: "Steam account with that URL does not exist.",
      });
    }
    statements.insertSteamAccount.run(interaction.user.id, info.steamID64);
    const userGames = statements.getUserGames
      .all(interaction.user.id)
      .map((r) => r.game_id);
    const insertGames = db.transaction((games) => {
      const allGames = statements.getGames.all();
      let i = 0;
      for (const game of games) {
        const foundGame = allGames.find(
          (r) => r.name.toLowerCase() === game.name.toLowerCase()
        );
        if (foundGame && !userGames.includes(foundGame.id)) {
          statements.insertUserGame.run(interaction.user.id, foundGame.id);
          i++;
        }
      }
      return i;
    });
    const games = await getSteamGames(id);
    const i = insertGames(games);
    return interaction.followUp({
      content: `Successfully added ${formatSteamAccount(
        info
      )} to your account.\nAdded \`${i}\` games.`,
    });
  },
};
