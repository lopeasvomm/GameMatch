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
    const platform = statements.getPlatform.get(platformID);
    if (!platform)
      return interaction.followUp({
        content: "Platform with that ID does not exist.",
      });
    if (platforms.some((r) => r.platform_id === platformID))
      return interaction.followUp({
        content: `${user.tag} already added that platform.`,
      });
    statements.insertUserPlatform.run(user.id, platformID);
    interaction.followUp({
      content: `Added \`${platform.name}\` to ${user.tag}'s platforms.`,
    });
  },
};
