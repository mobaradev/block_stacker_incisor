class MenuScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
    }
    init() {
        nc.mainCamera.backgroundColor = new Color(0, 0, 0);
        this.isLoadingLevel = false;
        this.menuConstruct = nc.constructDefs.MenuConstruct.add();
        this.menuConstruct.colorMultiply.alpha = 0;

        this.event1 = nc.appEvents.fixedUpdate;
        this.event1.addCallback(this, "update");
        nc.mainCamera.position.y = 0;
        // alert('init');
        
    }
    update() {
        if (nc.keyDownStates[" "]) {
            if (!this.isLoadingLevel) {
                setTimeout(() => {
                    this.deactivateObjects();
                    this.projectMain.playGame();
                }, 1000)
            }
            this.isLoadingLevel = true;
        }


        if (!this.isLoadingLevel && this.menuConstruct.colorMultiply.alpha < 1.0) {
            this.menuConstruct.colorMultiply.alpha += 1/45;

            if (this.menuConstruct.colorMultiply.alpha > 1.0) this.menuConstruct.colorMultiply.alpha = 1.0;
        }

        if (this.isLoadingLevel && this.menuConstruct.colorMultiply.alpha > 0.0) {
            this.menuConstruct.colorMultiply.alpha -= 1/45;

            if (this.menuConstruct.colorMultiply.alpha < 0.0) this.menuConstruct.colorMultiply.alpha = 0.0;
        }
    }
    deactivateObjects() {
        this.event1.removeCallback(this, "update");
        this.menuConstruct.dispose();
        
    }
}