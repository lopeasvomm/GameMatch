const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    transactions.getUser(interaction.user.id);
    const oss = statements.getUserOs.all(interaction.user.id);
    const osID = interaction.options.getInteger("id");
    const os = statements.getOs.get(platformID);
    if (!os)
      return interaction.followUp({
        content: "Operating system with that ID does not exist.",
      });
    if (!oss.some((r) => r.os_id === osID))
      return interaction.followUp({
        content: "You don't have that operating system.",
      });
    statements.deleteUserOs.run(interaction.user.id, osID);
    interaction.followUp({
      content: `Removed \`${os.name}\` from your operating systems.`,
    });
  },
};
