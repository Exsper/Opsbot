const commonFunctions = require('../commonFunctions');


class UserObject {
    constructor(user) {
        this.user = user;
    }

    /*
    minutePerSS(ssranks, secondsPlayed) {
        const mps = (secondsPlayed / ssranks / 60).toFixed(2);
        return "每个ss平均花费 " + mps + " 分钟";
    }
    pcPerSS(ssranks, plays) {
        const pps = (plays / ssranks).toFixed(2);
        return "每个ss平均花费 " + pps + " pc";
    }
    */

    toString() {
        let cf = new commonFunctions();
        const accuracy = parseFloat(this.user.accuracy).toFixed(4);
        //const accuracyFormattedString = this.user.accuracyFormatted;
        //const country = this.user.country;
        const plays = parseInt(this.user.counts.plays);
        // const countsA = parseInt(this.user.counts.A);
        // const countsS = parseInt(this.user.counts.S);
        // const countsSH = parseInt(this.user.counts.SH);
        // const countsSS = parseInt(this.user.counts.SS);
        // const countsSSH = parseInt(this.user.counts.SSH);
        //const counts50 = cf.format_number(this.user.counts['50']);
        //const counts100 = cf.format_number(this.user.counts['100']);
        //const counts300 = cf.format_number(this.user.counts['300']);
        const id = this.user.id;
        const name = this.user.name;
        const level = parseFloat(this.user.level);
        const countryRank = this.user.pp.countryRank;
        const rank = this.user.pp.rank;
        const pp = this.user.pp.raw;
        //const joinDate = this.user.joinDate; //Date
        //const joinDateString = this.user.raw_joinDate; //字符串
        const rankedScores = cf.format_number(this.user.scores.ranked);
        //const totalScores = cf.format_number(this.user.scores.total);
        // const timePlayed = cf.getUserTimePlayed(this.user);
        // const secondsPlayed = this.user.secondsPlayed;
    
        let output = "";
        output = output + name + " 的详细信息：\n";
        output = output + "id：" + id + "\n";
        output = output + "acc：" + accuracy + "%\n";
        //output = output + "所属：" + country + "\n";
        output = output + "等级：" + level + "\n";
        output = output + "pp：" + pp + "\n";
        output = output + "全球排名：" + rank + "\n";
        output = output + "本地排名：" + countryRank + "\n";
        output = output + "游玩次数：" + plays + "\n";
        // output = output + "游玩时长：" + timePlayed + "\n";
        output = output + "rank总分：" + rankedScores + "\n";
        //output = output + "总分：" + totalScores + "\n";
        //output = output + "银SS：" + countsSSH + "\n";
        // output = output + "SS：" + (countsSSH + countsSS) + "\n";
        //output = output + "银S：" + countsSH + "\n";
        // output = output + "S：" + (countsSH + countsS) + "\n";
        // output = output + "A：" + countsA + "\n";
        //output = output + "300：" + counts300 + "\n";
        //output = output + "100：" + counts100 + "\n";
        //output = output + "50：" + counts50 + "\n";
        //output = output + "注册时间：" + joinDateString;
        
        // const days = cf.getUserDays(this.user);
        // output = output + "注册时长：" + Math.round(days) + " 天\n";
        // const ssranks = cf.getUserSSRanks(this.user);
        // output = output + this.minutePerSS(ssranks, secondsPlayed) + "\n";
        // output = output + this.pcPerSS(ssranks, plays) + "\n";
        return output;
    }
}


module.exports = UserObject;