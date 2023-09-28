class PressableManager {

    constructor(delay = 300) {
        this.lastPressTime = new Date().getTime();
        this.delay = delay;
    }

    press() {
        let permitted = this.lastPressTime + this.delay <= new Date().getTime();
        if (!permitted) return false;
        this.lastPressTime = new Date().getTime();
        return true;
    }

}

export default PressableManager;
