
// 时间类
let ClockInstance = null;
class Clock{
    /**
     * 构造器
     * @param array views 视图的数组,可以传入多个视图,每个视图可以渲染一种类型的时钟,如数字式时钟,指针式的时钟
     * @returns {*} ClockInstance 单例对象.
     */
    constructor(views){
        if(!ClockInstance){
            var self = this;
            var now = new Date();
            self.hour   = now.getHours(); //当前时间的小时数
            self.minute  = now.getMinutes(); //当前时间的分钟数
            self.second = now.getSeconds(); //当前时间的秒数
            self.secondMaxEvent = new CustomEvent('maxSecond'); //秒数是60秒时触发该事件
            self.minuteMaxEvent = new CustomEvent('maxMinute'); //分钟数是60分钟时触发该事件
            self.views = []; //存储视图的数组,可以有多个视图
            for(var view of views){ //存储多个视图
                view.init(self.hour, self.minute, self.second);
                self.views.push(view);
            }
            ClockInstance = self; //把当前对象赋值给变量ClockInstance,形成单例模式.
            //添加事件句柄,当秒数达到60时,分钟数加1
            addEventListener('maxSecond',function(event){
                self._updateMinute();
            });
            //添加事件句柄,当分钟数达到60时,小时数加1
            addEventListener('maxMinute',function(event){
                self._updateHour();
            });
            //设置每秒执行一次self._updateSecond()
            setInterval(function(){
                self._updateSecond();
            }, 1000);
        }
        return ClockInstance;
    }

    /**
     * 每秒执行一次所有视图的updateSecond()方法.
     * 每秒执行一次,当前秒数是59, 下一秒重新从0开始计数.
     * @private
     */
    _updateSecond(){
        var self = this;
        if(self.second == 59){
            dispatchEvent(self.secondMaxEvent);
            self.second = 0;
        }else{
            self.second += 1;
        }
        for(var view of self.views){
            view.updateSecond(self.second);
        }
    }
    /**
     * 每分钟执行一次所有视图的updateMinute()方法.
     * @private
     */
    _updateMinute(){
        var self = this;
        if(self.minute == 59){
            dispatchEvent(self.minuteMaxEvent);
            self.minute = 0;
        }else{
            self.minute++;
        }
        for(var view of self.views){
            view.updateMinute(self.minute);
        }
    }
    /**
     * 每小时执行一次所有视图的updateHour()方法.
     * @private
     */
    _updateHour(){
        var self = this;
        if(self.hour == 23){
            self.hour = 0;
        }else{
            self.hour++;
        }
        for(var view of self.views){
            view.updateHour(self.hour);
        }
    }
}