const commonFunctions = require('../commonFunctions');


class BestScoresObject {
    constructor(scores) {
        this.scores = scores;   // 无limit默认10个
    }


    toString(hasBeatmap, options) {
        let cf = new commonFunctions();
        let output = "";
        this.scores.forEach((score) => {
            const accuracy = parseFloat(score.accuracy); // 0~1 float
            const combo = score.maxCombo;
            const mods = cf.getScoreModsString(score.mods);
            //const name = score.user.name; // 只返回null
            const mapScore = parseInt(score.score);
            const rank = score.rank;
            const pp = score.pp;
            // 谱面信息
            // const beatmapId = score.beatmap.id;
            const beatmapSetId = score.beatmap.beatmapSetId;
            const beatmapMode = score.beatmap.mode;
            const artist = score.beatmap.artist;
            const title = score.beatmap.title;
            const creator = score.beatmap.creator;
            const diff = score.beatmap.version;
            const maxCombo = score.beatmap.maxCombo;
            const spinner = score.beatmap.objects.spinner;
            // 判断是不是转谱
            const scoreMode = Array.isArray(options) ? options[0].m : options.m;
            let scoreModeString = "std";
            if (scoreMode === "1") scoreModeString = "taiko";
            else if (scoreMode === "2") scoreModeString = "catch";
            else if (scoreMode === "3") scoreModeString = "mania";
        
            if (beatmapMode === "Standard" && scoreMode !== "0") { // 转谱
                if (hasBeatmap) output = output + "谱面 " + beatmapSetId + " " + artist + " - " + title + "(" + creator + ")[" + diff + "] " + "(" + spinner + " spin) 的 " + scoreModeString + " 成绩：\n";
                output = output + " combo: " + combo + "\t score: " + cf.format_number(mapScore) + "\t " + rank + "\t | " + mods.join("") + "\t " + pp + "pp\n";
            }
            else {
                if (hasBeatmap) output = output + "谱面 " + beatmapSetId + " " + artist + " - " + title + "(" + creator + ")[" + diff + "] " + "(" + spinner + " spin) 的成绩：\n";
                output = output + combo + "/" + maxCombo + "\t " + (accuracy * 100).toFixed(2) + "%\t " + cf.format_number(mapScore) + "\t " + rank + "\t | " + mods.join("") + "\t " + pp + "pp\n";
            }
        });


        return output;
    }

}

module.exports = BestScoresObject;