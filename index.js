"use strict";

const UserInfo = require("./user/UserInfo");
const CommandObject = require("./command/CommandObject");

// Koishi插件名
module.exports.name = "Opsbot";

// 插件处理和输出
module.exports.apply = (ctx, config = {}) => {
	const osuToken = config.osuToken || ""; // 这个一定要设置，否则会出错
	const ppysbToken = config.ppysbToken || "";
	const osuBaseUrl = config.osuBaseUrl || "https://osu.ppy.sh/api";
	const ppysbBaseUrl = config.baseUrl || 'https://osu.ppy.sb/api';

	// osuAPI
	// https://github.com/Exsper/node-osu
	const osu = require('node-osu-exsper');
	const osuApi = new osu.Api(ppysbToken, osuToken, {
		baseUrl: ppysbBaseUrl,
		beatmapBaseUrl: osuBaseUrl,
		notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
		completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
		parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
	});

	// nedb保存userName
	// 你说要保存stat记录？咕咕咕
	const nedb = require('./database/nedb')(__dirname + '/database/data/save.db');


	ctx.middleware(async (meta, next) => {
		try {
			let userInfo = new UserInfo(meta);
			let userOsuInfo = await userInfo.getUserOsuInfo(meta.userId, nedb);
			let commandObject = new CommandObject(meta, meta.message);
			let reply = await commandObject.execute(osuApi, userOsuInfo, nedb);
			if (reply !== "") return meta.$send(reply);
			return next();
		} catch (ex) {
			console.log(ex);
			return next();
		}
	});
};
