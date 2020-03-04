const commonFunctions = require('../commonFunctions');


class RecentScoresObject {
    constructor(score) {
        this.score = score;
    }


    toString(hasBeatmap, options) {
        let cf = new commonFunctions();
        let output = "";

        const accuracy = parseFloat(this.score.accuracy); // 0~1 float
        const combo = this.score.maxCombo;
        const mods = cf.getScoreModsString(this.score.mods);
        // const name = this.score.user.name; // 只返回null
        const mapScore = parseInt(this.score.score);
        const rank = this.score.rank;
        // const pp = this.score.pp; // 只返回null
        // 谱面信息
        // const beatmapId = this.score.beatmap.id;
        const beatmapSetId = this.score.beatmap.beatmapSetId;
        const beatmapMode = this.score.beatmap.mode;
        const artist = this.score.beatmap.artist;
        const title = this.score.beatmap.title;
        const creator = this.score.beatmap.creator;
        const diff = this.score.beatmap.version;
        const maxCombo = this.score.beatmap.maxCombo;
        const spinner = this.score.beatmap.objects.spinner;
        // 判断是不是转谱
        const scoreMode = Array.isArray(options) ? options[0].m : options.m;
        let scoreModeString = "std";
        if (scoreMode === "1") scoreModeString = "taiko";
        else if (scoreMode === "2") scoreModeString = "catch";
        else if (scoreMode === "3") scoreModeString = "mania";

        if (beatmapMode === "Standard" && scoreMode !== "0") { // 转谱
            if (hasBeatmap) output = output + "谱面 " + beatmapSetId + " " + artist + " - " + title + "(" + creator + ")[" + diff + "] " + "(" + spinner + " spin) 的 " + scoreModeString + " 成绩：\n";
            output = output + " combo: " + combo + "\t score: " + cf.format_number(mapScore) + "\t " + rank + "\t | " + mods.join("") + "\n";
        }
        else {
            if (hasBeatmap) output = output + "谱面 " + beatmapSetId + " " + artist + " - " + title + "(" + creator + ")[" + diff + "] " + "(" + spinner + " spin) 的成绩：\n";
            output = output + combo + "/" + maxCombo + "\t " + (accuracy * 100).toFixed(2) + "%\t " + cf.format_number(mapScore) + "\t " + rank + "\t | " + mods.join("") + "\n";
        }


        return output;
    }

}

module.exports = RecentScoresObject;