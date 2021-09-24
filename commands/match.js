const { Util } = require("discord.js");
const { statements, db, transactions } = require("../db");
const formatGames = require("../util/formatGames");

module.exports = {
  name: "match",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: async (client, interaction) => {
    const user = transactions.getUser(interaction.user.id);
    const users = interaction.options.resolved.users;
    if (!users || !users.size)
      return interaction.followUp({ content: "No users specified." });
    const platformID =
      interaction.options.getInteger("platform", false) ||
      user.default_platform;
    let platform = statements.getPlatform.get(platformID);
    if (platformID && !platform)
      return interaction.followUp({ content: "Invalid platform." });
    const osID = interaction.options.getInteger("os", false) || user.default_os;
    const os = statements.getOs.get(osID);
    if (osID && !os) return interaction.followUp({ content: "Invalid OS." });
    const free = interaction.options.getBoolean("free", false);
    const getUsersGames = db.transaction((users, platform, os, free) => {
      const games = [];
      for (const user of users) {
        let userGames = statements.getUserGames
          .all(user)
          .filter(
            (game) =>
              (game.crossplatform ||
                ((!platform || game.platform === platform) &&
                  (!os || game.os === os))) &&
              (!free || game.free)
          );
        games.push(userGames);
      }
      return games;
    });
    const usersGames = getUsersGames(
      [interaction.user.id, ...users.map((r) => r.id)],
      platformID,
      osID,
      free
    );
    const matched = [];
    for (const game of usersGames[0]) {
      let match = true;
      for (const userGames of usersGames) {
        if (!userGames.some((r) => r.id === game.id)) match = false;
      }
      if (match) matched.push(game);
    }
    const platforms = transactions.mapGamesToPlatforms(matched);

    const content = Object.entries(platforms)
      .map(
        ([platform, games]) => `${platform}:\n` + formatGames(games).join("\n")
      )
      .join("\n\n");
    if (content.length > 1900) {
      const msgs = Util.splitMessage(content, { char: "\n", maxLength: 1900 });
      await interaction.followUp({
        content: `Matched ${matched.length} games.`,
      });
      for (const msg of msgs) {
        await interaction.followUp({ content: msg });
      }
    } else {
      interaction.followUp({
        content: `Matched ${matched.length} games.\n` + content,
      });
    }
  },
};
