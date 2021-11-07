// edg 冲鸭
/*
规则：
    1.  不采用随机数的方式抽奖；
    2.  截止 2021年11月7日21:00:00 所有点赞和评论的人一共是 16 人，按微信 ID 排序(区分大小写)并给与下标为序号；
    3.  比赛结束后，如果 edg 夺冠，则各取双方人头数总和 +1（如打了 3 场，比方分别为：10:10,16:0,14:3；,两方取的值分别为 41「10+16+14+1」和14「10+0+3+1」），再取其乘积（之前的例子里就是 574（41 * 14））。
    4.  将乘积除以总人数取余（之前的例子就是 24「574 % 25」），所得余数就是获奖者的序号。
*/

// 微信ID数组
var userList = new Array();
userList = ['Am****07', 'C1********61', 'Do**_X', 'Ly*****ty', 'Wa*****10', 'Xi**********22', '_S********78', 'a1********25', 'de*****21', 'gt********64', 'hO*******da', 'lc********73', 'mx**********32', 'wj********47', 'xy****40', 'yl**sg'];

// 比分数组
var scoreArr = new Array();
scoreArr = [
    { edg: 16, dk: 4 },
    { edg: 3, dk: 22 },
    { edg: 7, dk: 17 },
    { edg: 6, dk: 3 },
    { edg: 21, dk: 10 }
];

// 抽奖函数：填充好比分数组后（scoreArr）直接跑这个函数就可以了
function roll() {
    let edg = 1,
        dk = 1;
    userList.sort();
    scoreArr.forEach(item => {
        edg += item.edg;
        dk += item.dk;
    });
    console.info("获奖者为：" + userList[edg * dk % userList.length]);
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
        a += `"${encrypt(item)}", `
    });
    console.log(a);
}
