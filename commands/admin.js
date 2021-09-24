const { Collection } = require("discord.js");
const config = require("../config.json");

const groups = new Collection()
  .set("user", require("./admin/user/"))
  .set("platforms", require("./admin/platforms/"))
  .set("os", require("./admin/os/"))
  .set("games", require("./admin/games/"))
  .set("subgames", require("./admin/subgames/"));

module.exports = {
  name: "admin",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const group = interaction.options.getSubcommandGroup(true);
    if (group === "games" || group === "subgames") {
      if (
        !config.trustes.some(roleID => interaction.member.roles.cache.has(roleID)) &&
        !config.admins.some(roleID => interaction.member.roles.cache.has(roleID))) {
        return interaction.followUp({
          content: "You don't have access to this command.",
        });
      }
    } else if (!config.admins.some(roleID => interaction.member.roles.cache.has(roleID))) {
      return interaction.followUp({
        content: "You don't have access to this command.",
      });
    }
    if (groups.has(group)) {
      groups.get(group).run(client, interaction);
    } else interaction.followUp({ content: "Unknown command group!" });
  },
};
