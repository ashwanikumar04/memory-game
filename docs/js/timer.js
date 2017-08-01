///Code inspired from http://knowpapa.com/js-stopwatch/


function StopWatch() {
    var self = this;
    this.state = false;
    this.time = 0;
    this.stopTime = 0;
    this.refreshTimer = {};
    this.placeHolder = "";
    this.startTime = 0
    this.start = function () {
        self.reset();
        self.state = true;
        var startDate = new Date();
        self.startTime = startDate.getTime();
        self.timeCounter(self.startTime);
    };

    this.stop = function () {
        self.state = false;
    };

    this.reset = function () {
        self.state = false;
        self.time = 0;
        self.stopTime = 0;
        self.startTime = 0;
        clearTimeout(self.refreshTimer);
    };

    this.timeCounter = function (startTime) {
        currentDate = new Date();
        var timediff = currentDate.getTime() - startTime;
        if (!self.state) {
            timediff = timediff + self.stopTime
        }
        if (self.state) {
            self.time = timediff;
            $('#' + self.placeHolder).text(formatDate(self.time));
            self.refreshTimer = setTimeout(function () {
                self.timeCounter(startTime);
            }, 10);
        } else {
            clearTimeout(self.refreshTimer);
            self.stopTime = timediff;
        }
    };
}