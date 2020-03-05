"use strict";

const UserInfo = require("./user/UserInfo");
const CommandObject = require("./command/CommandObject");
const OsuApi = require("./command/api/ApiRequest");

// Koishi插件名
module.exports.name = "Opsbot";

// 插件处理和输出
module.exports.apply = (ctx) => {
	const osuApi = new OsuApi();
	// nedb保存userName
	// 你说要保存stat记录？咕咕咕
	const nedb = require('./database/nedb')(__dirname + '/database/data/save.db');


	ctx.middleware(async (meta, next) => {
		try {
			let userInfo = new UserInfo(meta);
			let userOsuInfo = await userInfo.getUserOsuInfo(meta.userId, nedb);
			let commandObject = new CommandObject(osuApi, meta, meta.message);
			let reply = await commandObject.execute(userOsuInfo, nedb);
			if (reply !== "") return meta.$send(reply);
			return next();
		} catch (ex) {
			console.log(ex);
			return next();
		}
	});
};
