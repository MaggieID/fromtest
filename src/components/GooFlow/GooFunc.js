/* 本系列框架中,一些用得上的小功能函数,一些UI必须使用到它们,用户也可以单独拿出来用 */

// 获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
export function getElCoordinate(dom) {
    var t = dom.offsetTop;
    var l = dom.offsetLeft;
    dom = dom.offsetParent;
    while (dom) {
        t += dom.offsetTop;
        l += dom.offsetLeft;
        dom = dom.offsetParent;
    }
    return {
        top: t,
        left: l
    };
}
// 兼容各种浏览器的,获取鼠标真实位置
export function mousePosition(ev) {
    if (!ev) ev = window.event;
    if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
    }
    return {
        x: ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.documentElement.scrollTop - document.body.clientTop
    };
}
// 给DATE类添加一个格式化输出字串的方法
export function format(format) {
    var o = {
        'M+': this.getMonth() + 1, // month
        'd+': this.getDate(), // day
        'h+': this.getHours(), // hour
        'm+': this.getMinutes(), // minute
        's+': this.getSeconds(), // second  ‘
        // quarter
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}
// JS]根据格式字符串分析日期（MM与自动匹配两位的09和一位的9）
// alert(getDateFromFormat(sDate,sFormat));
export function getDateFromFormat(dateString, formatString) {
    var regDate = /\d+/g;
    var regFormat = /[YyMmdHhSs]+/g;
    var dateMatches = dateString.match(regDate);
    var formatmatches = formatString.match(regFormat);
    var date = new Date();
    for (var i = 0; i < dateMatches.length; i++) {
        switch (formatmatches[i].substring(0, 1)) {
            case 'Y':
            case 'y':
                date.setFullYear(parseInt(dateMatches[i]));
                break;
            case 'M':
                date.setMonth(parseInt(dateMatches[i]) - 1);
                break;
            case 'd':
                date.setDate(parseInt(dateMatches[i]));
                break;
            case 'H':
            case 'h':
                date.setHours(parseInt(dateMatches[i]));
                break;
            case 'm':
                date.setMinutes(parseInt(dateMatches[i]));
                break;
            case 's':
                date.setSeconds(parseInt(dateMatches[i]));
                break;
        }
    }
    return date;
}
// 货币分析成浮点数
// alert(parseCurrency("￥1,900,000.12"));
export function parseCurrency(currentString) {
    // eslint-disable-next-line no-useless-escape
    var regParser = /[\d\.]+/g;
    var matches = currentString.match(regParser);
    var result = '';
    var dot = false;
    for (var i = 0; i < matches.length; i++) {
        var temp = matches[i];
        if (temp == '.') {
            if (dot) continue;
        }
        result += temp;
    }
    return parseFloat(result);
}

// 将#XXXXXX颜色格式转换为RGB格式，并附加上透明度
export function brgba(hex, opacity) {
    if (!/#?\d+/g.test(hex)) return hex; // 如果是“red”格式的颜色值，则不转换。//正则错误，参考后面的PS内容
    var h = hex.charAt(0) == '#' ? hex.substring(1) : hex;
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    var a = opacity;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

// 计算两个结点间要连直线的话，连线的开始坐标和结束坐标
export function calcStartEnd(n1, n2) {
    var X_1, Y_1, X_2, Y_2;
    // X判断：
    var x11 = n1.left;
    var x12 = n1.left + n1.width;
    var x21 = n2.left;
    var x22 = n2.left + n2.width;
    // 结点2在结点1左边
    if (x11 >= x22) {
        X_1 = x11;
        X_2 = x22;
    } else if (x12 <= x21) { // 结点2在结点1右边
        X_1 = x12;
        X_2 = x21;
    } else if (x11 <= x21 && x12 >= x21 && x12 <= x22) { // 结点2在结点1水平部分重合
        X_1 = (x12 + x21) / 2;
        X_2 = X_1;
    } else if (x11 >= x21 && x12 <= x22) {
        X_1 = (x11 + x12) / 2;
        X_2 = X_1;
    } else if (x21 >= x11 && x22 <= x12) {
        X_1 = (x21 + x22) / 2;
        X_2 = X_1;
    } else if (x11 <= x22 && x12 >= x22) {
        X_1 = (x11 + x22) / 2;
        X_2 = X_1;
    }

    // Y判断：
    var y11 = n1.top;
    var y12 = n1.top + n1.height;
    var y21 = n2.top;
    var y22 = n2.top + n2.height;
    // 结点2在结点1上边
    if (y11 >= y22) {
        Y_1 = y11;
        Y_2 = y22;
    } else if (y12 <= y21) { // 结点2在结点1下边
        Y_1 = y12;
        Y_2 = y21;
    } else if (y11 <= y21 && y12 >= y21 && y12 <= y22) { // 结点2在结点1垂直部分重合
        Y_1 = (y12 + y21) / 2;
        Y_2 = Y_1;
    } else if (y11 >= y21 && y12 <= y22) {
        Y_1 = (y11 + y12) / 2;
        Y_2 = Y_1;
    } else if (y21 >= y11 && y22 <= y12) {
        Y_1 = (y21 + y22) / 2;
        Y_2 = Y_1;
    } else if (y11 <= y22 && y12 >= y22) {
        Y_1 = (y11 + y22) / 2;
        Y_2 = Y_1;
    }
    return { start: [X_1, Y_1], end: [X_2, Y_2] };
}

// 计算两个结点间要连折线的话，连线的所有坐标
export function calcPolyPoints(n1, n2, type, M) {
    // 开始/结束两个结点的中心
    var SP = { x: n1.left + n1.width / 2, y: n1.top + n1.height / 2 };
    var EP = { x: n2.left + n2.width / 2, y: n2.top + n2.height / 2 };
    var sp = [];
    var m1 = [];
    var m2 = [];
    var ep = [];
    // 如果是允许中段可左右移动的折线,则参数M为可移动中段线的X坐标
    // 粗略计算起始点
    sp = [SP.x, SP.y];
    ep = [EP.x, EP.y];
    if (type == 'lr') {
        // 粗略计算2个中点
        m1 = [M, SP.y];
        m2 = [M, EP.y];
        // 再具体分析修改开始点和中点1
        if (m1[0] > n1.left && m1[0] < n1.left + n1.width) {
            m1[1] = (SP.y > EP.y ? n1.top : n1.top + n1.height);
            sp[0] = m1[0];
            sp[1] = m1[1];
        } else {
            sp[0] = (m1[0] < n1.left ? n1.left : n1.left + n1.width);
        }
        // 再具体分析中点2和结束点
        if (m2[0] > n2.left && m2[0] < n2.left + n2.width) {
            m2[1] = (SP.y > EP.y ? n2.top + n2.height : n2.top);
            ep[0] = m2[0];
            ep[1] = m2[1];
        } else {
            ep[0] = (m2[0] < n2.left ? n2.left : n2.left + n2.width);
        }
    } else if (type == 'tb') { // 如果是允许中段可上下移动的折线,则参数M为可移动中段线的Y坐标
        // 粗略计算2个中点
        m1 = [SP.x, M];
        m2 = [EP.x, M];
        // 再具体分析修改开始点和中点1
        if (m1[1] > n1.top && m1[1] < n1.top + n1.height) {
            m1[0] = (SP.x > EP.x ? n1.left : n1.left + n1.width);
            sp[0] = m1[0];
            sp[1] = m1[1];
        } else {
            sp[1] = (m1[1] < n1.top ? n1.top : n1.top + n1.height);
        }
        // 再具体分析中点2和结束点
        if (m2[1] > n2.top && m2[1] < n2.top + n2.height) {
            m2[0] = (SP.x > EP.x ? n2.left + n2.width : n2.left);
            ep[0] = m2[0];
            ep[1] = m2[1];
        } else {
            ep[1] = (m2[1] < n2.top ? n2.top : n2.top + n2.height);
        }
    }
    return { start: sp, m1: m1, m2: m2, end: ep };
}

// 初始化折线中段的X/Y坐标,mType='rb'时为X坐标,mType='tb'时为Y坐标
export function getMValue(n1, n2, mType) {
    if (mType == 'lr') {
        return (n1.left + n1.width / 2 + n2.left + n2.width / 2) / 2;
    } else if (mType == 'tb') {
        return (n1.top + n1.height / 2 + n2.top + n2.height / 2) / 2;
    }
}