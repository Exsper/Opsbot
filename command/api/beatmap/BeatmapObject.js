class BeatmapObject {
    constructor(beatmaps) {
        this.beatmap = beatmaps[0];
    }


    toString() {
        // TODO pp计算
        // TODO 带mod的谱面四维计算
        const beatmapId = this.beatmap.id;
        const beatmapSetId = this.beatmap.beatmapSetId;
        const beatmapMode = this.beatmap.mode;
        const artist = this.beatmap.artist;
        const title = this.beatmap.title;
        const creator = this.beatmap.creator;
        const diff = this.beatmap.version;
        const approved = this.beatmap.approvalStatus;

        const bpm = this.beatmap.bpm;
        const maxCombo = this.beatmap.maxCombo;
        const spinner = this.beatmap.objects.spinner;
        const cs = this.beatmap.difficulty.size;
        const ar = this.beatmap.difficulty.approach;
        const od = this.beatmap.difficulty.overall;
        const hp = this.beatmap.difficulty.drain;
        const stars = this.beatmap.difficulty.rating;

        let output = "";

        output = output + "谱面 " + beatmapSetId + " " + artist + " - " + title + "(" + creator + ")[" + diff + "] " + "(" + spinner + " spin) \n";
        output = output + "模式： " + beatmapMode + " 状态： " + approved + "\n";
        output = output + "CS" + cs + "  AR" + ar + "  OD" + od + "  HP" + hp + "  BPM: " + bpm + " stars: " + stars + "\n";
        output = output + "max Combo： " + maxCombo + "\n";

        output = output + "\n";
        output = output + "http://osu.ppy.sh/b/" + beatmapId;
        return output;
    }
}

module.exports = BeatmapObject;