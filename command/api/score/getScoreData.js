const ScoreObject = require("./ScoreObject");


class getScoreData {
    async getScoreObject(osuApi, argObject) {
        try {
            const scores = await osuApi.getScores(argObject);
            let scoreObject = new ScoreObject(scores);
            return scoreObject;
        }
        catch (ex) {
            if (argObject) delete argObject.k; // 不显示token
            if (ex.message === "Not found") return "找不到成绩 " + JSON.stringify(argObject) + "\n";
            console.log("从Osu!api获取数据出错\n" + ex.message);
            return "从Osu!api获取数据出错\n";
        }
    }

    async getData(osuApi, argObjects) {
        let scoreObjects = [];
        for (let i = 0, len = argObjects.length; i < len; i++) {
            let item = await this.getScoreObject(osuApi, argObjects[i]);
            scoreObjects.push(item);
        }
        let output = "";
        output = output + scoreObjects[0].toString(true, argObjects[0]);
        for (let i = 1, len = scoreObjects.length; i < len; i++) {
            if (typeof scoreObjects[i] === "string") output = output + scoreObjects[i]; // 报错消息
            else output = output + scoreObjects[i].toString(false, argObjects[i]);
        }
        return output;
    }

    async getTopData(osuApi, argObjects) {
        // limit = 1 即为最高分
        argObjects[0].limit = 1;
        let scoreObject = await this.getScoreObject(osuApi, argObjects[0]);
        if (typeof scoreObject === "string") return scoreObject; // 报错消息
        return scoreObject.toString(true, argObjects[0]);
    }

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

}


module.exports = getScoreData;