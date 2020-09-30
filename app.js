const { 论述, 名人名言, 后面垫话, 前面垫话, 初始主题 } = require('./material');

const 同余乘数 = 214013;
const 同余加数 = 2531011;
const 同余模 = Math.pow(2, 32);

// LCG https://en.wikipedia.org/wiki/Linear_congruential_generator
function 同余发生器(随机种子) {
    if (!随机种子) {
        随机种子 = Math.floor(随便取一个数(0, 同余模, Math.random))
    }
    随机种子 = (随机种子 * 同余乘数 + 同余加数) % 同余模;
    return 随机种子 / 同余模;
};

function 随便取一句(列表) {
    let 坐标 = Math.floor(同余发生器() * 列表.length);
    return 列表[坐标];
}

function 随便取一个数(最小值 = 0, 最大值 = 100, 随机数函数 = 同余发生器) {
    let 数字 = 随机数函数() * (最大值 - 最小值) + 最小值;
    return 数字;
}

function 来点名人名言() {
    let 名言 = 随便取一句(名人名言)
    名言 = 名言.replace('曾经说过', 随便取一句(前面垫话))
    名言 = 名言.replace('这不禁令我深思', 随便取一句(后面垫话))
    return 名言
}

function 来点论述(主题) {
    let 句子 = 随便取一句(论述);
    句子 = 句子.replace(RegExp('主题', 'g'), 主题);
    return 句子;
}

function 增加段落(段落) {
    if (段落[段落.length - 1] === ' ') {
        段落 = 段落.slice(0, -2)
    }
    return '　　' + 段落 + '。 '
}

function 生成文章(主题) {
    if (!主题) {
        主题 = 随便取一句(初始主题);
    }
    let 文章 = []
    let 段落 = '';
    let 文章长度 = 0;
    while (文章长度 < 12000) {
        let 随机数 = 随便取一个数();
        if (随机数 < 5 && 段落.length > 200) {
            段落 = 增加段落(段落);
            文章.push(段落);
            段落 = '';
        } else if (随机数 < 20) {
            let 句子 = 来点名人名言();
            文章长度 = 文章长度 + 句子.length;
            段落 = 段落 + 句子;
        } else {
            let 句子 = 来点论述(主题);
            文章长度 = 文章长度 + 句子.length;
            段落 = 段落 + 句子;
        }
    }
    段落 = 增加段落(段落);
    文章.push(段落);

    return 文章;
}

module.exports = 生成文章;
