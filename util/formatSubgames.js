module.exports = (games) => {
  const formatted = [];
  for (const game of games) {
    const tags = [];
    tags.push(`{${game.id}}`);
    tags.push(`{${game.name}}`);
    if (game.players) tags.push(`{${game.players} Players}`);
    else tags.push(`{Unlimited players}`);
    if (game.free) tags.push(`{Free}`);
    formatted.push(tags.join(" "));
  }
  return formatted;
};
