class CameraController {
    constructor() {
        this.init();
    }

    init() {
        this.targetPositionY = 0;
        this.currentPositionY = 0;
        this.currentColor = nc.mainCamera.backgroundColor;
        this._t = 0;

        this.targetColor = new Color(0, 0, 0);
        
        this.colorLerpSpeed = 0.001;
    }

    changeToColor(r, g, b) {
        this._t = 0;
        this.currentColor = nc.mainCamera.backgroundColor;
        this.targetColor = new Color(r, g, b);
    }
    
    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    update() {
        this._t += 1/60;
        this.currentPositionY = nc.mainCamera.position.y;
        nc.mainCamera.adaptiveCameraMode = "maximizeSafeZone";

        if (this.targetPositionY - 10 > this.currentPositionY) {
            nc.mainCamera.position.y += 9;
        } else if (this.targetPositionY + 10 < this.currentPositionY) {
            nc.mainCamera.position.y -= 9;
        }
        
        const target = this.targetColor;
        this.currentColor = nc.mainCamera.backgroundColor;

        const newR = this.lerp(this.currentColor.red, target.red, Math.min(1, this._t));
        const newG = this.lerp(this.currentColor.green, target.green, Math.min(1, this._t));
        const newB = this.lerp(this.currentColor.blur, target.blur, Math.min(1, this._t));

        nc.mainCamera.backgroundColor = new Color(newR, newG, newB);
    }
}