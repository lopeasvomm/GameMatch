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
    const os = statements.getOs.get(platformID);
    if (!os)
      return interaction.followUp({
        content: "Operating system with that ID does not exist.",
      });
    if (!oss.some((r) => r.os_id === osID))
      return interaction.followUp({
        content: `${user.tag} doesn't have that operating system.`,
      });
    statements.deleteUserOs.run(user.id, osID);
    interaction.followUp({
      content: `Removed \`${os.name}\` from ${user.tag}'s operating systems.`,
    });
  },
};
