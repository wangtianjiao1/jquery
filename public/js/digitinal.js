// 数字时钟的视图类
class Diginal{
      constructor(options){
        var self=this;
      	var defaultOption={
      		  container:'.clocktime',
      	    selector:{h0:"#h0",h1:"#h1",m0:"#m0",m1:"#m1",s0:"#s0",s1:"#s1"},
            effectIn: 'fadeIn', //数字进入效果
            effectOut: 'fadeOut'//数字退出效果  
      	};
      	// 将options或者空对象复制给defaultOPtions对象(必须的)
      	self.options=Object.assign(defaultOption,options||{});
      	// 数字时间的模板
      	self.template=`
      	<div>
      	  <div class="colockunder">
      	    <p id="h0"><span class="placeHolder">8</span></p>
      	    <p id="h1"><span class="placeHolder">8</span></p>
      	    <p><span>:</span></p>
      	    <p id="m0"><span class="placeHolder">8</span></p>
      	    <p id="m1"><span class="placeHolder">8</span></p>
      	    <p><span>:</span></p>
      	    <p id="s0"><span class="placeHolder">8</span></p>
      	    <p id="s1"><span class="placeHolder">8</span></p>
      	    <p><span></span></p>  
      	  </div>
      	</div>`
      	$(self.options.container).append(self.template);
      }
      
      init(hour, minute, second){
        var self = this;
        var hourChar = self.valTochars(hour);
        var minuteChar = self.valTochars(minute);
        var secondChar = self.valTochars(second);
        self.animateUpdate(self.options.selector.h0, hourChar[0]);
        self.animateUpdate(self.options.selector.h1, hourChar[1]);
        self.animateUpdate(self.options.selector.m0, minuteChar[0]);
        self.animateUpdate(self.options.selector.m1, minuteChar[1]);
        self.animateUpdate(self.options.selector.s0, secondChar[0]);
        self.animateUpdate(self.options.selector.s1, secondChar[1]);
    }

    /**
     * 把给定的数值分解成字符
     * @param val 传入数值
     * @returns {Array|*} 字符数字
     */
    valTochars(val){
        var chars = val.toString().split('');
        if(chars.length < 2){
            chars.unshift('0');
        }
        return chars;
    }

    /**
     * 获取选择符内的数值.
     * @param selector  时:分:秒选择符
     * @returns {*|jQuery}
     */
    getVal(selector){
        return $(selector).find('span.real:eq(0)').text();
    }

    /**
     * 动画更新,当时:分:秒变化时, 使用动画对其更新.
     * @param selector 时:分:秒选择符
     * @param newVal 需要更新到的时间数值
     */
    animateUpdate(selector, newVal){
        var self = this;
        var $container = $(selector);
        var $old = $(selector).find('span.real').addClass(`animated ${self.options.effectOut}`);
        $('<span>').text(newVal).addClass(`real animated ${self.options.effectIn}`).css({position:'absolute'}).appendTo($container);
        $old.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $old.remove();
        });
    }

    /**
     * 更新秒数
     * @param second
     */
    updateSecond(second){
        var self = this;
        var currentChars = self.currentSecond();
        var targetChars = self.valTochars(second);
        for(var i = 0; i<2; i++){
            if(currentChars[i] != targetChars[i]){
                self.animateUpdate(self.options.selector['s'+i], targetChars[i]);
            }
        }
    }
    /**
     * 更新分钟数
     * @param second
     */
    updateMinute(minute){
        var self = this;
        var currentChars = self.currentMinute();
        var targetChars = self.valTochars(minute);
        for(var i = 0; i<2; i++){
            if(currentChars[i] != targetChars[i]){
                self.animateUpdate(self.options.selector['m'+i], targetChars[i]);
            }
        }
    }
    /**
     * 更新小时数
     * @param second
     */
    updateHour(hour){
        var self = this;
        var currentChars = self.currentHour();
        var targetChars = self.valTochars(hour);
        for(var i = 0; i<2; i++){
            if(currentChars[i] != targetChars[i]){
                self.animateUpdate(self.options.selector['h'+i], targetChars[i]);
            }
        }
    }

    /**
     * 获取当前已经显示的秒数
     * @returns {Array} 秒数的字符数组
     */
    currentSecond(){
        var self = this;
        var chars = [];
        chars.push(self.getVal(self.options.selector.s0));
        chars.push(self.getVal(self.options.selector.s1));
        return chars;
    }
    /**
     * 获取当前已经显示的分钟数
     * @returns {Array} 分钟数的字符数组
     */
    currentMinute(){
        var self = this;
        var chars = [];
        chars.push(self.getVal(self.options.selector.m0));
        chars.push(self.getVal(self.options.selector.m1));
        return chars;
    }
    /**
     * 获取当前已经显示的小时数
     * @returns {Array} 小时数的字符数组
     */
    currentHour(){
        var self = this;
        var chars = [];
        chars.push(self.getVal(self.options.selector.h0));
        chars.push(self.getVal(self.options.selector.h1));
        return chars;
    }

    /**
     * 从外部设置数字进入的效果
     * @param effect
     */
    set effectIn(effect){
        this.options.effectIn = effect;
    }
    /**
     * 从外部设置数字退出的效果
     * @param effect
     */
    set effectOut(effect){
        this.options.effectOut = effect;
    }
}