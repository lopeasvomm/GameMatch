const { MessageEmbed } = require("discord.js");
const commands = require("../commands.js");
const config = require("../config.json");

// const help = [];

// for (const command of commands) {
//   const cmdData = command.toJSON();
//   if (!cmdData.options.some((r) => r.type === 2 || r.type === 1))
//     help.push(`/${cmdData.name} - ${cmdData.description}`);
//   for (const cmdOption of cmdData.options) {
//     if (cmdOption.type === 2) {
//       for (const subcommand of cmdOption.options) {
//         help.push(
//           `/${cmdData.name} ${cmdOption.name} ${subcommand.name} - ${subcommand.description}`
//         );
//       }
//     } else if (cmdOption.type === 1) {
//       help.push(
//         `/${cmdData.name} ${cmdOption.name} - ${cmdOption.description}`
//       );
//     }
//   }
// }

const basic = `
/help - Shows all commands.
/list games - List all games.
/list platforms - List all platforms.
/list os - List all operating systems.
/list subgames - List all subgames for a game.
/my games list - List all your games.
/my games add - Add a game.
/my games remove - Remove a game.
/my subgames list - List all your subgames.
/my subgames add - Add a subgame.
/my subgames remove - Remove a subgame.
/my os list - List all your operating systems.
/my os add - Add an operating system.
/my os remove - Remove an operating system.
/my os default - Set an operating system as default.
/my platforms list - List all your platforms.
/my platforms add - Add a platform.
/my platforms remove - Remove a platform.
/my platforms default - Set a platform as default.
/my steam accounts - List your steam accounts.
/my steam add - Add a steam account.
/my steam remove - Remove a steam account.`;

const advance = `
/match - Match your games with other people.
/cleardata - Clear all data connected to your account.`;

const admin = `
/admin user addgames - Add games to an user.
/admin user removegames - Remove games from an user.
/admin user addsubgames - Add subgames to an user.
/admin user removesubgames - Remove subgames from an user.
/admin user addplatfrom - Add a platform to an user.
/admin user removeplatfrom - Remove a platform from an user.
/admin user defaultplatfrom - Set a default platform for an user.
/admin user addos - Add an OS to an user.
/admin user removeos - Remove an OS from an user.
/admin user defaultos - Set a default OS for an user.
/admin user addsteam - Add a steam account to an user.
/admin user removesteam - Remove a steam account from an user.
/admin platforms add - Add a platform.
/admin platforms remove - Remove a platform.
/admin os add - Add an OS.
/admin os remove - Remove an OS.
/admin games add - Add a game.
/admin games remove - Remove a game.
/admin subgames add - Add a subgame.
/admin subgames remove - Remove a subgame.`;

module.exports = {
  name: "help",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const isAdmin = config.admins.some(roleID => interaction.member.roles.cache.has(roleID));

    const embed = new MessageEmbed()
      .addField("Basic Commands", basic)
      .addField("Advance Commands", advance)
      .setColor("RANDOM")
      .setTimestamp();
    if (isAdmin) embed.addField("Admin Commands", admin);
    interaction.followUp({
      embeds: [embed],
    });
  },
};
