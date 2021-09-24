const { Collection } = require("discord.js");

const commands = new Collection()
  .set("addgames", require("./addgames"))
  .set("removegames", require("./removegames"))
  .set("addos", require("./addos"))
  .set("removeos", require("./removeos"))
  .set("defaultos", require("./defaultos"))
  .set("addplatform", require("./addplatform"))
  .set("removeplatform", require("./removeplatform"))
  .set("defaultplatform", require("./defaultplatform"))
  .set("addsteam", require("./addsteam"))
  .set("removesteam", require("./removesteam"))
  .set("addsubgames", require("./addsubgames"))
  .set("removesubgames", require("./removesubgames"));

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
