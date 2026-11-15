// S16 BLG 夺冠纪念抽奖
/*
规则：
    1.  不采用随机数的方式抽奖；
    2.  抽奖截止时间待填写；名单预先按完整微信 ID 区分大小写排序后脱敏，userList 保留该顺序，序号从 0 开始；
    3.  BLG 在 S16 决赛中以 3:1 战胜 GEN，分别将双方四局击杀数求和后加 1，再取乘积：65 × 53 = 3445；
    4.  将乘积除以实际参与人数取余，所得余数就是获奖者的序号（例如 16 人参与时，3445 % 16 = 5）。
*/

// 公开名单：已按完整 ID 排序后脱敏。必须保留此顺序，不要再按星号排序。
var userList = [
    "Am****07",
    "C1********61",
    "Q2*******34",
    "WB*******28",
    "X0*****05",
    "Xi**********22",
    "Yo***************sx",
    "a1********25",
    "a7******16",
    "cc******26",
    "dc*******80",
    "de*****21",
    "hi*********57",
    "ki******ar",
    "ki******66",
    "ki********03",
    "li**********66",
    "lu******al",
    "mo*********07",
    "mx**********32",
    "ni*********08",
    "sm***e3",
    "wx***************11",
    "yl**sg",
    "zj********33",
    "zz********13"
];

// S16 决赛每局击杀数（BLG 对 GEN），不是系列赛胜场数。
var scoreArr = [
    { blg: 4, gen: 19 },
    { blg: 19, gen: 14 },
    { blg: 20, gen: 8 },
    { blg: 21, gen: 11 }
];

// 抽奖函数：使用已确定顺序的脱敏名单，调用 roll() 即可复算。
function roll() {
    if (userList.length === 0) {
        throw new Error("请先在 userList 中填写已按完整 ID 排序的脱敏名单。");
    }
    if (userList.some(id => !id.includes("*"))) {
        throw new Error("userList 仅保存脱敏 ID。请先按完整 ID 排序再脱敏，并保留顺序，避免公开完整微信 ID。");
    }
    const participants = [...userList];
    let blg = 1,
        gen = 1;
    scoreArr.forEach(item => {
        blg += item.blg;
        gen += item.gen;
    });
    const product = blg * gen;
    const index = product % userList.length;
    const divider = "================================================================";
    const lines = [
        divider,
        "                 S16 · BLG 夺冠纪念抽奖",
        divider,
        `参与人数：${userList.length} 人    |    决赛局数：${scoreArr.length} 局`,
        "名单顺序：已按完整微信 ID 区分大小写排序，再脱敏保存。",
        "本次直接使用上述顺序，不再对脱敏 ID 排序。",
        "抽奖规则：双方总击杀数各加 1，相乘后对参与人数取余。",
        "",
        "【参与名单】以下为排序后的名次，公开显示的 ID 已脱敏",
    ];

    // 分两列展示完整名单，方便截图；显示名次从 1 开始。
    const rows = Math.ceil(userList.length / 2);
    const formatParticipant = position =>
        `${String(position + 1).padStart(2, "0")}. ${encrypt(participants[position])}${position === index ? "  ← 中奖" : ""}`;
    for (let row = 0; row < rows; row++) {
        const left = formatParticipant(row);
        const right = row + rows < userList.length ? formatParticipant(row + rows) : "";
        lines.push(right ? `${left.padEnd(34, " ")}${right}` : left);
    }

    lines.push("", "【决赛击杀记录】");
    scoreArr.forEach((item, game) => {
        lines.push(`第 ${game + 1} 局：BLG ${String(item.blg).padStart(2, " ")} : ${String(item.gen).padStart(2, " ")} GEN`);
    });
    lines.push(
        "",
        "【开奖计算】",
        `BLG：（${scoreArr.map(item => item.blg).join(" + ")}）+ 1 = ${blg}`,
        `GEN：（${scoreArr.map(item => item.gen).join(" + ")}）+ 1 = ${gen}`,
        `相乘：${blg} × ${gen} = ${product}`,
        `取余：${product} ÷ ${userList.length} = ${Math.floor(product / userList.length)}，余 ${index}`,
        "",
        "【中奖结果】",
        `中奖序号：${index}（从 0 开始），对应名单第 ${index + 1} 位 / 共 ${userList.length} 位`,
        `获奖者为：${encrypt(participants[index])}`,
        divider,
    );
    console.info(lines.join("\n"));
}

// 脱敏微信 ID
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

// 输出脱敏名单，保留现有顺序
function encryptWeChatID() {
    let a = "";
    userList.forEach(item => {
        a += `"${encrypt(item)}", `
    });
    console.log(a);
}

roll();
