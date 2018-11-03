// ig 冲鸭
/*
规则：
    1.  不采用随机数的方式抽奖；
    2.  截止 2018年11月3日12:00:00 所有点赞和评论的人一共是 34 人，按微信 ID 排序(区分大小写)并给与下标为序号；
    3.  比赛结束后，如果 ig 夺冠，则各取双方人头数总和 +1（如打了 3 场，比方分别为：10:10,16:0,14:3；,两方取的值分别为 41「10+16+14+1」和14「10+0+3+1」），再取其乘积（之前的例子里就是 574（41*14））。
    4.  将乘积除以总人数取余（之前的例子就是 30「574%34」），所得余数就是获奖者的序号。
*/

// 微信ID数组
var userList = new Array();
userList = [
    "Ch***ZC", "Do**_X", "FQ*__", "LL***09", "Pe****92", "ST*****27", "a7******16", "a8******23", "ah***da", "cm******16", "gt********64", "ha*********07", "iw**p_", "ki******ar", "ki********03", "lc********73", "lo****ug", "pi****08", "qu********66", "qu****pc", "sa*****14", "sj********91", "sw********31", "wb******01", "wj********47", "wk*********04", "wx************11", "wx************22", "wy****qq", "xy****40", "yi******ei", "yl**sg", "yu***********30", "zh**********48"
];

// 比分数组
var scoreArr = new Array();
scoreArr = [{
    ig: 10,
    fnc: 10
}, {
    ig: 16,
    fnc: 0
}, {
    ig: 14,
    fnc: 3
}];

// 抽奖函数：填充好比分数组后（scoreArr）直接跑这个函数就可以了
function IG_ChongYa() {
    let ig = 1,
        fnc = 1;
    userList.sort();
    scoreArr.forEach(item => {
        ig += item.ig;
        fnc += item.fnc;
    });
    console.info("获奖者为：" + userList[ig * fnc % userList.length]);
}

// 加密微信ID
function encrypt(str) {
    let t = "";
    if (str.length <= 4) {
        for (let i = 0; i < str.length; i++)
            t += "*";
        return t;
    }
    for (let i = 0; i < str.length - 4; i++)
        t += "*";
    return str.substr(0, 2) + t + str.substr(str.length - 2, str.length - 0);
}

// 加密所有微信 ID
function encryptWeChatID() {
    let a = "";
    userList.forEach(item => {
        a += "\"" + encrypt(item) + "\",";
    });
    console.log(a);
}