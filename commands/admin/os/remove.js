const { statements } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const id = interaction.options.getInteger("id");
    const os = statements.getOs.get(id);
    if (!os)
      return interaction.followUp({
        content: "OS with that ID doesn't exist.",
      });
    statements.deleteOs.run(id);
    interaction.followUp({
      content: `Operating system \`${os.name}\` removed.`,
    });
  },
};
