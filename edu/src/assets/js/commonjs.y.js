/* eslint-disable */
var commonjs = {
    numfilter: function(val){
        var value = val;
        var reg = /(?=(?!(\b))(\d{3})+$)/g;
        if (val.toString().indexOf('.') > 0) {
            var arr = val.toString().split('.');
            value = arr[0].replace(reg, "<span class=\"mars\">,</span>") + '<span>.' + arr[1] + '</span>';
        } else {
            value = val.toString().replace(reg, "<span class=\"mars\">,</span>");
        }
        return value;
    },
    
    isNull4Obj: function(obj){
        for(var key in obj){
            return false
        };
        return true
    },
    
    selectHandler: function(list){
        var arr = [];
        if(list.length > 0){
            for(var i=0; i<list.length; i++){
                var obj = new Object();
                obj.value = list[i].data.spValue;
                obj.label = list[i].data.spLabel;
                arr.push(obj);
            }
        }
        return arr;
    },
    
    convertArr: function(newArr, oldArr){
        for(var i=0; i<oldArr.length; i++){
            newArr.push(oldArr[i]);
        }
    },
    
    verifierDate: function(sTime,eTime){
        var sTime = Date.parse(new Date(sTime));
        var eTime = Date.parse(new Date(eTime));
        if(sTime > eTime){
            $.alert('警告','开始时间不能大于结束时间')
        }
    },
    
    isPositiveInteger: function(s){//是否为正整数
         var re = /^[0-9]+$/ ;
         return re.test(s)
    },
    /**
     *  一天时间分割96个点，返回数组
     *  格式： ['00:15', '00:30', .......]
     *  */
    splitDate: function(){
        var res = [];
        var per;
        var totalTime = 24*3600*1000;
        var spanTime = totalTime / 12;
        
        var startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        
        var currentTime = startTime.getTime();
        for(var i = 0; i < 12; i++) {
            currentTime += spanTime;
            var d = new Date(currentTime);
          
            var h = d.getHours() > 10 ? d.getHours() : "0" + d.getHours();
            var m = d.getMinutes() > 10 ? d.getMinutes() : "0" + d.getMinutes();
            
            per = h+":"+m;
            res.push(per);
        }
        return res;
    }
}

export default commonjs

