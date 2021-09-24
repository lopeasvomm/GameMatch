const { statements, transactions } = require("../../../db");
const { getSteamInfo, formatSteamAccount } = require("../../../util/steam");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: async (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const accounts = statements.getUserSteamAccounts.all(interaction.user.id);
    const steamAccounts = [];
    for (const account of accounts) {
      try {
        steamAccounts.push(await getSteamInfo(account.steamid));
      } catch (e) {
        statements.deleteSteamAccount.run(interaction.user.id, account.steamid);
      }
    }
    if (steamAccounts.length === 0)
      return interaction.followUp({
        content: "You don't have steam accounts.",
      });
    interaction.followUp({
      content:
        `Your steam accounts:\n` +
        steamAccounts.map(formatSteamAccount).join("\n"),
    });
  },
};
