const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const user = interaction.options.getUser("user");
    transactions.getUser(user.id);
    const platforms = statements.getUserPlatforms.all(user.id);
    const platformID = interaction.options.getInteger("platform");
    if (platformID === 0) {
      statements.setDefaultUserPlatform.run(null, user.id);
      return interaction.followUp({
        content: `Removed ${user.tag}'s default platform.`,
      });
    }
    const platform = statements.getPlatform.get(platformID);
    if (!platform)
      return interaction.followUp({
        content: "Platform with that ID does not exist.",
      });
    if (!platforms.some((r) => r.platform_id === platformID))
      return interaction.followUp({
        content: `${user.tag} doesn't have that platform.`,
      });
    statements.setDefaultUserPlatform.run(platformID, user.id);
    interaction.followUp({
      content: `Set \`${platform.name}\` as ${user.tag}'s default platform.`,
    });
  },
};
