const Database = require("better-sqlite3");

const db = new Database("./db.sqlite3");

const prepare = db.transaction(() => {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        default_os INTEGER,
        default_platform INTEGER
    );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS platforms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT COLLATE NOCASE
    );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS os (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT COLLATE NOCASE
    );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT COLLATE NOCASE,
      platform INTEGER,
      os INTEGER,
      players INTEGER,
      free BOOLEAN,
      crossplatform BOOLEAN
    );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS users_games (
      user_id TEXT,
      game_id INTEGER
  );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS users_platforms (
      user_id TEXT,
      platform_id INTEGER
    );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS users_os (
      user_id TEXT,
      os_id INTEGER
    );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS steam_accounts (
      user_id TEXT,
      steamid TEXT
  );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS subgames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    name TEXT,
    players INTEGER,
    free BOOLEAN
  );`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS users_subgames (
    user_id TEXT,
    game_id INTEGER,
    subgame_id INTEGER
  );`
  ).run();
});
prepare();

const statements = {
  getUsers: db.prepare(`SELECT * FROM users;`),
  getUser: db.prepare(`SELECT * FROM users WHERE id = ?;`),
  insertUser: db.prepare(`INSERT INTO users (id) VALUES (?) RETURNING *;`),
  getPlatforms: db.prepare(`SELECT * FROM platforms;`),
  getPlatform: db.prepare(`SELECT * FROM platforms WHERE id = ?;`),
  insertPlatform: db.prepare(
    `INSERT INTO platforms (name) VALUES (?) RETURNING *;`
  ),
  deletePlatform: db.prepare(`DELETE FROM platforms WHERE id = ?;`),
  getUserPlatforms: db.prepare(
    `SELECT * FROM users_platforms
    JOIN platforms ON platforms.id = users_platforms.platform_id
    WHERE users_platforms.user_id = ?
    ORDER BY users_platforms.platform_id ASC;`
  ),
  insertUserPlatform: db.prepare(
    `INSERT INTO users_platforms (user_id, platform_id) VALUES (?, ?);`
  ),
  deleteUserPlatform: db.prepare(
    `DELETE FROM users_platforms WHERE user_id = ? AND platform_id = ?;`
  ),
  setDefaultUserPlatform: db.prepare(
    `UPDATE users SET default_platform = ? WHERE id = ?;`
  ),
  getUserOs: db.prepare(
    `SELECT * FROM users_os
    JOIN os ON os.id = users_os.os_id
    WHERE users_os.user_id = ?
    ORDER BY users_os.os_id ASC;`
  ),
  insertUserOs: db.prepare(
    `INSERT INTO users_os (user_id, os_id) VALUES (?, ?);`
  ),
  deleteUserOs: db.prepare(
    `DELETE FROM users_os WHERE user_id = ? AND os_id = ?;`
  ),
  setDefaultUserOs: db.prepare(`UPDATE users SET default_os = ? WHERE id = ?;`),
  getOss: db.prepare(`SELECT * FROM os;`),
  getOs: db.prepare(`SELECT * FROM os WHERE id = ?;`),
  insertOs: db.prepare(`INSERT INTO os (name) VALUES (?) RETURNING *;`),
  deleteOs: db.prepare(`DELETE FROM os WHERE id = ?;`),
  getGames: db.prepare(`SELECT * FROM games;`),
  getGameById: db.prepare(`SELECT * FROM games WHERE id = ?;`),
  getGamesByIds: db.prepare(
    `SELECT * FROM games
    WHERE ',' || ? || ',' LIKE '%,' || id || ',%';`
  ),
  insertGame: db.prepare(
    `INSERT INTO games (name, platform, os, players, free, crossplatform) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;`
  ),
  deleteGame: db.prepare(`DELETE FROM games WHERE id = ?;`),
  getUserGames: db.prepare(
    `SELECT * FROM users_games
    JOIN games ON games.id = users_games.game_id
    WHERE users_games.user_id = ?
    ORDER BY users_games.game_id ASC;`
  ),
  insertUserGame: db.prepare(
    `INSERT INTO users_games (user_id, game_id) VALUES (?, ?);`
  ),
  deleteUserGame: db.prepare(
    `DELETE FROM users_games WHERE user_id = ? AND game_id = ?;`
  ),
  deleteUserGamesByGame: db.prepare(
    `DELETE FROM users_games WHERE game_id = ?;`
  ),
  getUserSteamAccounts: db.prepare(
    `SELECT * FROM steam_accounts WHERE user_id = ?;`
  ),
  insertSteamAccount: db.prepare(
    `INSERT INTO steam_accounts (user_id, steamid) VALUES (?, ?);`
  ),
  deleteSteamAccount: db.prepare(
    `DELETE FROM steam_accounts WHERE user_id = ? AND steamid = ?;`
  ),
  getSubgames: db.prepare(`SELECT * FROM subgames WHERE game_id = ?;`),
  getSubgame: db.prepare(`SELECT * FROM subgames WHERE id = ?;`),
  getSubgamesByIds: db.prepare(
    `SELECT * FROM subgames
    WHERE ',' || ? || ',' LIKE '%,' || id || ',%';`
  ),
  getUserSubgames: db.prepare(
    `SELECT * FROM users_subgames
    JOIN subgames ON subgames.id = users_subgames.subgame_id
    WHERE users_subgames.user_id = ? AND users_subgames.game_id = ?
    ORDER BY users_subgames.subgame_id ASC;`
  ),
  getAllUserSubgames: db.prepare(
    `SELECT * FROM users_subgames
    JOIN subgames ON subgames.id = users_subgames.subgame_id
    WHERE users_subgames.user_id = ?
    ORDER BY users_subgames.subgame_id ASC;`
  ),
  insertUserSubgame: db.prepare(
    `INSERT INTO users_subgames (user_id, game_id, subgame_id) VALUES (?, ?, ?);`
  ),
  insertSubgame: db.prepare(
    `INSERT INTO subgames (game_id, name, players, free) VALUES (?, ?, ?, ?) RETURNING *;`
  ),
  deleteSubgame: db.prepare(`DELETE FROM subgames WHERE id = ?;`),
  deleteAllSubgames: db.prepare(`DELETE FROM subgames WHERE game_id = ?;`),
  deleteUserSubgame: db.prepare(
    `DELETE FROM users_subgames WHERE user_id = ? AND subgame_id = ?;`
  ),
  deleteUserSubgamesBySubgame: db.prepare(
    `DELETE FROM users_subgames WHERE subgame_id = ?;`
  ),
  deleteUserSubgamesByGame: db.prepare(
    `DELETE FROM users_subgames WHERE game_id = ?;`
  ),
};

const transactions = {
  getUser: db.transaction((id) => {
    const existing = statements.getUser.get(id);
    if (existing) return existing;
    else return statements.insertUser.get(id);
  }),
  mapGamesToPlatforms: db.transaction((games) => {
    const platforms = {};
    for (const game of games) {
      const platform = statements.getPlatform.get(game.platform);
      const name = platform?.name || "No platform";
      if (!platforms[name]) platforms[name] = [];
      platforms[name].push(game);
    }
    return platforms;
  }),
  clearUserData: db.transaction((userID) => {
    db.prepare(`DELETE FROM users WHERE id = ?;`).run(userID);
    db.prepare(`DELETE FROM users_platforms WHERE user_id = ?;`).run(userID);
    db.prepare(`DELETE FROM users_os WHERE user_id = ?;`).run(userID);
    db.prepare(`DELETE FROM users_games WHERE user_id = ?;`).run(userID);
    db.prepare(`DELETE FROM users_subgames WHERE user_id = ?;`).run(userID);
    db.prepare(`DELETE FROM steam_accounts WHERE user_id = ?;`).run(userID);
  }),
};
module.exports = { db, statements, transactions };
