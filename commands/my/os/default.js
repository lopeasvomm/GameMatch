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
    if (osID === 0) {
      statements.setDefaultUserOs.run(null, interaction.user.id);
      return interaction.followUp({
        content: "Removed your default operating system.",
      });
    }
    const os = statements.getOs.get(osID);
    if (!os)
      return interaction.followUp({
        content: "Operating system with that ID does not exist.",
      });
    if (!oss.some((r) => r.os_id === osID))
      return interaction.followUp({
        content: "You don't have that operating system.",
      });
    statements.setDefaultUserOs.run(osID, interaction.user.id);
    interaction.followUp({
      content: `Set \`${os.name}\` as your default operating system.`,
    });
  },
};
