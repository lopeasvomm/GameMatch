const { statements } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const id = interaction.options.getInteger("id");
    const platform = statements.getPlatform.get(id);
    if (!platform)
      return interaction.followUp({
        content: "Platform with that ID doesn't exist.",
      });
    statements.deletePlatform.run(id);
    interaction.followUp({
      content: `Platform \`${platform.name}\` removed.`,
    });
  },
};
