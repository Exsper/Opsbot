const BeatmapObject = require("./BeatmapObject");


class getBeatmapData {
    async getBeatmapObject(osuApi, argObject) {
        try {
            const beatmaps = await osuApi.getBeatmaps(argObject);
            let beatmapObject = new BeatmapObject(beatmaps);
            return beatmapObject;
        }
        catch (ex) {
            // console.log(argObject);
            // console.log(ex);
            if (argObject) delete argObject.k; // 不显示token
            if (ex.message === "Not found") return "找不到谱面 " + JSON.stringify(argObject) + "\n";
            console.log("从Osu!api获取数据出错\n" + ex.message);
            return "从Osu!api获取数据出错\n";
        }
    }

    async getData(osuApi, argObjects) {
        /*
        let beatmapObjects = [];
        for (let i = 0, len = argObjects.length; i < len; i++) {
            let item = await this.getBeatmapObject(osuApi, command, argObjects[i]);
            beatmapObjects.push(item);
        }
        */
        let beatmapObject = await this.getBeatmapObject(osuApi, argObjects[0]);
        return beatmapObject.toString();
    }
}


module.exports = getBeatmapData;