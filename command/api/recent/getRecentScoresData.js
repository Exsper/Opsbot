const RecentScoresObject = require("./RecentScoresObject");


class getRecentScoresData {
    async getRecentScoreObject(osuApi, argObject) {
        try {
            // recent太多可能会卡顿，但由于recent可能不是最高分数，用getScore也不行
            // 所以只好放弃limit，只取最近一次的成绩
            const recentScores = await osuApi.getUserRecent(argObject);
            let recentScoresObject = new RecentScoresObject(recentScores[0]);
            return recentScoresObject;
        }
        catch (ex) {
            if (argObject) delete argObject.k; // 不显示token
            if (ex.message === "Not found") return "找不到成绩 " + JSON.stringify(argObject) + "\n";
            console.log("从Osu!api获取数据出错\n" + ex.message);
            return "从Osu!api获取数据出错\n";
        }
    }

    async getData(osuApi, argObjects) {
        argObjects[0].limit = 1;
        let recentScoreObject = await this.getRecentScoreObject(osuApi, argObjects[0]);
        return recentScoreObject.toString(true, argObjects);
    }


    async getRecentPassedScoreObject(osuApi, argObject) {
        try {
            const recentScores = await osuApi.getUserRecent(argObject);
            for (let i = 0, len = recentScores.length; i < len; i++) {
                if (recentScores[i].rank !== "F") {
                    let recentScoresObject = new RecentScoresObject(recentScores[i]);
                    return recentScoresObject;
                }
            }
            throw "Not found";
        }
        catch (ex) {
            if (argObject) delete argObject.k; // 不显示token
            if (ex.message === "Not found") return "找不到成绩 " + JSON.stringify(argObject) + "\n";
            console.log("从Osu!api获取数据出错\n" + ex.message);
            return "从Osu!api获取数据出错\n";
        }
    }

    async getPassedData(osuApi, argObjects) {
        argObjects[0].limit = 10;   // 只从最近10个里找，减少工作量
        let recentScoreObject = await this.getRecentPassedScoreObject(osuApi, argObjects[0]);
        return recentScoreObject.toString(true, argObjects);
    }



}


module.exports = getRecentScoresData;