const { Collection } = require("discord.js");

const commands = new Collection()
  .set("add", require("./add"))
  .set("remove", require("./remove"));

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const command = interaction.options.getSubcommand(true);
    if (commands.has(command)) {
      commands.get(command).run(client, interaction);
    } else interaction.followUp({ content: "Unknown subcommand!" });
  },
};
