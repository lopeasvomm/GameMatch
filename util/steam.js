const fetch = require("node-fetch");
const Xml2Js = require("xml2js");
const fs = require("fs");
const regex = {
  profile: /(https?:\/\/)?steamcommunity\.com\/profiles\/([a-zA-Z0-9]+)/,
  id: /(https?:\/\/)?steamcommunity\.com\/id\/([a-zA-Z0-9]+)/,
};

async function resolveSteamID(url = "") {
  const profileMatch = url.match(regex.profile);
  if (profileMatch) {
    return profileMatch[2];
  }
  const idMatch = url.match(regex.id);
  if (idMatch) {
    try {
      const res = await fetch(
        `https://steamcommunity.com/id/${idMatch[2]}?xml=1`
      ).then((r) => r.text());
      const xml = await Xml2Js.parseStringPromise(res);
      return xml.profile.steamID64[0];
    } catch {
      return null;
    }
  }
  return null;
}

async function getSteamInfo(id) {
  try {
    const res = await fetch(
      `https://steamcommunity.com/profiles/${id}?xml=1`
    ).then((r) => r.text());
    const xml = await Xml2Js.parseStringPromise(res);
    return {
      realName: xml.profile.realname[0],
      avatar: xml.profile.avatarFull[0],
      customURL: xml.profile.customURL[0],
      steamID64: xml.profile.steamID64[0],
      steamID: xml.profile.steamID[0],
    };
  } catch {
    return null;
  }
}
async function getSteamGames(id) {
  try {
    const res = await fetch(
      `https://steamcommunity.com/profiles/${id}/games/?tab=all&xml=1`
    ).then((r) => r.text());
    const xml = await Xml2Js.parseStringPromise(res);
    return xml.gamesList.games[0].game.map((game) => ({
      appID: game.appID[0],
      name: game.name[0],
      storeLink: game.storeLink[0],
    }));
  } catch (e) {
    return [];
  }
}

function formatSteamAccount(account) {
  return `[${
    account.realName || account.steamID
  }](<https://steamcommunity.com/profiles/${account.steamID64}>)`;
}
module.exports = {
  resolveSteamID,
  getSteamInfo,
  getSteamGames,
  formatSteamAccount,
};
