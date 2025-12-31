class FadeEffect {
    constructor() {
        this.init();
    }
    init() {
        this.fadeImg = new GraphicObject();
        this.fadeImg.name = "container";
        this.fadeImg.fillColor = new Color(0,0,0,1);
        this.fadeImg.scale.x = 1000;
        this.fadeImg.scale.y = 1000;
        this.fadeImg.subLayer = 100;

        this.isFadingIn = false;
        this.isFadingOut = false;

        this.event1 = nc.appEvents.fixedUpdate;
        this.event1.addCallback(this, "update");
    }

    update() {
        if (this.isFadingOut && this.fadeImg.colorMultiply.alpha > 0) {
            this.fadeImg.colorMultiply.alpha -= 1/60;
        }

        if (this.isFadingIn && this.fadeImg.colorMultiply.alpha < 1) {
            this.fadeImg.colorMultiply.alpha += 1/60;
        }
    }

    fadeIn() {
        this.isFadingIn = true;
        this.isFadingOut = false;
    }

    fadeOut() {
        this.isFadingIn = false;
        this.isFadingOut = true;
    }

    deactivate() {
        this.fadeImg.dispose();
        this.event1.removeCallback(this, "update");
    }
}