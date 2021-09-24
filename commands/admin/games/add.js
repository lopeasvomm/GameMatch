const { statements } = require("../../../db");

module.exports = {
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const name = interaction.options.getString("name");
    const platformID = interaction.options.getInteger("platform", false);
    const platform = statements.getPlatform.get(platformID);
    if (platformID && !platform)
      return interaction.followUp({
        content: "Invalid platform.",
      });
    const osID = interaction.options.getInteger("os", false);
    const os = statements.getOs.get(osID);
    if (osID && !os)
      return interaction.followUp({
        content: "Invalid OS.",
      });
    const players = interaction.options.getInteger("players");
    const free = interaction.options.getBoolean("free", false) || false;
    const crossplatform =
      interaction.options.getBoolean("crossplatform", false) || false;
    const game = statements.insertGame.get(
      name,
      platformID || null,
      osID || null,
      players,
      free ? 1 : 0,
      crossplatform ? 1 : 0
    );
    interaction.followUp({
      content: `Game \`${game.name}\` added with ID \`${game.id}\`.`,
    });
  },
};
