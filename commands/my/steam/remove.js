const { db, statements, transactions } = require("../../../db");
const {
  getSteamInfo,
  resolveSteamID,
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
    const accounts = statements.getUserSteamAccounts.all(interaction.user.id);
    if (!accounts.some((r) => r.steamid === info.steamID64))
      return interaction.followUp({
        content: "You don't have that steam account.",
      });
    statements.deleteSteamAccount.run(interaction.user.id, info.steamID64);
    interaction.followUp({
      content: `Removed ${formatSteamAccount(info)} from your steam accounts.`,
    });
  },
};
