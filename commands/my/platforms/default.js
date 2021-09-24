const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const platforms = statements.getUserPlatforms.all(interaction.user.id);
    const platformID = interaction.options.getInteger("id");
    if (platformID === 0) {
      statements.setDefaultUserPlatform.run(null, interaction.user.id);
      return interaction.followUp({
        content: "Removed your default platform.",
      });
    }
    const platform = statements.getPlatform.get(platformID);
    if (!platform)
      return interaction.followUp({
        content: "Platform with that ID does not exist.",
      });
    if (!platforms.some((r) => r.platform_id === platformID))
      return interaction.followUp({
        content: "You don't have that platform.",
      });
    statements.setDefaultUserPlatform.run(platformID, interaction.user.id);
    interaction.followUp({
      content: `Set \`${platform.name}\` as your default platform.`,
    });
  },
};
