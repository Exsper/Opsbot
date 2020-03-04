const BestScoresObject = require("./BestScoresObject");


class getBestScoresData {
    async getBestScoresObject(osuApi, argObject) {
        try {
            const bestScores = await osuApi.getUserBest(argObject);
            let bestScoresObject = new BestScoresObject(bestScores);
            return bestScoresObject;
        }
        catch (ex) {
            if (argObject) delete argObject.k; // 不显示token
            if (ex.message === "Not found") return "找不到成绩 " + JSON.stringify(argObject) + "\n";
            console.log("从Osu!api获取数据出错\n" + ex.message);
            return "从Osu!api获取数据出错\n";
        }
    }

    async getData(osuApi, argObjects) {
        if (argObjects[0].limit === undefined) argObjects[0].limit = 5; // 设置为bp5，以减轻获取工作
        let bestScoresObject = await this.getBestScoresObject(osuApi, argObjects[0]);
        return bestScoresObject.toString(true, argObjects);
    }


    async getOneBestScoreObject(osuApi, argObject) {
        try {
            // 避免每个bp都要获取beatmap，所以不采用osuApi.getUserBest
            const bestScores = await osuApi.apiCall('/get_user_best', argObject);
            const bestScore = bestScores.pop();
            let scoreArgObject = argObject;
            scoreArgObject.b = bestScore.beatmap_id;
            scoreArgObject.mods = bestScore.enabled_mods;
            delete scoreArgObject.limit;
            const bestScoreWithBeatmap = await osuApi.getScores(scoreArgObject);
            let bestScoresObject = new BestScoresObject(bestScoreWithBeatmap);
            return bestScoresObject;
        }
        catch (ex) {
            if (argObject) delete argObject.k; // 不显示token
            if (ex.message === "Not found") return "找不到成绩 " + JSON.stringify(argObject) + "\n";
            console.log("从Osu!api获取数据出错\n" + ex.message);
            return "从Osu!api获取数据出错\n";
        }
    }

    async getOneData(osuApi, argObjects) {
        let bestScoreObject = await this.getOneBestScoreObject(osuApi, argObjects[0]);
        return bestScoreObject.toString(true, argObjects);
    }


}


module.exports = getBestScoresData;