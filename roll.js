// fpx 冲鸭
/*
规则：
    1.  不采用随机数的方式抽奖；
    2.  截止 2019年11月11日12:00:00 所有点赞和评论的人一共是 34 人，按微信 ID 排序(区分大小写)并给与下标为序号；
    3.  比赛结束后，如果 fpx 夺冠，则各取双方人头数总和 +1（如打了 3 场，比方分别为：10:10,16:0,14:3；,两方取的值分别为 41「10+16+14+1」和14「10+0+3+1」），再取其乘积（之前的例子里就是 574（41*14））。
    4.  将乘积除以总人数取余（之前的例子就是 30「574%34」），所得余数就是获奖者的序号。
*/

// 微信ID数组
var userList = new Array();
userList = [];

// 比分数组
var scoreArr = new Array();
scoreArr = [{
    fpx: 22,
    g2: 7
}, {
    fpx: 20,
    g2: 4
}, {
    fpx: 10,
    g2: 8
}];

// 抽奖函数：填充好比分数组后（scoreArr）直接跑这个函数就可以了
function roll() {
    let fpx = 1,
        g2 = 1;
    userList.sort();
    scoreArr.forEach(item => {
        fpx += item.fpx;
        g2 += item.g2;
    });
    console.info("获奖者为：" + userList[fpx * g2 % userList.length]);
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