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
    const os = statements.getOs.get(osID);
    if (!os)
      return interaction.followUp({
        content: "Operating system with that ID does not exist.",
      });
    if (oss.some((r) => r.os_id === osID))
      return interaction.followUp({
        content: "You already added that operating system.",
      });
    statements.insertUserOs.run(interaction.user.id, osID);
    interaction.followUp({
      content: `Added \`${os.name}\` to your operating systems.`,
    });
  },
};
