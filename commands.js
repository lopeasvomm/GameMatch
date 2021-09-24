const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = [
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all commands."),
  new SlashCommandBuilder()
    .setName("list")
    .setDescription("Shows all available data.")
    .addSubcommand((command) =>
      command
        .setName("games")
        .setDescription("List all games.")
        .addIntegerOption((option) =>
          option
            .setName("platform")
            .setDescription("Platform ID.")
            .setRequired(false)
        )
        .addIntegerOption((option) =>
          option
            .setName("page")
            .setDescription("Page number.")
            .setRequired(false)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("platforms")
        .setDescription("List all platforms.")
        .addIntegerOption((option) =>
          option
            .setName("page")
            .setDescription("Page number.")
            .setRequired(false)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("os")
        .setDescription("List all operating systems.")
        .addIntegerOption((option) =>
          option
            .setName("page")
            .setDescription("Page number.")
            .setRequired(false)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("subgames")
        .setDescription("List all subgames for a game.")
        .addIntegerOption((option) =>
          option.setName("game").setDescription("Game ID.").setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("page")
            .setDescription("Page number.")
            .setRequired(false)
        )
    ),
  new SlashCommandBuilder()
    .setName("match")
    .setDescription("Match your games with other people.")
    .addStringOption((option) =>
      option
        .setName("users")
        .setDescription("Users you want to match with.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("platform")
        .setDescription("ID of the platform.")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("os")
        .setDescription("ID of the operating system.")
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("free")
        .setDescription("Match only free games.")
        .setRequired(false)
    ),
  new SlashCommandBuilder()
    .setName("my")
    .setDescription("Manage your account.")
    .addSubcommandGroup((group) =>
      group
        .setName("games")
        .setDescription("Manage your games.")
        .addSubcommand((command) =>
          command.setName("list").setDescription("List all your games.")
        )
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add a game.")
            .addStringOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "ID of the game you want to add. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove a game.")
            .addStringOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "ID of the game you want to remove. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("subgames")
        .setDescription("Manage your subgames.")
        .addSubcommand((command) =>
          command
            .setName("list")
            .setDescription("List all your subgames.")
            .addIntegerOption((option) =>
              option
                .setName("game")
                .setDescription("Game ID.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add a subgame.")
            .addStringOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "ID of the subgame you want to add. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove a subgame.")
            .addStringOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "ID of the subgame you want to remove. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("os")
        .setDescription("Manage your operating systems.")
        .addSubcommand((command) =>
          command
            .setName("list")
            .setDescription("List all your operating systems.")
        )
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add an operating system.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription("ID of the operating system you want to add.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove an operating system.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "ID of the operating system you want to remove."
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("default")
            .setDescription("Set an operating system as default.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "ID of the operating system you want to set as default. (0 to set to none)"
                )
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("platforms")
        .setDescription("Manage your platforms.")
        .addSubcommand((command) =>
          command.setName("list").setDescription("List all your platforms.")
        )
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add a platform.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription("ID of the platform you want to add.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove a platform.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription("ID of the platform you want to remove.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("default")
            .setDescription("Set a platform as default.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "ID of the platform you want to set as default. (0 to set to none)"
                )
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("steam")
        .setDescription("Manage your steam accounts.")
        .addSubcommand((command) =>
          command
            .setName("accounts")
            .setDescription("List your steam accounts.")
        )
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add a steam account.")
            .addStringOption((option) =>
              option
                .setName("url")
                .setDescription(
                  "URL of your steam account. (Example: https://steamcommunity.com/id/NAME)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove a steam account.")
            .addStringOption((option) =>
              option
                .setName("url")
                .setDescription(
                  "URL of your steam account. (Example: https://steamcommunity.com/id/NAME)"
                )
                .setRequired(true)
            )
        )
    ),
  new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Manage the bot.")
    .addSubcommandGroup((group) =>
      group
        .setName("user")
        .setDescription("Manage users.")
        .addSubcommand((command) =>
          command
            .setName("addgames")
            .setDescription("Add games to an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to add games to.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("games")
                .setDescription(
                  "Games you want to add to the user. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("removegames")
            .setDescription("Remove games from an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to remove games from.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("games")
                .setDescription(
                  "Games you want to remove from the user. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("addsubgames")
            .setDescription("Add subgames to an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to add subgames to.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("subgames")
                .setDescription(
                  "Subgames you want to add to the user. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("removesubgames")
            .setDescription("Remove subgames from an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to remove subgames from.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("subgames")
                .setDescription(
                  "Subgames you want to remove from the user. (You can separate ids with a comma.)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("addplatfrom")
            .setDescription("Add a platform to an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to add a platform to.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("platform")
                .setDescription("Platform you want to add to the user.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("removeplatfrom")
            .setDescription("Remove a platform from an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to remove a platform from.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("platform")
                .setDescription("Platform you want to remove from the user.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("defaultplatfrom")
            .setDescription("Set a default platform for an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to set a default platform to.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("platform")
                .setDescription("Platform you want to set as default.")
                .setRequired(true)
            )
        )

        .addSubcommand((command) =>
          command
            .setName("addos")
            .setDescription("Add an OS to an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to add an OS to.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("os")
                .setDescription("OS you want to add to the user.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("removeos")
            .setDescription("Remove an OS from an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to remove an OS from.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("os")
                .setDescription("OS you want to remove from the user.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("defaultos")
            .setDescription("Set a default OS for an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to set a default OS to.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("os")
                .setDescription("OS you want to set as default.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("addsteam")
            .setDescription("Add a steam account to an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to add a steam account to.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("url")
                .setDescription(
                  "URL of the steam account. (Example: https://steamcommunity.com/id/NAME)"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("removesteam")
            .setDescription("Remove a steam account from an user.")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("User you want to remove a steam account from.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("url")
                .setDescription(
                  "URL of the steam account. (Example: https://steamcommunity.com/id/NAME)"
                )
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("platforms")
        .setDescription("Manage platforms.")
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add a platform.")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("Name of the platform.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove a platform.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription("ID of the platform.")
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("os")
        .setDescription("Manage operating systems.")
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add an OS.")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("Name of the OS.")
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove an OS.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription("ID of the OS.")
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("games")
        .setDescription("Manage games.")
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add a game.")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("Name of the game.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("players")
                .setDescription(
                  "How many players can play at the same time? (0 for unlimited)"
                )
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("platform")
                .setDescription("Platform of the game.")
                .setRequired(false)
            )
            .addIntegerOption((option) =>
              option
                .setName("os")
                .setDescription("OS of the game.")
                .setRequired(false)
            )
            .addBooleanOption((option) =>
              option
                .setName("free")
                .setDescription("Is the game free?")
                .setRequired(false)
            )
            .addBooleanOption((option) =>
              option
                .setName("crossplatform")
                .setDescription("Is the game cross platform compatible?")
                .setRequired(false)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove a game.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription("ID of the game.")
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("subgames")
        .setDescription("Manage subgames.")
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Add a subgame.")
            .addIntegerOption((option) =>
              option
                .setName("game")
                .setDescription("ID of game.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("Name of the subgame.")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("players")
                .setDescription(
                  "How many players can play at the same time? (0 for unlimited)"
                )
                .setRequired(true)
            )
            .addBooleanOption((option) =>
              option
                .setName("free")
                .setDescription("Is the game free?")
                .setRequired(false)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Remove a subgame.")
            .addIntegerOption((option) =>
              option
                .setName("id")
                .setDescription("ID of the subgame.")
                .setRequired(true)
            )
        )
    ),
  new SlashCommandBuilder()
    .setName("cleardata")
    .setDescription("Clear all data connected to your account."),
];
