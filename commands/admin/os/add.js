const { statements } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const name = interaction.options.getString("name");
    const os = statements.insertOs.get(name);
    interaction.followUp({
      content: `Operating system \`${os.name}\` added with ID \`${os.id}\``,
    });
  },
};
