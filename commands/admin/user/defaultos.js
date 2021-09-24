const { statements, transactions } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const user = interaction.options.getUser("user");
    transactions.getUser(user.id);
    const oss = statements.getUserOs.all(user.id);
    const osID = interaction.options.getInteger("os");
    if (osID === 0) {
      statements.setDefaultUserOs.run(null, user.id);
      return interaction.followUp({
        content: `Removed ${user.tag}'s default operating system.`,
      });
    }
    const os = statements.getOs.get(osID);
    if (!os)
      return interaction.followUp({
        content: "Operating system with that ID does not exist.",
      });
    if (!oss.some((r) => r.os_id === osID))
      return interaction.followUp({
        content: `${user.tag} doesn't have that operating system.`,
      });
    statements.setDefaultUserOs.run(osID, user.id);
    interaction.followUp({
      content: `Set \`${os.name}\` as ${user.tag}'s default operating system.`,
    });
  },
};
