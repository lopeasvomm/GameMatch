const { db } = require("./db");

const queries = {
  os: "INSERT INTO os (name) VALUES (?);",
  platforms: "INSERT INTO platforms (name) VALUES (?);",
  games:
    "INSERT INTO games (name, platform, os, players, free, crossplatform) VALUES (?, ?, ?, ?, ?, ?);",
};

const seeds = {
  os: [["Windows"], ["Xbox"]],
  platforms: [
    ["Blizzard"], // 1
    ["Browser"], // 2
    ["Epic Games"], // 3
    ["Steam"], // 4
    ["PC Minecraft"], // 5
    ["PS4"], // 6
    ["Riot Games"], // 7
    ["Roblox"], // 8
    ["Xbox X"], // 9
    ["Other"], // 10
  ],
  games: [
    ["Overwatch", 1, null, 4, 0, 1],
    ["Warzone", 1, null, 4, 1, 1],
    ["World of Warcrafft", 1, null, 0, 0, 0],

    ["Diep.io", 2, null, 5, 1, 0],
    ["krunker.io", 2, null, 20, 1, 0],
    ["narwhal.io", 2, null, 20, 1, 0],
    ["slither.io", 2, null, 100, 1, 0],
    ["surviv.io", 2, null, 200, 1, 0],
    ["TypeRacer", 2, null, 10, 1, 0],

    ["Fortnite", 3, null, 4, 1, 1],
    ["Predator Hunting Grounds", 3, null, 5, 0, 1],
    ["Satisfactory", 3, null, 4, 0, 1],
    ["World War Z", 3, null, 4, 0, 1],

    ["Minecraft Java", 5, null, 0, 0, 1],
    ["Minecraft Bedrock Windows", 5, 1, 0, 0, 1],
    ["Vivecraft", 5, null, 0, 0, 1],

    ["Minecraft Bedrock", 6, null, 0, 0, 1],
    ["Dying Light", 6, null, 4, 0, 1],

    ["League Of Legends", 7, null, 5, 1, 0],
    ["Valorant", 7, null, 5, 1, 0],
  ],
};

const names = process.argv[2]?.split(",");
if (!names || !names.length) {
  return console.log(`Available seeds: ${Array.from(Object.keys(queries))}`);
}
for (const name of names) {
  if (queries[name]) {
    const statement = db.prepare(queries[name]);
    db.transaction(() => {
      for (let seed of seeds[name]) {
        console.log(`Seeding ${name}: ${seed}`);
        statement.run(seed);
      }
    })();
    console.log(`Finished seeding ${seeds[name].length} items.`);
  }
}
