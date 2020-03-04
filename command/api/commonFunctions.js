class commonFunctions {

    // 整数每3位加逗号
    format_number(n) {
        var b = parseInt(n).toString();
        var len = b.length;
        if (len <= 3) { return b; }
        var r = len % 3;
        return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
    }
    // 获取ss总数
    getUserSSRanks(user) {
        return parseInt(user.counts.SS) + parseInt(user.counts.SSH);
    }
    // 获取注册天数
    getUserDays(user) {
        const startTime = user.joinDate.getTime();
        const endTime = new Date().getTime();
        return Math.abs(startTime - endTime) / (1000 * 60 * 60 * 24);
    }
    // 获取格式化游玩时长
    getUserTimePlayed(user) {
        const s = parseInt(user.secondsPlayed);
        const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
        const hour = Math.floor((s - day * 24 * 3600) / 3600);
        const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
        const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
        return day + "天" + hour + "时" + minute + "分" + second + "秒";
    }
    // 将score api返回的mods数组转为字符串
    getScoreModsString(mods) {
        let abbMods = [];
        for (let i = 0; i < mods.length; i++) {
            if (mods[i] === "Hidden") abbMods.push("HD");
            else if (mods[i] === "HardRock") abbMods.push("HR");
            else if (mods[i] === "DoubleTime") abbMods.push("DT");
            else if (mods[i] === "Nightcore") abbMods.push("NC");
            else if (mods[i] === "Flashlight") abbMods.push("FL");
            else if (mods[i] === "Easy") abbMods.push("EZ");
            else if (mods[i] === "HalfTime") abbMods.push("HT");
            else if (mods[i] === "NoFail") abbMods.push("NF");
            else if (mods[i] === "SpunOut") abbMods.push("SO");
            //else if (mods[i] === "TouchDevice") abbMods.push("TD");
            else if (mods[i] === "KeyMod") abbMods.push("KeyMod");
        }
        //有NC时去掉DT
        let indexDT = abbMods.indexOf("DT");
        let indexNC = abbMods.indexOf("NC");
        if (indexNC >= 0) abbMods.splice(indexDT, 1);
        return abbMods;
    }

    // 计算mods数值（指令+号后面的）
    getScoreMods(modsString) {
        let mods = {
            //None : 0,
            NF: 1,
            EZ: 2,
            //TD : 4, //TouchDevice
            HD: 8,
            HR: 16,
            SD: 32,
            DT: 64,
            //Relax : 128,
            HT: 256,
            NC: 512, // Only set along with DoubleTime. i.e: NC only gives 576
            FL: 1024,
            //Autoplay : 2048,
            SO: 4096,
            //Relax2 : 8192,    // Autopilot
            PF: 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416  
            '4K': 32768,
            '5K': 65536,
            '6K': 131072,
            '7K': 262144,
            '8K': 524288,
            FI: 1048576,
            //Random : 2097152,
            //Cinema : 4194304,
            //Target : 8388608,
            '9K': 16777216,
            //KeyCoop : 33554432,
            '1K': 67108864,
            '3K': 134217728,
            '2K': 268435456
            //ScoreV2 : 536870912,
            //Mirror : 1073741824,
            //KeyMod : Key1 | Key2 | Key3 | Key4 | Key5 | Key6 | Key7 | Key8 | Key9 | KeyCoop,
            //FreeModAllowed : NoFail | Easy | Hidden | HardRock | SuddenDeath | Flashlight | FadeIn | Relax | Relax2 | SpunOut | KeyMod,
            //ScoreIncreaseMods : Hidden | HardRock | DoubleTime | Flashlight | FadeIn
        };
        let sum = 0;
        let i = 0;
        let length = modsString.length;
        while (i + 2 <= length) {
            let s = modsString.substring(i, i + 2);
            if (mods[s] !== undefined) {
                if (s === 'NC') sum = sum + mods.DT;
                else if (s === 'PF') sum = sum + mods.SD;
                sum = sum + mods[s];
            }
            i += 2;
        }
        return sum;
    }

    // String转mode
    getMode(modeString) {
        let s = modeString.trim().toLowerCase();
        if (s === "0" || s === "1" || s === "2" || s === "3") return s;
        else if (s.indexOf("std") >= 0) return "0";
        else if (s.indexOf("standard") >= 0) return "0";
        else if (s.indexOf("click") >= 0) return "0";
        else if (s.indexOf("泡泡") >= 0) return "0";
        else if (s.indexOf("taiko") >= 0) return "1";
        else if (s.indexOf("鼓") >= 0) return "1";
        else if (s.indexOf("catch") >= 0) return "2";
        else if (s.indexOf("ctb") >= 0) return "2";
        else if (s.indexOf("接") >= 0) return "2";
        else if (s.indexOf("mania") >= 0) return "3";
        else if (s.indexOf("key") >= 0) return "3";
        else if (s.indexOf("骂娘") >= 0) return "3";
        else if (s === "s") return "0";
        else if (s === "t") return "1";
        else if (s === "c") return "2";
        else if (s === "m") return "3";
        //else return s;
        else return "0";
    }
    // mode转String
    getModeString(mode) {
        if (mode === "0") return "Standard";
        else if (mode === "1") return "Taiko";
        else if (mode === "2") return "Catch The Beat";
        else if (mode === "3") return "Mania";
        //else return s;
        else return "未知";
    }



}


module.exports = commonFunctions;