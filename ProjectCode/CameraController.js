class CameraController {
    constructor() {
        this.init();
    }

    init() {
        nc.mainCamera.adaptiveCameraMode = "maximizeSafeZone";
        
        this.targetPositionY = 0;
        this.currentPositionY = 0;
        
        // Color variables
        this.startColor = nc.mainCamera.backgroundColor; // Store start color for clean Lerp
        this.targetColor = new Color(0, 0, 0);
        this.colorLerpSpeed = 0.001;
        this._t = 1; // Start at 1 so we don't fade on init

        // Shake variables
        this.shakeTimer = 0;
        this.shakeMagnitude = 0;
        this.lastShakeX = 0;
        this.lastShakeY = 0;
    }

    // Call this to trigger shake: camera.shake(0.5, 5);
    shake(duration, magnitude) {
        this.shakeTimer = duration;
        this.shakeMagnitude = magnitude;
    }

    changeToColor(r, g, b) {
        this._t = 0;
        // Capture the color exactly as it is right now as the starting point
        this.startColor = nc.mainCamera.backgroundColor;
        this.targetColor = new Color(r, g, b);
    }
    
    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    update() {
        // --- 1. RESET SHAKE (Prevent Drift) ---
        // Restore camera to its "true" logical position before calculating movement
        nc.mainCamera.position.x -= this.lastShakeX;
        nc.mainCamera.position.y -= this.lastShakeY;
        this.lastShakeX = 0;
        this.lastShakeY = 0;

        // --- 2. MOVEMENT LOGIC ---
        this.currentPositionY = nc.mainCamera.position.y;

        if (this.targetPositionY - 10 > this.currentPositionY) {
            nc.mainCamera.position.y += 9;
        } else if (this.targetPositionY + 10 < this.currentPositionY) {
            nc.mainCamera.position.y -= 9;
        }

        // --- 3. COLOR LOGIC ---
        // Cap _t at 1 to stop calculating once transition is done
        if (this._t < 1) {
            this._t += 1/60;
            const t = Math.min(1, this._t);

            const newR = this.lerp(this.startColor.red, this.targetColor.red, t);
            const newG = this.lerp(this.startColor.green, this.targetColor.green, t);
            // Fixed typo: 'blur' -> 'blue'
            const newB = this.lerp(this.startColor.blue, this.targetColor.blue, t);

            nc.mainCamera.backgroundColor = new Color(newR, newG, newB);
        }

        // --- 4. APPLY NEW SHAKE ---
        if (this.shakeTimer > 0) {
            this.shakeTimer -= 1/60;

            // Generate random offset between -magnitude and +magnitude
            const rx = (Math.random() - 0.5) * 2 * this.shakeMagnitude;
            const ry = (Math.random() - 0.5) * 2 * this.shakeMagnitude;

            nc.mainCamera.position.x += rx;
            nc.mainCamera.position.y += ry;

            // Store these values so we can un-apply them next frame
            this.lastShakeX = rx;
            this.lastShakeY = ry;
        }
    }
}