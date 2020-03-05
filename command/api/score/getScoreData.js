const ScoreObject = require("./ScoreObject");
const getBeatmapData = require("../beatmap/getBeatmapData");
const utils = require('../utils');


class getScoreData {
    async getScoreObjects(osuApi, argObject) {
        const scores = await osuApi.getScores(argObject);
        if (scores.code === "404") return "找不到成绩 " + JSON.stringify(argObject) + "\n";
        if (scores.code === "error") return "获取成绩出错 " + JSON.stringify(argObject) + "\n";
        if (scores.length <= 0) return "找不到成绩 " + JSON.stringify(argObject) + "\n";
        let scoreObjects = scores.map(item => { new ScoreObject(item); });
        return scoreObjects;
    }

    async output(osuApi, argObjects) {
        let scoreObjects = [];
        for (let i = 0, len = argObjects.length; i < len; i++) {
            let items = await this.getScoreObjects(osuApi, argObjects[i]);
            if (typeof items !== "string") scoreObjects.push(items);
        }
        if (scoreObjects.length <= 0) return "找不到成绩" + JSON.stringify(argObjects) + "\n";

        // 获取beatmapObject
        let beatmapArgObject = {};
        if (scoreObjects[0].beatmap_id) beatmapArgObject.b = beatmap_id;
        else if (argObjects.b) beatmapArgObject.b = argObjects.b;
        if (argObjects.m) beatmapArgObject.m = argObjects.m;
        if (argObjects.a) beatmapArgObject.a = argObjects.a;

        let output = "";
        // 获取acc
        if (beatmapArgObject.b) {
            const beatmapObject = new getBeatmapData().getBeatmapObject(osuApi, beatmapArgObject);
            for (let i = 0, len = scoreObjects.length; i < len; i++) {
                if (beatmapArgObject.m) scoreObjects[i].addMode(beatmapArgObject.m);
                scoreObjects[i].addAcc(beatmapObject);
            }
            if (scoreObjects[0].mode >= 0) output = output + beatmapObject.toScoreTitle(utils.getModeString(scoreObjects[0].mode));
            else output = output + beatmapObject.toScoreTitle();
        }

        for (let i = 0, len = scoreObjects.length; i < len; i++) {
            output = output + scoreObjects[i].toString();
        }
        return output;
    }

    async outputTop(osuApi, argObjects) {
        // limit = 1 即为最高pp
        argObjects[0].limit = 1;
        let scoreObjects = await this.getScoreObject(osuApi, argObjects[0]);
        if (typeof scoreObjects === "string") return scoreObjects; // 报错消息
        let scoreObject = scoreObjects[0];
        // 获取beatmapObject
        let beatmapArgObject = {};
        if (scoreObject.beatmap_id) beatmapArgObject.b = beatmap_id;
        else if (argObjects.b) beatmapArgObject.b = argObjects.b;
        if (argObjects.m) beatmapArgObject.m = argObjects.m;
        if (argObjects.a) beatmapArgObject.a = argObjects.a;

        let output = "";
        // 获取acc
        if (beatmapArgObject.b) {
            const beatmapObject = new getBeatmapData().getBeatmapObject(osuApi, beatmapArgObject);
            if (beatmapArgObject.m) scoreObject.addMode(beatmapArgObject.m);
            scoreObject.addAcc(beatmapObject);
            if (scoreObject.mode >= 0) output = output + beatmapObject.toScoreTitle(utils.getModeString(scoreObject.mode));
            else output = output + beatmapObject.toScoreTitle();
        }

        output = output + scoreObject.toString();
        return output;
    }

    // 按pp排列的排行，比较top分数毫无意义
    /*
    async getVsTopData(osuApi, argObjects) {
        let yourArgObjects = argObjects[0];
        let yourScoreObject = await this.getScoreObject(osuApi, yourArgObjects);
        if (typeof yourScoreObject === "string") return yourScoreObject; // 报错消息
        let yourName = yourScoreObject.getUserName();
        let yourScore = yourScoreObject.getScore();
        let yourRecord = yourScoreObject.toString(false, yourArgObjects);

        let topArgObjects = argObjects[0];
        topArgObjects.limit = 1;
        delete topArgObjects.u;
        let topScoreObject = await this.getScoreObject(osuApi, topArgObjects);
        if (typeof topScoreObject === "string") return topScoreObject; // 报错消息
        let topName = topScoreObject.getUserName();
        let topScore = topScoreObject.getScore();
        let topRecord = topScoreObject.toString(true, topArgObjects);

        let deltaScore = topScore - yourScore;

        let output = topRecord;
        if (deltaScore > 0) {
            output = output + yourRecord;
            output = output + yourName + " 与#1相差 " + deltaScore + " 分\n"
        }
        else {
            if (yourName === topName) output = output + yourName + " 已经是#1了\n"
            else output = output + yourRecord + yourName + " 与#1的分数相同\n"
        }
        return output;
    }
    */

}


module.exports = getScoreData;