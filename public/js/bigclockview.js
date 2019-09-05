class Clockview{
	constructor(options){
		var self=this;
		var defaultoptions={
			container:'#circleclock',
		};
       self.options=Object.assign(defaultoptions,options||{});
       self.template= `
       <div class="clockouter">
            <div class="clockmiddle">
                <div class="clockinner">
                    <div></div>
                    <div></div>
                    <div>3</div>
                    <div></div>
                    <div></div>
                    <div>6</div>
                    <div></div>
                    <div></div>
                    <div>9</div>
                    <div></div>
                    <div></div>
                    <div>12</div>
                </div>
                <div class="clock-hour"></div>
                <div class="clock-minute"></div>
                <div class="clock-second"></div>
                <div class="clock-center"></div>
            </div>
        </div>`;
       $(self.options.container).append(self.template);
	}
	init(hour, minute, second){
        var hourDeg   = hour / 12 * 360 + minute / 60 * 30;
        var minuteDeg = minute / 60 * 360 + second / 60 * 6;
        var secondDeg = second / 60 * 360;
        var stylesDeg = [
            "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
            "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
            "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
            "@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
            "@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
            "@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
        ].join("");
        document.getElementById("clock-animations").innerHTML = stylesDeg;
    }

    updateSecond(second){
    }

    updateMinute(minute){
    }

    updateHour(hour){
    }
}