/* eslint-disable */
import echarts from 'echarts'
var baseOptions = {
    /**
     * 上右下左，legend图例位置
     *  */
    legend : function (top, right, bottom, left) {
        var _top = 'auto',
            _right = 'center',
            _bottom = 'center',
            _left = 'center'
        return {
            type: 'plain',
            top: top ? top : _top,
            right: right ? right : _right,
            bottom: bottom ? bottom : _bottom,
            left: left ? left : _left
        }
    },
    /**
     * 上右下左，echarts图外边距，可以传数字，百分比
     *  */
    grid : function (top, right, bottom, left) {
        return {
            top : top,
            right : right,
            bottom : bottom,
            left : left
        }
    },
    axis : {
        /**
         *  type: 类型
         *  margin: label的边距
         *  fontSize: 字体大小
         *  data: 展示的数据
         *  boundaryGap: 是否从0坐标开始
         *  */
        xAxis : function (type, margin, fontSize, data, boundaryGap) {
            var _margin = 10,
                _fontSize = 14,
                _formatter = null,
                _splitNumber = 5,
                _boundaryGap = true
            if ('time' == type) {
                _margin = 20;
                _fontSize = 12;
                _formatter = function (value, index) {
                    if (index < 12) {
                        var _rtnVal = new Date(value).getHours();
                        return _rtnVal.complete(2);
                    } else {
                        return "24:00";
                    }
                }
                _splitNumber = 13;
            }
            if (!type) {
                type = 'category';
            }
            var option = {
                type: type,
                name : '',
                axisLine : {
                    lineStyle : {
                        color : '#888',
                        width : 1
                    }
                },
                boundaryGap :  boundaryGap,
                axisTick : { show : false },
                axisLabel : {
                    margin : margin ? margin : _margin,
                    textStyle : {
                        color : '#888',
                        fontFamily : 'Arial',
                        fontSize : fontSize ? fontSize : _fontSize
                    },
                    formatter : _formatter
                },
                splitNumber : _splitNumber,
                splitLine : {
                    show : false
                },
                data : data
            }

            return option;
        },
        /**
         *  unit: Y轴单位
         *  splitNumber: 分割数
         *  */
        yAxis : function (unit, splitNumber) {
            var option = {
                type : 'value',
                name : unit,
                position : 'left',
                nameTextStyle : {
                    fontSize : 10,
                    color: 'rgba(0,0,0,.6)'
                },
                boundaryGap : true,
                axisLine : { 
                    show : true,
                    lineStyle : {
                        color : '#888',
                        width : 1
                    }
                },
                axisTick : { show : false },
                axisLabel : {
                    textStyle : {
                        color : '#888',
                        fontFamily : 'Arial',
                        fontSize : 12
                    }
                },
                splitLine : {
                    show : false,
                    lineStyle : {
                        color : 'rgba(255,255,255,1)',
                        width : 1,
                        opacity : 1
                    }
                },
                splitNumber : splitNumber
            }
            return option;
        }
    },
    series : {
        /**
         *  name: 折线名称
         *  symbolSize: 折点大小
         *  smooth: 折点是否顺滑
         *  width: 折线的宽度
         *  color: 折线对应的颜色
         *  hasArea: 是否区域颜色渐变
         *  showLabel: 是否显示label
         *  */
        line : function (name, symbolSize, smooth, width, color, hasArea, showLabel) {
            var areaStyle = null;
            if (hasArea) {
                areaStyle = {
                    normal : {
                        color: new echarts.graphic.LinearGradient(0,0,0, 1, [{
                            offset: 0,
                            color: 'rgba(' + color + ', .8)'
                        }, {
                            offset: 1,
                            color: 'rgba(' + color + ', .1)'
                        }]),
                        shadowColor: 'rgba(' + color + ', 0.8)',
                        shadowBlur: 10
                    }
                }
            }
            var label = { normal: { show: true } };
            if (showLabel) {
                label = {
                    show: true,
                    position: 'bottom',
                    color : 'rgba(' + color + ', 1)',
                    fontSize : 20
                }
            }
            var option = {
                name: name,
                type: 'line',
                smooth: smooth,
                symbolSize: symbolSize,
                itemStyle: {
                    normal: {
                        label: label,
                        color: 'rgba(' + color + ', 1)',
                    }
                },
                lineStyle: { 
                    normal: {
                        width: width,
                        color: 'rgba(' + color + ', 1)',
                        shadowColor: 'rgba(' + color + ', .8)',
                        shadowBlur: 20
                    }
                },
                areaStyle : areaStyle,
                data : []  
            }
            return option;
        },
        /**
         *  name: 柱子名称
         *  barWidth: 柱子宽度
         *  borderRadius: 柱子圆角
         *  color: 柱子颜色
         *  showLabel: 是否显示label
         *  */
        bar : function (name, barWidth, borderRadius, color, showLabel) {
            var _barWidth = 10,
                _borderRadius = 0;
            var label = { normal: { show: false } };
            if (showLabel) {
                label = {
                    normal : {
                        position: 'top',
                        textStyle : {
                            color : '#888',
                            fontFamily : 'Arial',
                            fontSize : 18
                        }
                    }
                }
            }
            var option = {
                name: name,
                type: 'bar',
                barWidth : barWidth ? barWidth:_barWidth,
                barGap : 0,
                label: label,
                itemStyle: {
                    normal: {
                        show: false,
                        color: new echarts.graphic.LinearGradient(0,0,0, 1, [{
                            offset: 0,
                            color: 'rgba(' + color + ', 1)'
                        }, {
                            offset: 1,
                            color: 'rgba(' + color + ', .3)'
                        }]),
                        shadowColor: 'rgba(0, 0, 0, 0.8)',
                        shadowBlur: 0,
                        barBorderRadius: borderRadius ? borderRadius : _borderRadius,
                        borderWidth: 0
                    }
                },
                data : []  
            }

            return option;
        }
    }
}
export default baseOptions;
