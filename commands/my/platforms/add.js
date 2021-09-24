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
    const platform = statements.getPlatform.get(platformID);
    if (!platform)
      return interaction.followUp({
        content: "Platform with that ID does not exist.",
      });
    if (platforms.some((r) => r.platform_id === platformID))
      return interaction.followUp({
        content: "You already added that platform.",
      });
    statements.insertUserPlatform.run(interaction.user.id, platformID);
    interaction.followUp({
      content: `Added \`${platform.name}\` to your platforms.`,
    });
  },
};
