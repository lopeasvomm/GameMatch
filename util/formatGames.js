const { statements } = require("../db");

module.exports = (games) => {
  const formatted = [];
  // const platforms = statements.getPlatforms.all();
  const oss = statements.getOss.all();
  for (const game of games) {
    const tags = [];
    tags.push(`{${game.id}}`);
    tags.push(`{${game.name}}`);
    if (game.players) tags.push(`{${game.players} Players}`);
    else tags.push(`{Unlimited players}`);
    if (game.free) tags.push(`{Free}`);
    if (game.crossplatform) tags.push(`{Crossplatform}`);
    // if (game.platform)
    //   tags.push(`{${platforms.find((r) => r.id === game.platform).name}}`);
    if (game.os) tags.push(`{${oss.find((r) => r.id === game.os).name}}`);
    formatted.push(tags.join(" "));
  }
  return formatted;
};
