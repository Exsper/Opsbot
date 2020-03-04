const CommandsInfo = require("./CommandsInfo");
const getBeatmapData = require("./api/beatmap/getBeatmapData");
const getScoreData = require("./api/score/getScoreData");
const getUserData = require("./api/user/getUserData");
const getBestScoresData = require("./api/best/getBestScoresData");
const getRecentScoresData = require("./api/recent/getRecentScoresData");

class RunApiCommand {
    async run(osuApi, command, argObjects) {
        // 下达任务
        const commandsInfo = new CommandsInfo();
        if (command.commandType === commandsInfo.apiType.beatmap)
            return await new getBeatmapData().getData(osuApi, argObjects);
        else if (command.commandType === commandsInfo.apiType.user)
            return await new getUserData().getData(osuApi, argObjects);
        else if ((command.commandType === commandsInfo.apiType.score) || (command.commandType === commandsInfo.apiType.scoreVs))
            return await new getScoreData().getData(osuApi, argObjects);
        else if (command.commandType === commandsInfo.apiType.scoreTop)
            return await new getScoreData().getTopData(osuApi, argObjects);
        else if (command.commandType === commandsInfo.apiType.scoreVsTop)
            return await new getScoreData().getVsTopData(osuApi, argObjects);
        else if (command.commandType === commandsInfo.apiType.bestList)
            return await new getBestScoresData().getData(osuApi, argObjects);
        else if (command.commandType === commandsInfo.apiType.best)
            return await new getBestScoresData().getOneData(osuApi, argObjects);
        else if (command.commandType === commandsInfo.apiType.recent)
            return await new getRecentScoresData().getData(osuApi, argObjects);
        else if (command.commandType === commandsInfo.apiType.recentPassed)
            return await new getRecentScoresData().getPassedData(osuApi, argObjects);
        else return ""; // 未知指令
    }
}

module.exports = RunApiCommand;