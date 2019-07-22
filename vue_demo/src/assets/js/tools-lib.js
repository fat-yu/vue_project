
/**
 *  获取最值
 *  */
Array.prototype.getMax = function () {
    return this.sort(function(a, b){
        return b - a;
    }).slice(0, 1)[0];
};
Array.prototype.getMin = function () {
    return this.sort(function(a, b){
        return a - b;   
    }).slice(0, 1)[0];
};

/**
 *  获取最值索引
 *  */
Array.prototype.getMaxIndex = function () {
    var _index,_max = this[0];
    for (var i=0; i < this.length; i++) {
      if(this[i] >= _max){
        _max = this[i];
        _index = i;
      }
    };
    return _index;
};

Array.prototype.getMinIndex = function () {
   var _index,_min = this[0];
    for (var i=0; i < this.length; i++) {
      if(this[i] <= _min){
        _min = this[i];
        _index = i;
      }
    };
    return _index;
};

/**
 *  处理小数位
 *  */
String.prototype.numfilter = function() {
    var value = this;
    var reg = /(?=(?!(\b))(\d{3})+$)/g;
    if (this.toString().indexOf('.') > 0) {
        var arr = this.toString().split('.');
        value = arr[0].replace(reg, "<span class=\"mars\">,</span>") + '<span>.' + arr[1] + '</span>';
    } else {
        value = this.toString().replace(reg, "<span class=\"mars\">,</span>");
    }

    return value;
}

Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/**
 * 处理js运算精确值
 */
Number.prototype.numSub = function (num1, num2) {
    var _num1 = num1.toString(),
        _num2 = num2.toString();
    var baseNum, baseNum1, baseNum2;
    var precision;// 精度
    try {
        baseNum1 = _num1.split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = _num2.split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}
Number.prototype.numAdd = function (num1, num2) {
    var _num1 = num1.toString(),
        _num2 = num2.toString();
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = _num1.split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = _num2.split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}
Number.prototype.numMulti = function (num1, num2) {
    var _num1 = num1.toString(),
        _num2 = num2.toString();
    var baseNum = 0;
    try {
        baseNum += _num1.split(".")[1].length;
    } catch (e) {
        baseNum = 0;
    }
    try {
        baseNum += _num2.split(".")[1].length;
    } catch (e) {
        baseNum = 0;
    }
    return Number(_num1.replace(".", "")) * Number(_num2.replace(".", "")) / Math.pow(10, baseNum);
}
Number.prototype.numDiv = function (num1, num2) {
    var _num1 = num1.toString(),
        _num2 = num2.toString();
    var baseNum1 = 0, 
        baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = _num1.split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = _num2.split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    with (Math) {
        baseNum3 = Number(_num1.replace(".", ""));
        baseNum4 = Number(_num2.replace(".", ""));
        return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
    }
}