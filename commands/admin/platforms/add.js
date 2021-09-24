const { statements } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const name = interaction.options.getString("name");
    const platform = statements.insertPlatform.get(name);
    interaction.followUp({
      content: `Platform \`${platform.name}\` added with ID \`${platform.id}\``,
    });
  },
};
