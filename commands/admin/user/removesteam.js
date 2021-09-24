const { statements, transactions } = require("../../../db");
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
    const user = interaction.options.getUser("user");
    transactions.getUser(user.id);
    const url = interaction.options.getString("url");
    const id = await resolveSteamID(url);
    const info = await getSteamInfo(id);
    if (!info) {
      return interaction.followUp({
        content: "Steam account with that URL does not exist.",
      });
    }
    const accounts = statements.getUserSteamAccounts.all(user.id);
    if (!accounts.some((r) => r.steamid === info.steamID64))
      return interaction.followUp({
        content: `${user.tag} doesn't have that steam account.`,
      });
    statements.deleteSteamAccount.run(user.id, info.steamID64);
    interaction.followUp({
      content: `Removed ${formatSteamAccount(info)} from ${
        user.tag
      }'s steam accounts.`,
    });
  },
};
