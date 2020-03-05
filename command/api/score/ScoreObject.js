const commonFunctions = require('../commonFunctions');


class ScoreObject {
    constructor(scores) {
        this.score = scores[0];  // scores[0]好像就是最高分数，如果有误再修改
    }


    toString(hasBeatmap, options) {
        let cf = new commonFunctions();
        const accuracy = parseFloat(this.score.accuracy); // 0~1 float
        const combo = this.score.maxCombo;
        const mods = cf.getScoreModsString(this.score.mods);
        const name = this.score.user.name;
        const mapScore = parseInt(this.score.score);
        const rank = this.score.rank;
        const pp = this.score.pp;
        // 谱面信息
        // const beatmapId = this.score.beatmap.id;
        const beatmapSetId = this.score.beatmap.beatmapSetId;
        const beatmapMode = this.score.beatmap.mode;
        const artist = this.score.beatmap.artist;
        const title = this.score.beatmap.title;
        const creator = this.score.beatmap.creator;
        const diff = this.score.beatmap.version;
        const maxCombo = this.score.beatmap.maxCombo;
        // const spinner = this.score.beatmap.objects.spinner;
        // 判断是不是转谱
        const scoreMode = Array.isArray(options) ? options[0].m : options.m;
        let scoreModeString = "std";
        if (scoreMode === "1") scoreModeString = "taiko";
        else if (scoreMode === "2") scoreModeString = "catch";
        else if (scoreMode === "3") scoreModeString = "mania";

        let output = "";
        if (beatmapMode === "Standard" && scoreMode !== "0") { // 转谱
            if (hasBeatmap) output = output + "谱面 " + beatmapSetId + " " + artist + " - " + title + "(" + creator + ")[" + diff + "] " + " 的 " + scoreModeString + " 成绩：\n";
            output = output + name + "\t " + " combo: " + combo + "\t score: " + cf.format_number(mapScore) + "\t " + rank + "\t | " + mods.join("") + "\t " + pp + "pp\n";
        }
        else {
            if (hasBeatmap) output = output + "谱面 " + beatmapSetId + " " + artist + " - " + title + "(" + creator + ")[" + diff + "] " + " 的成绩：\n";
            output = output + name + "\t " + combo + "/" + maxCombo + "\t " + (accuracy * 100).toFixed(2) + "%\t " + cf.format_number(mapScore) + "\t " + rank + "\t | " + mods.join("") + "\t " + pp + "pp\n";
        }

        return output;
    }

    getUserName() {
        return this.score.user.name;
    }
    getScore() {
        return parseInt(this.score.score);
    }

}

module.exports = ScoreObject;