const BeatmapObject = require("./BeatmapObject");


class getBeatmapData {
    async getBeatmapObject(osuApi, argObject) {
        const beatmaps = await osuApi.getBeatmaps(argObject);
        if (beatmaps.code === "404") return "找不到谱面 " + JSON.stringify(argObject) + "\n";
        if (beatmaps.code === "error") return "获取谱面出错 " + JSON.stringify(argObject) + "\n";
        if (beatmaps.length <= 0) return "找不到谱面 " + JSON.stringify(argObject) + "\n";
        return new BeatmapObject(beatmaps[0]);
    }

    async output(osuApi, argObjects) {
        let beatmapObject = await this.getBeatmapObject(osuApi, argObjects[0]);
        return beatmapObject.toString();
    }
}


module.exports = getBeatmapData;