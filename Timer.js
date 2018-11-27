class Timer {

  constructer(tempTotalTime) {
    this.totalTime = tempTotalTime;
    this.startTime = 0;
  }

  start() {
    this.startTime = millis();
  }

  isFinished() {
    return millis() - this.startTime > this.totalTime;
  }

  setTime(t) {
    this.totalTime = t;
  }
}
