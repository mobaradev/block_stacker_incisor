/** Class housing all of the main Incisor functionality. 
 * Accessible via 'nc' from anywhere within project code, excluding code within 
 * the 'PreloadConfiguration.js' file (that code is executed before 'nc' is instantiated).
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class INCISOR
{
    constructor()
    {
        /** The name of the project.
         * @readonly
         * @type {string}
         */ 
        this.projectName = null;


        


/** Object housing Incisor® AppEvents, which enable callbacks for software events including screen updates, cursor/pointer/mouse events, keyboard events, and many more.
 */
this.appEvents = {
    /** The fixed updater AppEvent occurs in an automatically repeating manner at a rate dictated by 'nc.targetFixedUpdateRate' (defaults to 60 fps).
    * This AppEvent should be used to drive the logic and sequencing in a given project. It is a 'fixed' updater because it will be called at
    * the designated rate regardless of 'dropped' screen updates, and logic/sequencing using this AppEvent will never experience 'time slippage' 
    * due to any software performance issues.
    * @type {AppEvent}
    */
    fixedUpdate : null,


    /** The fixed updater AppEvent occurs in an automatically repeating manner at a rate dictated by 'nc.targetFixedUpdateRate' (defaults to 60 fps).
    * This AppEvent should be used to drive the logic and sequencing in a given project. It is a 'fixed' updater because it will be called at
    * the designated rate regardless of 'dropped' screen updates, and logic/sequencing using this AppEvent will never experience 'time slippage' 
    * due to any software performance issues. This AppEvent will always happen after the 'fixedUpdate' AppEvent.
    * This AppEvent is 'ordered', meaning callbacks added can provide a 'callbackOrder' parameter, which is used to determine the execution order of callbacks.
    * @type {AppEvent}
    */
    lateFixedUpdate : null,


    /** The screen updater AppEvent occurs in an automatically repeating manner at a rate dictated by 'nc.targetScreenUpdateRate' (defaults to 60 fps).
    * This AppEvent should only be used to drive processes that are tied to rendering - it occurs before each auto-render of the Cameras. 
    * It is a 'screen' updater because it is only called when the system's performance allows - if project logic or sequencing are tied to 
    * this AppEvent, they may experience 'time slippage' if there are any software performance issues.
    * @type {AppEvent}
    */
    screenUpdate : null,


    /** The late updater AppEvent occurs in an automatically repeating manner at a rate dictated by 'nc.targetScreenUpdateRate' (defaults to 60 fps).
    * This AppEvent should only be used to drive processes that are tied to rendering - it occurs after each auto-render of the Cameras. 
    * It is a 'late' updater because it is called after rendering, and can be used to wrap up rendering processes, and prep for the next render. 
    * Much like the 'screenUpdate', the lateScreenUpdate only happens when system performance allows, and so would experience time slippage with
    * performance issues. This AppEvent will always happen after the 'screenUpdate'.
    * This AppEvent is 'ordered', meaning callbacks added can provide a 'callbackOrder' parameter, which is used to determine the execution order of callbacks.
    * @type {AppEvent}
    */
    lateScreenUpdate : null,


    /** The start AppEvent occurs one time after ProjectMain.init (pr.init) has been called, which happens directly before the automatic iterative 
    * appEvents (i.e. fixedUpdate, screenUpdate etc...) begin. This AppEvent can be used to perform tasks which require that all SceneObjects and 
    * CustomAddOns to be 'in place' and set up before running. An example use of this AppEvent would be within a CustomAddOn that resides on an 
    * item inside a Construct - if you put code that references other CustomAddOns in a constructor, there's no guarantee that the other CustomAddOns 
    * or their owners will be populated yet. So in this case it would be better to run that same code in a 'start' callback, which waits for all 
    * of the setup before running. 
    * It should be noted that callbacks added after the official 'start' occurs will be invoked on the next fixedUpdate.
    * This AppEvent is 'ordered', meaning callbacks added can provide a 'callbackOrder' parameter, which is used to determine the execution order of callbacks. 
    * @type {AppEvent}
    */
    start : null,


    /** The keyboardEvent is triggered for all keyboard events such as 'keydown' and 'keyup'. The native browser-triggered event
    * will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', meaning
    * they can require that a particular object be 'focused' in order for the callback to be invoked - this enables certain functionality
    * related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    keyboardEvent : null,


    /** The canvasResize is triggered any time a key canvas is resized. The native browser-triggered event
    * will be sent to all callbacks as their first parameter.
    * @type {AppEvent}
    */
    canvasResize : null,


    /** The keyDown is triggered any time a key on the keyboard is pushed down. The native browser-triggered event
    * will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', meaning
    * they can require that a particular object be 'focused' in order for the callback to be invoked - this enables certain functionality
    * related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    keyDown : null,


    /** The keyUp is triggered any time a key on the keyboard that was previously pushed down is released. The native browser-triggered event
    * will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', meaning
    * they can require that a particular object be 'focused' in order for the callback to be invoked - this enables certain functionality
    * related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    keyUp : null,


    /** The cursorMove is triggered any time the cursor is moved. The native browser-triggered event
    * will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', meaning
    * they can require that a particular object be 'focused' in order for the callback to be invoked - this enables certain functionality
    * related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    cursorMove : null,


    /** The cursorPress is triggered any time the cursor is 'pressed down', which would be either by clicking the mouse button, 
    * or touching a touch-screen device. The native browser-triggered event will be sent to all callbacks as their first parameter.
    * Callbacks added to this AppEvent also have a 'singular focus option', meaning they can require that a particular
    * object be 'focused' in order for the callback to be invoked - this enables certain functionality
    * related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    cursorPress : null,


    /** The cursorRelease is triggered any time the cursor is 'let up', which would be either by realeasing the mouse button, 
    * or lifting a finger from a touch-screen device. The native browser-triggered event will be sent to all callbacks as their 
    * first parameter. Callbacks added to this AppEvent also have a 'singular focus option', meaning they can require that a particular
    * object be 'focused' in order for the callback to be invoked - this enables certain functionality
    * related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    cursorRelease : null,


    /** The cursorScroll is triggered any time mouse scroll wheel is used. The native browser-triggered event 
    * will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 
    * 'singular focus option', meaning they can require that a particular object be 'focused' in order 
    * for the callback to be invoked - this enables certain functionality related to user-input to be 
    * restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    cursorScroll : null,


    /** The contextMenu is triggered when the context menu (right-click dropdown menu) is accessed. The native browser-triggered event 
    * will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', 
    * meaning they can require that a particular object be 'focused' in order for the callback to be invoked - this enables 
    * certain functionality related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    contextMenu : null,


    /** The cursorLeave is triggered any time the cursor leaves the canvas altogether. The native browser-triggered event 
    * will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', 
    * meaning they can require that a particular object be 'focused' in order for the callback to be invoked - this enables 
    * certain functionality related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    cursorLeave : null,


    /** The cursorEvent is triggered any time the cursorMove, cursorPress, cursorRelease, cursorScroll, or contextMenu events are triggered.
    * Use this AppEvent if you want to have a single callback receive the feedback from all of the cursor events. The native browser-triggered 
    * event will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', 
    * meaning they can require that a particular object be 'focused' in order for the callback to be invoked - this enables 
    * certain functionality related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    cursorEvent : null,


    /** The focusChange AppEvent is triggered any time 'nc.singularFocusObject' is set to a new object. A FocusChangeInfo object
    * will be sent to all callbacks as their first parameter - this object contains references to the object that is losing focus, 
    * as well as the object gaining focus.
    * @type {AppEvent}
    */
    focusChange : null,


    /** The osFocusChange AppEvent is triggered any time the OS changes its focus to or from the browser/app running this instance of Incisor®. 
    * The status of the browser/app ('focused' or 'unfocused') will be sent to all callbacks as their first parameter.
    * @type {AppEvent}
    */
    osFocusChange : null,


    /** The visibilityChange AppEvent is triggered any time the OS-level visibility of the browser/app running this instance of Incisor® changes. 
    * The status of the browser/app ('hidden' or 'visible') will be sent to all callbacks as their first parameter.
    * This AppEvent is 'ordered', meaning callbacks added can provide a 'callbackOrder' parameter, which is used to determine the execution order of callbacks.
    * @type {AppEvent}
    */
    visibilityChange : null,


    /** The clipboardEvent is triggered any time the browser encounters a 'copy', 'cut', or 'paste' event, affecting the OS clipboard.
    * Use this AppEvent if you want to have a single callback receive the feedback from all of the clipboard events. The native browser-triggered 
    * event will be sent to all callbacks as their first parameter. Callbacks added to this AppEvent also have a 'singular focus option', 
    * meaning they can require that a particular object be 'focused' in order for the callback to be invoked - this enables 
    * certain functionality related to user-input to be restricted to the appropriate contexts within a UI.
    * @type {AppEvent}
    */
    clipboardEvent : null,


    /** The uiZoomChange AppEvent is triggered any time nc.uiZoom.totalZoom is changed, which can happen when nc.uiZoom.zoomValue changes or when the browser's devicePixelRatio changes. 
    * The updated totalZoom value will be sent to all callbacks as their first parameter.
    * @type {AppEvent}
    */
    uiZoomChange : null,


    
};


/** Object housing all defined PauseEvents. A given PauseEvent can be used as a parameter in 'nc.pause' and 'nc.resume' to pause and resume various 
 * time-based and user-interaction processes. Pausable processes react to pausing or resuming with PauseEvents unless those processes have a given PauseEvent as part
 * of their designated 'pauseImmunity', which can determined in the parameters of a pausable-process-initiating method. 
 */
this.pauseEvents = {
    /** One of the currently defined PauseEvents.
 * @type {PauseEvent}
 */
"MainPauseEvent":null,
/** One of the currently defined PauseEvents.
 * @type {PauseEvent}
 */
"InspectorPauseEvent":null

};


/** Object housing all defined SpeedControls. SpeedControls can be used to control the speed of time-based sequencing processes such as Motions, Swoops, or Timelines.
 * Applicable processes can subscribe to multiple SpeedControls - the 'speed' values of all of the SpeedControls a process subscribes to are multiplied together to determine
 * the overall pacing of the given time-based process.
 */
this.speedControls = {
    /** One of the currently defined SpeedControls.
 * @type {SpeedControl}
 */
"MainSpeedControl":null

};


/** This is the pause immunity that is automatically applied if the 'pauseImmunity' parameter of any pausable-process-initiating method is left undefined.
 * This value can be changed between big blocks of code to distinguish how groups of functionality react to different pauseEvents without needing 
 * to include specific 'pauseImmunity' for every single process initiated within each block.
 * @default [nc.pauseEvents.MainPauseEvent]
 * @type {Array.<PauseEvent>|PauseEvent}
 */
this.defaultPauseImmunity = null;


/** The SpeedControl(s) that are automatically applied if the 'speedControl' parameter is left undefined in any method that initiates a speed controllable process.
 * This value can be changed between big blocks of code to distinguish how groups of functionality interact with different sets of SpeedControls without needing 
 * to include specific 'speedControl' parameters for every single applicable process initiated within each block.
 * @default [nc.speedControls.MainSpeedControl]
 * @type {Array.<SpeedControl>&SpeedControl}
 */
this.defaultSpeedControl = null;


/** The default focusFallback value for new SceneObjects. 
 * This property can be changed at the top of any block of code where a lot of related SceneObjects are instantiated, and as a result
 * all of those SceneObjects will receive the same new default focusFallback value.
 * @default undefined
 * @type {SceneObject}
 */
this.defaultFocusFallback = null;


/** The number of times per second that the fixedUpdate will occur.
 * @default 60
 * @type {number}
 */
this.targetFixedUpdateRate = null;


/** The number of times per second that the screenUpdate will occur.
 * @default 60
 * @type {number}
 */
this.targetScreenUpdateRate = null;


/** When changed from 1, this value will increase or decrease the pacing of the fixedUpdate (independently from the 'targetFixedUpdateRate'), as well as the playback rate of 
 * all sounds played. The screenUpdate is not effected by this value. Manipulating this value can serve as a 'fast-forward' for the entire project.
 * @default 1
 * @type {number}
 */
this.softwareSpeed = null;


/** The singularFocusObject determines which callbacks connected to certain user-input AppEvents are invoked. For example, when a 'keyboardEvent' callback is added, 
 * a 'singularFocusRequirements' parameter can be supplied and that callback will only be invoked if the singularFocusObject is listed in the supplied 'singularFocusRequirements'.
 * This is a way of adding keyboard AppEvent callbacks that will only be called if an associated contextual object is 'focused'.
 * @type {SceneObject}
 */
this.singularFocusObject = null;


/** Optional array of Buttons that can be supplied while a given object is the singularFocusObject; 
 * any cursor press must then be within one of the given Buttons in order for that focus to be maintained.
 * A cursor press anywhere outside of these buttons will result in nc.reliquishFocus to be called.
 * When a TextBox is focused via editing or selecting, this value is automatically set to the TextBox,
 * and as a result, any exterior cursor press un-focuses the TextBox.
 * When this property is undefined, cursor presses do not affect focus at all.
 * @default undefined
 * @type {Array.<Button>}
 */
this.singularFocusButtonPressRequirements = null;


/** Flag determining if this project will continue its processes in any way while it is hidden by the OS.
 * @type {boolean}
 * @default false;
 */
this.hiddenUpdating = null;


/** Flag determining if this project's ScreenUpdate will occur while it is hidden by the OS.
 * @type {boolean}
 * @default false;
 */
this.hiddenScreenUpdating = null;


/** In the event that tasks within the 'fixedUpdate' and 'lateFixedUpdate' processes take longer than their alloted time
 * for sustained periods, a sort of 'computational pile-up' can occur, where more instructions are scheduled per
 * second that can be completed. This property limits the amount of 'catching up' that the system will try to do to, effectively
 * allowing time to slip in these processes to avoid such computational pile-up. It should be noted that this value
 * corresponds to the the maximum reconciliation time for when nc.hiddenUpdating is set to false.
 * @type {number}
 * @default 1;
 */
this.maxReconciliationTime = null;


/** In the event that tasks within the 'fixedUpdate' and 'lateFixedUpdate' processes take longer than their alloted time
 * for sustained periods, a sort of 'computational pile-up' can occur, where more instructions are scheduled per
 * second that can be completed. This property limits the amount of 'catching up' that the system will try to do to, effectively
 * allowing time to slip in these processes to avoid such computational pile-up. It should be noted that this value
 * corresponds to the the maximum reconciliation time for when nc.hiddenUpdating is set to true.
 * @type {number}
 * @default 10;
 */
this.maxHiddenReconciliationTime = null;


/** Flag determining which events are informing cursor interaction.
 * When nc.cursorMode is set to 'autoDetect', the next cursor event will received will set the cursor mode; 
 * if it's a touch event then cursorMode will be set to 'touch', and if the it's a mouse event then cursorMode will be set to 'mouse'.
 * When nc.cursorMode is set to 'mouse', Incisor is using the mousedown, mouseup, mouseleave, wheel, and mousemove browser events to inform cursor interactions.
 * When nc.cursorMode is set to 'touch', Incisor is using the touchstart, touchend, touchcancel, and touchmove browser events to inform cursor interactions.
 * @default "autoDetect"
 * @type {string}
 */
this.cursorMode = null;








/** Dictionary of loading tiers - each loading tier has a number designation.
 * Loading tiers are a means to organize AssetComponents into separately downloadable groups.
 */
this.loadingTiers = {
    /** The numeric designation of the '100' loading tier.
* @type {number}
*/
"100":null

};



/** The max amount of time between two Button presses for the Button presses to be considered part of the same 'doubleTap' or 'tripleTap'.
 * @type {number}
 * @default 0.25
 */
this.multiTapInterval = null;





/** Dictionary of all registered Cameras in this project. 
 */
this.cameras = {
    /** One of the currently defined Cameras.
 * @type {OrthographicCamera}
 */
"MainCamera":null

};


/** The 'MainCamera' Camera. 
 * @type {OrthographicCamera}
*/
this.mainCamera = null;



/** The main canvas element for this project.
 * @type {HTMLCanvasElement}
 */
this.canvasElement = null;








/** Object housing predefined constant values for various Incisor® options and modes.
 * @type {Constants}
 */
this.constants = null;





/** Dictionary of available ConstructDefinitions.
 */
this.constructDefs = {
    /** The ConstructDefinition for the 'MenuConstruct' Construct type.
 * @type {MenuConstruct_ConstructDefinition}
 */
"MenuConstruct":null

};











/** A dictionary of the CustomAddOn definitions currently registered with this project.
 * CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
this.customAddOnDefs = {
    
};





/** A dictionary of the CustomObject definitions currently registered with this project.
 * CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
this.customObjectDefs = {
    
};








/** Dictionary of EffectControllerDefinitions for all of the registered EffectControllers.
 */
this.effectControllers = {
    /** The info-object for the 'particleSystemParameters' EffectController.
 * @type {particleSystemParameters_Definition}
 */
"particleSystemParameters" : null,
/** The info-object for the 'fillColor' EffectController.
 * @type {fillColor_Definition}
 */
"fillColor" : null,
/** The info-object for the 'mainTexture' EffectController.
 * @type {mainTexture_Definition}
 */
"mainTexture" : null,
/** The info-object for the 'colorMultiply' EffectController.
 * @type {colorMultiply_Definition}
 */
"colorMultiply" : null,
/** The info-object for the 'shapify' EffectController.
 * @type {shapify_Definition}
 */
"shapify" : null

};





/** Dictionary of all defined EffectNodes.
 */
this.effectNodes = {
    /** One of the currently defined EffectNodes.
 * @type {EffectNode}
 */
"FillColor":null,
/** One of the currently defined EffectNodes.
 * @type {EffectNode}
 */
"SampleMainTexture":null,
/** One of the currently defined EffectNodes.
 * @type {EffectNode}
 */
"ColorMultiply":null,
/** One of the currently defined EffectNodes.
 * @type {EffectNode}
 */
"Shapify":null,
/** One of the currently defined EffectNodes.
 * @type {EffectNode}
 */
"MaskingReturn":null,
/** One of the currently defined EffectNodes.
 * @type {EffectNode}
 */
"MainParticleSystemParticleSystemEffectNode":null,
/** One of the currently defined EffectNodes.
 * @type {EffectNode}
 */
"ParticleSystem2ParticleSystemEffectNode":null

};





/** Object housing functionality to perform file IO tasks such as 'writeTextFile', 'moveTo', 'createDirectory' an more.
 * This functionality only exists within un-built projects, and also requires that the user account has access to the FileIO features.
 * [REQUIREMENT: license - fileIO]
 * @type {FileIO}
 */
this.fileIO = null;





/** The FlowControllers currently defined in this project.
 * FlowControllers provide a way to organize the general flow of state-based items in a project.
 * For example if your project is a game with an intro, a menu, and several levels,
 * you could create a FlowController named "GameFlowController" and then define and add an 'Intro' FlowState,
 * a 'Menu' FlowState, and 'LevelXX' FlowStates to that FlowController. Within each FlowState in the FlowController,
 * timed callback elements can be added to help define the sequencing within each FlowState.
 * Once created, FlowControllers, FlowStates, and FlowStateElements can be accessed via 'nc.flows'.
 * This class is not meant to be instantiated or provided directly to 'FlowController.addFlowState', rather it is meant
 * to be a class for user-defined FlowStates to extend.
 * Call 'nc.defineFlowController' to create a new FlowController, then use 'nc.flows' to access it.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: license - proGaming]
 * [REQUIREMENT: module - flowControllers]
 */
this.flows = {
    
};





/** Dictionary of the names of the fonts available within this project.
 */
this.fontNames = {
    /** The 'NullFont' font name string.
* @type {string}
*/
"NullFont":null,
/** The 'SampleFont' font name string.
* @type {string}
*/
"SampleFont":null

};


/** Dictionary of all registered Geometries.
 */
this.geometries = {
    /** One of the currently defined Geometries.
 * @type {Geometry}
 */
"icon_magnifyingglass":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"icon_sliderarrows":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"icon_ex":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"icon_sliderarrowsapart":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"icon_caret":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"icon_minus":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"icon_checkmark":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleParticle2":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleParticle":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char126":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char125":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char124":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char123":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char122":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char121":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char120":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char119":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char118":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char117":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char116":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char115":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char114":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char113":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char112":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char111":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char110":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char109":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char108":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char107":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char106":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char105":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char104":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char103":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char102":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char101":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char100":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char99":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char98":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char97":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char96":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char95":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char94":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char93":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char92":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char91":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char90":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char89":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char88":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char87":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char86":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char85":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char84":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char83":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char82":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char81":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char80":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char79":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char78":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char77":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char76":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char75":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char74":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char73":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char72":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char71":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char70":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char69":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char68":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char67":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char66":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char65":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char64":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char63":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char62":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char61":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char60":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char59":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char58":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char57":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char56":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char55":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char54":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char53":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char52":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char51":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char50":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char49":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char48":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char47":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char46":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char45":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char44":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char43":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char42":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char41":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char40":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char39":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char38":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char37":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char36":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char35":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char34":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char33":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char32":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"SampleFont_Char0":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"mobaradev-logo":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"Eyes":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"EyesClosed":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"skullicon":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"Logo":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"RightEye":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"incisor-logo":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"LeftEye":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"WhiteBox":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"WhiteTriangle":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"NullFont_Char0":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"ParticleSystemGeometry_MainParticleSystem":null,
/** One of the currently defined Geometries.
 * @type {Geometry}
 */
"ParticleSystemGeometry_ParticleSystem2":null

};







/** Dictionary of all registered GraphicAssets.
 */
this.graphicAssets = {
    /** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"icon_magnifyingglass":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"icon_sliderarrows":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"icon_ex":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"icon_sliderarrowsapart":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"icon_caret":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"icon_minus":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"icon_checkmark":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleParticle2":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleParticle":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char126":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char125":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char124":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char123":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char122":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char121":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char120":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char119":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char118":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char117":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char116":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char115":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char114":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char113":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char112":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char111":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char110":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char109":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char108":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char107":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char106":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char105":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char104":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char103":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char102":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char101":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char100":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char99":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char98":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char97":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char96":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char95":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char94":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char93":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char92":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char91":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char90":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char89":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char88":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char87":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char86":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char85":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char84":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char83":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char82":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char81":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char80":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char79":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char78":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char77":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char76":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char75":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char74":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char73":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char72":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char71":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char70":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char69":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char68":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char67":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char66":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char65":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char64":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char63":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char62":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char61":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char60":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char59":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char58":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char57":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char56":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char55":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char54":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char53":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char52":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char51":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char50":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char49":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char48":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char47":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char46":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char45":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char44":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char43":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char42":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char41":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char40":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char39":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char38":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char37":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char36":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char35":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char34":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char33":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char32":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"SampleFont_Char0":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"mobaradev-logo":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"Eyes":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"EyesClosed":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"skullicon":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"Logo":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"RightEye":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"incisor-logo":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"LeftEye":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"WhiteBox":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"WhiteTriangle":null,
/** One of the currently defined GraphicAssets.
 * @type {GraphicAsset}
 */
"NullFont_Char0":null

};





/** The MaskGroups available in this project.
 */
this.maskGroups = {
    /** One of the currently defined MaskGroups.
 * @type {MaskGroup}
 */
"MainMaskGroup":null

};





/** Object housing functionality allowing for direct interactions with the Incisor® application from within the javascript runtime. 
 * Such functionality includes the ability to get/set project and application settings, initiate the hosting of files in local directories, 
 * script the opening of new browser tabs, and perform other transactions with the Incisor® application.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - advancedTools]
 * @type {IncisorApp}
 */
this.incisorApp = null;


/** Object housing basic functionality allowing for direct interactions with the Incisor® application from within the javascript runtime. 
 * Such functionality includes the ability to get the list of optional code modules from the Incisor™ application. 
 * See 'nc.incisorApp' for many more application interaction options.
 * [REQUIREMENT: unpublished only]
 * @type {IncisorAppBasic}
 */
this.incisorAppBasic = null;





/** Dictionary with the current state of each key on the keyboard, regardless of pause states or focused objects (see nc.singularFocusObject).
 * This can be used used to check the state of modifier keys such as the 'shift' or 'option' key.
 * If the key in question is down, this object will have a member (with the key as the name) that is true,
 * otherise the member will be undefined.
 * @type {object}
 */
this.keyDownStates = null;















/** The default value for the 'depthTest' property on all GraphicObject Materials.
 * It should be noted that some GraphicAssets may have Material presets that determine a specific value for 'depthTest', 
 * and those Material presets supersede this value. 
 * @default false
 * @type {boolean}
 */
this.defaultDepthTesting = null;


/** The default value for the 'depthWrite' property on all GraphicObject Materials.
 * It should be noted that some GraphicAssets may have Material presets that determine a specific value for 'depthWrite', 
 * and those Material presets supersede this value. 
 * @default true
 * @type {boolean}
 */
this.defaultDepthWriting = null;








/** Object housing all defined MotionTypes. 
 * MotionTypes are used in conjunction with Motions and define a method of continuous change for numeric properties.
 */
this.motionTypes = {
    /** The 'Pendulum' MotionType.
 * This MotionType smoothly swings the value or values back and forth between the lower and upper bounds.
 * While some MotionTypes are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {MotionType}
 */
"Pendulum":null

};





/** Dictionary of all registered ParticleSystemDefinitions.
 */
this.particleSystemDefs = {
    /** One of the currently defined ParticleSystemDefinitions.
 * @type {ParticleSystemDefinition}
 */
"MainParticleSystem":null,
/** One of the currently defined ParticleSystemDefinitions.
 * @type {ParticleSystemDefinition}
 */
"ParticleSystem2":null

};





/** Object housing functionality manipulate paths including 'splitPath', 'getFileName', and 'getParentDirectory'.
 * @type {Paths}
 */
this.paths = null;








/** Object housing functionality for PixelsObjects, which are RGBA bitmap images in a simple, 'data-only' format, used for basic image access and manipulation.
 * [REQUIREMENT: module - pixelsObjects]
 * @type {PixelsObjects}
 */
this.pixelsObjects = null;








/** Dictionary of Precomps
 */
this.precomps = {
    
};





/** Object housing the configuration settings for this project. 
 * Many of the members of this object are customizable on a 'per configuration' basis by editing the 'ProjectSettings' file within the project.
 * The user-customizable 'PreloadConfiguration' code is executed within this object, so members created within that code will be accessible on this object.
 * @type {ProjectConfiguration}
 */
this.projectConfiguration = null;





/** Object housing functionality for publishing projects.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - publishing]
 * @type {Publishing}
 */
this.publishing = null;





/** Dictionary of all registered RenderTargets in this project. RenderTargets are objects that contain Textures to render to, 
 * as well as settings for how those textures may be resized automatically based on environmental factors such as canvas size, 
 * canvas aspect ratio, and the current asset package scale.
 */
this.renderTargets = {
    /** One of the currently defined RenderTargets.
 * @type {RenderTarget}
 */
"MainRenderTarget":null

};


/** Value that multiplies the resolution scale of all RenderTargets whose 'globalRenderTargetResolutionScaling' property is true.
 * @default 1
 * @type {number}
 */
this.globalRenderTargetResolutionScaler = null;


/** The main canvas RenderTarget.
 * @type {RenderTarget}
 */
this.mainRenderTarget = null;












/** Dictionary of all registered Scenes in this project. 
 * Scenes are the root SceneObjects in hierarchies. 
 * All SceneObjects are either Scenes or descendants of Scenes.
 */
this.scenes = {
    /** One of the currently defined Scenes.
 * @type {Scene}
 */
"MainScene":null

};


/** Dictionary of all registered Layers in this project. 
 */
this.layers = {
    /** One of the currently defined Layers.
 * @type {Layer}
 */
"DefaultLayer":null

};


/** The 'MainScene' Scene. 
 * @type {Scene}
*/
this.mainScene = null;


/** A 2D dictionary that lists the available Layers in each Scene.
 * These dictionaries are not ordered, for the order of the Layers in a given Scene, see 'Scene.layerOrderLedger'.
 * @type {LayersByScene}
 */
this.layersByScene = new LayersByScene();
















/** Dictionary of all registered Sounds.
 * [REQUIREMENT: module - sounds]
 */
this.sounds = {
    /** One of the currently defined Sounds.
 * @type {Sound}
 */
"pickupCoin":null,
/** One of the currently defined Sounds.
 * @type {Sound}
 */
"Beep":null

};


/** Dictionary of all registered VolumeControls.
 * [REQUIREMENT: module - sounds]
 */
this.volumeControls = {
    /** One of the currently defined VolumeControls.
 * @type {VolumeControl}
 */
"MainVolumeControl":null

};

















/** Object housing all defined TweenTypes. TweenTypes are used in conjunction with 'Swoopers' and define a method of numeric property interpolation between any two values or sets of values.
 * TweenTypes can vary the timing of interpolation between two sets of values, as well as the path of the interpolation.
 */
this.tweenTypes = {
    /** The 'Linear' TweenType.
 * This TweenType interpolates linearly between the current value/values and the end value/values.
 * While some TweenTypes are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {TweenType}
 */
"Linear":null,
/** The 'Ease' TweenType.
 * This TweenType interpolates between the current value/values and the end value/values smoothly, accelerating from the starting values, and decelarating as the ending values are approached.
 * While some TweenTypes are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {TweenType}
 */
"Ease":null

};









/** The name of the keyboard key that serves as the main modifier key for keyboard input. For example while editing the text in a
 * TextBox, the nc.mainModifierKey + the "A" key will select all. 
 * @default "Control"
 * @type {string}
 */
this.mainModifierKey = null;









/** Dictionary of all registered Textures.
 */
this.textures = {
    /** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char126":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char125":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char124":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char123":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char122":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char121":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char120":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char119":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char118":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char117":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char116":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char115":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char114":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char113":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char112":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char111":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char110":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char109":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char108":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char107":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char106":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char105":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char104":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char103":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char102":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char101":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char100":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char99":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char98":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char97":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char96":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char95":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char94":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char93":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char92":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char91":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char90":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char89":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char88":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char87":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char86":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char85":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char84":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char83":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char82":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char81":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char80":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char79":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char78":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char77":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char76":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char75":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char74":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char73":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char72":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char71":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char70":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char69":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char68":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char67":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char66":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char65":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char64":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char63":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char62":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char61":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char60":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char59":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char58":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char57":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char56":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char55":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char54":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char53":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char52":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char51":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char50":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char49":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char48":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char47":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char46":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char45":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char44":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char43":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char42":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char41":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char40":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char39":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char38":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char37":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char36":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char35":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char34":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char33":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char32":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont_Char0":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icon_magnifyingglass":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icon_sliderarrows":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icon_ex":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icon_sliderarrowsapart":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icon_caret":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icon_minus":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icons_sheet0":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"icon_checkmark":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleParticle2":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleParticles0":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleParticle":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"SampleFont0":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"mobaradev-logo":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"Eyes":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"EyesClosed":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"skullicon":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"Logo":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"RightEye":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"incisor-logo":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"LeftEye":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"WhiteBox":null,
/** One of the currently defined Textures.
 * @type {Texture}
 */
"NullFont_Char0":null

};








/** Object housing functionality for time stamps, the Incisor® standardized format for date and time.
 * [REQUIREMENT: module - timeStamp]
 * @type {TimeStamp}
 */
this.timeStamp = null;





/** Dictionary of the phraseIDs contained in the ProjectTranscript.
 * Using phraseIDs to populate TextBoxes and TextAssemblies will enable the text content 
 * to be dynamically populated based on the current language setting of the project.
 */
this.phraseIDs = {
    /** One of the phrases defined in the ProjectTranscript.
 * @type {string}
 */
"Hello World":null,
/** One of the phrases defined in the ProjectTranscript.
 * @type {string}
 */
"Goodbye World":null

};


/** Dictionary of the phrases contained in the ProjectTranscript (listed by phraseID).
 * Using phraseIDs to populate TextBoxes and TextAssemblies will enable the text content 
 * to be dynamically populated based on the current language setting of the project.
 */
this.phrases = {
    /** One of the phrases defined in the ProjectTranscript.
 * @type {string}
 */
"Hello World":null,
/** One of the phrases defined in the ProjectTranscript.
 * @type {string}
 */
"Goodbye World":null

};










































/** Object housing default TextFormats, and Colors for various Gui objects such as 'UiButton', 'DropDownMenu' and 'PopUpWindow'.
 * [REQUIREMENT: module - extendedUi]
 * @type {UiStyle}
 */
this.uiStyle = null;


/** Boolean determining if certain automatic positioning features specifically related to the Incisor Inspector are enabled.
 * It should be noted that the Incisor Inspector uses a non-standard coordinate system with (0,0) in the upperleft corner.
 * Automatica positioning features include: automatic placement of UiPopupWindows in the center of the screen and automatic
 * adjustment of UiMenus to avoid them extending outside of the Inspector viewing area.
 * [REQUIREMENT: module - extendedUi]
 * @default false
 * @type {boolean}
 */
this.enableIncisorInspectorAutoPositioning = null;


/** Boolean determining if 'useNearestPixelRendering' defaults to true for 'UI' items such as UiButton or UiText.
 * In general, you should use 'useNearestPixelRendering' for situations when the area being rendered is the same exact resolution
 * as the RenderTarget it's being used to; it is a means to have 'pixel perfect' TextBox rendering. 
 * If the camera is rendering a variable area or an area that doesn't match the RenderTarget being rendered to (such such as when 
 * the camera's adaptiveCameraMode is set to 'maximizeSafeZone') then 'useNearestPixelRendering' should not be used and this value 
 * should be false; 
 * @default true
 * @type {boolean}
 */
this.useNearestPixelRenderingForAllUiItems = null;














/** Read-only property denoting which object (if any) is currently visually focused. 
 * 'VisualFocus' is a mode that focuses the end-user's attention the given SceneObject by placing it 
 * in front of a dimmer layer whenever the object is the the current 'singularFocusObject'.
 * See 'SceneObject.configureUiVisualFocus' for more information.
 * [REQUIREMENT: module - extendedUi]
 * @type {UiVisualFocus}
 * @readonly
 */
this.visualFocusObject = null;


/** Boolean determining if the entire Visual Focus system is enabled. 
 'VisualFocus' is a mode that focuses the end-user's attention the given SceneObject by placing it 
 * in front of a dimmer layer whenever the object is the the current 'singularFocusObject'.
 * See 'SceneObject.configureUiVisualFocus' for more information.
 * [REQUIREMENT: module - extendedUi]
 * @type {boolean}
 * @default true
 */
this.visualFocusEnabled = null;


/** Number determining how strong the visual focus dimmer is on a scale of 0 to 1.
 * @type {number}
 * @default .5
 */
this.visualFocusDimmerAmount = null;





/** Object housing functionality associated with the user interface zoom, which enables end-users to increase or decrease 
 * the overall size of text and other user interface items (when those items have uiZoom functionality enabled).
 * @type {UiZoom}
 */
this.uiZoom = null;





/** Object housing testing functionality that enables a project to refresh itself repeatedly with different url parameters.
 * Such functionality can help with batch testing of a project's configurations or settings.
 * To use this functionality, first call the 'UrlParameterIteration.setup' method, passing it an array of objects where each object
 * represents the url parameters you would like the browser to refresh with. When ready to start the iteration, call
 * 'UrlParameterIteration.start'. Then add the desired functionality per url parameter - be sure to implement what you want 
 * conditionally based on the url params (otherwise everything will happen on every refresh). 
 * When the desired tasks (testing, screen shots, etc...) have completed for each set of url parameters, call 'UrlParameterIteration.next',
 * this will proceed to refresh with the next set of url parameters.
 * [REQUIREMENT: module - urlParameterIterator]
 * @type {UrlParameterIterator}
 */
this.urlParameterIterator = null;








/** Dictionary of all registered Videos. 
 * When compressed video assets (mp4 or webm) are included in a project a Texture, Geometry, GraphicAsset, and Video with that same name are created in Incisor.
 * Once included, any GraphicObject can be set to the corresponding GraphicAsset, and the associated Video object can control the video's playback.
 * It should be noted that the visual content of any instance or use of the GraphicAsset will be same everywhere - as video's content is pushed to the
 * associated texture, all objects using that Texture will see the same content.
 * Videos in Incisor rely entirely on the browser's decoding and playback capabilities, which typically don't support rapid/repeated changes to video properties. 
 * In practice, videos perform well when playing once normally or free-running, but do not do well with a lot of rapid time jumps or scrubbing.
 * Video formats are not uniformly supported for use within all browsers, and their use is not advised within projects meant to be universally accessible.
 * Acceptable extensions for video files include ".mp4" and ".webm", and while webm (VP8 or VP9) typically supports transparency, there are currently
 * no video formats that support transparency on any Apple mobile or desktop products.
 * [REQUIREMENT: module - videos]
 */
this.videos = {
    incr_replaceText_videosDocumentation
};





;


        ;


        /** The object housing the Incisor project extensions scope. This property will be undefined if
         * the requirements are met, or if there are no project extensions.
         * [REQUIREMENT: unpublished only]
         * [REQUIREMENT: license - extensions]
         * @readonly
         * @type {object}
         */ 
        this.incisorExtensions_project=null;


        /** The object housing the Incisor global extensions scope. This property will be undefined if
         * the requirements are met, or if there are no global extensions.
         * [REQUIREMENT: unpublished only]
         * [REQUIREMENT: license - extensions]
         * @readonly
         * @type {object}
         */ 
        this.incisorExtensions_global=null;
    }


    


/** Defines a new custom Incisor® AppEvent that can have callbacks added and can be triggered using 'AppEvent.trigger'.
 * @param {string} eventName The name of the new AppEvent being defined.
 * @param {boolean} [hasSingularFocusScheme] Flag indicating if this AppEvent will have a 'singular focus scheme' which is a system that restricts callback invocation to items associated with the currently 'focused' object as determined by nc.singularFocusObject. [DEFAULT: false]
 * @param {boolean} [isOrdered] Flag indicating if this AppEvent will be 'ordered', which allows callbacks added to this AppEvent to be provided a callback order number, which is then used to sort the callbacks when the AppEvent is triggered. [DEFAULT: false]
 * @param {boolean} [hasConsumableCallbacks] Flag indicating if this AppEvent removes callbacks after one invocation. [DEFAULT: false]
 * @returns {AppEvent}
 * @example
 * // Objective: Trigger a custom AppEvent.
 * // Expected Result: You will see a green square.
 * 
 * // create a white box GraphicObject
 * this.whiteBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteBox" );
 * 
 * // define a custom AppEvent and add its callback
 * nc.defineAppEvent( "MyCustomAppEvent" );
 * nc.appEvents.MyCustomAppEvent.addCallback( this, "myAppEventCallback" );
 * 
 * // the AppEvent callback will update the fillColor of the box
 * this.myAppEventCallback = function( r, g, b, a ) {
 *     this.whiteBox.fillColor = new Color( r, g, b, a );
 * }
 * 
 * // trigger my AppEvent passing in parameters as an array (set the red and blue to zero)
 * nc.appEvents.MyCustomAppEvent.trigger( [0, 1, 0, 1] );
 */
defineAppEvent(eventName,hasSingularFocusScheme,isOrdered,hasConsumableCallbacks){}


/** Defines a new PauseEvent. The various time-based and user-interaction processes in Incisor® can be paused by calling 'nc.pause' with a PauseEvent parameter.
 * Pausable processes can also opt out of being paused by providing a 'pauseImmunity' list during their initiation (as will be indicated in initiating method parameters).
 * The pauseImmunity list is a list of PauseEvents that the given process will be immune to.
 * All defined PauseEvents can be found at 'nc.pauseEvents'.
 * @param {string} pauseEventName The name of the new PauseEvent.
 * @returns {PauseEvent}
 */
definePauseEvent(pauseEventName){}


/** Pauses the various time-based and user-interaction processes that can be paused by the supplied PauseEvent. Processes that list the supplied
 * PauseEvent in their 'pauseImmunity' will be immune to this pause.
 * @param {PauseEvent} pauseEvent The PauseEvent being triggered. Available PauseEvents can be found in 'nc.pauseEvents'.
 * @example
 * // Objective: Pause and resume motion.
 * // Expected Result: The white box will move up and down along the y axis for 3 seconds, then pause for 3 seconds, then resume again.
 * 
 * // create a GraphicObject with the white box asset
 * let graphic = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
 * // add motion to the position of this GraphicObject along the y axis with a motion speed of 2
 * graphic.position.addMotion.y( -300, 300, 2 );
 * // create a PauseEvent
 * nc.definePauseEvent("BoxPause");
 * // wait 3 seconds, then call "pause", passing BoxPause as the PauseEvent
 * nc.waitThen( 3, nc, "pause", [nc.pauseEvents.BoxPause] );
 *        
 * // wait 6 seconds, then call "resume"
 * // NOTE: At this point, "resume" is paused by the BoxPause event. This is why we must also
 * // pass the BoxPause event as the "pauseImmunity" parameter.
 * nc.waitThen( 6, nc, "resume", nc.pauseEvents.BoxPause , undefined, nc.pauseEvents.BoxPause );
 */
pause(pauseEvent){}


/** Resumes the processes that were paused by the supplied PauseEvent. Some processes may not resume if they are still being affected by other PauseEvents.
 * @param {PauseEvent} pauseEvent The PauseEvent being resumed. Available PauseEvents can be found in 'nc.pauseEvents'.
 * @example
 * // Objective: Pause and resume motion.
 * // Expected Result: The white box will move up and down along the y axis for 3 seconds, then pause for 3 seconds, then resume again.
 * 
 * // create a GraphicObject with the white box asset
 * let graphic = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
 * // add motion to the position of this GraphicObject along the y axis with a motion speed of 2
 * graphic.position.addMotion.y( -300, 300, 2 );
 * // create a PauseEvent
 * nc.definePauseEvent("BoxPause");
 * // wait 3 seconds, then call "pause", passing BoxPause as the PauseEvent
 * nc.waitThen( 3, nc, "pause", [nc.pauseEvents.BoxPause] );
 *        
 * // wait 6 seconds, then call "resume"
 * // NOTE: At this point, "resume" is paused by the BoxPause event. This is why we must also
 * // pass the BoxPause event as the "pauseImmunity" parameter.
 * nc.waitThen( 6, nc, "resume", nc.pauseEvents.BoxPause , undefined, nc.pauseEvents.BoxPause );
 */
resume(pauseEvent){}


/** Defines a new SpeedControl. SpeedControls can be used to control the speed of time-based sequencing processes such as Motions, Swoops, or Timelines.
 * Applicable processes can subscribe to multiple SpeedControls; the 'speed' values of all of the SpeedControls a process subscribes to are multiplied together to determine
 * the overall pacing of the given time-based process.
 * All defined SpeedControls can be found at 'nc.speedControls'.
 * @param {string} speedControlName The name of the new SpeedControl.
 * @returns {SpeedControl}
 */
defineSpeedControl(speedControlName){}


/** Returns a dictionary containing lists of all active callbacks per AppEvent.
 * @returns {object}
 */
getAllEventRecipients(){return(null);}


/** Sets nc.singularFocusObject to nc.singularFocusObject.focusFallback.
 */
relinquishFocus(){}


/** Copies the given text to the clipboard.
 * @param {string} text The text to be copied to the clipboard.
 */
copyToClipboard(text){}


/** Retrieves text from the clipboard.
 * @async
 * @returns {string} text The text to be copied to the clipboard.
 */
async getClipboardText(){return("");}




/** Initiates the process of loading all of the assets in a given loading tier. 
 * This function does not need to be called for 'auto-loaded' LoadingTiers.
 * @param {number} tier The desired tier for loading. For a list of available LoadingTiers, see nc.LoadingTiers.
 * @param {boolean} [prioritize] Bool determining if the tier in question will jump to the frot of the loading queue. [DEFAULT: true]
 */
loadTier(tier,prioritize){}


/** Adds a callback that will be called once the designated tier(s) are loaded. A callback order can be provided to 
 * rank the order of the given callback.
 * @param {number|Array.<number>} tiers The tier or tiers whose loading will trigger this callback.
 * @param {object} callbackOwner The object owning the callback function.
 * @param {string} callbackName The name of the callback function.
 * @param {Array|any} [callbackArgs] Arguments for the callback function.
 * @param {number} [callbackOrder] Number designating the order the callback will be invoked relative to the other callbacks associated with this tier. A lower callbackOrder equates to an earlier callback. [DEFAULT: 0]
 */
addTierLoadedCallback(tiers,callbackOwner,callbackName,callbackArgs,callbackOrder){}


/** An awaitable asyncronous function that delays until the specified tier(s) are loaded.
 * @param {number|Array.<number>} tiers The tier or tiers whose loading is being awaited.
 * @async
*/
async awaitLoadedTiers(tiers){}
/** Adds Button functionality to the object supplied.
 * @param {object} obj The object that Button functionality is being added to.
 * @param {GraphicAsset} [graphicAsset=nc.graphicAssets.WhiteBox] The GraphicAsset that the new Button will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
 * @param {SceneObject} [parent=nc.mainScene] The SceneObject that will become the new Button's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name='Button'] The name of the new Button. [DEFAULT: 'Button']
 */
inheritButton(obj,graphicAsset,parent,name){};


/** Adds a Button set to the provided GraphicAsset as a child of the given SceneObject.
 * @param {GraphicAsset} [graphicAsset=nc.graphicAssets.WhiteBox] The GraphicAsset that the new Button will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
 * @param {SceneObject} [parent=nc.mainScene] The SceneObject that will become the new Button's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name='Button'] The name of the new Button. [DEFAULT: 'Button']
 * @returns {Button}
 * @example
 * // Objective: Use Incisor to add a Button.
 * // Expected Result: The console should display all of the properties of the new button. 
 * 
 * let button = nc.addButton( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
 * console.log(button);
 */
addButton(graphicAsset,parent,name){return(null);}
/** Adds OrthographicCamera functionality to the object supplied.
 * @param {object} obj The object that Camera functionality is being added to.
 * @param {SceneObject} [parent] The parent of the new Camera. [DEFAULT: nc.mainScene]
 * @param {string} [name] The name of the new Camera.
 */
inheritOrthographicCamera(obj,parent,name){}


/** Adds an OrthographicCamera to the given parent.
 * @param {SceneObject} [parent] The SceneObject that will become the new OrthographicCamera's parent. [DEFAULT: nc.mainScene] 
 * @param {string} [name] The name of the new OrthographicCamera. This name must be unique among camera names. [DEFAULT: OrthographicCamera]
 * @returns {OrthographicCamera}
 */
addOrthographicCamera(parent,name){return(null);}
/** Returns a Vector2 with the pixel resolution of nc.mainRenderTarget.
 * @returns {Vector2}
 */
getCanvasPixelResolution(){return(null);}







/** A means to manually create a ConstructDefinition. 
 * It should be noted that most users will not need to use this function, as Constructs are typically created in the Incisor® GUI.
 * @param {string} name The name of the new ConstructDefinition. This name must be a unique class name, must not start with digits, and must not contain special characters or spaces.
 * @param {Blueprint} [blueprint] Object containing the core instructions for recreating the collection of objects that will define this Construct. The function 'nc.gatherObjectBlueprint' can be used to get a Blueprint object from a pre-existing object. If this parameter is left undefined, then an empty Construct is defined.
 * @returns {ConstructDefinition}
 */
defineConstruct(name,blueprint){}


/** This function can be used to collect the core information needed to define a Construct based on a group of objects whithin a Scene. 
 * Just provide a root SceneObject and information about its entire sub-hierarchy will be gathered and returned in the form of a 'Blueprint' object,
 * which can then be used to define Constructs using 'nc.defineConstruct'.
 * It should be noted that most users will not need to use this functionality; it is used in the Creation of Constructs, which are typically just created in the Incisor® GUI. 
 * @param {SceneObject} sceneObject The root SceneObject to gather a Blueprint for.
 * @param {boolean} [includeRoot] If true, the provided root will be included in the construct, if false the root will be omitted. [DEFAULT: true]
 * @param {boolean} [includeDescendants] Boolean determining if the descendants will be included in the gathered blueprint. [DEFAULT: true] 
 */
gatherObjectBlueprint(sceneObject,includeRoot,includeDescendants){}


/** Recreates the objects stored in the Blueprint, placing them in the provided parent SceneObject, and returning the newly created root-most object(s).
 * This functionality is the foundation for Incisor® Constructs.
 * @param {SceneObject} parent The SceneObject that will be the parent of the newly recreated collection of objects.
 * @param {Blueprint} blueprint The blueprint containing the information about the collection of objects that will be recreated.
 * @returns {SceneObject}
 */ 
recreateObjectFromBlueprint(parent,blueprint){}


/** Duplicates the given source object according to its 'blueprint', which is the serialized form of objects used by Constructs.
 * It should be noted that this form of duplication will only capture values for standard components and properties - customizations
 * will be lost in the process.
 * @param {SceneObject} source The source object for the duplication.
 * @param {SceneObject} parent The SceneObject that will become the new copy's parent.
 * @param {boolean} [includeDescendants] Boolean determining if the source object's descendants will be included in the duplicate. [DEFAULT: true]
 * @returns {SceneObject}
 */
duplicateViaBlueprint(source,parent,includeDescendants){return(null);}


/** Adds CursorInputOverrideButton functionality to the object supplied.
 * @param {object} obj The object that CursorInputOverrideButton functionality is being added to.
 * @param {GraphicAsset} [graphicAsset] The GraphicAsset that the new CursorInputOverrideButton will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
 * @param {SceneObject} [parent] The SceneObject that will become the new CursorInputOverrideButton's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name] The name of the new CursorInputOverrideButton. [DEFAULT: 'CursorInputOverrideButton']
 */
inheritCursorInputOverrideButton(obj,graphicAsset,parent,name){};
/** Adds Curve functionality to the object supplied.
 * @param {object} obj The object that Curve functionality is being added to.
 * @param {SceneObject} parent The SceneObject that will become the new Curve's parent in the Scene hierarchy.
 * @param {string} name The name of the new Curve. [DEFAULT: 'Curve']
 */
inheritCurve(obj,parent,name){};


/** Adds a SceneObject as a child of the given SceneObject.
 * @param {SceneObject} parent The SceneObject that will become the new Curve's parent in the Scene hierarchy.
 * @param {string} name The name of the new Curve. [DEFAULT: 'Curve']
 */
addCurve(parent,name){};




/** Registers the given class definition as a CustomAddOn with the Incisor inspector. 
 * Once registered, instances of the given object can be added to other objects using the GUI (in the Construct Editor etc...).
 * @param {object} classDefinition The desired class definition to register with the Incisor inspector as a CustomAddOn. The provided class definition must inherit from a 'CustomAddOn' type such as 'CustomAddOn_SceneObject' or 'CustomAddOn_GraphicObject'.
 * @returns {CustomAddOnDefinition}
 */
registerCustomAddOn(classDefinition){return(null);}


/** Registers a property of the given CustomAddOn with Incisor. Registered properties are accessible for monitoring and manipulating
 * within the inspector. Registered properties can also be flagged as 'persistent', which enables their values to be stored in containing Constructs. 
 * @param {object} classDefinition The class definition of the CustomAddOn for which to register a property.
 * @param {string} propertyType The type of the property to register. The available types can be found in constants.registeredPropertyTypes
 * @param {Array.<string>|string} propertyPath The path to the desired property to register in terms of member names. If the property owned directly by the CustomAddOn, the name of the property can be provided as a single string. If the property is a sub-member of a property, each accessing member should be listed in an Array, or a single 'dot-separated' string can be provided.
 * @returns {RegisteredProperty}
 */
registerCustomAddOnProperty(classDefinition,propertyType,propertyPath){return(null);}




/** Registers the given class definition as a CustomObject with the Incisor inspector. 
 * Once registered, instances of the given object can be added to Constructs using the GUI (in the Construct Editor etc...).
 * @param {object} classDefinition The desired class definition to register with the Incisor inspector as a CustomObject. The provided class definition must inherit from a standard hierarchy object type such as SceneObject, GraphicObject, or Button etc...
 * @returns {CustomObjectDefinition}
 */
registerCustomObject(classDefinition){}


/** Registers a property of the given CustomObject with Incisor. Registered properties are accessible for monitoring and manipulating
 * within the inspector. Registered properties can also be flagged as 'persistent', which enables their values to be stored in containing Constructs. 
 * @param {object} classDefinition The class definition of the CustomObject for which to register a property.
 * @param {string} propertyType The type of the property to register. The available types can be found in constants.registeredPropertyTypes
 * @param {Array.<string>|string} propertyPath The path to the desired property to register in terms of member names. If the property owned directly by the CustomObject, the name of the property can be provided as a single string. If the property is a sub-member of a property, each accessing member should be listed in an Array, or a single 'dot-separated' string can be provided.
 * @returns {RegisteredProperty}
 */
registerCustomObjectProperty(classDefinition,propertyType,propertyPath){}




/** Removes the provided object from all Incisor® registries. 
 * Send any object slated for deletion to this function to ensure that references to the object are not being kept in Incisor®'s regestries.
 * Doing this can help prevent memory leaks.
 * @param {object} objectForDisposal The object that will be disposed.
 */
dispose(objectForDisposal){}

/** Defines a new EffectController for use in conjunction with an EffectNode.
 * EffectControllers provide the ability to dynamically control EffectNodes and their resulting visual effects.
 * EffectControllers are generally one of 3 base types, Vectors, numbers, and Textures.
 * Once defined, EffectControllers will be generally available on all SceneObjects, Materials, MaterialMaster, CharacterMaterial objects;
 * It should be noted that while these objects will have all EffectControllers as members, only the EffectControllers tied
 * to the objects' current EffectNodes will cause any change visually.
 * It should also be noted EffectControllers with 'mixMode=materialOnly' will not be available on SceneObjects for inheritance,
 * and will instead only be on Material and MaterialMaster objects for direct manipulation.
 * @param {string} name The name of the new EffectController. This name must be unique, and it must not contain any javascript delimeters (no spaces, commas, periods, etc...)
 * @param {string} baseType The base type of the new EffectController. For a list of available base types, see 'nc.constants.effectControllerBaseTypes'.
 * @param {Array.<string>} componentNames An array of names for the components of this EffectController. An example would be ['magnitude', 'brightness', 'fadeAmount']. It should be noted that EffectControllers with componentNames ["red","green","blue","alpha"] will automatically have type 'Color', and similarly componentNames ["x","y", etc...] will have the associated 'Vector' type. For non-Vector types this can be left undefined.
 * @param {Array.<number>|number|Texture} defaultValues An array of numbers (for Vector baseTypes), number (for number baseTypes), or Texture (for Texture baseTypes) that serve as the default value(s) for this EffectController's components.
 * @param {string} mixMode The means by which parent and child EffectControllers' values are blended together. Please note that a mixMode value of 'materialOnly' means that the given EffectController will only appear directly on Material and MaterialMaster objects, and therefore no mixing of values will ever take place. For a list of available mixModes, see 'nc.constants.effectControllerMixModes'.
 * @param {Array.<Array.<number>>} [likelyRanges] A list of likely ranges for the components of this EffectController. This is used to inform the Incisor® GUI, specifically the sensativity of EffectoController 'sliders'. [DEFAULT: [[0,10],[0,10]...]]
 * @param {string} [effectControllerDescription] Optional description to help populate IDE autocomplete related to this EffectController. [DEFAULT: ""]
 * @param {Array.<string>|string} [componentDescriptions] Optional list of component descriptions to help populate IDE autocomplete related to this EffectController. [DEFAULT: []]
 */
defineEffectController(name,baseType,componentNames,defaultValues,mixMode,likelyRanges,effectControllerDescription,componentDescriptions){}

/** Defines a new EffectNode. Defined EffectNodes are available at 'nc.effectNodes'.
 * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
 * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
 * which are accessable as direct members of the given SceneObject or Material.
 * When a GraphicObject is set to a particular GraphicAsset, it's Materials adopt the GraphicAsset's 
 * EffectNode and EffectController presets by default, but they can be customized at any time.
 * @param {string} name The name of the new EffectNode. This name must be unique among EffectNodes.
 * @param {Array.<string>|string} vertexNodeSupport The portion of the GLSL shader code for this EffectNode above the 'vertex main'. This segment of code is where uniform and varying variables for the vertex portion of this effect are likely to be declared.
 * @param {string} vertexNode The portion of the GLSL shader code for this EffectNode within the 'vertex main'. This segment of code is is where this effect can make its adjustments to the 'vertex' vec3.
 * @param {Array.<string>|string} fragmentNodeSupport The portion of the GLSL shader code for this EffectNode above the 'fragment main'. This segment of code is where uniform and varying variables for the fragment portion of this effect are likely to be declared.
 * @param {string} fragmentNode The portion of the GLSL shader code for this EffectNode within the 'fragment main'. This segment of code is is where this effect can make its adjustments to the 'fragment' vec4.
 * @param {Array.<EffectControllerDefinition>|EffectControllerDefinition} associatedEffectControllers The array of the EffectController that this EffectNode is associated with. These EffectControllers will be the means of dynamic manipulation for this EffectNode's visual effects. See 'nc.effectControllers' for a list of available EffectControllers.
 * @param {boolean} [requiresDerivativesShaderExtension] Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'FragDepth' extension. [DEFAULT: false]
 * @param {boolean} [requiresFragDepthShaderExtension] Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'FragDepth' extension. [DEFAULT: false]
 * @param {boolean} [requiresDrawBuffersShaderExtension] Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'DrawBuffers' extension. [DEFAULT: false]
 * @param {boolean} [requiresTextureLODShaderExtension] Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'TextureLOD' extension. [DEFAULT: false]
 * @returns {EffectNode}
 */
defineEffectNode(name,vertexNodeSupport,vertexNode,fragmentNodeSupport,fragmentNode,associatedEffectControllers,requiresDerivativesShaderExtension,requiresFragDepthShaderExtension,requiresDrawBuffersShaderExtension,requiresTextureLODShaderExtension){return(null);};




/** Defines a new FlowController
 * FlowControllers provide a way to organize the general flow of state-based items in a project.
 * For example if your project is a game with an intro, a menu, and several levels,
 * you could create a FlowController named "GameFlowController" and then define and add an 'Intro' FlowState,
 * a 'Menu' FlowState, and 'LevelXX' FlowStates to that FlowController. Within each FlowState in the FlowController,
 * timed callback elements can be added to help define the sequencing within each FlowState.
 * Once created, FlowControllers, FlowStates, and FlowStateElements can be accessed via 'nc.flows'.
 * This class is not meant to be instantiated or provided directly to 'FlowController.addFlowState', rather it is meant
 * to be a class for user-defined FlowStates to extend.
 * Use 'nc.flows' to access the newly defined FlowController.
 * @param {string} name The name of the new FlowController
 */
defineFlowController(name){}


/** Defines a new square 100x100 Geometry, and returns a GeometryEditor object for further customization.
 * @param {string} name The name of the new Geometry being defined. This name must be unique among Geometries.
 * @param {boolean} createBox Whether to initialize the geometry with a 100x100 box with positon and uv attributes. [DEFAULT: true]
 * @returns {GeometryEditor}
 */
defineGeometry(name, createBox){return(null);}


/** Asyncronously retrieves a GeometryEditor to enable the editing of the Geometry provided.
 * Please note that before you attempt to do any editing, the source Geometry must be loaded;
 * you must either asyncronously await this function call, or provide a callback, which will be called
 * once the souece Geometry is loaded. The first parameter of the callback will be the desired GeometryEditor. 
 * @param {Geometry} geometry The source Geometry to be edited.
 * @param {object} [callbackOwner] The object owning the callback that will be called when the source Geometry loads. 
 * @param {string} [callbackName] The name of the callback that will be called when the source Geometry loads. 
 * @param {Array|any} [callbackArgs] The arguments for the callback that will be called when the source Geometry loads. 
 * @async  
 * @returns {GeometryEditor}
*/
async editGeometry(geometry,callbackOwner,callbackName,callbackArgs){return(null);}

/** Defines a new GraphicAsset from a supplied PixelsObject. See 'nc.graphicAssets' for a list of all available GraphicAssets.
 * @param {string} name The name of the new GraphicAsset. This name must be unique among registered GraphicAssets, Geometries, and Textures.
 * @param {PixelsObject} pixelsObject The PixelsObject that will be the source for this new GraphicAsset.
 * @param {boolean} [includeNormals] Boolean determining if the vertex data in the geometry of the new GraphicAsset will have the 'normals' attribute. [DEFAULT: false]
 * @returns {GraphicAsset}
 */
defineGraphicAssetFromPixelsObject(name,pixelsObject,includeNormals){return(null);}


/** Defines a new GraphicAsset based on the RenderTarget supplied. Unless otherwise specified, this GraphicAsset will have
 * a dynamic connection to the RenderTarget, so that if the RenderTarget is rendered to, GraphicObjects set to this new GraphicAsset
 * will reflect new contents of the RenderTarget.
 * See 'nc.graphicAssets' for a list of all available GraphicAssets.
 * @param {string} name The name of the new GraphicAsset. This name must be unique among registered GraphicAssets, Geometries, and Textures.
 * @param {RenderTarget} renderTarget The RenderTarget that will be the source for this new GraphicAsset.
 * @param {boolean} [disconnectFromRenderTarget] Boolean determining if the new GraphicAsset will maintain a dynamic connection to the supplied RenderTarget. [DEFAULT: false]
 * @param {boolean} [includeNormals] Boolean determining if the vertex data in the geometry of the new GraphicAsset will have the 'normals' attribute. [DEFAULT: false]
 * @returns {GraphicAsset}
 */
defineGraphicAssetFromRenderTarget(name,renderTarget,disconnectFromRenderTarget,includeNormals){return(null);}


/** Defines a new GraphicAsset based on the Texture and Geometry supplied.
 * See 'nc.graphicAssets' for a list of all available GraphicAssets.
 * @param {string} name The name of the new GraphicAsset. This name must be unique among registered GraphicAssets.
 * @param {Texture} texture The Texture that will be the source Texture for this new GraphicAsset.
 * @param {Geometry} geometry The Geometry that will be the source Geometry for this new GraphicAsset.
 * @returns {GraphicAsset}
 */
defineGraphicAssetFromTextureAndGeometry(name,texture,geometry){return(null);}


/** Defines a new GraphicAsset based on the image base64 supplied.
 * See 'nc.graphicAssets' for a list of all available GraphicAssets.
 * @param {string} name The name of the new GraphicAsset. This name must be unique among registered GraphicAssets.
 * @param {string} imageBase64 The base64 string for the image to be made into a GraphicAsset.
 * @returns {GraphicAsset}
 */
defineGraphicAssetFromImageBase64(name,imageBase64){return(null);}
/** 
 * Adds GraphicObject functionality to the object supplied.
 * @param {object} obj The object that GraphicObject functionality is being added to.
 * @param {GraphicAsset} [graphicAsset=nc.graphicAssets.WhiteBox] The GraphicAsset that the new GraphicObject will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
 * @param {SceneObject} [parent=nc.mainScene] The SceneObject that will become the new GraphicObject's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name='GraphicObject'] The name of the new GraphicObject. [DEFAULT: 'GraphicObject']
 */
inheritGraphicObject(obj,graphicAsset,parent,name){};


/** 
 * Adds a GraphicObject set to the provided GraphicAsset as a child of the given SceneObject.
 * @param {GraphicAsset} [graphicAsset=nc.graphicAssets.WhiteBox] The GraphicAsset that the new GraphicObject will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
 * @param {SceneObject} [parent=nc.mainScene] The SceneObject that will become the new GraphicObject's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name='GraphicObject'] The name of the new GraphicObject. [DEFAULT: 'GraphicObject']
 * @returns {GraphicObject}
 * @example
 * // Objective: Use Incisor to add a GraphicObject, rotate it, change its color and move its position.
 * // Expected Result: You should see a blue, diamond shaped box, moved up and left of center. 
 * 
 * let graphicObject = nc.addGraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "MyGraphicObject" );
 * 
 * // rotate 45 degrees around the z axis to create a "diamond" shape
 * graphicObject.rotation.z = 45;
 * // set the red and green channels to zero to make the box blue
 * graphicObject.colorMultiply.red = 0;
 * graphicObject.colorMultiply.green = 0;
 * // move the box up and to the left
 * graphicObject.position.x = -500;
 * graphicObject.position.y = 500;
 */
addGraphicObject(graphicAsset,parent,name){return(null);}


/** 
 * Defines a new MaskGroup. MaskGroups can be used to selectively render partial areas of GraphicObjects.
 * Once a MaskGroup is defined, GraphicObjects can be made into 'masks', which results in their shape
 * contributing to the MaskGroup area. GraphicObjects can also be made into 'masked', which results in
 * them only rendering within the designated MaskGroup area.
 * Please note that the masking area is calculated off of the full-fill Geometry of the 'mask' GraphicObjects;
 * the transperancy of pixels within a 'mask' GraphicObject does not make any difference to masking.
 * @param {string} maskGroupName The name of the new MaskGroup. This must be a unique name among MaskGroups.
 * @returns {MaskGroup}
 * @example
 * // Objective: Use a mask to reveal only a portion of the phrase "Hello World."
 * // Expected Result: You will see the word "World." on screen.
 * 
 * // define "MyMask"
 * let maskGroup = nc.defineMaskGroup( "MyMask" );
 *  
 * // create a TextBox
 * let textBox = nc.addTextBox( nc.mainScene );
 * textBox.string = "Hello World.";
 * textBox.masking.makeMasked( nc.maskGroups.MyMask ); // mask it with "MyMask"
 * 
 * // create a GraphicObject rectangle and position it to cover the word "World."
 * this.masker = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Masker" );
 * this.masker.scale.x = 2; // rectangle
 * this.masker.position.x = 75; // position
 * this.masker.masking.makeMask( nc.maskGroups.MyMask ); // make it a masker for "MyMask"
 */
defineMaskGroup(maskGroupName){return(null);}








/** Adds LayoutStack functionality to the object supplied.
 * @param {object} obj The object that LayoutStack functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new LayoutStack's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new LayoutStack. [DEFAULT: 'LayoutStack']
 */
inheritLayoutStack(obj,parent,name){}


/** Adds a LayoutStack as a child of the given SceneObject.
 * @param {SceneObject} [parent] The SceneObject that will be the new LayoutStack's parent.
 * @param {string} [name] The name of the new LayoutStack. [DEFAULT: 'LayoutStack']
 * @returns {LayoutStack}
 * @example
 * // Objective: Use a LayoutStack to vertically align elements.
 * // Expected Result: You will see 3 elements stacked vertically.
 * 
 * // create a TextAssembly
 * let text = new TextAssembly( nc.mainScene, "MyText" );
 * text.string = "With Incisor, you need only build it once.";
 * 
 * // create a white box GraphicObject
 * let whiteBox = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "MyWhiteBox" );
 * 
 * // create a link
 * let link = new TextBox( nc.mainScene, "MyButton" );
 * link.string = "Click Here";
 * link.colorMultiply = new Color( 0, 0, 1, 1 );
 * link.scale.x = .5;
 * link.scale.y = .5;
 * 
 * // add a LayoutStack to the main Scene and add 3 elements to it
 * let layoutStack = nc.addLayoutStack( nc.mainScene, "MyLayoutStack" );
 * layoutStack.addElements( [text, whiteBox, link ] );
 * layoutStack.isVertical = true; // set vertical alignment
 */
addLayoutStack(parent,name){return(null);}
/** Adds LazyUpdater functionality to the object supplied.
 * @param {object} obj The object that LazyUpdater functionality is being added to.
 * @param {object} updateCallbackOwner The object owning the callback function being managed by this LazyUpdater.
 * @param {string} updateCallbackName The name of the callback function being managed by this LazyUpdater.
 * @param {Array|any} [updateCallbackArgs] Arguments for the callback function. 
 */
inheritLazyUpdater(obj,updateCallbackOwner,updateCallbackName,updateCallbackArgs){}






/** Adds Matrix4 functionality to the object supplied.
 * @param {object} obj The object that Martix4 functionality is being added to.
 */
inheritMatrix4(obj){};





/** Defines a new MotionType. MotionTypes are used in conjunction with 'Motions' and define a method of continuous change for numeric properties.
 * The MotionType 'Pendulum' is automatically defined, which defines a smooth sinusoidal oscillation between the lower and upper bounds. 
 * All defined MotionTypes can be found at 'nc.motionTypes'.
 * @param {string} name The name of the new MotionType.
 * @param {Function} motionFunction The function controlling the continuous change of the numeric properties being affected by the Motion using this MotionType. This function should be implemented to take a single 'Motion' parameter, using it's 'progress', 'lowerBound', 'upperBound', 'motionSpeed', and 'motionArgs' members to calculate and return an array of current values.
 * @param {Array.<string>} [motionControllerNames] The names of optional controllers that can be used to dynamically affect the nature of the motion type.
 * @param {Array.<number>} [motionControllerDefaultValues] The default values of optional controllers that can be used to dynamically affect the nature of the motion type.
 * @param {string} [description] The description of the MotionType - this will appear in the autocomplete documentation.
 * @param {Array.<string>} [controllerDescriptions] The descriptions of the MotionType controllers - these will appear in the autocomplete documentation.
 * @returns {MotionType}
 * @example
 * // Objective: Define a custom MotionType.
 * // Expected Result: The white box will move continuously in a circular motion.
 *
 * function moveInCircleFunction(motion) {   
 *     let progress = motion.progress;
 *     // Calculate circle center and radius.
 *     let centerX = (motion.lowerBounds[0]+motion.upperBounds[0])*.5;
 *     let centerY = (motion.lowerBounds[1]+motion.upperBounds[1])*.5;
 *     let radiusX = motion.upperBounds[0]-centerX;
 *     let radiusY = motion.upperBounds[1]-centerY;
 *     // Apply circle math.
 *     motion.currentValues[0]=centerX+radiusX*Math.cos(progress*Math.PI);
 *     motion.currentValues[1]=centerY+radiusY*Math.sin(progress*Math.PI);
 *     motion.currentValues[2]=0;
 * }
 * 
 * // Define 'MoveInCircle' Motion
 * nc.defineMotionType(
 *     "MoveInCircle",
 *     moveInCircleFunction,
 *     undefined,
 *     undefined,
 *     "This MotionType moves x and y components in a circle."
 *  );
 * 
 *  // Create a GraphicObject.
 *  let graphicObject = new GraphicObject();
 *  // Add a motion to the GraphicObject's position using the 'MoveInCircle' TweenType. A 'Motion' object is returned and can be manipulted.
 *  let motion = graphicObject.position.addMotion.each([-300,-100,0],[300,100,10],1,nc.motionTypes.MoveInCircle);
 */
defineMotionType(name,motionFunction,motionControllerNames,motionControllerDefaultValues,description,controllerDescriptions){}



/** Adds a motion defining a continuous change a given numeric property or set of properties, and returns a Motion object, which can be used to control the motion dynamically.
 * @param {object|Array.<object>} propertyOwners The object or array of objects owning the numeric properties to add motion to.
 * @param {string|Array.<string>} propertyNames The name or array of names of the numeric properties to add motion to.
 * @param {number|Array.<number>} lowerBounds The lower bounds for the motion being added.
 * @param {number|Array.<number>} upperBounds The upper bounds for the motion being added.
 * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
 * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion.
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion.
 * @returns {Motion}
 * @example
 * // Objective: Add motion to the white box along the x axis.
 * // Expected Result: The white box should continuously move back and forth.
 * 
 * let whiteSquare = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteSquare" );
 * // add motion to the "x" property of the position of the white square
 * nc.addMotion( whiteSquare.position, "x", -500, 500, .5 );
 */
addMotion ( propertyOwners,propertyNames , lowerBounds , upperBounds,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){}



/**
 * Defines a new ParticleSystemDefinition. This can then be used to instantiate a new ParticleSystem.
 * Multiple ParticleSystemDefinitions that use the same ParticleSystemDefinition will share the Geometry and EffectNode created by the ParticleSystemDefinition.
 * Therefore, creation of additional ParticleSystemDefinitions that use the same ParticleSystemDefinition incur much less memory usage and initialization time compared to multiple ParticleSystemDefinitions that each use their own ParticleSystemDefinition.
 * @param {string} name The name of the ParticleSystemDefinition.
 * @returns {ParticleSystemDefinition}
 */
defineParticleSystem(name){}


/** 
 * Adds a ParticleSystem set to the provided ParticleSystemDefinition as a child of the given SceneObject.
 * @param {ParticleSystemDefinition} [particleSystemDefinition] The definition used to build this ParticleSystem. If left undefined, then 'MainParticleSystem' will be chosen - if 'MainParticleSystem' is not yet defined, it will automatically be defined and then used as the default. [DEFAULT: nc.particleSystemDefs.MainParticleSystem]
 * @param {SceneObject} [parent] The SceneObject that will become the new ParticleSystem's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name] The name of the new ParticleSystem. [DEFAULT: 'ParticleSystem']
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this ParticleSystem will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this ParticleSystem is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @returns {ParticleSystem}
 * @example
 * // Objective: Add a ParticleSystem.
 * // Expected Result: You will see white triangles continuously "bursting" out from the center of the screen.
 *
 * // add a ParticleSystem using the predefined "BurstWithGravity" ParticleSystemDefinition
 * let particles = nc.addParticleSystem( nc.particleSystemDefs.BurstWithGravity, nc.mainScene, "MyParticles" );
 * particles.playbackController.play();
 */
addParticleSystem(particleSystemDefinition,parent,name,pauseImmunity,speedControl){return(null);}


/** Adds ParticleSystemRamp1 functionality to the object supplied.
 * @param {object} obj The object that ParticleSystemRamp1 functionality is being added to.
 */
inheritParticleSystemRamp1(obj){}


/** Adds ParticleSystemRamp2 functionality to the object supplied.
 * @param {object} obj The object that ParticleSystemRamp2 functionality is being added to.
 */
inheritParticleSystemRamp2(obj){}


/** Adds ParticleSystemRamp3 functionality to the object supplied.
 * @param {object} obj The object that ParticleSystemRamp3 functionality is being added to.
 */
inheritParticleSystemRamp3(obj){}


/** Adds ParticleSystemRamp4 functionality to the object supplied.
 * @param {object} obj The object that ParticleSystemRamp4 functionality is being added to.
 */
inheritParticleSystemRamp4(obj){}







/** Adds PlaybackController functionality to the object supplied.
 * @param {object} obj The object that PlaybackController functionality is being added to.
 * @param {string} [name] The name of the PlaybackController. [DEFAULT: "PlaybackController"]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this PlaybackController will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this PlaybackController is affected by. [DEFAULT: nc.defaultSpeedControl]
 */
inheritSceneObject(obj,name,pauseImmunity,speedControl){}


/** Defines a new Precomp with the given name.
 * @param {string} name The name of the new Precomp. This name must be unique among Precomps, GraphicAssets, Geometries, and Textures.
 * @param {number} coreWidth The number informing the initial coreViewWidth of the Precomp's Camera, and the initial coreWidth of the Precomp's RenderTarget.
 * @param {number} coreHeight The number informing the initial coreViewHeight of the Precomp's Camera, and the initial coreHeight of the Precomp's RenderTarget. 
 * @param {boolean} autoRender The initial 'autoRender' setting for the Precomp's Camera. It should be noted that if autoRender is set to false, an internal callback will automatically render this Precomp once when its content is loaded.
 * @returns {Precomp}
 */
definePrecomp(name,coreWidth,coreHeight,autoRender){return(null);}







/** Adds RenderTarget functionality to the supplied object.
 * @param {object} obj The object to give RenderTarget funcionality to.
 * @param {string} name The name given to the RenderTarget. This name must be unique.
 * @param {number} coreWidth The base width value of this RenderTarget, prior to the application of any automatic resolution or aspect ratio adjustments that can occur.
 * @param {number} coreHeight The base height value of this RenderTarget, prior to the application of any automatic resolution or aspect ratio adjustments that can occur.
 */
inheritRenderTarget(obj,name,coreWidth,coreHeight){}


/** Sanitizes the provided name to make it suitable for code by removing any leading digits, spaces, or special characters.
 * @param {string} name The name to be sanitized.
 * @returns {string}
 */
sanitizeNameForCode(name){return(null);}


/** Adds SceneObject functionality to the object supplied.
 * @param {object} obj The object that SceneObject functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new SceneObject's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new SceneObject. [DEFAULT: 'SceneObject']
 */
inheritSceneObject(obj,parent,name){}


/** Returns a list of all of the ancesters of the given SceneObject. Ancesters consist of the SceneObject's parent, and that parent's parent, etc...
 * @param {SceneObject} sceneObject The SceneObject whose ancestors will be listed.
 * @returns {Array.<SceneObject>}
 */
getAncestors(sceneObject){return(null);}


/** Returns a list of all of the descendants of the given SceneObject. Descendants consist of the SceneObject's children, and their children, etc...
 * @param {SceneObject} sceneObject The SceneObject whose descendants will be listed.
 * @param {boolean} enabledOnly Boolean determining if only enabled SceneObjects are added to the returned list. [DEFAULT: true]
 * @param {boolean} includeEnclosedScenes Boolean determining if sub-descendants of ScrollingPanels' Scenes will be included in the returned list. [DAFAULT: false]
 * @returns {Array.<SceneObject>}
 */
getDescendants(sceneObject,enabledOnly,includeEnclosedScenes){return(null);}


/** Adds a SceneObject as a child of the given SceneObject.
 * @param {SceneObject} [parent] The SceneObject that will be the new SceneObject's parent.
 * @param {string} [name] The name of the new SceneObject. [DEFAULT: 'SceneObject']
 * @returns {SceneObject}
 * @example
 * // Objective: Add a SceneObject with a graphic and rotate it.
 * // Expected Result: The white box has rotated 45 degrees into a diamond shape.
 * 
 * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
 * let mySceneObject = nc.addSceneObject( nc.mainScene, "MySceneObject" );
 * // Add a GraphicObject to the SceneObject using the GraphicObject constructor.
 * // Note: To use a custom graphic, add your image file to the assets directory and access it using nc.graphicAssets['MyImage']
 * new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "MyGraphicObject" );
 * // Rotate the SceneObject 45 degrees around the z axis.
 * mySceneObject.rotation.z = 45;
 */
addSceneObject(parent,name){return(null);}


/** Returns the list of LoadingTiers that must be loaded for the given SceneObject, its descendants, and all Textures and Geometries to be fully loaded.
 * @param {SceneObject} sceneObject The SceneObject whose LoadingTier will be assessed.
 * @param {boolean} [ignoreCachedAssessment] Boolean determining if any cached assessments will be ignored, forcing an entirely new assessment to be made. [DEFAULT: false]
 * @returns {Array.<number>}
 */
assessCumulativeLoadingTierRequirements(sceneObject,ignoreCachedAssessment){return(null);}
/** Adds Scene functionality to the object supplied.
 * @param {object} obj The object that Scene functionality is being added to.
 * @param {string} name The name of the new Scene.
 */
inheritScene(obj,name){}


/** Defines a new Layer within a Scene.
 * @param {string} name The name of the new Layer.
 * @param {Scene} [scene] The Scene in which to define a new layer. [DEFAULT: nc.mainScene]
 * @param {Layer} [placeBehindThisLayer] Supply this optional Layer, and the newly defined Layer will be populated behind the provided Layer. [DEFAULT: nc.layers.DefaultLayer]
 */
defineLayer(name,scene,placeBehindThisLayer){}


/** Adds a Scene to the project.
 * @param {string} [name] The name of the new Scene. The name of the Scene must be unique. [DEFAULT: 'Scene']
 * @returns {Scene}
 */
addScene(name){return(null);}


/** Saves a screen shot of the project, and returns the path of the new screen shot.
* @param {string} path The path to the screenshot. If left undefined, a timestamped screen shot will be placed in the directory indicated by 'ProjectSettings.screenShotDestination'.
* @param {boolean} isPathRelative  Boolean determining if the screen shot's path is relative to the project.
* @returns {string}
* [REQUIREMENT: module - pixelsObjects]
* [REQUIREMENT: license - fileIO]
* [REQUIREMENT: unpublished only]
*/
saveScreenShot(path,isPathRelative){return(null);}
/** Adds ScrollingPanel functionality to the object supplied.
 * @param {object} obj The object that ScrollingPanel functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new ScrollingPanel's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new ScrollingPanel. [DEFAULT: 'ScrollingPanel']
 */
inheritScrollingPanel(obj,parent,name){};

/** Defines a new group of sounds that will stay synced while looping. 
 * Sounds in HTML5 run on a separate thread from the main javascript thread, and as a result there can be small delays between
 * the instructions to play sounds, and when the sounds actually play. These discrepancies can lead to difficulty with keeping 
 * multiple looping tracks in sync. This function creates a group of sounds whose instructions are linked in a way that keeps
 * them in sync, regardless of pausing/resuming, changes to volume, or lazy-loaded sounds starting mid-stream.
 * [REQUIREMENT: module - sounds]
 * @param {string} name The name of the new SyncedLoopingTrackGroup. This name must be unique among SyncedLoopingTrackGroups.
 * @param {Array.<Sound>} includedSounds Array of Sounds to include in the SyncedLoopingTrackGroup.
 */
defineSyncedLoopingTrackGroup(name,includedSounds){}


/** Defines a new VolumeControl. 
 * VolumeControls are a way to control the volumes of groups of sounds, much like a 'audio bus'.
 * To make a particular Sound subscribe to a VolumeControl, add the VolumeControl to the Sound's 'volumeControl' array.
 * [REQUIREMENT: module - sounds]
 * @param {string} name The name of the new VolumeControl. This name must be unique among VolumeControls.
 * @returns {VolumeControl}
 */
defineVolumeControl(name){return(null);}





/** Adds Supervisor functionality to the object supplied.
 * @param {object} obj The object that Supervisor functionality is being added to.
 * @param {SceneObject} owner The SceneObject owning the visual components associated with the Supervisor.
 */
inheritSupervisor(obj,owner){};


/** Defines a new TweenType. TweenTypes are used in conjunction with Swoopers and define a method of interpolation between any two values or sets of values.
 * The TweenType 'Linear' is automatically defined, and it defines a perfectly even interpolation between the startValues and endValues.
 * TweenTypes can vary the timing of interpolation between two sets of values, as well as the path of the interpolation.
 * All defined TweenTypes can be found at 'nc.tweenTypes'.
 * @param {string} name The name of the new TweenType.
 * @param {Function} tweenFunction The function controlling the interpolation between values. This function should be implemented to take a single 'Swooper' parameter, using it's 'progress', 'startValues', 'endValues', and 'tweenArgs' members to calculate and set its 'currentValues' property.
 * @param {Array.<string>} [tweenControllerNames] The names of optional controllers that can be used to dynamically affect the nature of the motion for this TweenType.
 * @param {Array.<number>} [tweenControllerDefaultValues] The default values of th optional controllers that can be used to dynamically affect the nature of the motion for this TweenType.
 * @param {string} [description] The description of the TweenType - this will appear in the autocomplete documentation.
 * @param {Array.<string>} [controllerDescriptions] The descriptions of the TweenType controllers - these will appear in the autocomplete documentation.
 * @returns {TweenType}
 * @example
 * // Objective: Define a custom TweenType.
 * // Expected Result: The white box will zigzag while moving up along the y axis.
 * 
 * // create a white box
 * let graphic = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
 * 
 * // define a TweenType function. Use the given swooper progress 
 * // to update the box's position as it completes its swoop
 * let myTweenFunction = function( swooper ) {
 *     let progress = swooper.progress;
 *   
 *     let updatedX = swooper.currentValues[0] ? swooper.currentValues[0] : 0;
 *     let updatedY = swooper.endValues[1] * progress;
 * 
 *      if ( progress < .20 ) {
 *          updatedX += 10 * progress;
 *      } else if ( progress >= .20 && progress < .40 ) {
 *          updatedX -= 8 * progress;
 *      } else if ( progress >= .40 && progress < .60 ) {
 *          updatedX += 6 * progress;
 *      } else if ( progress >= .60 && progress < .80 ) {
 *          updatedX -= 4 * progress;
 *      } else {
 *          updatedX += 2 * progress;
 *      }
 *  
 *      swooper.currentValues = [ updatedX, updatedY, 0 ];
 * 
 *  }
 * 
 * // define the TweenType with our custom function and swoop the box's position
 * let myTweenType = nc.defineTweenType( "MyTweenType", myTweenFunction );
 * graphic.position.swoop.each( [0,500,0], 10, myTweenType );
 */
defineTweenType(name,tweenFunction,tweenControllerNames,tweenControllerDefaultValues,description,controllerDescriptions){}


/** Swoops (interpolates) a given numeric property from its current value to a designated end value over a duration.
 * @param {object} propertyOwner The object owning the numeric property to be swooped.
 * @param {string} propertyName The name of the numeric property to be swooped.
 * @param {number} endValue The ending value for the numeric property being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [updaterCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [updaterCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 * @example
 * // Objective: Adjust the motion speed of a "bouncing" white box.
 * // Expected Result: The white box will bounce, gradually slowing down over a period of 5 seconds, then it will gradually speed back up over a period of 5 seconds.
 * 
 * // Create a GraphicObject using the white box GraphicAsset and add it to the main Scene.
 * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "MyGraphicObject" );
 * // Give the box motion along the y axis. Set the speed to 2.
 * myGraphicObject.position.addMotion.y(-300,300,2);
 *  
 * // Swoop the 'speed' property of the MainSpeedControl down to .05 over a period of 5 seconds and provide callback arguments to swoop the 'speed' property again back up to speed 1 over a period of 10 seconds.
 * nc.swoopValue( 
            nc.speedControls.MainSpeedControl, 
            "speed", 
            .05, 
            5, 
            undefined, 
            nc, 
            "swoopValue", 
            [nc.speedControls.MainSpeedControl, "speed", 1, 10] 
            );
 */
swoopValue(propertyOwner,propertyName,endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,updaterCallbackOwner,updaterCallbackName){}


/** Swoops (interpolates) a given set of numeric properties from their current values to a designated set of end values over a duration.
 * @param {Array.<object>} propertyOwners The object or objects owning the numeric properties to be swooped.
 * @param {Array.<string>} propertyNames The names of the numeric property to be swooped.
 * @param {Array.<number>} endValues The ending values for the numeric properties being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [updaterCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [updaterCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 */
swoopValues(propertyOwners,propertyNames,endValues,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,updaterCallbackOwner,updaterCallbackName){}



/** Adds TextAssembly functionality to the object supplied.
 * @param {object} obj The object that TextAssembly functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new TextAssembly's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new TextAssembly.
 */
inheritTextAssembly(obj,parent,name){}


/** Adds a TextAssembly as a child of the given SceneObject.
 * @param {SceneObject} [parent] The SceneObject that will become the new TextAssembly's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name] The name of the new TextAssembly. [DEFAULT: 'TextBox']
 * @returns {TextAssembly}
 * @example
 * // Objective: Add a TextAssembly.
 * // Expected Result: You will see the text "Incisor - Build It Once." on screen.
 * 
 * let textAssembly = nc.addTextAssembly( nc.mainScene );
 * textAssembly.string = "Incisor - Build It Once."
 */
addTextAssembly(parent,name){return(null);}



/** Adds TextBox functionality to the object supplied.
 * @param {object} obj The object that TextBox functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new TextBox's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new TextBox.
 */
inheritTextBox(obj,parent,name){}


/** Adds a TextBox as a child of the given SceneObject.
 * @param {SceneObject} [parent] The SceneObject that will become the new TextBox's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
 * @param {string} [name] The name of the new TextBox. [DEFAULT: 'TextBox']
 * @returns {TextBox}
 * @example
 * // Objective: Add a TextBox.
 * // Expected Result: You will see the text "Incisor - Build It Once." on screen.
 * 
 * let textBox = nc.addTextBox( nc.mainScene );
 * textBox.string = "Incisor - Build It Once."
 */
addTextBox(parent,name){return(null);}



/** Adds TextFormat functionality to the object supplied.
 * @param {object} obj The object that TextFormat functionality is being added to.
 * @param {string} [fontName] The name of the font that characters with this TextFormat will use. [DEFAULT: "MainFont"]
 * @param {number} [characterScaleX] The x-axis scale multiplier for the characters that use this TextFormat. [DEFAULT: 1]
 * @param {number} [characterScaleY] The y-axis scale multiplier for the characters that use this TextFormat. [DEFAULT: 1]
 * @param {number} [kerning] Number representing an added or reduced spacing between the characters that use this TextFormat [DEFAULT: 0]
 * @param {number} [verticalShift] Number representing a veritcal offset that will be applied to the characters that use this TextForamt. [DEFAULT: 0]
 * @param {number} [lineHeightMultiplier] Number that multiplies the effective layout height of the characters that use this TextFormat. [DEFAULT: 1]
 */
inheritTextFormat(obj,fontName,characterScaleX,characterScaleY,kerning,verticalShift,lineHeightMultiplier){}


/** Defines a new Texture from a supplied PixelsObject or Base64 string. For a list of all available Textures, see 'nc.textures'.
 * @param {string} name The name of the new Texture. This name must be unique among registered Textures.
 * @param {PixelsObject|string} source The source for this new Texture - either a PixelsObject or the base64 string .
 * @returns {Texture}
 */
defineTexture(name,source){};


/** Defines new Textures from a supplied array of PixelsObjects or Base64 strings. 
 * Use this function instead of 'nc.defineTexture' when creating many textures, 
 * as it is able to asynchronously multi-task the creation of the Textures, making it faster in that scenario.
 * @param {Array.<string>} names The names of the new Textures. Each name must be unique among registered Textures.
 * @param {Array.<PixelsObject>|Array.<string>} sources The sources for these new Textures - either an array of PixelsObjects or the array of base64 strings.
 * @returns {Array.<Texture>}
 */
defineTextures(names,sources){};





/** Retrieves the given phrase from the ProjectTranscript.
 * This function is similar to using 'nc.phrases' to fetch phrases, but additionaly it includes a parameter 
 * that can be used to populate dynamic values in phrases with dynamic value tags (i.e. '{value:myDynamicValue}').
 * To populate a dynamic value in a phrase containing a dynamic value tag, include a dictionary with the dynamic 
 * values in the 'dynamicValues' parameter (i.e. {myDynamicValue:1000}). 
 * @param {string} phraseID The ID of the phrase to be fetched. A dictionary of phraseIDs can be found at 'nc.phraseIDs'.
 * @param {object} [dynamicValues] Optional dictionary of dynamic values to be populated within the phrase.
 * @returns {string}
 */
getPhrase(phraseID,dynamicValues){return(null);}


/** Adds UiBooleanSupervisor_checkbox functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiBooleanSupervisor_checkbox functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiBooleanSupervisor_checkbox's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiBooleanSupervisor_checkbox. [DEFAULT: 'UiBooleanSupervisor_checkbox']
 */
inheritUiBooleanSupervisor_checkbox(obj,parent,name){}


/** Adds UiButton functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiButton functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiButton's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiButton. [DEFAULT: 'UiButton']
 */
inheritUiButton(obj,parent,name){}


/** Adds UiCollapsibleStack functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiCollapsibleStack functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiCollapsibleStack's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiCollapsibleStack. [DEFAULT: 'UiCollapsibleStack']
 */
inheritUiCollapsibleStack(obj,parent,name){}


/** Adds UiDropDownMenu functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiDropDownMenu functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiDropDownMenu's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiDropDownMenu. [DEFAULT: 'UiDropDownMenu']
 */
inheritUiDropDownButton(obj,parent,name){}


/** Adds UiGraphicButton functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiGraphicButton functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiGraphicButton's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiGraphicButton. [DEFAULT: 'UiGraphicButton']
 */
inheritUiGraphicButton(obj,parent,name){}




/** Adds UiLinkButton functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiLinkButton functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiLinkButton's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiLinkButton. [DEFAULT: 'UiLinkButton']
 */
inheritUiLinkButton(obj,parent,name){}


/** Adds UiMenu functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiMenu functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiMenu's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiMenu. [DEFAULT: 'UiMenu']
 */
inheritUiMenu(obj,parent,name){}


/** Adds UiNumberSupervisor_textField functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiNumberSupervisor_textField functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiNumberSupervisor_textField's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiNumberSupervisor_textField. [DEFAULT: 'UiNumberSupervisor_textField']
 */
inheritUiNumberSupervisor_textField(obj,parent,name){}


/** Adds UiPopupWindow functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiPopupWindow functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiPopupWindow's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiPopupWindow. [DEFAULT: 'UiPopupWindow']
 */
inheritUiPopupWindow(obj,parent,name){}


/** Adds UiStringSupervisor_menu functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiStringSupervisor_menu functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiStringSupervisor_menu's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiStringSupervisor_menu. [DEFAULT: 'UiStringSupervisor_menu']
 */
inheritUiStringSupervisor_menu(obj,parent,name){}


/** Adds UiStringSupervisor_textField functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiStringSupervisor_textField functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiStringSupervisor_textField's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiStringSupervisor_textField. [DEFAULT: 'UiStringSupervisor_textField']
 */
inheritUiStringSupervisor_textField(obj,parent,name){}




/** Adds UiTextField functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiTextField functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiTextField's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiTextField. [DEFAULT: 'UiTextField']
 */
inheritUiTextField(obj,parent,name){}


/** Adds UiText functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that UiText functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new UiText's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new UiText. [DEFAULT: 'UiText']
 */
inheritUiText(obj,parent,name){}



/** Adds inheritUiVectorSupervisor_textField functionality to the object supplied.
 * [REQUIREMENT: module - extendedUi]
 * @param {object} obj The object that inheritUiVectorSupervisor_textField functionality is being added to.
 * @param {SceneObject} [parent] The SceneObject that will become the new inheritUiVectorSupervisor_textField's parent in the Scene hierarchy.
 * @param {string} [name] The name of the new inheritUiVectorSupervisor_textField. [DEFAULT: 'inheritUiVectorSupervisor_textField']
 */
inheritUiVectorSupervisor_textField(obj,parent,name){}










































/** Adds Vector4 functionality to the supplied object.
 * @param {object} obj The object to give Vector4 functionality to.
 * @param {number} [x] The value for the first component. [DEFAULT: 0]
 * @param {number} [y] The value for the second component. [DEFAULT: 0]
 * @param {number} [z] The value for the third component. [DEFAULT: 0]
 * @param {number} [w] The value for the forth component. [DEFAULT: 0]
 */
inheritVector4(obj,x,y,z,w){}


/** Adds Vector3 functionality to the supplied object.
 * @param {object} obj The object to give Vector3 functionality to.
 * @param {number} [x] The value for the first component. [DEFAULT: 0]
 * @param {number} [y] The value for the second component. [DEFAULT: 0]
 * @param {number} [z] The value for the third component. [DEFAULT: 0]
 */
inheritVector3(obj,x,y,z){}


/** Adds Vector2 functionality to the supplied object.
 * @param {object} obj The object to give Vector2 functionality to.
 * @param {number} [x] The value for the first component. [DEFAULT: 0]
 * @param {number} [y] The value for the second component. [DEFAULT: 0]
 */
inheritVector2(obj,x,y){}


/** Adds Vector1 functionality to the supplied object.
 * @param {object} obj The object to give Vector1 functionality to.
 * @param {number} [x] The value for the first component. [DEFAULT: 0]
 */
inheritVector1(obj,x){}

/** Sets up a WaitThen (from an internal pool), invoking the given callback after the specified delay. 
 * Since the WaitThen being used here is internal, the object itself cannot be referenced; to stop a 
 * pooled WaitThen, call 'nc.stopAllWaitThensByName' or 'nc.stopAllWaitThensByCallback'.
 * [REQUIREMENT: module - waitThens]
 * @param {number} duration Seconds before the callback will occur.
 * @param {object} callbackOwner The object owning the callback function that is called when the WaitThen completes.
 * @param {string} callbackName The name of the function that is called when the WaitThen completes.
 * @param {Array|any} [callbackArgs] Arguments for the function that is called when the WaitThen completes. 
 * @param {string} [name] The name of this WaitThen. [DEFAULT: "WaitThen"]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this WaitThen will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this WaitThen is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @example
 * // Objective: Use a waitThen function
 * // Expected Result: The screen will show "Wait for it..." for 3 seconds then "Incisor!" will appear.
 * 
 * this.textBox = new TextBox( nc.mainScene );
 * this.textBox.string = "Wait for it...";
 * 
 * // call waitThen with a duration of 3 seconds
 * nc.waitThen( 3, this, "waitThenCallback" );
 * 
 * this.waitThenCallback = function() {
 *     this.textBox.string = "Incisor!";
 * }
 */
waitThen(duration,callbackOwner,callbackName,callbackArgs,name,pauseImmunity,speedControl){}


/** Stops all currently active WaitThens whose name matches the name given.
 * [REQUIREMENT: module - waitThens]
 * @param {string} name The name of the WaitThens to stop.
 * @param {boolean} [performCallback] Boolean determining if the callback function will be called immediately, or if it will be skipped entirely. [DEFAULT: false]
 */
stopAllWaitThensByName(name,performCallback){}


/** Stops all currently active WaitThens whose callback info matches the given callback info.
 * [REQUIREMENT: module - waitThens]
 * @param {object} callbackOwner The owner of the callback associated with the WaitThens to stop.
 * @param {string} callbackName The name of the callback associated with the WaitThens to stop.
 * @param {boolean} [performCallback] Boolean determining if the callback function will be called immediately, or if it will be skipped entirely. [DEFAULT: false]
 */
stopAllWaitThensByCallback(callbackOwner,callbackName,performCallback){}


/** Adds WaitThen functionality to the supplied object.
 * [REQUIREMENT: module - waitThens]
 * @param {object} obj The object to give WaitThen functionality to.
 * @param {string} name The name of the new WaitThen object.
 */
inheritWaitThen(obj,name){};
}


/** Object housing all of the main Incisor functionality. 
 * Accessible via 'nc' from anywhere within project code, excluding code within 
 * the 'PreloadConfiguration.js' file (that code is executed before 'nc' is instantiated).
 * @type {INCISOR}
 */
var nc;


/** Object housing the main entry-point for the entire project
 * @type {ProjectMain}
 */
var pr;





/** Object housing predefined constant values for various Incisor® options and modes.
 * @type {Constants}
 */
var constants;/** Object housing functionality for a system of method callbacks that are triggered by a given type of event. 
 * There are AppEvents for automatically recurring events such as the 'fixedUpdate' and 'screenUpdate', as well as
 * user-input driven events such as keyboard and mouse events. Access Incisor®'s AppEvents via 'nc.appEvents', and use them
 * to add custom functionality that responds to these events.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class AppEvent
{
    constructor()
    {
        /** Type identifier
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** Name of AppEvent
         * @type {string}
         * @example
         * // Objective: Get the name of an AppEvent.
         * // Expected Result: The console should read "myAppEvent name keyboardEvent".
         * 
         * // Get an instance of the keyboardEvent AppEvent.
         * let myAppEvent = nc.appEvents.keyboardEvent;
         * console.log("myAppEvent name", myAppEvent.name);
         */
        this.name=null;


        /** Readonly flag indicating if this AppEvent has a 'singular focus scheme' which is a system that restricts 
         * callback invocation to items associated with the currently 'focused' object as determined by nc.singularFocusObject.
         * @type {boolean}
         * @default false
         * @readonly
         */
        this.hasSingularFocusScheme=null;

    
        /** Readonly flag indicating if this AppEvent is 'ordered', which allows callbacks added to this AppEvent to be
         * provided a callback order number, which is then used to sort the callbacks when the AppEvent is triggered.
         * Built-in AppEvents with this flag true include start, lateFixedUpdate, and lateScreenUpdate.
         * @type {boolean}
         * @default false
         * @readonly
         */
        this.isOrdered=null;


        /** Readonly flag indicating if this AppEvent removes callbacks after one invocation.
         * @type {boolean}
         * @default false
         * @readonly
         */
        this.hasConsumableCallbacks=null;
    }


    /** Adds the provided function to the list of functions called with the associated AppEvent occurs.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array.<any>|any} [callbackArgs] Extra parameters for the callback function. It should be noted that some AppEvents are triggered with 'event-wide' args. In this case, these extra args are appended to the event-wide args.
     * @param {Array.<PauseEvent>|PauseEvent} [pauseImmunity] The PauseEvent or Array of PauseEvents that this AppEvent callback will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {Array.<object>|object} [singularFocusRequirements] If this AppEvent's 'hasSingularFocusScheme' property is true, supplying this object or Array of objects is a way of requiring the correct focus context for this callback to occur. If left undefined, the callback will be invoked with any triggering event. If supplied, one of the objects in the singularFocusRequirements must be 'in focus' for the callback to be invoked. [DEFAULT: undefined]
     * @param {number} [callbackOrder] If this AppEvent's 'isOrdered' property is true, this number will be used to sort the callbacks before they are invoked. An early number corresponds to the callback being called earlier. [DEFAULT: 0]
     * @example
     * // Objective: Add a callback to an AppEvent.
     * // Action: Press a key on the keyboard. For this example, press the letter 'a'.
     * // Expected Result: The console should have 2 log messages as follows:
     * //   callback type: keydown a
     * //   callback type: keyup a
     * 
     * // Add a callback function.
     * this.myCallback = function(args) {
     *     console.log('callback type:', args.type, args.key);
     * }
     * 
     * // Get an instance of the keyboardEvent AppEvent.
     * let myAppEvent = nc.appEvents.keyboardEvent;
     * // Add the callback.
     * myAppEvent.addCallback( this, "myCallback" );
     */
    addCallback(callbackOwner, callbackName, callbackArgs, pauseImmunity, singularFocusRequirements, callbackOrder){}


    /** Removes the provided function from the list of functions called with the associated AppEvent occurs.
     * @param {object} callbackOwner The object owning the callback function to be removed.
     * @param {string} callbackName The name of the callback function to be removed.
     * @example
     * // Objective: Remove a callback from an AppEvent.
     * // Actions: 
     * // 1. Press a key on the keyboard. For this example, press the letter 'a'.
     * // 1. Expected Result: The console should have 2 log messages as follows:
     * //   callback type: keydown a
     * //   callback type: keyup a
     * //
     * // 2. Click the white box to remove the AppEvent.
     * // 2. Expected Result: Upon clicking the white box, the console should read "removing the callback". You will no longer see console log messages upon  pressing the keyboard.
     * 
     * // Add a callback function and name it 'myEventCallback'.
     * this.myEventCallback = function(args) {
     *     console.log('callback type:', args.type, args.key);
     * }
     * // Get an instance of the keyboardEvent AppEvent.
     * let myAppEvent = nc.appEvents.keyboardEvent;
     * // Add the callback.
     * myAppEvent.addCallback( this, "myEventCallback" );
     * 
     * // Create a button to use to remove the callback. Use the WhiteBox GraphicAsset.
     * this.removeButton = nc.addButton( nc.graphicAssets.WhiteBox, nc.mainScene, "RemoveButton" );
     * // Create a callback function that handles the click of the white box and executes removeCallback(). Name the callback function "myButtonCallback".
     * this.myButtonCallback = function(args) {
     *     console.log('removing the callback');
     *     // Inside this press callback, remove the callback
     *     myAppEvent.removeCallback( this, "myEventCallback" );
     * }
     * // Add the PressCallback to handle the clicking of the white box
     * this.removeButton.addPressCallback( this, "myButtonCallback" );
     */
    removeCallback(callbackOwner, callbackName){}


    /**
     * Returns an Array listing all of the callbacks currently connected to this AppEvent. The returned Array lists objects containing the callbackOwner, callbackName, and paused state for each callback.
     * @returns {Array.<object>}
     * @example
     * // Objective: List all of the callbacks currently connected to this AppEvent.
     * // Expected Result: The console should have 2 log messages as follows:
     * //   recipient myCallback1
     * //   recipient myCallback2
     * //   recipient myCallback3
     * 
     * // Make 3 callbacks.
     * this.myCallback1 = function(args) {
     *     console.log('myCallback1 callback type:', args.type, args.key);
     * }
     * this.myCallback2 = function(args) {
     *     console.log('myCallback2 callback type:', args.type, args.key);
     * }
     * this.myCallback3 = function(args) {
     *     console.log('myCallback3 callback type:', args.type, args.key);
     * }
     * 
     * // Get an instance of the keyboardEvent AppEvent.
     * let myAppEvent = nc.appEvents.keyboardEvent;
     * // Add all 3 callbacks to this AppEvent.
     * myAppEvent.addCallback( this, "myCallback1" );
     * myAppEvent.addCallback( this, "myCallback2" );
     * myAppEvent.addCallback( this, "myCallback3" );
     * 
     * // Iterate and console log the array of recipients.
     * let recipients = myAppEvent.getRecipients();
     * for ( let r of recipients ) {
     *     console.log('recipient', r.callbackName);
     * }
     */
    getRecipients(){return(null);}
    

    /** Method that 'Triggers' the AppEvent, invoking all of the callback functions that have been added to it.
     * @param {Array|any} [callbackArgs] Parameter or Array of parameters that will be sent to this AppEvent's callback functions. It should be noted that if an Array is supplied, the individual members of the Array will be sent to callback functions as individual parameters.
     */
    trigger(callbackArgs){}


    /** Method that 'Triggers' the AppEvent, invoking all of the callback functions that have been added to it, and asyncronously awaiting each of them.
     * @param {Array|any} [callbackArgs] Parameter or Array of parameters that will be sent to this AppEvent's callback functions. It should be noted that if an Array is supplied, the individual members of the Array will be sent to callback functions as individual parameters.
     */
    async asyncTrigger(callbackArgs){}
}


/**
 * A PauseEvent can be used as a parameter in 'nc.pause' and 'nc.resume' to pause and resume various 
 * time-based and user-interaction processes. Pausable processes react to pausing or resuming with PauseEvents unless those processes have a given PauseEvent as part
 * of their designated 'pauseImmunity', which can determined in the parameters of a pausable-process-initiating method. 
 * Use 'nc.definePauseEvent' to create a new PauseEvent.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class PauseEvent
{
    constructor()
    {
        /** Type identifier
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** Name of PauseEvent
         * @type {string}
         * @example
         * // Objective: Get the name of an AppEvent.
         * // Expected Result: The console should read "myAppEvent name keyboardEvent".
         * 
         * // Get an instance of the keyboardEvent AppEvent.
         * let myAppEvent = nc.appEvents.keyboardEvent;
         * console.log("myAppEvent name", myAppEvent.name);
         */
        this.name=null;
    }
}


/**
 * SpeedControls can be used to control the speed of time-based sequencing processes such as Motions, Swoops, or Timelines.
 * Applicable processes can subscribe to multiple SpeedControls; the 'speed' values of all of the SpeedControls a process subscribes to are multiplied together to determine
 * the overall pacing of the given time-based process. Use 'nc.defineSpeedControl' to create a new SpeedControl.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class SpeedControl
{
    constructor()
    {
        /** Type identifier
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** Name of SpeedControl
         * @type {string}
         * @example
         * // Objective: Get the name of an AppEvent.
         * // Expected Result: The console should read "myAppEvent name keyboardEvent".
         * 
         * // Get an instance of the keyboardEvent AppEvent.
         * let myAppEvent = nc.appEvents.keyboardEvent;
         * console.log("myAppEvent name", myAppEvent.name);
         */
        this.name=null;


        /** The speed value. This value multiplies the speed of processes that subscribe to this SpeedControl
         * @default 1
         * @type {number}
         * @example
         * // Objective: Adjust the motion speed of a "bouncing" white box.
 * // Expected Result: The white box will bounce, gradually slowing down over a period of 5 seconds, then it will gradually speed back up over a period of 5 seconds.
 * 
 * // Create a GraphicObject using the white box GraphicAsset and add it to the main Scene.
 * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "MyGraphicObject" );
 * // Give the box motion along the y axis. Set the speed to 2.
 * myGraphicObject.position.addMotion.y(-300,300,2);
 *  
 * // Swoop the 'speed' property of the MainSpeedControl down to .05 over a period of 5 seconds and provide callback arguments to swoop the 'speed' property again back up to speed 1 over a period of 10 seconds.
 * nc.swoopValue( 
            nc.speedControls.MainSpeedControl, 
            "speed", 
            .05, 
            5, 
            undefined, 
            nc, 
            "swoopValue", 
            [nc.speedControls.MainSpeedControl, "speed", 1, 10] 
            );
        */
        this.speed=null;
    }
}


/**
 * Object containing information about a change to the 'nc.singularFocusObject' value.
 * An instance of this object is sent as a first parameter to all callbacks registered with the nc.appEvents.focusChange AppEvent.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class FocusChangeInfo
{
    constructor()
    {
        /** A reference to the previous nc.singularFocusObject.
         * @type {object}
         * @example
         * // Objective: Add a callback to the focusChange AppEvent.
         * // Expected Result: After waiting 5 seconds, the console should have 3 log messages as follows:
         * //    changing focus to Scene2
         * //    object gaining focus Scene2
         * //    object losing focus Scene1
         * 
         * // Create 2 scenes, "Scene1" and "Scene2"
         * this.scene1 = new Scene("Scene1");
         * this.scene2 = new Scene("Scene2");
         * // Set the singular focus to "Scene1"
         * nc.singularFocusObject = this.scene1;
         * 
         * // Create a callback to handle the focus change. Name is "focusChangeCallback".
         * this.focusChangeCallback = function(args) {
         *    console.log("object gaining focus", args.objectGainingFocus.name);
         *    console.log("object losing focus", args.objectLosingFocus.name);
         * }
         * // Get an instance of the focusChange AppEvent and add the focus change callback.
         * this.focusChangeEvent = nc.appEvents.focusChange;
         * this.focusChangeEvent.addCallback( this, "focusChangeCallback" );
         * 
         * // Create a focus changer that will change the singular focus.
         * this.focusChanger = function(args) {
         *    console.log("changing focus to Scene2");
         *    nc.singularFocusObject = this.scene2;
         * }
         * // Use nc.waitThen() to wait 5 seconds before executing the focus changer.
         * nc.waitThen( 5, this, "focusChanger" );
         */
        this.objectLosingFocus=null;


        /** A reference to the new nc.singularFocusObject.
         * @type {object}
         * @example
         * // Objective: Add a callback to the focusChange AppEvent.
         * // Expected Result: After waiting 5 seconds, the console should have 3 log messages as follows:
         * //    changing focus to Scene2
         * //    object gaining focus Scene2
         * //    object losing focus Scene1
         * 
         * // Create 2 scenes, "Scene1" and "Scene2"
         * this.scene1 = new Scene("Scene1");
         * this.scene2 = new Scene("Scene2");
         * // Set the singular focus to "Scene1"
         * nc.singularFocusObject = this.scene1;
         * 
         * // Create a callback to handle the focus change. Name is "focusChangeCallback".
         * this.focusChangeCallback = function(args) {
         *    console.log("object gaining focus", args.objectGainingFocus.name);
         *    console.log("object losing focus", args.objectLosingFocus.name);
         * }
         * // Get an instance of the focusChange AppEvent and add the focus change callback.
         * this.focusChangeEvent = nc.appEvents.focusChange;
         * this.focusChangeEvent.addCallback( this, "focusChangeCallback" );
         * 
         * // Create a focus changer that will change the singular focus.
         * this.focusChanger = function(args) {
         *    console.log("changing focus to Scene2");
         *    nc.singularFocusObject = this.scene2;
         * }
         * // Use nc.waitThen() to wait 5 seconds before executing the focus changer.
         * nc.waitThen( 5, this, "focusChanger" );
         */
        this.objectGainingFocus=null;
    }
}




/** The base object defining the fundamental content builing-blocks for Incisor® such as Textures, Geometry, and Sounds.
 * [NON-INSTANTIABLE]
 */
class AssetComponent
{
    constructor()
    {
        /** Type identifier
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The AssetComponent's name. This must be unique among AssetComponents of its type.
         * @type {string}
         * @readonly
         */
        this.name=null;


        /** Boolean indicating if this AssetComponent is currently loaded. 
         * @type {boolean}
         * @readonly
         */
        this.isLoaded=null;


        /** The LoadingTier that this AssetComponent belongs too.
         * LoadingTiers are a means to organize AssetComponents into separately downloadable groups. 
         * @type {Array.<number>}
         * @readonly
         */
        this.loadingTierRequirements=null;


        /** String indicating the source of this AssetComponent if it is a duplicate.
         * Incisor® automatically detects when two or more AssetComponents are identical, ensuring that only one 
         * copy of the associated data is loaded to reduce the loaded size of the project.
         * Those AssetComponents that are duplicates are marked by indicating the name of the source of their data.
         * This member is undefined for AssetComponents that are not duplicates.
         * @default undefined
         * @type {string}
         * @readonly
         */
        this.duplicateSource=null;
    }
}


/** Object with information about a loading tier. 
 * Loading tiers are a means to organize AssetComponents into separately downloadable groups. 
 * [NON-INSTANTIABLE]
 */
class LoadingTierDefinition
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** The loading tier number.
         * @type {number}
         * @readonly
         */
        this.loadingTier=null;


        /** Bool determining if this loading tier is automatically loaded on startup.
         * @type {boolean}
         * @readonly
         */
        this.isAutoLoaded=null;


        /** Bool determining if the processing of the data in this loading tier is processed incrementally. 
         * This setting can be used to minimize performance hits caused when asset data is 'lazy-loaded' during the end-user experience;
         * When true, the processing of assets within a tier is spread out over multiple screen updates.
         * @type {boolean}
         * @readonly
         */
        this.incrementalContentProcessing=null;


        /** A limit on the size of the published asset data files within this loading tier. 
         * This setting can be used to break up the loading of asset data in order to help minimize 
         * performance hits caused when asset data is 'lazy-loaded' during the end-user experience;
         * It should be noted that this is a soft-limit; individual assetComponents whose data is
         * larger than this limit will result in oversized asset data files.
         * @type {number}
         * @readonly
         */
        this.assetDataFileSizeLimitKB=null;


        /** A limit on the dimensions of sprite sheets within this loading tier. 
         * It should be noted that this is a soft-limit; individual GraphicAssets whose dimensions are
         * larger than this limit will result in oversized sprite sheet files.
         * @type {number}
         * @readonly
         */
        this.spriteSheetDimensionLimit=null;


        /** Bool indicating if all of the assets in this loading tier have been loaded.
         * @type {boolean}
         * @readonly
         */
        this.isLoaded=null;


        /** Bool indicating if this LoadingTier is in the process of loading or is queued to load.
         * @type {boolean}
         * @readonly
         */
        this.isLoading=null;
    }
}


/** Buttons are specialized GraphicObjects that can provide callbacks for cursor interactions. 
 * Buttons adhere to layering - only the frontmost Button receives cursor input.
 * @extends GraphicObject 
 */
class Button extends GraphicObject
{
    /** Button constructor
     * @param {GraphicAsset} [graphicAsset=nc.graphicAssets.WhiteBox] The GraphicAsset that the new Button will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
     * @param {SceneObject} [parent=nc.mainScene] The SceneObject that will become the new Buttons's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name='Button'] The name of the new Button. [DEFAULT: 'Button']project is a game
     * @example
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     */
    constructor(graphicAsset,parent,name)
    {
        /** Flag that determines if this Button responds to cursor interaction. If false, this Button acts no differently than a GraphicObject. 
         * @type {boolean}
         * @default true
         */
        this.buttonActive=null;


        /** Flag that reports if the cursor is currently directly over this Button. It should be noted that Buttons adhere to layering - only the frontmost active Button receives input.
         * @readonly
         * @type {boolean}
         */
        this.rolloverFlag=null;


        /** Flag that reports if the Button is currently being 'pressed'. 
         * @readonly
         * @type {boolean}
         */
        this.buttonDown=null;


        /** The PauseEvent or Array of PauseEvents that this Button will be immune to. 
         * Set the value to [] to create callbacks with no immunity. 
         * This property defaults to the value currently in nc.defaultPauseImmunity, which
         * can be changed at any time.
         * @type {PauseEvent|Array.<PauseEvent>}
         * @default nc.defaultPauseImmunity
         */
        this.pauseImmunity=null;
    }


     /** Adds a callback for when the cursor is moved over this Button.
      * @param {object} callbackOwner The object owning the callback function.
      * @param {string} callbackName The name of the callback function.
      * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
      * @example
      * // Objective: Add a CursorMoveCallback to a Button.
      * // Action: Move your mouse pointer in and out of the white box.
      * // Expected Result: As you move your mouse pointer inside the box it will flash different colors.
      *  
      * // Create a button using the Button constructor.
      * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
      * // Add a reference to a callback function passing the owner of the function and the function name.
      * this.button.addCursorMoveCallback( this, "myCallback", ["myArgs0", "myArgs1"] );
      * 
      * // Add a callback function. Your first 2 parameters will always be the browser event and the camera.
      * this.myCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
      *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
      *     this.button.fillColor.red   = Math.random();
      *     this.button.fillColor.blue  = Math.random();
      *     this.button.fillColor.green = Math.random();
      * }
      */
    addCursorMoveCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when the cursor is moved over this Button.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removeCursorMoveCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'cursorMove' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateCursorMoveCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when the cursor is moved into this Button's bounds.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @example
     * // Objective: Add a CursorInCallback and CursorOutCallback to a Button.
     * // Action: Move your mouse pointer in and out of the box.
     * // Expected Result: When you move your mouse pointer into the box, the box becomes blue. When you move it out, it will become red.
     *  
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.button.addCursorInCallback( this, "myInCallback", ["myArgs0", "myArgs1"] );
     * this.button.addCursorOutCallback( this, "myOutCallback", ["myArgs0", "myArgs1", "myArgs2"] );
     * 
     * // Add callback functions. Your first 2 parameters will always be the browser event and the camera.
     * this.myInCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.red   = 0;
     *     this.button.fillColor.blue  = 1;
     *     this.button.fillColor.green = 0;
     * }
     * this.myOutCallback = function( event, camera, callbackArgs0, callbackArgs1, callbackArgs2 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1, callbackArgs2);
     *     this.button.fillColor.red   = 1;
     *     this.button.fillColor.blue  = 0;
     *     this.button.fillColor.green = 0;
     * }
     */
    addCursorInCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when the cursor is moved into this Button's bounds.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @example
     * // Objective: Remove a CursorInCallback from a Button.
     * // Actions: 
     * // 1. Move your mouse pointer in and out of the white box.
     * // 1. Expected Result: The console should read "action: mousemove" each time your mouse enters the white box.
     * 
     * // 2. Click the white triangle to remove the CursorInCallback.
     * // 2. Expected Result: Upon clicking the white triangle, the console should read "removing the callback". Moving the mouse in and out of the white box no longer generates any console messages
     *   
     * // Create a button to use to remove the callback. Use the WhiteTriangle GraphicAsset.
     * this.removeCallbackButton = nc.addButton( nc.graphicAssets.WhiteTriangle, nc.mainScene, "RemoveCallbackButton" );
     * // Move the white triangle to the right 200 world units.
     * this.removeCallbackButton.position.x = 200;
     * // Create a callback function that handles the click of the white triangle and executes removeCursorInCallback() 
     * this.myRemovePressCallback = function(args) {
     *     console.log('removing the callback');
     *     // Inside this press callback, remove the CursorInCallback
     *     this.button.removeCursorInCallback( this, "myActionCallback" );
     * }
     * // Add the PressCallback to handle the clicking of the white triangle
     * this.removeCallbackButton.addPressCallback( this, "myRemovePressCallback" );
     *
     * // Create a button using the "nc" factory method.
     * this.button = nc.addButton( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * 
     * // Create a callback function.
     * this.myActionCallback = function(args) {
     *     console.log('action:', args.type);
     * }
     * 
     * // Add a CursorInCallback
     * this.button.addCursorInCallback( this, "myActionCallback" );
     */
    removeCursorInCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'cursorIn' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateCursorInCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when the cursor is moved out of this Button's bounds.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @example
     * // Objective: Add a CursorInCallback and CursorOutCallback to a Button.
     * // Action: Move your mouse pointer in and out of the box.
     * // Expected Result: When you move your mouse pointer into the box, the box becomes blue. When you move it out, it will become red.
     *  
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.button.addCursorInCallback( this, "myInCallback", ["myArgs0", "myArgs1"] );
     * this.button.addCursorOutCallback( this, "myOutCallback", ["myArgs0", "myArgs1", "myArgs2"] );
     * 
     * // Add callback functions. Your first 2 parameters will always be the browser event and the camera.
     * this.myInCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.red   = 0;
     *     this.button.fillColor.blue  = 1;
     *     this.button.fillColor.green = 0;
     * }
     * this.myOutCallback = function( event, camera, callbackArgs0, callbackArgs1, callbackArgs2 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1, callbackArgs2);
     *     this.button.fillColor.red   = 1;
     *     this.button.fillColor.blue  = 0;
     *     this.button.fillColor.green = 0;
     * }
     */
    addCursorOutCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when the cursor is moved out of this Button's bounds.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removeCursorOutCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'cursorOut' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateCursorOutCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when this Button is dragged.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @param {boolean} [allowInOutAndMove] Boolean determining if other buttons will receive cursorIn, cursorOut, and cursorMove events while this Button is being dragged. [DEFAULT: false]
     * @param {boolean} [requireDragInitiationThreshold] Boolean determining if the cursor must be dragged by a minimum threshold before 'drag' callbacks start to happen. See 'Camera.mouseDragInitiationThreshold' and 'Camera.touchDragInitiationThreshold' for more information. [DEFAULT: true]
     * @example
     * // Objective: Add a DragCallback and a DropCallback to a Button.
     * // Action: Drag the box.
     * // Expected Result: As you are dragging the box it will be white. When you drop it, it will turn red.
     *  
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add callbacks, passing the owner of the function and the function name.
     * this.button.addDragCallback( this, "myDragCallback", ["myArgs0", "myArgs1"] );
     * this.button.addDropCallback( this, "myDropCallback", ["myArgs0", "myArgs1"] );
     * 
     * // Add both callback functions. Your first 2 parameters will always be the browser event and the camera.
     * this.myDragCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('drag callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.green = 1;
     *     this.button.fillColor.blue = 1;
     *     this.button.position.x = nc.mainCamera.getCursorPosition().x;
     *     this.button.position.y = nc.mainCamera.getCursorPosition().y;
     * }
     * // Your first 2 parameters will always be the browser event and the camera. For a DropCallback you will receive 2 additional arguments, the dragged button and the button being dropped onto. 
     * this.myDropCallback = function( event, camera, draggedButton, dropTargetButton, callbackArgs0, callbackArgs1 ) {
     *     console.log('drop callback:', event.type, camera.name, draggedButton.name, dropTargetButton.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.green = 0;
     *     this.button.fillColor.blue = 0;
     * }
     */
    addDragCallback(callbackOwner,callbackName,callbackArgs,allowInOutAndMove,requireDragInitiationThreshold){}


    /** Removes the callback for when this Button is dragged.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removeDragCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'drag' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateDragCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when this Button is dropped (after being dragged). 
     * Please note that the Button must have a drag callback in order for any drop callbacks to occur.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, the viewing Camera, the dragged Button, and the Button being dropped onto (if any) will automatically be prepended to this list of arguments, so the callback implementation must plan to receive those as its first four parameters. 
     * @example
     * // Objective: Add a DragCallback and a DropCallback to a Button.
     * // Action: Drag the box.
     * // Expected Result: As you are dragging the box it will be white. When you drop it, it will turn red.
     *  
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add callbacks, passing the owner of the function and the function name.
     * this.button.addDragCallback( this, "myDragCallback", ["myArgs0", "myArgs1"] );
     * this.button.addDropCallback( this, "myDropCallback", ["myArgs0", "myArgs1"] );
     * 
     * // Add both callback functions. Your first 2 parameters will always be the browser event and the camera.
     * this.myDragCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('drag callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.green = 1;
     *     this.button.fillColor.blue = 1;
     *     this.button.position.x = nc.mainCamera.getCursorPosition().x;
     *     this.button.position.y = nc.mainCamera.getCursorPosition().y;
     * }
     * // Your first 2 parameters will always be the browser event and the camera. For a DropCallback you will receive 2 additional arguments, the dragged button and the button being dropped onto. 
     * this.myDropCallback = function( event, camera, draggedButton, dropTargetButton, callbackArgs0, callbackArgs1 ) {
     *     console.log('drop callback:', event.type, camera.name, draggedButton.name, dropTargetButton.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.green = 0;
     *     this.button.fillColor.blue = 0;
     * }
     */
    addDropCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when this Button is dropped (after being dragged).
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removeDropCallback(callbackOwner,callbackName){}


    /** 
     * Manually triggers the 'drop' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     * @param {Button} [simulatedDropRecipient] Button acting as the Button that is being dropped onto.
     */
    simulateDropCallback(simulatedEvent,simulatedCamera,simulatedDropRecipient){}


    /** Adds a callback for when this Button is pressed down.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @example
     * // Objective: Add a PressCallback and a ReleaseCallback to a Button.
     * // Action: Press and release the button to change its color.
     * // Expected Result: Each time you are pressing the button it will be red. When you release it, it will turn back to green.
     * 
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Initially, make the button green.
     * this.button.fillColor.red = 0;
     * this.button.fillColor.blue = 0;
     * // Add callbacks, passing the owner of the function and the function name.
     * this.button.addPressCallback( this, "myPressCallback", ["myArgs0", "myArgs1"] );
     * this.button.addReleaseCallback( this, "myReleaseCallback", ["myArgs0", "myArgs1"] );
     * 
     * // Add callback functions. Your first 2 parameters will always be the browser event and the camera.
     * this.myPressCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.red   = 1;
     *     this.button.fillColor.green = 0;
     * }
     * this.myReleaseCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.red   = 0;
     *     this.button.fillColor.green = 1;
     * }
     */
    addPressCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when this Button is pressed down.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removePressCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'press' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulatePressCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when this Button is released.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @param {boolean} [releaseRequiresInitialPress=true] If true, the Button must be pressed before being released in order for the callback to occur. [DEFAULT: true]
     * @example
     * // Objective: Add a PressCallback and a ReleaseCallback to a Button.
     * // Action: Press and release the button to change its color.
     * // Expected Result: Each time you are pressing the button it will be red. When you release it, it will turn back to green.
     * 
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Initially, make the button green.
     * this.button.fillColor.red = 0;
     * this.button.fillColor.blue = 0;
     * // Add callbacks, passing the owner of the function and the function name.
     * this.button.addPressCallback( this, "myPressCallback", ["myArgs0", "myArgs1"] );
     * this.button.addReleaseCallback( this, "myReleaseCallback", ["myArgs0", "myArgs1"] );
     * 
     * // Add callback functions. Your first 2 parameters will always be the browser event and the camera.
     * this.myPressCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.red   = 1;
     *     this.button.fillColor.green = 0;
     * }
     * this.myReleaseCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     *     this.button.fillColor.red   = 0;
     *     this.button.fillColor.green = 1;
     * }
     */
    addReleaseCallback(callbackOwner,callbackName,callbackArgs,releaseRequiresInitialPress){}


    /** Removes the callback for when this Button is released.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removeReleaseCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'release' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateReleaseCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when this Button is tapped twice in fast succession. See 'nc.multiTapInterval' to adjust the multi-tap speed.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @example
     * // Objective: Add a DoubleTapCallback to a Button.
     * // Action: Double tap the box.
     * // Expected Result: Each time you double tap the box it expands to 4 times its original size or contracts back to its original size.
     *  
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add a callback, passing the owner of the function and the function name.
     * this.button.addDoubleTapCallback( this, "myCallback", ["myArgs0", "myArgs1"] );
     *   
     * // Add a callback function. Your first 2 parameters will always be the browser event and the camera.
     * this.myCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     * 
     *     if ( this.button.scale.x == 1 ) {
     *         this.button.scale.x = 4;
     *         this.button.scale.y = 4;
     *     } else {
     *         this.button.scale.x = 1;
     *         this.button.scale.y = 1;
     *     }
     *  }
     */
    addDoubleTapCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when this Button is tapped twice in fast succession.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removeDoubleTapCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'doubleTap' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateDoubleTapCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when this Button is tapped three times in fast succession. See 'nc.multiTapInterval' to adjust the multi-tap speed.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @example
     * // Objective: Add a TripleTapCallback to a Button.
     * // Action: Triple tap the box.
     * // Expected Result: Each time you triple tap the box it expands to 4 times its original size or contracts back to its original size.
     *  
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add a callback, passing the owner of the function and the function name.
     * this.button.addTripleTapCallback( this, "myCallback", ["myArgs0", "myArgs1"] );
     *   
     * // Add a callback function. Your first 2 parameters will always be the browser event and the camera.
     * this.myCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     * 
     *     if ( this.button.scale.x == 1 ) {
     *         this.button.scale.x = 4;
     *         this.button.scale.y = 4;
     *     } else {
     *         this.button.scale.x = 1;
     *         this.button.scale.y = 1;
     *     }
     *  }
     */
    addTripleTapCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when this Button is tapped three times in fast succession.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removeTripleTapCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'tripleTap' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateTripleTapCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when the cursor 'scroll' occurs over this Button. 
     * Invoke the 'preventDefault' method on the event sent to the callback to prevent browser-level scrolling functionality.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @example
     * // Objective: Add a ScrollCallback to a Button.
     * // Action: Mouse wheel up and down over the white box.
     * // Expected Result: As you mouse wheel up, the box expands. As you wheel down, it contacts.
     * 
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add a callback, passing the owner of the function and the function name.
     * this.button.addScrollCallback( this, "myCallback", ["myArgs0", "myArgs1"] );
     * 
     * // Add a callback function. Your first 2 parameters will always be the browser event and the camera.
     * this.myCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *     console.log('callback:', event.name, camera.name, callbackArgs0, callbackArgs1);
     *     
     *     // Use the event to get the delta of the mouse wheel
     *     if ( event.wheelDelta > 0 ) {
     *         // "zoom in" no greater than 5 x original size
     *         if ( this.button.scale.x <= 5 ) {
     *            this.button.scale.x = this.button.scale.x + .1;
     *            this.button.scale.y = this.button.scale.y + .1;
     *         }    
     *     } else {
     *         // zoom out no smaller than .05 original size
     *         if ( this.button.scale.x >= 0.5 ) {
     *             this.button.scale.x = this.button.scale.x - .1;
     *             this.button.scale.y = this.button.scale.y - .1;
     *         }    
     *     }
     * }
     */
    addScrollCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when the cursor 'scroll' occurs over this Button.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removeScrollCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'scroll' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateScrollCallback(simulatedEvent,simulatedCamera){}


    /** Adds a callback for when the in-browser context menu is activated over this Button.
     * Invoke the 'preventDefault' method on the event sent to the callback to prevent built-in browser context menu from appearing.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the callback-triggering browser-generated event, and the viewing Camera will automatically be prepended to this list of arguments, so the callback implementation must be written to receive those as its first two parameters. 
     * @example
     * // Objective: Add a ContextMenuCallback to a Button.
     * // Action: Bring the mouse into the white box and right click your mouse.
     * // Expected Result: The console should read "callback: contextmenu MainCamera myArgs0 myArgs1".
     * 
     * // Create a button using the Button constructor.
     * this.button = new Button( nc.graphicAssets.WhiteBox, nc.mainScene, "MyButton" );
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.button.addContextMenuCallback( this, "myCallback", ["myArgs0", "myArgs1"] );
     * 
     * // Add a callback function. Your first 2 parameters will always be the browser event and the camera.
     * this.myCallback = function( event, camera, callbackArgs0, callbackArgs1 ) {
     *    console.log('callback:', event.type, camera.name, callbackArgs0, callbackArgs1);
     * }
     */
    addContextMenuCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the callback for when the in-browser context menu is activated over this Button.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
    */
    removeContextMenuCallback(callbackOwner,callbackName){}


    /** Manually triggers the 'contextMenu' callback for this Button.
     * @param {object} [simulatedEvent] Event object that can be supplied in place of the authentic browser-generated event that occurs when the callback is triggered naturally.
     * @param {object} [simulatedCamera] The Camera that will be supplied to the callback as the 'triggering' Camera.
     */
    simulateContextMenuCallback(simulatedEvent,simulatedCamera){}
}


/** A Camera is a specialized SceneObject with the ability to render the Scene that contains it to a RenderTarget.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 * @extends SceneObject
 * @example
 * // Objective: Move a Scene's Camera up and down.
 * // Expected Result: You will see a red box with the phrase "Build It Once." moving up and down.
 * 
 * // Create a new Scene and add a TextBox to it.
 * let scene = new Scene( "Scene" );
 * let textBox = new TextBox( scene );
 * textBox.string = "Build It Once.";
 * 
 * // Create new RenderTarget.
 * let renderTarget = new RenderTarget( "RenderTarget", 400, 100 );
 * 
 * // Create a new Camera for the Scene.
 * let camera = new OrthographicCamera( scene, "camera" );
 * camera.coreViewWidth = 400;
 * camera.coreViewHeight = 100;
 * camera.renderTarget = renderTarget;
 * camera.backgroundColor.red = .5;
 * camera.backgroundColor.alpha = 1;
 * 
 * // Move the Camera up and down along the y axis.
 * camera.position.addMotion.y( 50, -50, .2 );
 * 
 * // Create a GraphicAsset from RenderTarget.
 * nc.defineGraphicAssetFromRenderTarget( "NewGraphicAsset", renderTarget );
 * // Create a GraphicObject using the new GraphicAsset.
 * this.go = new GraphicObject( nc.graphicAssets.NewGraphicAsset, nc.mainScene, "SceneViewerGraphicObject" );
 */
class Camera extends SceneObject
{
    constructor()
    {
        /** Boolean determining if this Camera is automatically rendered with every screen update.
         * @default true
         * @type {boolean}
         */
        this.autoRender = null;


        /** Number determining this Camera's order in the list of automatically rendered Cameras. Higher numbers correspond to earlier render order.
         * @default 0
         * @type {number}
         */
        this.autoRenderOrder = null;


        /** Color determining the background color (aka the 'clear color') of this Camera.
         * Please note that the 'MainCamera' defaults to [0.1,0.08,0.08,1], while all other cameras default to [0,0,0,0]. 
         * These values can be changed at any time.
         * @default Color(0,0,0,0)
         * @type {Color}
         */
        this.backgroundColor = null;


        /** Boolean determining if this camera will be used in conjunction with a cursor for Buttons or other cursor activity.
         * Cameras are responsible for relating the cursor's screen position to a position within the Scene and this flag informs the Camera of that requirement.
         * To optimize your project, ensure that this property is only set to true when cursor interactivity (Buttons etc...) in the Scene that this Camera is rendering.
         * @default false
         * @type {boolean}
         */
        this.cursorInteractive = null;


        /** Property determining the 'adaptive camera mode' of this Camera. 
         * Adaptive camera modes can put a Camera into a state where it reacts to the shape it's RenderTarget, extending or contracting the view area of the Camera as the shape if it's RenderTarget changes.
         * The adaptive camera modes are as follows:
         * 'none' - the view width and height of the camera do not change, regardless of the size and shape of the Camera's RenderTarget.
         * 'unitsMatchPixels' - the camera bounds will consistently be updated, matching the view width and height (in world units) of the Camera with the current render resolution of the Camera's RenderTarget.
         * 'maximizeSafeZone' - the camera bounds will consistently be updated, ensuring that the core view area (as defined by coreViewWidth and coreViewHeight) is rendered as large as it can be on the Camera's RenderTarget.
         * [DEFUALT: constants.adaptiveCameraModes.none]
         * @type {string}
         */
        this.adaptiveCameraMode = null;


        /** Boolean determining if the color buffer is cleared in this Camera's RenderTarget prior to rendering.
         * [DEFUALT: true]
         * @type {boolean}
         */
        this.clearsColor = null;


        /** Boolean determining if the depth buffer is cleared in this Camera's RenderTarget prior to rendering.
         * [DEFUALT: true]
         * @type {boolean}
         */
        this.clearsDepth = null;


        /** Boolean determining if the stencil buffer is cleared in this Camera's RenderTarget prior to rendering.
         * [DEFUALT: true]
         * @type {boolean}
         */
        this.clearsStencil = null;


        /** The RenderTarget this Camera will render to when Camera.render is invoked.
         * [DEFUALT: undefined]
         * @type {RenderTarget}
         */
        this.renderTarget = null;


        /** This property provides means to override the automated setting of this Camera's cursorViewPosition.
         * This is most commonly deployed when a RenderTarget used within a primary Scene serves as a 'window' into
         * a secondary Scene that requires cursor interaction - this property would be used to map the cursor interaction through
         * the window into the secondary screen. This property can be used two ways:
         * 1. Define a CursorInputOverrideButton and set this property to that object. When you do this, the button serves as a
         * 'cursor mapping surface', where the edges of the CursorInputOverrideButton correspond to the edges of the secondary
         * Camera's view area.
         * 2. Set this property to a function that remaps the cursorViewPosition manually. This method can be used to 
         * further customize the setting of this Camera's cursorViewPosition. 
         * If implemented, the first parameter of the function should take the triggering browser-generated 
         * cursor event, and the second parameter will be a Vector2 holding the default-calculated cursorViewPosition.
         * The function should use those parameters as input, generate the desired remapped values, and call
         * 'setCursorViewPosition' on the camera accordingly.
         * [DEFUALT: undefined]
         * @type {Function & CursorInputOverrideButton}
         */
        this.cursorInputOverride = null;


        /** Proportion of the Camera's view area that a touch-based cursor drag must travel in order to initiate a Button 'drag'.
         * While using a touch-based device, tapping the screen often produces a tiny unintentional cursor drag.
         * This value creates a threshold; if the cursor moves less than this portion of the Camera's view area during a screen touch, 
         * no Button 'drag' occurs.
         * @default 0.05
         * @type {number}
         */
        this.touchDragInitiationThreshold = null;


        /** Proportion of the Camera's view area that a mouse-based cursor drag must travel in order to initiate a Button 'drag'.
         * While using a mouse, clicking sometimes produces a tiny un-intentional cursor drag.
         * This value creates a threshold; if the cursor moves less than this portion of the 
         * Camera's view area during a click, no Button 'drag' occurs.
         * @default 0.005
         * @type {number}
         */
        this.mouseDragInitiationThreshold = null;


        /** Boolean denoting if the Camera is currently in the process of rendering. 
         * This property can be queried prior to any potentially recursive 'Camera.render' calls to prevent an infinite self-invocation scenario.
         * @type {boolean}
         * @readonly
         */
        this.isCurrentlyRendering = null;


        /** Optional TimelineManager that can drive this camera's rendering. 
         * This property defaults to undefined, but when it is set to a given TimelineManager the Camera will render continuously as long as one or 
         * more Timeline with non-zero influence is playing. If the 'generatesPrecomp' setting for a given Construct is true, and if that Construct has
         * one or more Timelines, then the associate Precomp Camera's 'timelineRenderDriver' value is automatically set to the Construct instance's TimelineManager.
         * This enables Construct-generated Precomps to render while timelines are playing, and rest while timelines are not playing.
         * @default undefined
         * @type {Timeline}
         */
        this.timelineRenderDriver = null;
    }


    /** Renders the contents of the Scene within the Camera's view area to the RenderTarget.
     * @param {boolean} [skipRenderPreparations] Boolean that, if true, tells the rendering process to skip render preparations for efficiency. This flag is best used with secondary Cameras that render Scenes that have already been rendered once in their current state (as the preparations would have already been completed). [DEFAULT: false] 
    */
    render(skipRenderPreparations){}


    /** Updates the Camera's cursor view position to the given x and y coordinates.
     * Camera view coordinates operate with bounds from -.5 to .5, where -.5 is the left/bottom edge of the view plane, and .5 is the right/top edge.
     * The cursor view position is used to calculate cursor interaction with Buttons etc.
     * @param {number} x The x position for the cursor in terms of Camera view coordinates [-.5,.5]
     * @param {number} y The y position for the cursor in terms of Camera view coordinates [-.5,.5]
     * @param {number} z The z position for the cursor in terms of Camera view coordinates [-.5,.5] (where .5 is the near side of the frustum)
     * @param {boolean} simulateCursorMoveEvent Boolean indicating if the "simulateCursorMoveEvent" will automatically be called. If true it should be noted that the associated call to 'simulateCursorMoveEvent' will use the default param 'updateScene=true', which could result in an extra performance cost per invocation. [DEFAULT: false]
     */
    setCursorViewPosition(x,y,z,simulateCursorMoveEvent){}


    /** Returns a Vector3 with the cursor position in terms of Camera view coordinates.
     * Camera view coordinates operate with bounds from -.5 to .5, where -.5 is the left/bottom/far edge of the frustum, and .5 is the right/top/near edge.
     * @param {Vector3} [returnVector3] Optional Vector3 that can be supplied to avoid the generation of a new Vector3 object for efficiency.
     * @returns {Vector3}
     */
    getCursorViewPosition(returnVector3){}


    /** Updates the Camera's cursor position from a given world position.
     * The cursor position is used to calculate cursor interaction with Buttons etc.
     * @param {number} x The x position for the cursor in terms of world coordinates
     * @param {number} y The y position for the cursor in terms of world coordinates
     * @param {number} z The z position for the cursor in terms of world coordinates
     * @param {boolean} simulateCursorMoveEvent Boolean indicating if the 'simulateCursorMoveEvent' will automatically be called. If true it should be noted that the associated call to 'simulateCursorMoveEvent' will use the default param 'updateScene=true', which could result in an extra performance cost per invocation. [DEFAULT: false]
     */
    setCursorPosition(x,y,z,simulateCursorMoveEvent){}


    /** Returns a Vector3 with the cursor position in terms of world coordinates.
     * The cursor position is used to calculate cursor interaction with Buttons etc.
     * @param {Vector3} [returnVector3] Optional Vector3 that can be supplied to avoid the generation of a new Vector3 object for efficiency.
     * @returns {Vector3}
     */
    getCursorPosition(returnVector3){}


    /** Manually checks this Camera's cursor position, triggering any appropriate 'cursorIn' or 'cursorOut' callbacks for the appropriate Buttons.
     * This function can be used to ensure that 'cursorIn' or 'cursorOut' callbacks are triggered even when there is no
     * originating cursor event; for example, if Buttons are moving themselves, and a new Button moves under the cursor,
     * invoking this function would evaluate the cursor and button positions and ultimately trigger the 'cursorIn' callback for the new Button.
     */
    performManualCursorRolloverCheck(){}


    /** Simulates a 'cursorMove' AppEvent at the current cursor position.
     * Please note that either setCursorViewPosition or setCursorPosition will need to called to actually change 
     * the position of the cursor, as this method is only responsible for triggering the cursorMove-related Button callbacks.
     * You can reposition the cursor AND get cursorMove-related Button callbacks by calling 
     * setCursorViewPosition or setCursorPosition with paramater simulateCursorMoveEvent=true.
     * Also, please note this Camera must render once before the cursorPosition will intersect with any Buttons.
     * @param {boolean} [updateScene] Boolean determining if the Scene will be manually updated prior to the simulated AppEvent; this ensures that the most recent Scene changes (changes within the current screenUpdate) affecting Button detection are accounted for, but can result in an extra cost to performance per invocation, so should not be overly used. [DEFAULT: true]
     */
    simulateCursorMoveEvent(updateScene){}


    /** Simulates a 'cursorPress' AppEvent at the current cursor position.
     * Call setCursorViewPosition or setCursorPosition prior to calling this function to change the cursor position if needed.
     * Please note this Camera must render once before the cursorPosition will intersect with any Buttons.
     * @param {boolean} [updateScene] Boolean determining if the Scene will be manually updated prior to the simulated AppEvent; this ensures that the most recent Scene changes (changes within the current screenUpdate) affecting Button detection are accounted for, but can result in an extra cost to performance per invocation, so should not be overly used. [DEFAULT: true]
     */
    simulateCursorPressEvent(updateScene){}


    /** Simulates a 'cursorRelease' AppEvent at the current cursor position.
     * Call setCursorViewPosition or setCursorPosition prior to calling this function to change the cursor position if needed.
     * Please note this Camera must render once before the cursorPosition will intersect with any Buttons.
     * @param {boolean} [updateScene] Boolean determining if the Scene will be manually updated prior to the simulated AppEvent; this ensures that the most recent Scene changes (changes within the current screenUpdate) affecting Button detection are accounted for, but can result in an extra cost to performance per invocation, so should not be overly used. [DEFAULT: true]
     */
    simulateCursorReleaseEvent(updateScene){}


    /** Simulates a 'cursorScroll' AppEvent at the current cursor position.
     * Call setCursorViewPosition or setCursorPosition prior to calling this function to change the cursor position if needed.
     * Please note this Camera must render once before the cursorPosition will intersect with any Buttons.
     * @param {boolean} [updateScene] Boolean determining if the Scene will be manually updated prior to the simulated AppEvent; this ensures that the most recent Scene changes (changes within the current screenUpdate) affecting Button detection are accounted for, but can result in an extra cost to performance per invocation, so should not be overly used. [DEFAULT: true]
     */
    simulateCursorScrollEvent(updateScene){}


    /** Simulates a 'contextMenu' AppEvent at the current cursor position.
     * Call setCursorViewPosition or setCursorPosition prior to calling this function to change the cursor position if needed.
     * Please note this Camera must render once before the cursorPosition will intersect with any Buttons.
     * Also, it should be noted that this method is not capable of producing the browser's actual context menu,
     * it is only a means to trigger the Incisor®-level AppEvents and callbacks that such an event would produce.
     * @param {boolean} [updateScene] Boolean determining if the Scene will be manually updated prior to the simulated AppEvent; this ensures that the most recent Scene changes (changes within the current screenUpdate) affecting Button detection are accounted for, but can result in an extra cost to performance per invocation, so should not be overly used. [DEFAULT: true]
     */
    simulateContextMenuEvent(updateScene){}


    /** The means to determine which SceneObject (if any) intersect with a given position within the Camera's view.
     * @param {Vector2} [viewPosition] The position within the Camera's view space [-.5,.5]x[-.5,.5] to use when determining if any SceneObjects intersect. [DEFAULT: Camera.getViewPosition()]
     * @param {Array.<SceneObject>} [sceneObjects] The list of SceneObjects to test for intersection. [DEFAULT: Scene.getDescendants()]
     * @param {Array} [intersectionsArray] Optional array that can be provided as an optimization to avoid the creation of a new array.
     * @returns {Array.<Intersection>}
     */
    getIntersections(viewPosition,sceneObjects,intersectionsArray){return(null);}


    /** Clears the connected RenderTarget's buffers as specified.
     * @param {boolean} [clearColor] Boolean indicating if the color buffer should be cleared from the attached RenderTarget [DEFAULT: true].
     * @param {boolean} [clearDepth] Boolean indicating if the depth buffer should be cleared from the attached RenderTarget [DEFAULT: true].
     * @param {boolean} [clearStencil] Boolean indicating if the clearStencil buffer should be cleared from the attached RenderTarget [DEFAULT: true].
     */
    clear(clearColor,clearDepth,clearStencil){}
}


/** An OrthographicCamera is a camera that renders orthographically, with no perspective.
 * @extends Camera
 */
class OrthographicCamera extends Camera
{
    /** An OrthographicCamera is a camera that renders orthographically, with no perspective.
     * @param {SceneObject} [parent] The SceneObject that will be the new OrthographicCamera's parent. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new OrthographicCamera.
     * @example
     * // Objective: Move a Scene's Camera up and down.
 * // Expected Result: You will see a red box with the phrase "Build It Once." moving up and down.
 * 
 * // Create a new Scene and add a TextBox to it.
 * let scene = new Scene( "Scene" );
 * let textBox = new TextBox( scene );
 * textBox.string = "Build It Once.";
 * 
 * // Create new RenderTarget.
 * let renderTarget = new RenderTarget( "RenderTarget", 400, 100 );
 * 
 * // Create a new Camera for the Scene.
 * let camera = new OrthographicCamera( scene, "camera" );
 * camera.coreViewWidth = 400;
 * camera.coreViewHeight = 100;
 * camera.renderTarget = renderTarget;
 * camera.backgroundColor.red = .5;
 * camera.backgroundColor.alpha = 1;
 * 
 * // Move the Camera up and down along the y axis.
 * camera.position.addMotion.y( 50, -50, .2 );
 * 
 * // Create a GraphicAsset from RenderTarget.
 * nc.defineGraphicAssetFromRenderTarget( "NewGraphicAsset", renderTarget );
 * // Create a GraphicObject using the new GraphicAsset.
 * this.go = new GraphicObject( nc.graphicAssets.NewGraphicAsset, nc.mainScene, "SceneViewerGraphicObject" );
     */
    constructor(parent,name)
    {
        /** The base width of the camera view area (frustum) in 'world units'. 
         * This number may not match the actual view width for certain settings of the 'adaptiveCameraMode' property.
         * @default 500
         * @type {number}
         */
        this.coreViewWidth = null;


        /** The base height of the camera view area (frustum) in 'world units'.
         * This number may not match the actual view height for certain settings of the 'adaptiveCameraMode' property.
         * @default 500
         * @type {number}
         */
        this.coreViewHeight = null;


        /** The depth of the camera view area (frustum) in 'world units'.
         * @default 2000
         * @type {number}
         */
        this.viewDepth = null;
    }


    /** Returns a Vector3 containing current dimensions of this Camera's current view area, inclusive of any changes brought about by its adaptiveCameraMode.
     * @returns {Vector3}
    */
    getCurrentViewDimensions(){}
}


/** Class holding the information about an intersection between a point in a Camera's view and a SceneObject in the Scene.
 * Objects of this type are returned from the Camera.getIntersections method.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class Intersection
{
    constructor()
    {
        /** The SceneObject that is intersected.
         * @type {SceneObject}
         */
        this.sceneObject=null;


        /** The global position of the intersection within the given Scene.
         * @type {Vector3}
         */
        this.intersectionPosition=null;
    }
}


/** Object housing tools for pre-process manipulation of code such as including files and conditional code.
 * An instance of this object can be refrenced globally by the name of 'CODE'.
 * [NON-INSTANTIABLE]
*/
class Code
{
    constructor()
    {
        /** Conditional code opener. Use this tag at the beginning of a section of code that will only be included when the project is published.
         * @type {object}
         * @example:
         * console.log('this is always happening');
         * CODE.includeIf___published;
         *   console.log('this is only happening when the project is published');
         * CODE.includeEnd___published;
         */
        this.includeIf___published=null;


        /** Conditional code closer. Use this tag at the end of a section of code that will only be included when the project is published.
         * @type {object}
         * @example
         * console.log('this is always happening');
         * CODE.includeIf___published;
         *   console.log('this is only happening when the project is published');
         * CODE.includeEnd___published;
         */
        this.includeEnd___published=null;


        /** Conditional code opener. Use this tag at the beginning of a section of code that will only be included when the project is not published.
         * @type {object}
         * @example
         * console.log('this is always happening');
         * CODE.includeIf___unpublished;
         *   console.log('this is only happening when the project is not published');
         * CODE.includeEnd___unpublished;
         */
        this.includeIf___unpublished=null;


        /** Conditional code closer. Use this tag at the end of a section of code that will only be included when the project is not published.
         * @type {object}
         * @example
         * console.log('this is always happening');
         * CODE.includeIf___unpublished;
         *   console.log('this is only happening when the project is not published');
         * CODE.includeEnd___unpublished;
         */
        this.includeEnd___unpublished=null;


        /** Preservation opener. Use this tag at the beginning of a block of code to exempt it from all forms of code formatting including minification, whitespace removal, and comment removal.
         * @type {object}
         */
        this.preserve___begin=null;


        /** Preservation closer. Use this tag at the end of a block of code to exempt it from all forms of code formatting including minification, whitespace removal, and comment removal.
         * @type {object}
         */
        this.preserve___end=null;


        /** A code tag that denotes the beginning of a 'runBeforeInit' block. Generally, code written within Incisor® is completely object-oriented, and as such 
         * all code execution must originate from within class objects. In other words, if you open up a new javascript file, and type "nc.addGraphicObject();",
         * you would get an error pointing out that 'nc' doesn't exist, since that code is running in a class-declaration scope. To get that code to execute properly,
         * you would either need to included in a class function that is ultimately called as a result of the ProjectMain.init function, OR you can include that
         * code in a 'runBeforeInit' block, which actually moves the code so that it will be executed right before the invocation of ProjectMain.init. It should be 
         * noted that 'runBeforeInit' blocks also exist for code assets, as well as Incisor® extensions, and have a similar effect - moving blocks of code to the 
         * same scope as the entry-points for those contexts.
         * @type {object}
         * @example
         * CODE.runBeforeInit___begin;
         *    // since this code is inside of a 'runBeforeInit' block, it will be run right before ProjectMain.init, and all standard classes will have access to the 'whiteBox' var.
         *    var whiteBox = nc.addGraphicObject();
         * CODE.runBeforeInit___end;
         */
        this.runBeforeInit___begin=null;


        /** A code tag that denotes the end of a 'runBeforeInit' block. Generally, code written within Incisor® is completely object-oriented, and as such 
         * all code execution must originate from within class objects. In other words, if you open up a new javascript file, and type "nc.addGraphicObject();",
         * you would get an error pointing out that 'nc' doesn't exist, since that code is running in a class-declaration scope. To get that code to execute properly,
         * you would either need to included in a class function that is ultimately called as a result of the ProjectMain.init function, OR you can include that
         * code in a 'runBeforeInit' block, which actually moves the code so that it will be executed right before the invocation of ProjectMain.init. It should be 
         * noted that 'runBeforeInit' blocks also exist for code assets, as well as Incisor® extensions, and have a similar effect - moving blocks of code to the 
         * same scope as the entry-points for those contexts.
         * @type {object}
         * @example
         * CODE.runBeforeInit___begin;
         *    // since this code is inside of a 'runBeforeInit' block, it will be run right before ProjectMain.init, and all standard classes will have access to the 'whiteBox' var.
         *    var whiteBox = nc.addGraphicObject();
         * CODE.runBeforeInit___end;
         */
        this.runBeforeInit___end=null;


        /** Conditional code opener. Use this tag at the beginning of a section of code that will only be included when the associated conditional code tag is enabled in the given configuration.
 * @type {object}
 * @example
 * console.log('this is always happening');
 * this.includeIf___MyConditionalCodeTag;
 *   console.log('this is only happening when the MyConditionalCodeTag tag is included in the conditionalCodeTagsIncluded array for the current configuration.');
 * this.includeEnd___MyConditionalCodeTag;
 */
this.includeIf___MyConditionalCodeTag=null;
/** Conditional code closer. Use this tag at the end of a section of code that will only be included when the associated conditional code tag is enabled in the given configuration.
 * @type {object}
 * @example
 * console.log('this is always happening');
 * this.includeIf___MyConditionalCodeTag;
 *   console.log('this is only happening when the MyConditionalCodeTag tag is included in the conditionalCodeTagsIncluded array for the current configuration.');
 * this.includeEnd___MyConditionalCodeTag;
 */
this.includeEnd___MyConditionalCodeTag=null;

    }


    /** Function that inserts Javascript code from another file at the location of the function call.
     */
    includeFile(fileName){}
}


/** Object housing tools for pre-process manipulation of code.
 * @type {Code}
*/
var CODE;


/** Object housing predefined constant values for various Incisor® options and modes.
 * [NON-INSTANTIABLE]
 */
class Constants
{
    constructor()
    {
        /** The available options for texture wrap modes.
         */
        this.wrapModes = {
            /** @type {string}*/
            clamp : "clamp",
            /**@type {string}*/
            repeat : "repeat",
            /**@type {string}*/
            mirroredRepeat : "mirroredRepeat"
        };


        /** The available options for texture down-scaling modes.
         */
        this.textureDownscalingModes = {
            /**@type {string}*/
            linear : "linear",
            /**@type {string}*/
            nearest : "nearest",
            /**@type {string}*/
            discreteMipmapNearest : "discreteMipmapNearest",
            /**@type {string}*/
            discreteMipmapLinear : "discreteMipmapLinear",
            /**@type {string}*/
            mipmapLinear : "mipmapLinear"
        };


        /** The available options for texture up-scaling modes.
         */
        this.textureUpscalingModes = {
            /**@type {string}*/
            linear : "linear",
            /**@type {string}*/
            nearest : "nearest"
        };


        /** The available options for adaptive camera modes.   
        */
        this.adaptiveCameraModes = {
            /**@type {string}*/
            none : "none",
            /**@type {string}*/
            maximizeSafeZone : "maximizeSafeZone",
            /**@type {string}*/
            unitsMatchPixels : "unitsMatchPixels"
        };


        /** The available options for EffectController base types. 
         */
        this.effectControllerBaseTypes = {
            /**@type {string}*/
            Vector4 : "Vector4",
            /**@type {string}*/
            Vector3 : "Vector3",
            /**@type {string}*/
            Vector2 : "Vector2",
            /**@type {string}*/
            number : "number",
            /**@type {string}*/
            Texture : "Texture",
            /**@type {string}*/
            Matrix4 : "Matrix4",
            /**@type {string}*/
            Matrix4Array : "Matrix4Array"
        };


        /** The available options for EffectController mix modes. 
         */
        this.effectControllerMixModes = {
            /**@type {string}*/
            addition : "addition",
            /**@type {string}*/
            multiplication : "multiplication",
            /**@type {string}*/
            materialOnly : "materialOnly"
        };


        /** The available options for material blending modes. 
         */
        this.blendingModes = {
            /**@type {string}*/
            standard : "standard",
            /**@type {string}*/
            add : "add",
            /**@type {string}*/
            multiply : "multiply"
        };


        /** The available options for layout justifications. 
         */
        this.justifications = {
            /**@type {string}*/
            left : "left",
            /**@type {string}*/
            right : "right",
            /**@type {string}*/
            center : "center",
            /**@type {string}*/
            top : "top",
            /**@type {string}*/
            bottom : "bottom"
        };


        /** The available options for Geometry attribute number types. 
         */
        this.geometryAttributeNumberTypes = {
            /**@type {string}*/
            Int8 : "Int8",
            /**@type {string}*/
            UInt8 : "UInt8",
            /**@type {string}*/
            Int16 : "Int16",
            /**@type {string}*/
            UInt16 : "UInt16",
            /**@type {string}*/
            Int32 : "Int32",
            /**@type {string}*/
            UInt32 : "UInt32",
            /**@type {string}*/
            Float32 : "Float32",
            /**@type {string}*/
            Float64 : "Float64"
        };


        /** The available options textBox editing modes. 
         */
        this.textBoxEditingModes = {
            /**@type {string}*/
            none : "none",
            /**@type {string}*/
            selectable : "selectable",
            /**@type {string}*/
            selecting : "selecting",
            /**@type {string}*/
            editable : "editable",
            /**@type {string}*/
            editing : "editing"
        };


        /** The available playback states for PlaybackControllers. 
         */
        this.playbackStates = {
            /**@type {string}*/
            stopped : "stopped",
            /**@type {string}*/
            paused : "paused",
            /**@type {string}*/
            playing : "playing"
        };


        /** The available types of ParticleSystemDefinition shapes
         */
        this.particleSystemEmitterShapes = {
            /**@type {string}*/
            rectangle : "rectangle",
            /**@type {string}*/
            circleUniform : "circleUniform",
            /**@type {string}*/
            circleCenter : "circleCenter",
            /**@type {string}*/
            point : "point",
            /**@type {string}*/
            custom : "custom"
        };


        /** The available ParticleSystemDefinition ramp interpolation types.
         */
        this.particleSystemRampInterpolationTypes = {
            /**@type {string}*/
            linear : "linear",
            /**@type {string}*/
            smoothStep : "smoothStep",
            /**@type {string}*/
            catmullRom : "catmullRom"
        };


        /** The available types of input for ParticleSystemDefinition ramps.
         */
        this.particleSystemRampInputTypes = {
            /**@type {string}*/
            emissionTime : "emissionTime",
            /**@type {string}*/
            ageRatio : "ageRatio"
        };


        /** The styles of underlining available within the Pdf object.
         */
        this.pdfUnderlineTypes = {
            /**@type {string}*/
            single : "single",
            /**@type {string}*/
            dash : "dash",
            /**@type {string}*/
            dotDash : "dotDash",
            /**@type {string}*/
            dotDotDash : "dotDotDash",
            /**@type {string}*/
            words : "words"
        };


        /** The options avaiable within the Pdf object for fitting items within a designated area height.
         */
        this.pdfHeightRuleTypes = {
            /**@type {string}*/
            autoFit : "autoFit",
            /**@type {string}*/
            exactly : "exactly",
            /**@type {string}*/
            atLeast : "atLeast"
        };


        /** Options for masking - either being masked, or doing the masking.
         */
        this.maskingTypes = {
            /**@type {string}*/
            mask : "mask",
            /**@type {string}*/
            masked : "masked"
        };


        /** The property types available to be registered within a CutsomObject or CustomAddOn.
         */
        this.registeredPropertyTypes = {
            /**@type {string}*/
            number : "number",
            /**@type {string}*/
            string : "string",
            /**@type {string}*/
            boolean : "boolean",
            /**@type {string}*/
            function : "function"
        };


        /** The types of CurvePoint bezier handles that are available to be used within Curves.
         */
        this.curvePointBezierHandleTypes = {
            /** The left and right handles can be moved independently, allowing for sharp discontinuities in the tangent of the Curve.
            * @type {string}
            */
            independent : "independent",
            /** The left and right handles are always colinear with the position.
            * @type {string}
            */
            aligned : "aligned",
            /** The left and right handles are always colinear with the position, and both handles are the same distance from the position.
            * @type {string}
            */
            symmetric : "symmetric"
        };


        /** The available curve types.
         */
        this.curveTypes = {
            /** Each CurvePoint has left and right handles, allowing for manual control of the Curve's tangent, including sharp discontinuities.  The Curve passes through all CurvePoints.
            * @type {string}
            */
            bezier : "bezier",
            /** Each CurvePoint has a right handle, allowing for manual control of the Curve's tangent and enforcing a smoothly continuous tangent.  The Curve passes through all CurvePoints.
            * @type {string}
            */
            hermite : "hermite",
            /** Each CurvePoint has no handles, and the Curve's tangent is automatically computed based on the surrounding CurvePoints, producing a smoothly continuous tangent.  The Curve starts at the second CurvePoint and ends at the second to last CurvePoint, and passes through all intermediate CurvePoints. At least 4 CurvePoints are required.
            * @type {string}
            */
            cardinal : "cardinal",
            /** Also known as a B-spline. Each CurvePoint has no handles, and the Curve's tangent is automatically computed based on the surrounding CurvePoints.  The Curve starts at the second CurvePoint and ends at the second to last CurvePoint.  The curve will not necessarily pass through any of the CurvePoints, but will exhibit smoothly continuous tangent and acceleration when using 'evaluateT'. At least 4 CurvePoints are required.
            * @type {string}
            */
            basis : "basis"
        };


        /** Dictionary of available 'reelState' values within the SlotReel.
         */
        this.slotReelStates = {
            /** For when the SlotReel is stopped.
            * @type {string}
            */
            stopped : "stopped",
            /** For when the SlotReel is winding up before it spins.
            * @type {string}
            */
            windup : "windup",
            /** For when the SlotReel freely spinning.
            * @type {string}
            */
            spinFree : "spinFree",
            /** For when the SlotReel begins to stop, spinning until the symbols in the stopping window are encountered.
            * @type {string}
            */
            stopping : "stopping",
            /** This state occurs when the final stopping symbols are active on the SlotReel, and they just need to travel into their final position.
            * @type {string}
            */
            stopImminent : "stopImminent",
            /** Right before the SlotReel spin is over, and the symbols are bouncing around to simulate a physical recoil action.
            * @type {string}
            */
            bounce : "bounce"
        };


        /** Dictionary of available values for 'nc.cursorMode'.
         */
        this.cursorMode = {
            /** When nc.cursorMode is set to this value, the next cursor event will received will set the cursor mode - if it's a touch event then cursorMode will be set to 'touch', and if the it's a mouse event then cursorMode will be set to 'mouse'.
            * @type {string}
            */
            autoDetect: "autoDetect",
            /** When in this mode, Incisor is using the mousedown, mouseup, mouseleave, wheel, and mousemove browser events to inform cursor interactions.
            * @type {string}
            */
            mouse: "mouse",
            /** When in this mode, Incisor is using the touchstart, touchend, touchcancel, and touchmove browser events to inform cursor interactions.
            * @type {string}
            */
            touch: "touch"
        };
    }
}


/** ConstructDefinitions house the defining attributes of Constructs. To create an instance of a given Construct, use 'nc.myConstruct.add()'.
 * [NON-INSTANTIABLE]
 */
class ConstructDefinition
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** The name of the ConstructDefinition.
         * @type {string}
         */
        this.name = null;


        /** Object defining the Construct's composition and layout.
         * @type {Blueprint}
         */
        this.blueprint = null;


        /** Array of numbers that multiply all of the positions and scales related to this Construct.
         * @type {Array.<number>}
         */
        this.unitsPerPixel = null;
    }


    /** Adds an instance of this Construct to the given parent.
     * @param {SceneObject} [parent] The SceneObject that will be the parent of the newly added Construct instance. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the newly added Construct instance. If left undefined, this propery will default to the name of the Construct.
     */
    add(parent,name){}


    /** Returns an object version of the ConstructDefinition equivalent to the '.construct' file that defines this Construct.
     */
    getPortableObject(){}
}


/**
 * Object that stores information about a collection of SceneObjects that can be recreated later. 
 * This object is the foundation for Incisor® Constructs. 
 */
class Blueprint
{
}


/** The 'MenuConstruct' ConstructDefinition type.
 * [NON-INSTANTIABLE]
 * @extends {ConstructDefinition}
 * @hideconstructor
 */
class MenuConstruct_ConstructDefinition extends ConstructDefinition
{
constructor(){
}
/** Adds an instance of the 'MenuConstruct' Construct to the given parent.
 * @param {SceneObject} [parent] The parent to add the Construct instance to. [DEFAULT: nc.mainScene]
 * @param {string} [name] The name that will be given to the added Construct instance. If left undefined, this value defaults to the name of the Construct.
 * @returns {MenuConstruct}
 */
 add(parent,name){return(null);}
}



/** Constructs are collections of different types of SceneObjects that can be built, arranged, and animated from within the Incisor® GUI.
 * For a list of available ConstructDefinitions, see 'nc.constructDefs'. 
 * [NON-INSTANTIABLE]
 * @extends {SceneObject}
 * @hideconstructor
 */
class Construct extends SceneObject
{
    constructor()
    {
        /** The ConstructDefinition associated with this Construct. Once a Construct is instantiated, this value cannot change.
         * @type {ConstructDefinition}
         * @readonly
         */
        this.constructDefinition=null;
    }
}


/** The 'MenuConstruct' Construct type. To create a new instance, use 'nc.constructDefs.MenuConstruct.add()'.
 * [NON-INSTANTIABLE]
 * @extends {Construct}
 * @hideconstructor
 */
class MenuConstruct extends Construct
{
constructor(){
/** Dictionary of descendants of this Construct by name. Duplicate names are overwritten.
*/
this.descendantsByName = {
/** The 'text_play' descendant.
 * @type {TextBox}
 */
"text_play":null,
/** The 'text_playonline' descendant.
 * @type {TextBox}
 */
"text_playonline":null,
/** The 'text_author' descendant.
 * @type {TextBox}
 */
"text_author":null,
/** The 'logo' descendant.
 * @type {GraphicObject}
 */
"logo":null,
/** The 'text_highscore' descendant.
 * @type {TextAssembly}
 */
"text_highscore":null,
/** The 'mobaradev-logo' descendant.
 * @type {GraphicObject}
 */
"mobaradev-logo":null,
/** The 'incisor-logo' descendant.
 * @type {GraphicObject}
 */
"incisor-logo":null,
/** The 'Added SceneObject' descendant.
 * @type {SceneObject}
 */
"Added SceneObject":null
};
}
}



/** CursorInputOverrideButtons are specialized Buttons that serve as 'cursor input remapping surfaces'. 
 * These objects can be connected to Cameras (via Camera.cursorInputOverride), and serve as the means to map cursor input from an 
 * outer Scene into an inner Scene. When connected, the moving the cursor around the inside edge of the CursorInputOverrideButton
 * will map the cursor to the inner edge of the Camera's viewing area within the Scene that the Camera is rendering.
 * This only applies to Cameras whose 'cursorInteractive' property is set to true.
 * @extends Button
 */
class CursorInputOverrideButton extends Button
{
    /** CursorInputOverrideButtons are specialized Buttons that serve as 'cursor input remapping surfaces'. 
     * These objects can be connected to Cameras (via Camera.cursorInputOverride), and serve as the means to map cursor input from an 
     * outer Scene into an inner Scene. When connected, the moving the cursor around the inside edge of the CursorInputOverrideButton
     * will map the cursor to the inner edge of the Camera's viewing area within the Scene that the Camera is rendering.
     * This only applies to Cameras whose 'cursorInteractive' property is set to true.
     * @param {GraphicAsset} [graphicAsset] The GraphicAsset that the new CursorInputOverrideButton will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
     * @param {SceneObject} [parent] The SceneObject that will become the new CursorInputOverrideButton's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new CursorInputOverrideButton. [DEFAULT: 'CursorInputOverrideButton']
     */
    constructor(graphicAsset,parent,name)
    {
        /** Flag determining if items within the inner scene can be dragged outside of the bounds of the viewing camera.
         * @type {boolean}
         * @default false
         */
        this.allowExtendedDrag = null;
    }
}


/** A Curve is a path defined by CurvePoints. The value of 'curveType' determines how the CurvePoints are interpreted to form the path.
 */
class Curve
{
    /** A Curve is a path defined by CurvePoints. The value of 'curveType' determines how the CurvePoints are interpreted to form the path.
     * @param {SceneObject} parent The SceneObject that will become the new Curve's parent in the Scene hierarchy.
     * @param {string} [name] The name of the new Curve. [DEFAULT: 'Curve']
     */
    constructor(parent, name)
    {
        /** The type of spline defining this Curve. See 'constants.curveTypes' for a list of available values.
         * @default "bezier"
         * @type {string} 
         */
        this.curveType = null;


        /** When curveType is set to 'cardinal', this controls the curvature of the Curve. 0 produces straight lines between CurvePoints. 0.5 produces a Catmull-Rom spline.
         * @default 0.5
         * @type {number} 
         */
        this.cardinalTension = null;


         /** The list of CurvePoints that define the curve shape. Each value of 'curveType' causes this list of CurvePoints to produce a different curve.
         * @type {Array.<CurvePoint>} 
         */
         this.points = null;
    }


    /** Evaluates the Curve at the given T value, which spans the entire curve in the range 0-1. Note that this typically does not progress with a constant speed, but is faster than evaluating a given distance with evaluateDistance.
     * @param {number} t The T value to evaluate, mapped to the range 0-1 along the length of the curve.
     * @param {Vector3} positionResult The resulting position expressed in the local space of the curve.
     * @param {Vector3} [tangentResult] The resulting tangent expressed in the local space of the curve. This corresponds to the velocity of a point following the curve via evaluateT, and is not normalized.
     * @param {Vector3} [normalResult] The resulting normal expressed in the local space of the curce. This vector is orthogonal to the tangent and is normalized.
     * @param {Vector3} [rotationResult] The resulting rotation that corresponds to the tangent and normal vectors.
     * @param {Vector3} [velocityResult] The resulting velocity expressed in the local space of the curve. If a point were to follow this curve via linearly increasing t values, this would be the velocity of the point at this position. Also known as the Curve's derivative.
     */
    evaluateT(t,positionResult,tangentResult,normalResult,rotationResult,velocityResult){}

    
    /** Evaluates the Curve at the given distance value, which spans the curve's length. Note that this allows progression at a constant speed, but is slower than evaluating a given T value with evaluateT.
    * @param {number} distance The distance to evaluate along the arc length of the curve.
    * @param {Vector3} positionResult The resulting position expressed in the local space of the curve.
    * @param {Vector3} [tangentResult] The resulting tangent expressed in the local space of the curve. This corresponds to the velocity of a point following the curve via evaluateT, and is not normalized.
    * @param {Vector3} [normalResult] The resulting normal expressed in the local space of the curce. This vector is orthogonal to the tangent and is normalized.
    * @param {Vector3} [rotationResult] The resulting rotation that corresponds to the tangent and normal vectors.
    * @param {Vector3} [velocityResult] The resulting velocity expressed in the local space of the curve. If a point were to follow this curve via linearly increasing t values, this would be the velocity of the point at this position. Also known as the Curve's derivative.
     */
    evaluateDistance(distance,positionResult,tangentResult,normalResult,rotationResult,velocityResult){}

    
    /** If ControlPoints are added to or removed from the points array, the curve will not be updated. This function foces the curve to reevaluate the points.
     */
    updatePoints(){}

    
    /** Adds a callback that will be called when the curve shape changes. This includes changes to the CurvePoints, and changes to the curveType and cardinalTension.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. Please note that the Curve object will be prepended to the list of callback parameters. 
     */
    addCurveChangeCallback(callbackOwner,callbackName,callbackArgs){}

    
    /** Removes the callback for when the curve shape changes.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removeCurveChangeCallback(callbackOwner,callbackName){}

    
    /** Adds a new CurvePoint to the points array.
     * @returns {CurvePoint}
     */
    addPoint(){return(null);}

    
    /** Returns the total arc of the curve.
     * @returns {number}
     */
    getLength(){return(null);}
}


/** A CurvePoint is a point used to define a Curve's shape.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class CurvePoint
{
    /** A CurvePoint is a point used to define a Curve's shape.
     * @param {SceneObject} parent The SceneObject that will become the new Curve's parent in the Scene hierarchy.
     * @param {string} name The name of the new Curve. [DEFAULT: 'Curve']
     */
    constructor(parent, name)
    {
        /** The position of the CurvePoint in the local space of the Curve.
         * @default new Vector3(0,0,0)
         * @type {Vector3} 
         */
        this.position = null;


        /** The left handle of the CurvePoint, expressed with respect to the CurvePoint's position. If the Curve's curveType is not 'bezier' or the CurvePoint is the first in the points array, this is undefined.
         * @default new Vector3(-100,0,0)
         * @type {Vector3}
         */
        this.leftHandle = null;
        

        /** The right handle of the CurvePoint, expressed with respect to the CurvePoint's position. If the Curve's curveType is not 'bezier' or 'hermite' or the CurvePoint is the last in the points array, this is undefined.
         * @default new Vector3(100,0,0)
         * @type {Vector3}
         */
        this.rightHandle = null;


        /** The behavior of this CurvePoint when the Curve's curveType is "bezier" and one of the handles is moved. When a handle moves, "aligned" will ensure that the other handle remains colinear with the position and moved handle. "symmetric" will ensure that the other handle remains colinear with the position and moved handle, and matches the moved handles distance from the position.
         * @default "aligned"
         * @type {string}
         */
        this.bezierHandleType = null;
    }

    
    /** Returns a unique copy of this CurvePoint.
     * @returns {number}
     */
    clone(){return(null);}
}


/** Object housing information about the CustomAddOns currently registered in this project.
 * [NON-INSTANTIABLE]
 */
class CustomAddOnDefinition
{
    constructor()
    {
        /** The name of the CustomAddOn.
         * @type {string}
         */
        this.name=null;


        /** The the name base type of the given CustomAddOn definition. Every registered CustomAddOn must extend one of the CustomAddOn
         * types (i.e. CustomAddOn_SceneObject, CustomAddOn_GraphicObject, etc...), and this value denotes which of those types were extended to
         * to create this particular CustomAddOn.
         * @type {string}
         */
        this.baseType=null;


        /** The name of the type that is required as an owner. For example, if the CustomAddOn extended CustomAddOn_Button, then the 'acceptableOnwer' value
         * would be 'Button' and this CustomAddOn can only be added to objects that extend the Button type.
         * @type {string}
         */
        this.acceptableOwner=null;


        /** Array of objects that containing information about the registered properties for this CustomAddOn.
         * Registered properties are accessible for monitoring and manipulating within the inspector. 
         * Registered properties can also be flagged as 'persistent', which enables their values to be stored in containing Constructs. 
         * To register a property for a CustomAddOn call 'nc.registerCustomAddOnProperty'.
         * If this CustomAddOn has no registered properties, then this member will be undefined.
         * @type {Array.<object>}
         */
        this.properties=null;


        /** The class definition for this CustomAddOn. 
         * @type {object}
         */
        this.classDefinition=null;
    }
}


/** Object housing information about the CustomAddOns currently registered in this project.
 * [NON-INSTANTIABLE]
 */
class RegisteredProperty
{
    constructor()
    {
        /** The type of the RegisteredProperty.
         * @type {string}
         */
        this.type=null;


        /** The path from given CustomAddOn instance to the property.
         * @type {Array.<string>}
         */
        this.propertyPath=null;


        /** Flag determining if the registered property's value should be stored in an owning Construct.
         * To make the values of this property persistent within Constructs, set this flag to true.
         * @default true
         * @type {boolean}
         */
        this.isPersistent=null;


        /** If this property is of type 'number' or 'string', then an Array of the given type can be provided so that the values appear 
         * in a drop-down list in the inspector, thus ensuring that only the given values are available to be selected within the GUI. 
         * @default undefined
         * @type {Array.<any>}
         */
        this.validationList=null;


        /** If this property is of type 'number' or 'string', and a validation list has not been provided, then a function callback can be provided 
         * for a method which accepts the property value and returns a sanitized version of the value.
         * This property is the owner of that callback.
         * @default undefined
         * @type {object}
         */
        this.validationCallbackOwner=null;


        /** If this property is of type 'number' or 'string', and a validation list has not been provided, then a function callback can be provided 
         * for a method which accepts the property value and returns a sanitized version of the value.
         * This property is the name of that callback.
         * @default undefined
         * @type {string}
         */
        this.validationCallbackName=null;


        /** If this property is of type 'number' or 'string', and a validation list has not been provided, then a function callback can be provided 
         * for a method which accepts the property value and returns a sanitized version of the value.
         * This property represents the parameters for that callback.
         * @default undefined
         * @type {string}
         */
        this.validationCallbackArgs=null;


        /** If this property is of type 'number', then this number can control how sensative the property's supervisor is with regards to the cursor-drag interactivity. [DEFAULT: 1]
         * @default 1
         * @type {number}
         */
        this.dragMultiplier=null;


        /** Flag determining if this RegisteredProperty will appear as a Supervisor in the GUI.
         * @default true
         * @type {boolean}
         */
        this.displayInGui=null;
    }
}



/** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
class CustomAddOn_SceneObject
{
    /** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
    * @param {SceneObject} owner The object that this CustomAddOn will be added to upon instantiation.
    */
    constructor(owner)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the CustomAddOn - this will automatically be set to match the name of the class definition.
         * @type {string}
         */
        this.name=null;
        

        /** The owner of this CustomAddOn. This is the object that this CustomAddOn is meant to add its functionality to.
         * @type {SceneObject}
         */
        this.owner=null;
    }


    /** Adds a callback for when this CustomAddOn is disposed. It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
     * @param {object} callbackOwner The object owning the callback that occurs when this CustomAddOn is disposed.
     * @param {string} callbackName The name of the callback that occurs when this CustomAddOn is disposed. 
     * @param {Array|any} [callbackArgs] Parameters for this callback.
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes a callback for when this CustomAddOn is disposed.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed. 
     */
    removeDisposalCallback(callbackOwner,callbackName){}


    /** Removes this CustomAddOn from its owner and performs any registered disposal callbacks.
    * It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
    */
    dispose(){}
}


/** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
class CustomAddOn_GraphicObject
{
    /** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
    * @param {GraphicObject} owner The object that this CustomAddOn will be added to upon instantiation.
    */
    constructor(owner)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the CustomAddOn - this will automatically be set to match the name of the class definition.
         * @type {string}
         */
        this.name=null;
        

        /** The owner of this CustomAddOn. This is the object that this CustomAddOn is meant to add its functionality to.
         * @type {GraphicObject}
         */
        this.owner=null;
    }


    /** Adds a callback for when this CustomAddOn is disposed. It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
     * @param {object} callbackOwner The object owning the callback that occurs when this CustomAddOn is disposed.
     * @param {string} callbackName The name of the callback that occurs when this CustomAddOn is disposed. 
     * @param {Array|any} [callbackArgs] Parameters for this callback.
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes a callback for when this CustomAddOn is disposed.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed. 
     */
    removeDisposalCallback(callbackOwner,callbackName){}


    /** Removes this CustomAddOn from its owner and performs any registered disposal callbacks.
    * It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
    */
    dispose(){}
}


/** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
class CustomAddOn_Button
{
    /** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
    * @param {Button} owner The object that this CustomAddOn will be added to upon instantiation.
    */
    constructor(owner)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the CustomAddOn - this will automatically be set to match the name of the class definition.
         * @type {string}
         */
        this.name=null;
        

        /** The owner of this CustomAddOn. This is the object that this CustomAddOn is meant to add its functionality to.
         * @type {Button}
         */
        this.owner=null;
    }


    /** Adds a callback for when this CustomAddOn is disposed. It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
     * @param {object} callbackOwner The object owning the callback that occurs when this CustomAddOn is disposed.
     * @param {string} callbackName The name of the callback that occurs when this CustomAddOn is disposed. 
     * @param {Array|any} [callbackArgs] Parameters for this callback.
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes a callback for when this CustomAddOn is disposed.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed. 
     */
    removeDisposalCallback(callbackOwner,callbackName){}


    /** Removes this CustomAddOn from its owner and performs any registered disposal callbacks.
    * It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
    */
    dispose(){}
}


/** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
class CustomAddOn_TextBox
{
    /** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
    * @param {TextBox} owner The object that this CustomAddOn will be added to upon instantiation.
    */
    constructor(owner)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the CustomAddOn - this will automatically be set to match the name of the class definition.
         * @type {string}
         */
        this.name=null;
        

        /** The owner of this CustomAddOn. This is the object that this CustomAddOn is meant to add its functionality to.
         * @type {TextBox}
         */
        this.owner=null;
    }


    /** Adds a callback for when this CustomAddOn is disposed. It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
     * @param {object} callbackOwner The object owning the callback that occurs when this CustomAddOn is disposed.
     * @param {string} callbackName The name of the callback that occurs when this CustomAddOn is disposed. 
     * @param {Array|any} [callbackArgs] Parameters for this callback.
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes a callback for when this CustomAddOn is disposed.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed. 
     */
    removeDisposalCallback(callbackOwner,callbackName){}


    /** Removes this CustomAddOn from its owner and performs any registered disposal callbacks.
    * It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
    */
    dispose(){}
}


/** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
class CustomAddOn_TextAssembly
{
    /** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
    * @param {TextAssembly} owner The object that this CustomAddOn will be added to upon instantiation.
    */
    constructor(owner)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the CustomAddOn - this will automatically be set to match the name of the class definition.
         * @type {string}
         */
        this.name=null;
        

        /** The owner of this CustomAddOn. This is the object that this CustomAddOn is meant to add its functionality to.
         * @type {TextAssembly}
         */
        this.owner=null;
    }


    /** Adds a callback for when this CustomAddOn is disposed. It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
     * @param {object} callbackOwner The object owning the callback that occurs when this CustomAddOn is disposed.
     * @param {string} callbackName The name of the callback that occurs when this CustomAddOn is disposed. 
     * @param {Array|any} [callbackArgs] Parameters for this callback.
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes a callback for when this CustomAddOn is disposed.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed. 
     */
    removeDisposalCallback(callbackOwner,callbackName){}


    /** Removes this CustomAddOn from its owner and performs any registered disposal callbacks.
    * It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
    */
    dispose(){}
}


/** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
class CustomAddOn_ParticleSystem
{
    /** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
    * @param {ParticleSystem} owner The object that this CustomAddOn will be added to upon instantiation.
    */
    constructor(owner)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the CustomAddOn - this will automatically be set to match the name of the class definition.
         * @type {string}
         */
        this.name=null;
        

        /** The owner of this CustomAddOn. This is the object that this CustomAddOn is meant to add its functionality to.
         * @type {ParticleSystem}
         */
        this.owner=null;
    }


    /** Adds a callback for when this CustomAddOn is disposed. It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
     * @param {object} callbackOwner The object owning the callback that occurs when this CustomAddOn is disposed.
     * @param {string} callbackName The name of the callback that occurs when this CustomAddOn is disposed. 
     * @param {Array|any} [callbackArgs] Parameters for this callback.
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes a callback for when this CustomAddOn is disposed.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed. 
     */
    removeDisposalCallback(callbackOwner,callbackName){}


    /** Removes this CustomAddOn from its owner and performs any registered disposal callbacks.
    * It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
    */
    dispose(){}
}


/** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
 */
class CustomAddOn_Construct
{
    /** CustomAddOns are objects containing modular user-defined functionality that can be added to different types of SceneObjects in the GUI.
 * The type of the particular CustomAddOn determines what type of SceneObject it can be added to. For example, a CustomAddOn_SceneObject 
 * can be added to all objects that inherit from SceneObject, while a CustomAddOn_Button can only be added to objects that inherit from Button.
 * To add a CustomAddOn in code, simply create a new instance of the CustomAddOn, passing the owning object as the parameter.
 * To make a CustomAddOn available in the Incisor inspector build a class that extends one of the CustomAddOn types within a 'codeAsset' file,
 * then call 'nc.registerCustomAddOn' in a 'runBeforeInit' block to register the new CustomAddOn type with the GUI.
 * Once a CustomAddOn is added to another object, it can be found in that object's 'customAddOns' member, which is a dictionary of CustomAddOns.
 * [NON-INSTANTIABLE]
    * @param {Construct} owner The object that this CustomAddOn will be added to upon instantiation.
    */
    constructor(owner)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the CustomAddOn - this will automatically be set to match the name of the class definition.
         * @type {string}
         */
        this.name=null;
        

        /** The owner of this CustomAddOn. This is the object that this CustomAddOn is meant to add its functionality to.
         * @type {Construct}
         */
        this.owner=null;
    }


    /** Adds a callback for when this CustomAddOn is disposed. It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
     * @param {object} callbackOwner The object owning the callback that occurs when this CustomAddOn is disposed.
     * @param {string} callbackName The name of the callback that occurs when this CustomAddOn is disposed. 
     * @param {Array|any} [callbackArgs] Parameters for this callback.
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes a callback for when this CustomAddOn is disposed.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed. 
     */
    removeDisposalCallback(callbackOwner,callbackName){}


    /** Removes this CustomAddOn from its owner and performs any registered disposal callbacks.
    * It should be noted that this CustomAddOn will be automatically disposed if the owning object is disposed.
    */
    dispose(){}
}


/** Object housing information about the CustomObjects currently registered in this project.
 * A 'CustomObject' is any object that inherits from one of the standard hierarchy objects (i.e. SceneObject, GraphicObject, Button, etc...),
 * that is registered with the Incisor inspector using 'nc.registerCustomObject'. Once registered, CustomObjects can be added to Constructs from within the Incisor GUI.
 * CustomObject properties can also be registered with Incisor, making them accessible for monitoring and manipulating from within the inspector.
 * To create a CustomObject, build a class that extends one of the standard Incisor hierarchy object types within a 'codeAsset' file,
 * then call 'nc.registerCustomObject' in a 'runBeforeInit' block to register the new CustomObject type with the GUI.
 * [NON-INSTANTIABLE]
 */
class CustomObjectDefinition
{
    constructor()
    {
        /** The name of the CustomObject.
         * @type {string}
         */
        this.name=null;


        /** The the name base type of the given CustomObject definition. Every registered CustomObject must extend one of the allowable CustomObject
         * types (i.e. SceneObject, GraphicObject, etc...), and this value denotes which of those types were extended to create this particular CustomObject.
         * @type {string}
         */
        this.baseType=null;


        /** Array of objects that containing information about the registered properties for this CustomObject.
         * Registered properties are accessible for monitoring and manipulating within the inspector. 
         * Registered properties can also be flagged as 'persistent', which enables their values to be stored in containing Constructs. 
         * To register a property for a CustomObject call 'nc.registerCustomObjectProperty'.
         * If this CustomObject has no registered properties, then this member will be undefined.
         * @type {Array.<object>}
         */
        this.properties=null;


        /** The class definition for this CustomObject. 
         * @type {object}
         */
        this.classDefinition=null;
    }
}





/** The particleSystemParameters Swoop object - contains the swoopers for this EffectController's components.
*/
class particleSystemParametersSwoop extends Vector4Swoop
{
/** Swoops (interpolates) 'localTime' component from its current value to the given end value over the duration.
 * @param {number} endValue The ending value for the numeric property being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 */
localTime(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Swoops (interpolates) 'localTimeDelta' component from its current value to the given end value over the duration.
 * @param {number} endValue The ending value for the numeric property being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 */
localTimeDelta(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Swoops (interpolates) 'randomSeed' component from its current value to the given end value over the duration.
 * @param {number} endValue The ending value for the numeric property being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 */
randomSeed(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Swoops (interpolates) 'globalDeathTime' component from its current value to the given end value over the duration.
 * @param {number} endValue The ending value for the numeric property being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 */
globalDeathTime(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}
/** The particleSystemParameters AddMotion object - contains the 'addMotion' functions for this EffectController's components.
*/
class particleSystemParametersAddMotion extends Vector4AddMotion
{
/** Adds a motion to the 'localTime' component and returns a Motion object, which can be used to control the motion dynamically.
 * @param {number} lowerBound The lower bound for the motion being added.
 * @param {number} upperBound The upper bound for the motion being added.
 * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
 * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
 * @returns {Motion}
 */
localTime(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Adds a motion to the 'localTimeDelta' component and returns a Motion object, which can be used to control the motion dynamically.
 * @param {number} lowerBound The lower bound for the motion being added.
 * @param {number} upperBound The upper bound for the motion being added.
 * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
 * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
 * @returns {Motion}
 */
localTimeDelta(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Adds a motion to the 'randomSeed' component and returns a Motion object, which can be used to control the motion dynamically.
 * @param {number} lowerBound The lower bound for the motion being added.
 * @param {number} upperBound The upper bound for the motion being added.
 * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
 * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
 * @returns {Motion}
 */
randomSeed(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Adds a motion to the 'globalDeathTime' component and returns a Motion object, which can be used to control the motion dynamically.
 * @param {number} lowerBound The lower bound for the motion being added.
 * @param {number} upperBound The upper bound for the motion being added.
 * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
 * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
 * @returns {Motion}
 */
globalDeathTime(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}
/** The particleSystemParameters EffectController.
 * This class is a dynamically created EffectController (with base type 'Vector4'), and is therefore non-instantiable.
 * To create a new instance, use "nc.effectControllers['particleSystemParameters'].new".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @extends {Vector4}
 */
class particleSystemParameters extends Vector4Base
{
constructor(){
/**  The localTime component.
 * This is a pseudonym for the x vector component.
 * @type {number}
 */
this.localTime = null;
/**  The localTimeDelta component.
 * This is a pseudonym for the y vector component.
 * @type {number}
 */
this.localTimeDelta = null;
/**  The randomSeed component.
 * This is a pseudonym for the z vector component.
 * @type {number}
 */
this.randomSeed = null;
/**  The globalDeathTime component.
 * This is a pseudonym for the w vector component.
 * @type {number}
 */
this.globalDeathTime = null;
/** Object containing the swoopers for this EffectController's components.
 * @type {particleSystemParametersSwoop}
*/
this.swoop=null;
/** Object containing the 'addMotion' functions for this EffectController's components.
 * @type {particleSystemParametersAddMotion}
*/
this.addMotion=null;
}
}
/** The shapify Swoop object - contains the swoopers for this EffectController's components.
*/
class shapifySwoop extends Vector2Swoop
{
/** Swoops (interpolates) 'edgeOffset' component from its current value to the given end value over the duration.
 * @param {number} endValue The ending value for the numeric property being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 */
edgeOffset(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Swoops (interpolates) 'edgeFeather' component from its current value to the given end value over the duration.
 * @param {number} endValue The ending value for the numeric property being swooped.
 * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
 * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
 * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
 * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
 * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
 * @returns {Swooper}
 */
edgeFeather(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}
/** The shapify AddMotion object - contains the 'addMotion' functions for this EffectController's components.
*/
class shapifyAddMotion extends Vector2AddMotion
{
/** Adds a motion to the 'edgeOffset' component and returns a Motion object, which can be used to control the motion dynamically.
 * @param {number} lowerBound The lower bound for the motion being added.
 * @param {number} upperBound The upper bound for the motion being added.
 * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
 * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
 * @returns {Motion}
 */
edgeOffset(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
/** Adds a motion to the 'edgeFeather' component and returns a Motion object, which can be used to control the motion dynamically.
 * @param {number} lowerBound The lower bound for the motion being added.
 * @param {number} upperBound The upper bound for the motion being added.
 * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
 * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
 * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
 * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
 * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
 * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
 * @returns {Motion}
 */
edgeFeather(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}
/**The EffectController for the 'Shapify' EffectNode. The Shapify EffectNode converts edge data stored in a 'shapified' Texture into a presentable image with edges that stay sharp regardless of the scale of the associated GraphicObject.
 * This class is a dynamically created EffectController (with base type 'Vector2'), and is therefore non-instantiable.
 * To create a new instance, use "nc.effectControllers['shapify'].new".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @extends {Vector2}
 */
class shapify extends Vector2Base
{
constructor(){
/** This 'shapify' component determines how far to expand or contract the shape's edge from the position of the edge in the source image.
 * This is a pseudonym for the x vector component.
 * @type {number}
 */
this.edgeOffset = null;
/** This 'shapify' component determines the how many pixels the image's edge transition spans. For example, a value of 5 would lead to a soft edge, as the transition from inside the image's shape to outside the shape would take place over 5 pixels.
 * This is a pseudonym for the y vector component.
 * @type {number}
 */
this.edgeFeather = null;
/** Object containing the swoopers for this EffectController's components.
 * @type {shapifySwoop}
*/
this.swoop=null;
/** Object containing the 'addMotion' functions for this EffectController's components.
 * @type {shapifyAddMotion}
*/
this.addMotion=null;
}
}



/** Object housing the info about a particular EffectController.
 * EffectControllers provide the ability to dynamically control EffectNodes and their resulting visual effects.
 * EffectControllers are generally one of 3 base types, Vectors, numbers, and Textures.
 * Once defined, EffectControllers will be generally available on all SceneObjects, Materials, MaterialMaster, CharacterMaterial objects;
 * It should be noted that while these objects will have all EffectControllers as members, only the EffectControllers tied
 * to the objects' current EffectNodes will cause any change visually.
 * It should also be noted EffectControllers with 'mixMode=materialOnly' will not be available on SceneObjects for inheritance,
 * and will instead only be on Material and MaterialMaster objects for direct manipulation.
 * [NON-INSTANTIABLE]
 */
class EffectControllerDefinition
{
    constructor()
    {
        /** The name of the EffectController
        * @type {string}
        * @readonly
        */
        this.name = "";


        /** The base type of the EffectController
        * @type {string}
        * @readonly
        */
        this.baseType = ""; 


        /** The names of the components of this EffectController.
         * @type {Array.<string>|string}
         */
        this.componentNames = [];


        /** The default component values for this EffectController.
         * @type {Array.<number> & number}
         * @readonly
         */
        this.defaultValues = [];


        /** The mixMode for this EffectController. Mix modes determined the manner in which the values of EffectControllers are transfered
         * to descendants in the hierarchy. So if the "multiplication" mixMode is chosen, a SceneObject's values for the given EffectController
         * multiply the values of all of its descendants. The "materialOnly" mixMode indicates that a given EffectController will only be 
         * on Materials (not parent SceneObjects), so no mixing of EffectController value occurs.
         * @type {string}
         * @readonly
         */
        this.mixMode = "";


        /** An array of likely ranges (each is an array of numbers) for the component values of this EffectController. These likely ranges help
         * to inform the 'scrollSpeed' of GUI controllers for this EffectController - if the likely range is much larger, than the scroll speeds 
         * default to be higher etc...
         * @type {Array.<Array.<number>>}
         * @readonly
         */
        this.likelyRanges = [];


        /** The description of the EffectController. This will inform the descriptions as they appear in the autocomplete for this project.
         * @type {string}
         * @readonly
         */
        this.effectControllerDescription = "";


        /** The description of the components of this EffectController. These descriptions will inform the component descriptions as 
         * they appear in the autocomplete for this project.
         * @type {Array.<string>}
         * @readonly
         */
        this.componentDescriptions = [];
    }
}


/** The info-object for the 'particleSystemParameters' EffectController.
 * @type {particleSystemParameters_Definition}
*/
class particleSystemParameters_Definition extends EffectControllerDefinition
{
/** A factory function that creates 'particleSystemParameters' EffectController instances.
* @returns {particleSystemParameters}
*/
new(){return(null);}
}
/** The info-object for the 'fillColor' EffectController.
 * @type {fillColor_Definition}
*/
class fillColor_Definition extends EffectControllerDefinition
{
/** A factory function that creates 'fillColor' EffectController instances.
* @returns {Color}
*/
new(){return(null);}
}
/** The info-object for the 'mainTexture' EffectController.
 * @type {mainTexture_Definition}
*/
class mainTexture_Definition extends EffectControllerDefinition
{
/** A factory function that creates 'mainTexture' EffectController instances.
* @returns {Texture}
*/
new(){return(null);}
}
/** The info-object for the 'colorMultiply' EffectController.
 * @type {colorMultiply_Definition}
*/
class colorMultiply_Definition extends EffectControllerDefinition
{
/** A factory function that creates 'colorMultiply' EffectController instances.
* @returns {Color}
*/
new(){return(null);}
}
/** The info-object for the 'shapify' EffectController.
 * @type {shapify_Definition}
*/
class shapify_Definition extends EffectControllerDefinition
{
/** A factory function that creates 'shapify' EffectController instances.
* @returns {shapify}
*/
new(){return(null);}
}



/** EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
 * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
 * which are accessable as direct members of the given SceneObject or Material.
 * When a GraphicObject is set to a particular GraphicAsset, it's Materials adopt the GraphicAsset's 
 * EffectNode and EffectController presets by default, but they can be customized at any time.
 * Ultimately, the EffectNodes on any given Material are compiled and determine the final GLSL code
 * that comprises the associated shader for WebGL to use when rendering the associated surface.
 * [NON-INSTANTIABLE]
 */
class EffectNode
{
    constructor()
    {
        /** Type identifier
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The EffectContoller's name. This must be unique among EffectControllers.
         * @type {string}
         * @readonly
         */
        this.name=null;


        /** The portion of the GLSL shader code for this EffectNode above the 'vertex main'. 
         * This segment of code is where uniform and varying variables for the vertex portion of this effect are likely to be declared.
         * Support components between EffectNodes are consolidated, so if a segment of code will be used in
         * more than on EffectNode, be sure to provide it as its own distinct array entry in each EffectNode.
         * @type {Array.<string> & string}
         */
        this.vertexNodeSupport=null;


        /** The portion of the GLSL shader code for this EffectNode within the 'vertex main'. 
         * This segment of code is where this effect can make its adjustments to the 'vertex' vec3.
         * @type {string}
         */
        this.vertexNode=null;


        /** The portion of the GLSL shader code for this EffectNode above the 'fragment main'. 
         * This segment of code is where uniform and varying variables for the fragment portion of this effect are likely to be declared.
         * Support components between EffectNodes are consolidated, so if a segment of code will be used in
         * more than on EffectNode, be sure to provide it as its own distinct array entry in each EffectNode.
         * @type {Array.<string> & string}
         */
        this.fragmentNodeSupport=null;


        /** The portion of the GLSL shader code for this EffectNode within the 'fragment main'. 
         * This segment of code is where this effect can make its adjustments to the 'fragment' vec4.
         * @type {string}
         */
        this.fragmentNode=null;
    

        /** Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'Derivatives' extension.
         * @type {boolean}
         */
        this.requiresDerivativesShaderExtension=null;


        /** Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'FragDepth' extension.
         * @type {boolean}
         */
        this.requiresFragDepthShaderExtension=null;


        /** Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'DrawBuffers' extension.
         * @type {boolean}
         */
        this.requiresDrawBuffersShaderExtension=null;


        /** Boolean determining if the shader of any Material with this EffectNode is compiled to support the 'TextureLOD' extension.
         * @type {boolean}
         */
        this.requiresTextureLODShaderExtension=null;
    }


    /** Returns the list of EffectControllers that are associated with this EffectNode.
     * @returns {Array.<string>}
     */
    getAssociatedEffectControllers(){return(null);}


    /** Updates the list of EffectControllers associated with this EffectNode.
     * @param {Array.<string>} effectControllers An array of the EffectControllers that this EffectNode is associated with. The associated EffectControllers will be the means of dynamic manipulation for this EffectNode's visual effects. See 'nc.effectControllers' for a list of available EffectControllers.
     */
    setAssociatedEffectControllers(effectControllers){}
}


/** Object housing all of the Incisor Extensions functionality.
 * In general, this object has much of the same functionality as nc/INCISOR and is therefore documented as extending that object
 * but not all of the same functionality is available through this object, so auto-complete may show some non-existent members on this object. 
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * @type {IncisorExtensions}
 */
var nce; 


/** Object housing all of the Incisor Extensions functionality.
 * In general, this object has much of the same functionality as nc/INCISOR and is therefore documented as extending that object
 * but not all of the same functionality is available through this object, so auto-complete may show some non-existent members. 
 * This object is accessible in the 'CODE.runBeforeInit' block of the extensions scope by the instance name 'nce'.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * [REQUIREMENT: extensions scope]
 * [NON-INSTANTIABLE]
 * @extends {INCISOR}
 */
class IncisorExtensions extends INCISOR
{
    constructor()
    {
        /** The global incisor extensions object. This corresponds to the scope of the javascript code placed in the "Global Extensions" folder in the "Application Support" directory (which can be accessed from the Incisor menu).
         * It should be noted that the global extensions scope is initialized before the project extensions scope, and as such 'nce.incisorExtensions_project' member will likely be undefined
         * from within the global scope on init. Once project extensions are loaded the 'nce.incisorExtensions_project' member is initialized.
         * @type {object}
         */
        this.incisorExtensions_global = null;
        

        /** The project extensions object. This corresponds to the scope of the javascript code placed in the "ProjectExtensions" folder in the "Utilities" directory of the given project.
         * It should be noted that the global extensions scope is initialized before the project extensions scope, and as such 'nce.incisorExtensions_project' member will likely be undefined
         * from within the global scope on init. Once project extensions are loaded the 'nce.incisorExtensions_project' member is initialized.
         * @type {object}
         */
        this.incisorExtensions_project = null;


        /** A reference to the 'nc' object (INCISOR) inside of the target project.
         * Please note that this value can be undefined, when the project is loading or if the project code has a runtime or syntax error.
         * See also 'nce.addProjectConnectionCallback' and 'nce.addProjectDisconnectionCallback' for the associated callbacks.
         * @type {INCISOR}
         */
        this.projectNC = null;


        /** A reference to the 'pr' object (ProjectMain) inside of the target project.
         * Please note that this value can be undefined, when the project is loading or if the project code has a runtime or syntax error.
         * See also 'nce.addProjectConnectionCallback' and 'nce.addProjectDisconnectionCallback' for the associated callbacks.
         * @type {ProjectMain}
         */
        this.projectPR = null;
    }


    /** Adds menu item to the menus along the top of the Incisor inspector, and registers a callback
     * function (from within the Incisor extensions scope) that will be triggered whenever that menu item is selected.
     * It should be noted that custom inspector menu items cannot be added to built-in Incisor menus.
     * @param {Array.<string>} menuPath An array of menu item names, where the first name is the name of the root custom menu. For example ["MyMenu","MySubMenu","MyTargetMenuItem"], would create a 'MyMenu' menu in the inspector, with sub-menu 'SubMenu', which would hold the 'MyTargetMenuItem' option that triggers the desired callback.
     * @param {object} callbackOwner The object (from within the given IncisorExtensions context) that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array} [callbackArgs] A list of parameters that will be sent to the callback function.
     */
    addInspectorMenuItem(menuPath,callbackOwner,callbackName,callbackArgs){}


    /** Registers a custom InspectorPanel type with the Incisor GUI, enabling users to select this newly defined panel as an option from within the Inspector.
     * @param {string} name The name of the InspectorPanel - this name should match (exactly) the name given to the InspectorPanel constructor 'panelTypeName' param. This is the name that will appear in the panel type selection drop down in the GUI.
     * @param {object} classDefinition The class Definition for the new InspectorPanel type. The class definition provided for this parameter should extend 'InspectorPanel'
     */
    registerInspectorPanelDefinition(name,classDefinition){}


    /** Saves a screen shot of the project and returns the path of the screenshot.
     * @param {string} path The path to the screenshot. If left undefined, the 'screenShotDestination' value in the ProjectSettings is used.
     * @param {boolean} isPathRelative  Boolean determining if the screen shot's path is relative to the project.
     * @returns {string}
     * [REQUIREMENT: module - pixelsObjects]
     */
    async saveProjectScreenShot(path,isPathRelative){return(null);}


    /** Saves a screen shot of the entire inspector and returns the path of the screenshot.
     * [REQUIREMENT: module - pixelsObjects]
     * @param {string} path The path to the screenshot. If left undefined, the 'screenShotDestination' value in the ProjectSettings is used.
     * @param {boolean} isPathRelative  Boolean determining if the screen shot's path is relative to the project.
     * @returns {string}
     */
    async saveInspectorScreenShot(path,isPathRelative){return(null);}


    /** Displays a standardized UiPopupWindow with the given title and body text populated.
     * This method is asyncronously awaitable in the event the given alert needs to be shown before code excution continues.
     * @param {string} popupTitleText The text displayed in the title bar of the UiPopupWindow.
     * @param {string} popupBodyText The text displayed in the body of the UiPopupWindow.
     */
    async alert(popupTitleText,popupBodyText){}


    /** Displays a standardized UiPopupWindow that will return a Yes/No string based on which decision button the user presses.
     * This method is asyncronously awaitable in the event the given popup to be shown before code excution continues.
     * @param {string} popupTitleText The text displayed in the title bar of the UiPopupWindow.
     * @param {string} popupBodyText The text displayed in the body of the UiPopupWindow.
     * @returns {string}
     */
    async showYesNoQueryPopup(popupTitleText,popupBodyText){return(null);}


    /** Displays a standardized UiPopupWindow that will return a user-populated string based on what the user enters in a UiTextField.
     * This method is asyncronously awaitable in the event the given popup to be shown before code excution continues.
     * @param {string} popupTitleText The text displayed in the title bar of the UiPopupWindow.
     * @param {string} popupBodyText The text displayed in the body of the UiPopupWindow.
     * @param {string} textFieldLabel The label text for the UiTextField user-prompt.
     * @param {string} defaultResponse The text value pre-populated in the UiTextField user-prompt.
     * @returns {string}
     */
    async showTextQueryPopup(popupTitleText,popupBodyText,textFieldLabel,defaultResponse){return(null);}


    /** Displays a standardized UiPopupWindow that displays a FileBrowser and returns the user's selection.
     * This method is asyncronously awaitable in the event the given popup to be shown before code excution continues.
     * @param {string} popupTitleText The text displayed in the title bar of the UiPopupWindow.
     * @param {string} popupBodyText The text displayed in the body of the UiPopupWindow.
     * @param {string} root The root directory to show in the FileBrowser.
     * @param {boolean} showFiles Flag determining if files are shown in the FileBrowser.
     * @param {boolean} selectableFiles Flag determining if files are able to be selected in the FileBrowser.
     * @param {boolean} allowMultiSelect Flag determining if multiple items can be selected at once in the FileBrowser.
     * @param {boolean} rootSelectorActive Flag determining if the user can change the root directory of the FileBrowser.
     * @returns {string}
     */
    async showPathQueryPopup(popupTitleText,popupBodyText,root,showFiles,selectableFiles,allowMultiSelect,rootSelectorActive){return(null);}


    /** Adds a callback for when the Inspector connects to the project.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    addProjectConnectionCallback(callbackOwner,callbackName){}


    /** Removes the given callback.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removeProjectConnectionCallback(callbackOwner,callbackName){}


    /** Adds a callback for when the Inspector disconnects from the project.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    addProjectDisconnectionCallback(callbackOwner,callbackName){}


    /** Removes the given callback.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removeProjectDisconnectionCallback(callbackOwner,callbackName){}


    /** Displays a progress bar in the Incisor inspector.
     * @param {string} name The name of the task associated with this progress bar.
     * @param {number} progress Progress, as indicated by a number from 0 to 1. Call this function with a value of 1 to clear the progress bar.
     * @param {string} note An optional secondary note that can change as the progress us update.
     */
    showProgressBar(name,progress,note){}


    /** Adds a callback that occurs directly before the publishing of the project.
     * A PrePublishInfoObject is passed to the callbacks as the first parameter.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    addPrePublishCallback(callbackOwner,callbackName){}


    /** Removes the given callback.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removePrePublishCallback(callbackOwner,callbackName){}


    /** Adds a callback that occurs directly after the publishing of the project.
     * A PostPublishInfoObject with name of the configuration, the publishing timestamp, the destination directory, and the hosted port (if applicable) is passed to the callbacks as the first parameter.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    addPostPublishCallback(callbackOwner,callbackName){}


    /** Removes the given callback.
     * @param {object} callbackOwner The object that owns the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removePostPublishCallback(callbackOwner,callbackName){}


    /** Adds a FileBrowser to the specified parent.
     * A FileBrowser is a specialized LayoutStack with functionality which makes it an ineractive
     * inspector for the OS file system. This class is meant for use in tool development within 
     * extensions, and provides a visual means for developers locate and manipulate directories and files.
     * FileBrowsers can only be added to descendants of the 'bodyStack' of a ScrollingPanel.
     * @param {SceneObject} parent The parent to add the FileBrowser to.
     * @param {string} name The name of the new FileBrowser.
     * @param {string} [root] The root directory for the FileBrowser. [DEFAULT: nce.paths.desktopPath]
     * @param {boolean} [useRelativePaths] Boolean indicating if the paths displayed in the FileBrowser will be relative to the Project. [DEFAULT: false]
     * @param {SceneObject} [singularFocusTarget] The SceneObject that must be focused in order for this FileBrowser's keyboard functionality to be active. [DEFAULT: undefined]
     * @returns {FileBrowser}
     */
    addFileBrowser(parent,name,root,useRelativePaths,singularFocusTarget){returns(null);}


    /** Runs a provided external executable with the given arguments, returning a ProcessResult object with any ouput from the executable.
     * This functionality is meant to run a given process in a 'one-shot' manner, performing a single setup and sending a single set of arguments 
     * to the executable, immediately closing the standard-in stream, and reading both the standard-out and standard-error streams.
     * It should be noted that the "allowExternalExecutableProcesses" setting in ApplicationSettings must be set to true to use this method.
     * Be aware of the risks you are assuming by using this functionality.
     * @param {string} processExecutable The absolute path to the external executable to be run.
     * @param {string} [args] The arguments to send to the given executable process. [DEFAULT: ""]
     * @param {string} [directory] The 'working directory' for the executable process. [DEFAULT: ""]
     * @returns {ProcessResult}
     */
    runProcess(processExecutable,args,directory){returns(null);}


    /** Reloads the project, keeping the current instance of the inspector running. 
     * Calling this function is the equivalent of pressing the refresh button in the upper left corner of the 'Live View' panel.
     */
    reloadProject(){}


    /** Runs the given command within the Windows command prompt, returning a ProcessResult object with the related output.
     * This functionality is meant to run a given command in a 'one-shot' manner, performing a single command,
     * immediately closing the standard-in stream, and reading both the standard-out and standard-error streams.
     * It should be noted that the "allowExternalExecutableProcesses" setting in ApplicationSettings must be set to true to use this method.
     * Be aware of the risks you are assuming by using this functionality.
     * @param {string} [command] The command to send to the Windows command prompt. [DEFAULT: ""]
     * @param {string} [directory] The 'working directory' for the executable process. [DEFAULT: ""]
     * @param {ProcessConfiguration} [processConfigs] Object containing configurations for how the process will be run. [DEFAULT: undefined]
     * @returns {ProcessResult}
     */
    runCmd(command,directory,processConfigs){returns(null);}


    /** Runs the given bash command, returning a ProcessResult object with the related output.
     * This functionality is meant to run a given command in a 'one-shot' manner, performing a single command,
     * immediately closing the standard-in stream, and reading both the standard-out and standard-error streams.
     * It should be noted that the "allowExternalExecutableProcesses" setting in ApplicationSettings must be set to true to use this method.
     * Be aware of the risks you are assuming by using this functionality.
     * @param {string} [command] The command to send to 'bash'. [DEFAULT: ""]
     * @param {string} [directory] The 'working directory' for the executable process. [DEFAULT: ""]
     * @param {ProcessConfiguration} [processConfigs] Object containing configurations for how the process will be run. [DEFAULT: undefined]
     * @returns {ProcessResult}
     */
    runBash(command,directory,processConfigs){returns(null);}
}


/** Object containing information about the running of an executable via 'nce.runProcess'.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * [REQUIREMENT: extensions scope]
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class ProcessResult
{
    constructor()
    {
        /** The standard output from the given executable process.
         * @type {string}
         */
        this.stdOut = null;

    
        /** The standard error from the given executable process.
         * @type {string}
         */
        this.stdErr = null;


        /** If there is an exception while attempting to run the given executable process, it will be populated in this value.
         * @type {string}
         */
        this.exception = null;
    }
}


/** Object defining an inspector panel within the Incisor GUI.
 * Custom panels can be defined and registered in Incisor extensions code placed in the 'Utilities/ProjectExtensions' directory within the project,
 * or within the 'Global Extensions' directory in the application support directory (available from within the Incisor menu).
 * To make a custom panel, define a class that extends this class, populating the 'headerScrollingPanel' and 'bodyScrollingPanel' members with the 
 * desired custom content. Then call 'nce.registerInspectorPanelDefinition' with the newly defined class as a parameter and the
 * new panel should appear in the panel options menu.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * [REQUIREMENT: extensions scope]
 */
class InspectorPanel extends SceneObject
{
    /** Object defining an inspector panel within the Incisor GUI.
     * Custom panels can be defined and registered in Incisor extensions code placed in the 'Utilities/ProjectExtensions' directory within the project,
     * or within the 'Global Extensions' directory in the application support directory (available from within the Incisor menu).
     * To make a custom panel, define a class that extends this class, populating the 'headerScrollingPanel' and 'bodyScrollingPanel' members with the 
     * desired custom content. Then call 'nce.registerInspectorPanelDefinition' with the newly defined class as a parameter and the
     * new panel should appear in the panel options menu.
     * [REQUIREMENT: unpublished only]
     * [REQUIREMENT: license - extensions]
     * [REQUIREMENT: extensions scope]
     * @param {string} panelTypeName The name of the new panel type. This is the name that will appear in the panel options drop down. This name must be unique among panel type names.
     * @param {boolean} [includeBodyScrollingPanel] Boolean indicating if the InspectorPanel will have a 'bodyScrollingPanel' member. If false, the InspectorPanel will need include code responsible for populating and position the body content of the panel. [DEFAULT: true]
     * @param {boolean} [includeHeaderScrollingPanel] Boolean indicating if the InspectorPanel will have a 'hearScrollingPanel' member. If false, the InspectorPanel will need include code responsible for populating and position the header content of the panel. [DEFAULT: true]
     */
    constructor(panelTypeName,includeBodyScrollingPanel,includeHeaderScrollingPanel)
    {
        /** The type indicator for this object.
         * @type {string} 
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The ScrollingPanel that contains the header content for this InspectorPanel. 
         * This, and 'bodyScrollingPanel' are where the majority of the customization for user-defined panels take place.
         * This will be undefined if the InspectorPanel is instantiated with 'includeBodyScrollingPanel=false'
         * @type {ScrollingPanel}
         */
        this.headerScrollingPanel=null;


        /** The ScrollingPanel that contains the body content for this InspectorPanel. 
         * This, and 'headerScrollingPanel' are where the majority of the customization for user-defined panels take place.
         * This will be undefined if the InspectorPanel is instantiated with 'includeHeaderScrollingPanel=false'
         * @type {ScrollingPanel}
         */
        this.bodyScrollingPanel=null;


        /** The current width of the InspectorPanel.
         * @type {number} 
         * @readonly
         */
        this.panelWidth = null;
        

        /** The current height of the InspectorPanel.
         * @type {number} 
         * @readonly
         */
        this.panelHeight = null;


        /** The core height of the headerScrollingPanel (before uiZoom is applied).
         * @type {number} 
         */
        this.headerScrollingPanelCoreHeight = null;


        /** The current height of this InspectorPanel's headerScrollingPanel, with uiZoom factored in.
         * @type {number} 
         * @readonly
         */
        this.headerScrollingPanelHeight = null;


        /** The unique identifier for this InspectorPanel.
         * @type {number} 
         * @readonly
         */
        this.inspectorPanelUid = null;


        /** The current height of this InspectorPanel's menu bar.
         * @type {number} 
         * @readonly
         */
        this.menubarHeight = null;


        /** The name of the panel type. This is the name that will appear within the panel options drop down menu.
         * @type {string} 
         */
        this.panelType = null;


        /** Array containing the subPanels of this InspectorPanel. For standard 'content' panels, this array will be be empty, as subpanels are only present in 
         * InspectorPanels that are strictly 'container' panels.
         * @type {Array}
         */
        this.subPanels = null;


        /** Value used by 'container' panels to determine the proportion of its area that each subPanel will occupy. For standard 'content' panels this value is unused.
         * @default 0.5
         * @type {number}
         */
        this.divisionLocation = null;


        /** Boolean value used by 'container' panels to determine if its subPanels are side-by-side or top-and-bottom. For standard 'content' panels this value is unused.
         * @default {true}
         * @type {boolean}
         */
        this.isColumns = null;


        /** Button used by 'container' panels that allow the user to change the 'divisionLocation' value. For standard 'content' panels this member is undefined.
         * @type {Button}
         */
        this.dividerButton = null;


        /** The GraphicObject that serves as the left border of this InspectorPanel.
         * @type {GraphicObject}
         */
        this.borderLeft = null;


        /** The GraphicObject that serves as the right border of this InspectorPanel.
         * @type {GraphicObject}
         */
        this.borderRight = null;


        /** The GraphicObject that serves as the top border of this InspectorPanel.
         * @type {GraphicObject}
         */
        this.borderTop = null;


        /** The GraphicObject that serves as the bottom border of this InspectorPanel.
         * @type {GraphicObject}
         */
        this.borderBottom = null;


        /** The horizontal LayoutStack on the left side of the InspectorPanel's menu bar. This LayoutStack contains the panel type selection UiDropDownMenu.
         * @type {LayoutStack}
         */
        this.leftMenuStack = null;


        /** The drop down mene containing all of the panel type options. This menu is what is used by the users to select different panels.
         * @type {UiDropDownMenu}
         */
        this.panelTypeMenu = null;

    
        /** The horizontal LayoutStack on the right side of the InspectorPanel's menu bar. This LayoutStack contains the '+' button and the 'x' button.
         * @type {LayoutStack}
         */
        this.rightMenuStack = null;


        /** The UiGraphicButton serving as the '+' button on the righthand side of the InspectorPanel's menu bar. Users use this button to add subPanels to this InspectorPanel.
         * @type {UiGraphicButton}
         */
        this.plusButton = null;


        /** The UiGraphicButton serving as the 'x' button on the righthand side of the InspectorPanel's menu bar. Users use this button to close this InspectorPanel.
         * @type {UiGraphicButton}
         */
        this.exButton = null;


        /** The UiPanel/Button that serves as the background for this InspectorPanel's menu bar.
         * @type {UiPanel & Button}
         */
        this.menuBarBackground = null;


        /** This Button serves as a mask for the 'panelTypeMenu', 'plusButton', and 'exButton', ensuring that those items don't extend outside of the menu bar  
         * regardless of the uiZoom and size/aspect-ratio of the InspectorPanel.
         * @type {Button}
         */
        this.panelMaskGraphic = null;


        /** The Button responsible for setting the 'nc.singularFocusObject' to each InspectorPanel as the user's cursor moves over it (via 'addCursorInCallback').
         * @type {Button}
         */
        this.rolloverButton = null;


        /** SceneObject containing the 'quadrantButtons', which are the Buttons that enable the user to select the top, bottom, left, or right portionm of the InspectorPanel.
         * @type {SceneObject}
         */
        this.quadrantButtonContainer = null;

    
        /** The 'quadrantButton' that enables the user to select the left portion of this InspectorPanel. 
         * @type {UiPanel & Button}
         */
        this.quadrantButtonLeft = null;

    
        /** The 'quadrantButton' that enables the user to select the right portion of this InspectorPanel. 
         * @type {UiPanel & Button}
         */
        this.quadrantButtonRight = null;


        /** The 'quadrantButton' that enables the user to select the top portion of this InspectorPanel. 
         * @type {UiPanel & Button}
         */
        this.quadrantButtonTop = null;


        /** The 'quadrantButton' that enables the user to select the bottom portion of this InspectorPanel. 
         * @type {UiPanel & Button}
         */
        this.quadrantButtonBottom = null;


        /** A thin line between the headerScrollingPanel and bodyScrollingPanel
         * @type {GraphicObject}
         */
        this.headerDivider = null;
    }

    /** Adds a callback that occurs whenever the InspectorPanel is resized.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     * @param {Array|any} [callbackArgs] Arguments for the callback function. 
     */
    addResizeCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given callback for when the InspectorPanel is resized.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the callback function.
     */
    removeResizeCallback(callbackOwner,callbackName){}
}


/** A FileBrowser is a specialized LayoutStack with functionality which makes it an ineractive
 * inspector for the OS file system. This class is meant for use in tool development within 
 * extensions, and provides a visual means for developers locate and manipulate directories and files.
 * FileBrowsers must be located within the 'bodyStack' of a ScrollingPanel.
 * Call nce.addFileBrowser to make a new FileBrowser.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * [REQUIREMENT: extensions scope]
 * @extends {LayoutStack}
 * @hideconstructor
 */
class FileBrowser extends LayoutStack
{
    constructor()
    {
        /** The path of the root directory of of the FileBrowser. The contents of the root directory are the 'topmost' items shown in this FileBrowser.
         * @type {string} 
         * @default nc.paths.desktopPath 
         */
        this.root=null;


        /** Flag determining if hidden items are shown in the FileBrowser.
         * @type {boolean} 
         * @default true 
         */
        this.showHiddenItems=null;


        /** Flag determining if hidden items are selectable within the FileBrowser.
         * @type {boolean} 
         * @default true 
         */
        this.selectableHiddenItems=null;


        /** Flag determining if files are shown in the FileBrowser. If false, the FileBrowser will only display directories.
         * @type {boolean} 
         * @default true 
         */
        this.showFiles=null;


        /** Flag determining if files are selectable within the FileBrowser. If false, only directories will be selectable in the FileBrowser.
         * @type {boolean} 
         * @default true 
         */
        this.selectableFiles=null;


        /** Flag determining if files and directories can be rearranged via dragging and dropping.
         * @type {boolean} 
         * @default true 
         */
        this.allowRearrange=null;


        /** Flag determining if more than one path can be selected at once.
         * @type {boolean} 
         * @default true 
         */
        this.allowMultiSelect=null;


        /** An array of PathInfos can be provided to have the FileBrowser show a specific group of files in a flat list.
         * This can be used in conjunction with a UiTextField to provide a search field for the FileBrowser.
         * Set this property to undefined to return to normal
         * @type {Array.<PathInfo>} 
         * @default udefined 
         */
        this.overrideList=null;
    }


    /** Adds a callback function that is invoked when directory contents are displayed.
     * An array of PathInfos are sent to each callback as the first parameter, and this list
     * can be edited by the receiving callback as a means to apply specific filtering rules for
     * what is displayed in this FileBrowser.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {number} callbackName The name of the callback function.
     * @param {number} [callbackArgs] Arguments for the callback function.
     */
    addFilterCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given callback.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {number} callbackName The name of the callback function.
     */
    removeFilterCallback(callbackOwner,callbackName){}


    /** Adds a callback function that is invoked when the FileBrowser initiates a file system change.
     * For example if 'allowRearrange' is true, and a file is dragged to a new directory, then these
     * callbacks will be invoked. The type of the file system change, and an array of the associated
     * paramters are sent to the callbacks as the first two parameters.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {number} callbackName The name of the callback function.
     * @param {number} [callbackArgs] Arguments for the callback function.
     * @param {boolean} [callbackBeforeChange] Boolean determining if the given callback will be called before or after the change event. [DEFAULT: true]
     */
    addFileSystemChangeCallback(callbackOwner,callbackName,callbackArgs,callbackBeforeChange){}


    /** Removes the given callback.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {number} callbackName The name of the callback function.
     */
    removeFileSystemChangeCallback(callbackOwner,callbackName){}


    /** Adds a callback function that is invoked when there is a change to the files/directories that are 
     * currently selected in this FileBrowser.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {number} callbackName The name of the callback function.
     * @param {number} [callbackArgs] Arguments for the callback function.
     */
    addSelectionChangeCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given callback.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {number} callbackName The name of the callback function.
     */
    removeSelectionChangeCallback(callbackOwner,callbackName){}


    /** Returns a list of the currently selected items for this FileBrowser.
     * @returns {Array.<PathInfo>}
     */
    getCurrentSelection(){return(null);}


    /** Instructs the FileBrowser to open all of the containing directories of the given path so that it is visible.
     * @param {string} path The path to open to.
     * @param {boolean} [openPathProvided] Boolean determining if the given path itself should also be open (assumning it is a directory) [DEFAULT: false]
     */
    openToPath(path,openPathProvided){}


    /** Refreshes the FileBrowser, causing it to reflect any changes made since it was last refreshed.
     */
    refresh(){}
}


/** Object containing pre-publish information.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * [REQUIREMENT: extensions scope]
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class PrePublishInfoObject
{
    constructor()
    {
        /** The name of the configuration to use when publishing.
         * @type {string}
         */
        this.configurationName = null;


        /** Boolean indicating whether or not to proceed with publishing. 
         * To cancel the publishing process, set this value to false.
         * @default true
         * @type {boolean}
         */
        this.proceedWithPublishing = null;


        /** Boolean indicating whether the published project will be automatically hosted.
         * @type {boolean}
         */
        this.hostPublishedProject = null;
    }
}


/** Object containing post-publish information.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * [REQUIREMENT: extensions scope]
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class PostPublishInfoObject
{
    constructor()
    {
        /** The name of the configuration to use when publishing.
         * @type {string}
         */
        this.configurationName = null;


        /** The time stamp of the published project.
         * @type {string}
         */
        this.publishTimeStamp = null;


        /** The port that the newly published project is being hosted on (if applicable).
         * @type {string}
         */
        this.hostedPort = null;


        /** The relative path for the directory of the newly published project.
         * @type {string}
         */
        this.destinationDirectory = null;
    }
}


/** Object containing configurations for how a process will run during nce.runProcess, nce.runCmd, or nce.runBash.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - extensions]
 * [REQUIREMENT: extensions scope]
 */
class ProcessConfiguration
{
    constructor()
    {
        /** Determines if the new process will create a new window.
         * @default true
         * @type {boolean}
         */
        this.createNoWindow = true;


        /** Determines if 'StandardInput' will be redirected for the given process.
         * @default true
         * @type {boolean}
         */
        this.redirectStandardInput = true;


        /** Determines if 'StandardOutput' will be redirected for the given process. 
         * If true, the standard out contents will be returned as part of the ProcessResult object returned.
         * @default true
         * @type {boolean}
         */
        this.redirectStandardOutput = true;


        /** Determines if 'StandardError' will be redirected for the given process. 
         * If true, the standard error contents will be returned as part of the ProcessResult object returned.
         * @default true
         * @type {boolean}
         */
        this.redirectStandardError = true;


        /** Determines if the 'StandardInput' stream for the given process will be immediately closed.
         * This is sometimes necessary in order to prevent the process from locking up Incisor due to it waiting for input that's never coming. 
         * If true, the standard error contents will be returned as part of the ProcessResult object returned.
         * @default true
         * @type {boolean}
         */
        this.closeStandardInputImmediately = true;


        /** Determines if the given process will use ShellExecute. 
         * @default false
         * @type {boolean}
         */
        this.useShellExecute = false;


        /** Determines if Incisor will wait for the process to exit before moving on.
         * @default false
         * @type {boolean}
         */
        this.waitForExit = false;
    }
}

/** Object housing functionality to perform file IO tasks such as 'writeTextFile', 'moveTo', 'createDirectory' an more.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - fileIO]
 */
class FileIO
{
    constructor(){}


    /** Returns an IncrCommsResponseObject with a '.payload' bool stating if the file at the given path exists. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} filePath This is the relative or absolute path to the file in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async     
     * @returns {IncrCommsResponseObject}
     */
    async fileExists(filePath,isPathRelative){return(null);}


    /** Returns an IncrCommsResponseObject with a '.payload' string containing the contents of the text file at the given path. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} filePath The relative or absolute path to the file in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async    
     * @returns {IncrCommsResponseObject}
     */
    async readTextFile(filePath,isPathRelative){return(null);}


    /** Returns an IncrCommsResponseObject with a '.payload' string containing the contents of the file at the given path in Base64 format. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} filePath The relative or absolute path to the file in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async readFileBase64(filePath,isPathRelative){return(null);}


    /** Renames the file or folder at the given path. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} path The relative or absolute path to the file in question.
     * @param {string} newName The new name (not including the path) of the item you wish to rename. 
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async rename(path,newName,isPathRelative){return(null);}


    /** Writes text content to a file at the given path.
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} filePath The relative or absolute path to the file in question.
     * @param {string} [fileContent] This is the text content that will be written in the file. [DEFAULT: ""]
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async writeTextFile(filePath,fileContent,isPathRelative){return(null);}


    /** Writes a file from a base64 string.
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} filePath The relative or absolute path to the file in question.
     * @param {string} base64 The source base64 string to write the file from.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async writeFileFromBase64(filePath,base64,isPathRelative){return(null);}


    /** Appends text content to the text file at the given file path. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} filePath The relative or absolute path to the file in question.
     * @param {string} additionalContent This is the text content that will be written in the file.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async appendTextFile(filePath,additionalContent,isPathRelative){return(null);}


    /** Returns an IncrCommsResponseObject with a '.payload' bool stating if the directory at the given path exists.
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} directoryPath This is the relative or absolute path to the directory in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async directoryExists(directoryPath,isPathRelative){return(null);}


    /** Returns an IncrCommsResponseObject with a '.payload' array containing the paths to the directories and files within the given directory. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} directoryPath This is the relative or absolute path to the directory in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @param {boolean} [recurseSubdirectories] Bool stating if list of paths returned should include all sub-directories. [DEFAULT: false]
     * @param {boolean} [includeHiddenFiles] Bool stating if list of paths returned should include hidden files. [DEFAULT: false]
     * @returns {Array.<PathInfo>}
     */
    async getDirectoryContents(directoryPath,isPathRelative,recurseSubdirectories,includeHiddenFiles){return(null);}


    /** Returns an IncrCommsResponseObject with a '.payload' string containing the contents of the text file at the given path.
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} directoryPath The relative or absolute path to the directory in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async createDirectory(directoryPath,isPathRelative){return(null);}


    /** Copies the provided file or directory into the designated directory, with an option to rename the item while copying. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} sourcePath The relative or absolute path to the source item.
     * @param {string} destinationPath The relative or absolute path for the destination directory.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @param {string} [newName] The new name (not including the path) of the item you wish to rename. If "" is provided, then no rename occurs. [DEFAULT: ""]
     * @returns {IncrCommsResponseObject}
     */
    async copyTo(sourcePath,destinationPath,isPathRelative,newName){return(null);}


    /** Moves the provided file or directory into the designated directory, with an option to rename the item while moving. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} sourcePath The relative or absolute path to the source item.
     * @param {string} destinationPath The relative or absolute path for the destination directory.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @param {string} [newName] The new name (not including the path) of the item you wish to rename. If "" is provided, then no rename occurs. [DEFAULT: ""]
     * @returns {IncrCommsResponseObject}
     */
    async moveTo(sourcePath,destinationPath,isPathRelative,newName){return(null);}


    /** Deletes the provided file or directory. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} path The relative or absolute path of the item to delete.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async delete(path,isPathRelative){return(null);}


    /** Compresses the given file or directory into a zip file.
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} sourcePath The relative or absolute path to the file or directory in question. If a directory path is provided, the directory must contain at least one file or an error will be encountered.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async compress(sourcePath,isPathRelative){return(null);}


    /** Decompresses the zip file at the given path into its source format. 
     * If an error is encountered, related information will be stored in the '.error' member of the returned IncrCommsResponseObject.
     * This function is asynchronous and will return a promise if not 'awaited'.
     * @param {string} sourcePath The relative or absolute path to the file or directory in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async decompress(sourcePath,isPathRelative){return(null);}
}


/** Standardized Incisor® communications protocol object that is returned from methods that incorporate external functionality.
 * This serves as a 'wrapper' object to the desired return value. This object contains a 'payload' member and an 'error' member. 
 * If no issues are encountered during the external portion of the functionality, the desired return value can be found in the 'payload' member, otherwise
 * the 'error' member will contain applicable information about the encountered issues. 
 * For example, if nc.fileIO.readTextFile('MyDrive/SomeDirectory/myFile.txt') is successful, then the returned text from the file will be in the 'payload' member
 * of the returned IncrCommsResponseObject object, but if nc.fileIO.readTextFile('MyDrive/SomeDirectoryWithRestrictedAccess/myFile.txt') is unsuccessful,
 * then the 'error' member of the returned IncrCommsResponseObject object may be something 'Could not read file in restricted directory...'.
 * [NON-INSTANTIABLE]
 */
class IncrCommsResponseObject
{
    constructor()
    {
        /** The desired return value from the method that returns this object.
         * @type {any} 
         */
        this.payload = null;


        /** A string containing information about issues/errors/exceptions encountered during the performance of the external functionality 
         * that is required by the method that returns this object. If no issues were encountered, this value will default to an empty string.
         * @type {string} 
         */
        this.error = null;
    }
}


/** Class containing a 'path' and a 'type' (where type is 'file' or 'directory')
 */
class PathInfo
{
    constructor()
    {
        /** The path string.
         * @type {string} 
         */
        this.path = null;


        /** The type of the item at the given path. Value will either be 'file' or 'directory'.
         * @type {string} 
         */
        this.type = null;
    }
}


/** FlowControllers provide a way to organize the general flow of state-based items in a project.
 * For example if your project is a game with an intro, a menu, and several levels,
 * you could create a FlowController named "GameFlowController" and then define and add an 'Intro' FlowState,
 * a 'Menu' FlowState, and 'LevelXX' FlowStates to that FlowController. Within each FlowState in the FlowController,
 * timed callback elements can be added to help define the sequencing within each FlowState.
 * Once created, FlowControllers, FlowStates, and FlowStateElements can be accessed via 'nc.flows'.
 * [REQUIREMENT: license - proGaming]
 * [REQUIREMENT: module - flowControllers]
 */
class FlowController
{
    constructor()
    {
        /** The name of the FlowController.
         * @type {string}
         */
        this.name = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {any}
         */
        this.inheritedTypes=null;


        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** The current FlowState of this FlowController. Monitor or change the FlowState using this property. 
         * This property can also be set via 'nc.flows.[FlowControllerName].[FlowStateName].setToCurrentState'.
         * @type {FlowState}
         */
        this.currentFlowState=null;


        /** Flag determining if this FlowController is actively updating the time of the current FlowState and evaluating which FlowStateElements to execute.
         * @type {boolean}
         * @default true
         */
        this.isActive = null;


        /** The PauseEvent or Array of PauseEvents that this FlowController will be immune to. 
         * Set this parameter to [] for this FlowController to have no pause immunity.
         * @default nc.defaultPauseImmunity
         * @type {PauseEvent & Array.<PauseEvent>}
         */
        this.pauseImmunity = null;


        /** The SpeedControl or Array of SpeedControls that this FlowController is affected by.
         * @default nc.defaultSpeedControl
         * @type {SpeedControl & Array.<SpeedControl>}
         */
        this.speedControl = null;


        /** Value multiplying the progression of the 'time' value. To play twice as fast use 2, for items that can play backwards, use negative values.
         * @default 1
         * @type {number}
         */
        this.playbackRate = null;


        /** Read-only value denoting the net playbackRate, including the effects of this FlowController's SpeedControls.
         * @type {number}
         * @readonly
         */
        this.netPlaybackRate = null;
    }


    /** Adds a the given FlowState to this FlowController. 
     * To build a FlowState, define a class that extends the FlowState class, then provide that definition to this method to add it to this FlowController.
     * @param {object} flowStateDefinition The class definition of the FlowState to add to this FlowController. The provided class definition must inherit from FlowState.
     */
    addFlowState(flowStateDefinition){}


    /** Sets the 'currentFlowState' of this FlowController to the provided FlowState. This can also be achieved by calling 'setToCurrentState' on the given FlowState.
     * @param {FlowState} flowState The FlowState to set as this FlowController's current FlowState.
     * @param {boolean} [performFollowupEvaluation] Flag determining if another evaluation of which FlowStateElement callbacks to execute will be done immediately (without waiting a fixedUpdate) after the state change. [DEFAULT: false]
     */
    setState(flowState,performFollowupEvaluation){}
    

    /** Adds a callback that occurs whenever the current FlowState of this FlowController is changed.
    * The new FlowState and the previous FlowState are sent to the callback as its first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever the FlowState changes.
    * @param {string} callbackName The name of the callback function that occurs whenever the FlowState changes.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever the FlowState changes.
    */
    addFlowStateChangeCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeFlowStateChangeCallback(callbackOwner,callbackName){}
}


/** This object represents a state within a FlowController. 
 * FlowControllers provide a way to organize the general flow of state-based items in a project.
 * For example if your project is a game with an intro, a menu, and several levels,
 * you could create a FlowController named "GameFlowController" and then define and add an 'Intro' FlowState,
 * a 'Menu' FlowState, and 'LevelXX' FlowStates to that FlowController. Within each FlowState in the FlowController,
 * timed callback elements can be added to help define the sequencing within each FlowState.
 * Once created, FlowControllers, FlowStates, and FlowStateElements can be accessed via 'nc.flows'.
 * This class is not meant to be instantiated or provided directly to 'FlowController.addFlowState', rather it is meant
 * to be a class for user-defined FlowStates to extend.
 * Call 'nc.defineFlowController' to create a new FlowController, then use 'nc.flows' to access it.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: license - proGaming]
 * [REQUIREMENT: module - flowControllers]
 */
class FlowState
{
    /** This object represents a state within a FlowController. 
     * FlowControllers provide a way to organize the general flow of state-based items in a project.
     * For example if your project is a game with an intro, a menu, and several levels,
     * you could create a FlowController named "GameFlowController" and then define and add an 'Intro' FlowState,
     * a 'Menu' FlowState, and 'LevelXX' FlowStates to that FlowController. Within each FlowState in the FlowController,
     * timed callback elements can be added to help define the sequencing within each FlowState.
     * Once created, FlowControllers, FlowStates, and FlowStateElements can be accessed via 'nc.flows'.
     * This class is not meant to be instantiated or provided directly to 'FlowController.addFlowState', rather it is meant
     * to be a class for user-defined FlowStates to extend.
     * Call 'nc.defineFlowController' to create a new FlowController, then use 'nc.flows' to access it.
     * [NON-INSTANTIABLE]
     * [REQUIREMENT: license - proGaming]
     * [REQUIREMENT: module - flowControllers]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this FlowState will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this FlowState is affected by. [DEFAULT: nc.defaultSpeedControl]
     */
    constructor(pauseImmunity,speedControl)
    {
        /** The name of the FlowState.
         * @type {string}
         */
        this.name = null;


        /** The FlowController that owns this FlowState.
         * @type {FlowController}
         */
        this.owner = null;


        /** The current time of this FlowState.
         * @type {number}
         */
        this.time = null;
    }


    /** Sets the current time of this FlowState
     * @param {number} time The new time to set the FlowState to.
     * @param {boolean} [performFollowupEvaluation] Flag determining if another evaluation of which FlowStateElement callbacks to execute will be done immediately (without waiting a fixedUpdate) after the time change. [DEFAULT: false]
     */
    setTime(time,performFollowupEvaluation){}


    /** Sets the owning FlowController's 'currentFlowState' property equal to this FlowState.
     * @param {boolean} [performFollowupEvaluation] Flag determining if another evaluation of which FlowStateElement callbacks to execute will be done immediately (without waiting a fixedUpdate) after the state change. [DEFAULT: false]
     */
    setToCurrentState(performFollowupEvaluation){}


    /** Adds a new FlowStateElement to this FlowState. 
     * Such elements are essentially timed callbacks to functions within this FlowState, which are used to create the sequencing for this FlowState.
     * @param {number} time The time within this FlowState at which the associated callback will occur.
     * @param {string} callbackName The name of the function within this FlowState that will be called at the given time.
     * @param {Array.<any>|any} [callbackArgs] Parameters for the callback associated with the new FlowStateElement.
     * @param {Array.<string>|string} [variableOffsets] The name(s) of the numeric properties that can be adjusted to dynamically offset this FlowStateElement's time. These offset properties will be automatically added to the parent FlowState for easy manipulation of the timing of its FlowStateElements.
     * @returns {FlowStateElement}
     */
    addElement(time,callbackName,callbackArgs,variableOffsets){return(null);}


    /** Adds a new 'pause' FlowStateElement to this FlowState. When the FlowState encounters this particular FlowStateElement, its 'time' property will not progress until the provided callback returns true.
     * @param {number} time The time within this FlowState that the pause will take effect.
     * @param {string} callbackName The name of the pause function within this FlowState that will control the pausing. When the function returns true, the FlowState resumes.
     * @param {Array.<any>|any} [callbackArgs] Parameters for the callback associated with the new pause FlowStateElement.
     * @param {Array.<string>|string} [variableOffsets] The name(s) of the numeric properties that can be adjusted to dynamically offset the FlowStateElement's time. These offset properties will be automatically added to the parent FlowState for easy manipulation of the timing of its FlowStateElements.
     * @returns {FlowStateElement}
     */
    addPause(time,callbackName,callbackArgs,variableOffsets){return(null);}


    /** Returns a shallow copy of the list of this FlowState's elements.
     * @returns {Array.<FlowStateElement>}
     */
    getElements(){return(null);}
}


/** This object represents one of the sequencing elements within a FlowState. 
 * Its properties define a timed callback within the FlowState. 
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: license - proGaming]
 * [REQUIREMENT: module - flowControllers]
 */
class FlowStateElement
{
    constructor()
    {   
        /** The base time for when this FlowStateElement occurs within it's FlowState.
         * @type {number}
         */
        this.time = null;


        /** The name of the callback function that this FlowStateElement is associated with. The function must be within the owning FlowState class.
         * @type {string}
         */
        this.callbackName = null;


        /** Parameters for this FlowStateElement's callback function.
         * @type {string}
         */
        this.callbackArgs = null;


        /** Flag determining if this FlowStateElement is a pause element. When a pause element is encountered by the FlowState, 
         * its time will not incremented until the associated callback returns true.
         * @readonly 
         * @type {boolean}
         */
        this.isPauseElement = null;


        /** Read-only property denoting the aggregated callback time within the owning FlowState. 
         * This time is the sum of the 'time' base time together with each of the associated 'variableOffset' values.
         * @readonly 
         * @type {boolean}
         */
        this.netTime = null;
    }
}








/** Object defining a font within this project. Fonts originate from files within a project's "Assets" directory,
 * Either by including '.ttf' or '.otf' files, or by including a specialized group of pngs whose names end with '_Char[X]'
 * that must include '_Char0'.
 * [NON-INSTANTIABLE]
 */
class FontDefinition
{
    constructor(name)
    {
        /** A number that affects the layout width of all of the characters in this font.
         * The number is expressed in terms of multiples 'characterWidth' value.
         * @type {number}
         */
        this.kerningAdjustment = null;


        /** Number determining the line height of this font. 
         * This value originally defaults to the height of the null character provided (Char0), but can be changed.
         * @type {number}
         */
        this.lineHeight = null;


        /** Number determining the basic width of a character in this font.
         * Some of the values used by TextFormats, Texts, and TextBoxes to arrange characters in fonts are denoted in terms of 
         * a proportion of this value. For example if the kerning of a given TextBox's TextFormat is .5, then all
         * characters within the TextBox will be spaced apart by half of this 'characterWidth' value.
         * This value originally defaults to the width of the null character provided (Char0), 
         * but can be changed in ProjectSettings or runtime.
         * @type {number}
         */
        this.characterWidth = null;
    }
}


/** A Geometry is an object that defines a GraphicAsset's vertices, and the associated Materials and attributes.
 * [NON-INSTANTIABLE]
 * @extends AssetComponent
 */
class Geometry extends AssetComponent
{
    constructor()
    {
        /** The width of the source asset (with 'units per pixel' pre-applied).
         * @type {number}
         * @readonly
         */
        this.sourceWidth = null;


        /** The height of the source asset (with 'units per pixel' pre-applied).
         * @type {number}
         * @readonly
         */
        this.sourceHeight = null;


        /** The 'unitsPerPixel' scaler values for this Geometry.
         * @type {Array.<number>}
         * @readonly
         */
        this.unitsPerPixel = null;
    }
}


/** Object connected to a Geometry allowing changes to be made to that Geometry.
 * Make the desired changes, then call 'commitChanges'.
 * [NON-INSTANTIABLE]
 */
class GeometryEditor
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


		/** Contains a key for each attribute added to this GeometryEditor. 
         * The value at each key is an Array of numbers containing the attribute data.
		 * @type {object}
		 */
		this.attributes = null;


		/** Each element in this Array corresponds to the elements in the materials Array of the Graphic that will use the resulting Geometry.
         * Each element contains an Array of numbers containing the index data.
		 * @type {Array.<Array.<number>>}
		 */
		this.indices = null;


		/** Contains a key for each attribute added to this GeometryEditor.
         * The value at each key is the threshold used to determine if an attribute value should be considered to match another value in the same attribute Array.
         * When a new vertex is added to the GeometryAccesor, its attribute values are compared to the existing vertices, by checking if the difference between the values is lower than this threshold.  
         * If all attributes are considered to match, the existing vertex is re-used as an optimization.
         * A threshold of 0 on any attribute will ensure that no vertices are ever considered to match each other, effectively disabling this optimization.
		 * @type {object}
		 */
		this.attributeDuplicateThresholds = null;


        /** The Geometry that this GeometryEditor is connected to.
		 * @type {Geometry}
		 */
		this.connectedGeometry = null;
    }


    /** Copies the vertex, attribute, and material information from the given Geometry into this GeometryEditor.
     * Please note that in many cases, this function operates asyncronously since the Geometry being copied may no be loaded yet.
     * Consequently, using this GeometryEditor to operate on the copied Geometry will need to wait until the source Geomtry loads.
     * This can be achieved by asyncronously awaiting this function, or by supplying a callback, which will be called when the 
     * source Geometry loads. The callback will receive the iniating GeometryEditor as its first parameter.
     * @param {Geometry} geometry The source Geometry whose info will be copied into this GeometryEditor.
     * @param {object} [callbackOwner] The object owning the callback that will be called when the source Geometry loads. 
     * @param {string} [callbackName] The name of the callback that will be called when the source Geometry loads. 
     * @param {Array|any} [callbackArgs] The arguments for the callback that will be called when the source Geometry loads. 
     * @async  
     */
    async copyGeometry(geometry,callbackOwner,callbackName,callbackArgs){}


	/** Adds a vertex that may be referenced by the indices.  
     * The vertex's position in the attribute arrays is returned, and is the value that should be used by the indices to refer to this vertex.
     * Note that the length of the attributes may not increase after this call completes if the vertex was found to be a duplicate of an existing vertex.
     * In this scenario, the index of the existing vertex will be returned.
	 * @param {object} vertex Each key in this Object should be the name of an attribute in this GeometryEditor. The value should be a number, Vector2, Vector3, or Vector4 containing the value of the attribute at this vertex. The type of the value must correspond to the 'size' specified in 'addAttribute'. Duplicate vertices will be automatically handled according to the values in attributeDuplicateThresholds.
	 * @returns {number}
     */
    addVertex(vertex){}


	/** Adds a triangle that will use the Material at 'materialIndex' of the Graphic that will use the resulting Geometry.
	 * @param {object} vertex0 Each key in this Object should be the name of an attribute in this GeometryEditor. The value should be a number, Vector2, Vector3, or Vector4 containing the value of the attribute at this vertex. Duplicate vertices will be automatically handled according to the values in attributeDuplicateThresholds.
	 * @param {object} vertex1 Each key in this Object should be the name of an attribute in this GeometryEditor. The value should be a number, Vector2, Vector3, or Vector4 containing the value of the attribute at this vertex. Duplicate vertices will be automatically handled according to the values in attributeDuplicateThresholds.
	 * @param {object} vertex2 Each key in this Object should be the name of an attribute in this GeometryEditor. The value should be a number, Vector2, Vector3, or Vector4 containing the value of the attribute at this vertex. Duplicate vertices will be automatically handled according to the values in attributeDuplicateThresholds.
	 * @param {number} materialIndex The index into the materials Array of the Graphic that will use the resulting Geometry.  Defaults to 0.
    */
    addTriangle(vertex0, vertex1, vertex2, materialIndex){}


	/** Adds a new attribute.  
     * If an attribute aleady exists with this name, the attribute is re-initialized and will be empty.
	 * @param {string} name The name of the attribute.
	 * @param {string} type The type of number that should be used to store this attribute.
	 * @param {number} size Specifies the number of components on this attribute.  Must be 1, 2, 3, or 4.
	 */
    addAttribute(name, type, size){}


	/** Deletes all attributes.
     * This is typically used if the default attributes of 'position' and 'uv' are unneeded on a new GeometryEditor.
	 */
	deleteAllAttributesAndIndices(){}


	/** Converts the connected Geometry to a grid of triangles oriented on the XY plane.
     * Attribute values at each new point will be interpoloted linearly across the grid, using the attribute values at the minimum and maximum vertices of the original geometry.
	 * @param {number} horizontalSegments The number of horizontal segments of the grid.
	 * @param {number} verticalSegments The number of vertical segments of the grid.
     */
    convertGeometryToGrid(horizontalSegments, verticalSegments){}


	/** Creates a new grid of triangles oriented on the XY plane, centered around 0 on each axis.
	 * @param {number} width The width of the grid.
	 * @param {number} height The height of the grid.
	 * @param {number} horizontalSegments The number of horizontal segments of the grid.
	 * @param {number} verticalSegments The number of vertical segments of the grid.
     */
    newGrid(width, height, horizontalSegments, verticalSegments){}


    /** Translates all of the values of an attribute by the given translation amount.
     * @param {number|Vector2|Vector3|Vector4} translation The amount the values of the attribute are translated.  This parameter should be a number, Vector2, Vector3, or Vector4.  The type should correspond to the size of the attribute.  For example, the default 'position' attribute should be translated by a Vector3, and the default 'uv' attribute should be translated by a Vector2. 
     * @param {string} attributeName The name of the attribute data to be translated.  Defaults to 'position'.
     */
    translate(translation, attributeName){}


    /** Returns a new object structured appropriately to pass into the addVertex and addTriangle functions. For each currently defined attribute, a member of type number, Vector2, Vector3, or Vector4 is added.
     */
    getVertexTemplate(){}


    /** Calculates the lowest and highest values seen on each dimension of the attribute's data.
     * @param {string} attributeName The name of the attribute data to search for bounds.  Defaults to 'position'.
     * @param {number} lowerBounds The array to populate with the lowest value found in each dimension of the attribute data.
     * @param {number} upperBounds The array to populate with the highest value found in each dimension of the attribute data.
     */
    getBounds(lowerBounds, upperBounds, attributeName){}


    /** Applies the changes performed by this GeometryEditor to the connectect Geometry.
     * To optimize performance, this should be called once after all changes have been performed, as this function can have a performance impact.
     */
	commitChanges(){}
}


/** A GraphicAsset is an object that represents a piece of visual content such as an image file or an 'OBJ'.
 * GraphicAssets contain a Geometry, and a set of MaterialPresets that, when applied via 'GraphicObject.graphicAsset'
 * or 'GraphicObject.setGraphicAsset', change the appearance of a GraphicObject to that of the GraphicAsset.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class GraphicAsset 
{
    constructor()
    {
        /** Type identifier
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


       /** The GraphicAsset's name.
         * @type {string}
         * @readonly
         * @example
         * // Objective: Set and Get the name of a GraphicAsset.
         * // Expected Result: The console should read "name is WhiteBox"
         * 
         * // Create a GraphicObject using the WhiteBox GraphicAsset.
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "MyGraphicObject" );
         * // Get an instance of the GraphicAsset from its GraphicObject.
         * let myGraphicAsset = myGraphicObject.graphicAsset;
         * // Console log the name of the GraphicAsset.
         * console.log("name is", myGraphicAsset.name );
         */
        this.name=null;


        /** This GraphicAsset's geometry.
         * @type {Geometry}
         * @example
         * // Objective: Get the current Geometry of a GraphicAsset
         * // Expected Result: The console should have 2 log messages as follows:
         * //     myGraphicAsset (Box) sourceWidth, sourceHeight 100 100
         * //     myGraphicAsset (Triangle) sourceWidth, sourceHeight 50 100
         * 
         * // Create a GraphicObject using the white box GraphicAsset.
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "MyGraphicObject" );
         * // Get the GraphicAsset from the GraphicObject
         * let myGraphicAsset = myGraphicObject.graphicAsset;
         * // Console log the Geometry sourceWidth and sourceHeight of the GraphicAsset.
         * console.log("myGraphicAsset (Box) sourceWidth, sourceHeight", myGraphicAsset.geometry.sourceWidth, myGraphicAsset.geometry.sourceHeight);
         * // Update the Geometry of myGraphicAsset with the white triangle.
         * myGraphicAsset.geometry = nc.geometries.WhiteTriangle;
         * // Console log the Geometry sourceWidth and sourceHeight again.
         * console.log("myGraphicAsset (Triangle) sourceWidth, sourceHeight", myGraphicAsset.geometry.sourceWidth, myGraphicAsset.geometry.sourceHeight);
         */
        this.geometry=null;


        /** List of MaterialPresets associated with this GraphicAsset.
         * @type {Array.<MaterialPreset>}
         */
        this.materialPresets=null;
    }
}


/** A MaterialPreset is an object with the instructions for configuring a Material. A list of MaterialPresets is included with
 * every GraphicAsset, so that when a GraphicObject is set to a given GraphicAsset, that GraphicObject's Materials can be configured accordingly.
 * For example, for a standard image-file GraphicAsset, the typical MaterialPreset would list the "SampleMainTexture" EffectNode,
 * and would also have the name of the Texture to set for the 'mainTexture' EffectController.
 * [NON-INSTANTIABLE]
 */
class MaterialPreset 
{
    constructor()
    {
        /** Type identifier
         * @type {string}
         */
        this.type=null;


        /** List of the names of the EffectNodes to be applied to the Material.
         * @type {Array.<string>}
         */
        this.effectNodeNames=null;


        /** Dictionary of EffectController values to be applied to the Material. 
         * Please note that the EffectController values stored in this object will be
         * listed in a more primative form than elsewhere:
         * EffectControllers that have a Vector base type will be stored as a simple 
         * array of numeric values within this object.
         * Also Texture EffectController values are simply referenced by including the name of the 
         * Texture in question.
         * @type {object}
         */
        this.materialValues=null;
    }
}



/** A GraphicExpander allows a region of a GraphicObject to be specified as expandable to a new size.
 * When a new size is specified, this region of the GraphicObject will change size, 
 * but the area outside the expandable region will move and stretch to keep aligned to the expanded region.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class GraphicExpander
{
    /**
     * A GraphicExpander allows a region of a GraphicObject to be specified as expandable to a new size.
     * When a new size is specified, this region of the GraphicObject will change size, 
     * but the area outside the expandable region will move and stretch to keep aligned to the expanded region.
     * @example
     * // Objective: Configure a GraphicExpander
     * // Expected Result: You will see 4 different colored particles. White is the original, unexpanded particle. Red, blue and green are expanded and altered.
     * 
     * // create a sample particle (default white)
     * let white = new GraphicObject(nc.graphicAssets.SampleParticle2, nc.mainScene, "WhiteParticle");
     * // move it 500 to the left
     * white.position.x = -500;
     * //create a sample particle
     * let red = new GraphicObject(nc.graphicAssets.SampleParticle2, nc.mainScene, "RedParticle");
     * // make it red
     * red.colorMultiply.blue  = 0;
     * red.colorMultiply.green = 0;
     * // move it 300 to the left
     * red.position.x = -300;
     * // create a sample particle (blue)
     * let blue = new GraphicObject(nc.graphicAssets.SampleParticle2, nc.mainScene, "BlueParticle");
     * // make it blue
     * blue.colorMultiply.red   = 0;
     * blue.colorMultiply.green = 0;
     * // move it 100 to the left
     * blue.position.x = -100;
     * // create a sample particle (green)
     * let green = new GraphicObject(nc.graphicAssets.SampleParticle2, nc.mainScene, "GreenParticle");
     * // make it green
     * green.colorMultiply.red  = 0;
     * green.colorMultiply.blue = 0;
     * // move it 100 to the right
     * green.position.x = 100;
     *  
     * // configure the red GraphicExpender and set its expandable width and height to -50
     * red.configureGraphicExpander();
     * red.graphicExpander.expandableWidth = -50;
     * red.graphicExpander.expandableHeight = -50;
     * // configure the blue GraphicExpander and set expandableHeight to -20 override expandedWidth setting it to 0
     * blue.configureGraphicExpander();
     * blue.graphicExpander.expandableHeight = -20;
     * blue.graphicExpander.expandedWidth = 0;
     * // configure the green GraphicExpander
     * green.configureGraphicExpander();
     * green.graphicExpander.symmetric = false;
     * green.graphicExpander.expandedAreaTop = 100;
     * green.graphicExpander.expandedAreaBottom = 100;
     * green.graphicExpander.expandedAreaRight = 500;
     */
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** Flag determining if the GraphicExpander's expandable area and expanded area are both in the middle of the GraphicObject.
         * When this value is true, the interface to configure the GraphicExpander includes expandableWidth, expandableHeight,
         * expandedWidth, and expandedHeight. When this value is false, the interface to configure the GraphicExpander includes
         * expandableAreaLeft, expandableAreaRight, expandableAreaBottom, expandableAreaTop, expandedAreaLeft, expandedAreaRight, 
         * expandedAreaBottom, and expandedAreaTop.
         * @type {boolean}
         */
        this.symmetric=null;


        /** Value that determines the portion of the GraphicObject that will be affected by this GraphicExpander. 
         * This property is only applicable if the 'symmetric' property is true.
         * @type {number}
         * @default 0
         */
        this.expandableWidth=null;


        /** Value that determines the portion of the GraphicObject that will be affected by this GraphicExpander. 
         * This property is only applicable if the 'symmetric' property is true.
         * @type {number}
         * @default 0
         */
        this.expandableHeight=null;


        /** The expanded width of the GraphicExpander. Set this value to stretch or shrink the associated GraphicObject horizontally.
         * This property is only applicable if the 'symmetric' property is true.
         * @type {number}
         * @default 100
         */
        this.expandedWidth=null;


        /** The expanded height of the GraphicExpander. Set this value to stretch or shrink the associated GraphicObject vertically.
         * This property is only applicable if the 'symmetric' property is true.
         * @type {number}
         * @default 100
         */
        this.expandedHeight=null;


        /** Value that defines the left bound of the portion of the GraphicObject that will be affected by this GraphicExpander.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default 0
         */
        this.expandableAreaLeft=null;


        /** Value that defines the right bound of the portion of the GraphicObject that will be affected by this GraphicExpander.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default 0
         */
        this.expandableAreaRight=null;


        /** Value that defines the bottom bound of the portion of the GraphicObject that will be affected by this GraphicExpander.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default 0
         */
        this.expandableAreaBottom=null;


        /** Value that defines the top bound of the portion of the GraphicObject that will be affected by this GraphicExpander.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default 0
         */
        this.expandableAreaTop=null;


        /** Value that determines where the left bound of the expansion area will be after the expansion. 
         * Set this value to stretch or shrink the associated GraphicObject's left side.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default -50
         */
        this.expandedAreaLeft=null;


        /** Value that determines where the right bound of the expansion area will be after the expansion. 
         * Set this value to stretch or shrink the associated GraphicObject's right side.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default 50
         */
        this.expandedAreaRight=null;


        /** Value that determines where the bottom bound of the expansion area will be after the expansion. 
         * Set this value to stretch or shrink the associated GraphicObject's bottom side.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default -50
         */
        this.expandedAreaBottom=null;


        /** Value that determines where the top bound of the expansion area will be after the expansion. 
         * Set this value to stretch or shrink the associated GraphicObject's top side.
         * This property is only applicable if the 'symmetric' property is false.
         * @type {number}
         * @default 50
         */
        this.expandedAreaTop=null;
    }


    /** Removes and destroys the GraphicExpander, restoring the original Geometry if possible.
     */
    dispose(){}
}/** GraphicObjects are SceneObjects with visible components such as Geometry, Materials, and Textures.
 * Anything that you can see in an Incisor® Scene is some form of GraphicObject.
 * GraphicObjects can easily be set to different GraphicAssets such as source Images, OBJs, or other customizable visuals. 
 * @extends SceneObject
 */
class GraphicObject extends SceneObject
{
    /** GraphicObjects are SceneObjects with visible components such as Geometry, Materials, and Textures.
     * Anything that you can see in an Incisor® Scene is some form of GraphicObject.
     * GraphicObjects can easily be set to different GraphicAssets such as source Images, OBJs, or other customizable visuals. 
     * @param {GraphicAsset} [graphicAsset=nc.graphicAssets.WhiteBox] The GraphicAsset that the new GraphicObject will initially be set to. For a list of available GraphicAssets, see 'nc.graphicAssets'. [DEFAULT: nc.graphicAssets.WhiteBox]
     * @param {SceneObject} [parent=nc.mainScene] The SceneObject that will become the new GraphicObject's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name='GraphicObject'] The name of the new GraphicObject. [DEFAULT: 'GraphicObject']
     * @example
     * // Objective: Create a GraphicObject
     * // Expected Result: You will see a white box on the screen.
     *   
     * // Create a GraphicObject using the white box GraphicAsset.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "MyGraphicObject" );
     */
    constructor(graphicAsset,parent,name)
    {
        /** Boolean determining if this GraphicObject is visible. 
         * Unlike the 'enabled' property of SceneObjects, 'GraphicObject.visible' does not affect any descendants of this GraphicObject.
         * It should be noted that 'turning off' objects using 'GraphicObject.visible=false' is often less performant than 'SceneObject.enabled=false', 
         * because while the 'visible' property does prevent the object from rendering, the 'enabled' property also prevents several additional
         * hierarchical calculations from occuring for the effected SceneObjects.
         * @type {boolean}
         * @default true
         * @example
         * // Objective: Make a GraphicObject not visible.
         * // Expected Result: Only the "WhiteTriangle" is visible. The "WhiteBox" is not.
         * 
         * // Add a "WhiteBox" GraphicObject to the main scene using the GraphicObject constructor.
         * let whiteBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteBox" );
         * // move the "WhiteBox" 100 world units to the left
         * whiteBox.position.x = -100;
         * 
         * // Add a "WhiteTriangle" GraphicObject to the main scene using the GraphicObject constructor.
         * let whiteTriangle = new GraphicObject( nc.graphicAssets.WhiteTriangle, nc.mainScene, "WhiteTriangle" );
         * // move the "WhiteTriangle" 100 world units to the right
         * whiteTriangle.position.x = 100;
         * 
         * // Set "WhiteBox" to visible = false.
         * whiteBox.visible = false;
         */
        this.visible=null;


        /** The GraphicObject's render-order Layer within the Scene.
         * For a list of available layers per Scene, see 'nc.layersByScene'
         * @type {Layer}
         * @default nc.layers.DefaultLayer
         */
        this.layer=null;


        /** The GraphicObject's render-order within it's assigned Layer as represented by a number between -1 and 1.
         * @type {number}
         * @default 0
         */
        this.subLayer=null;


        /** Use this to set or get the current GraphicAsset for this GraphicObject. Also see 'setGraphicAsset', which can set
         * the GraphicAsset with options to forego the EffectNode and EffectController presets. When 'getting' this value, keep in
         * mind that it will only reflect the GraphicAsset that this GraphicObject was previously set to; the value returned
         * does not reflect customizations made to the Geometry, Materials, EffectNodes or EffectControllers 
         * that occurred since it was previously set.
         * @type {GraphicAsset}
         * @default nc.graphicAssets.WhiteBox
         * @example
         * // Objective: Set the GraphicAsset of a GraphicObject
         * // Expected Result: You will see a WhiteTriangle on the screen and the console should have 2 log messages as follows:
         * // 'MyGraphicObject' GraphicAsset name: WhiteBox
         * // 'MyGraphicObject' GraphicAsset name: WhiteTriangle 
         * 
         * // Add a GraphicObject to the main scene using the GraphicObject constructor and the WhiteBox GraphicAsset.
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "MyGraphicObject" );
         * // Console log the name of the GraphicAsset
         * console.log("'MyGraphicObject' GraphicAsset name:", myGraphicObject.graphicAsset.name);
         * // Update 'MyGraphicObject' to the WhiteTriangle GraphicObject.
         * myGraphicObject.graphicAsset = nc.graphicAssets.WhiteTriangle;
         * // Console log the name of the GraphicAsset again.
         * console.log("'MyGraphicObject' GraphicAsset name:", myGraphicObject.graphicAsset.name);
         */
        this.graphicAsset=null;


         /** The MaterialMaster is a convenience-based object that allows quick manipulation of all of the Materials on a given GraphicObject.
          * To manipulate all of the Materials on a GraphicObject at the same time, you can simply manipulate its MaterialMaster.
          * It should be noted that querying values from the MaterialMaster can be misleading, as the returned values only refer
          * to the last values set on the MaterialMaster itself, and would not reflect individual changes made to the Materials themselves.
          * @type {MaterialMaster} 
          * @example
          * // Objective: Use a GraphicObject's MaterialMaster to change its color.
          * // Expected Result: You will see a red box.
          * 
          * // Add a GraphicObject to the main scene using the GraphicObject constructor and the WhiteBox GraphicAsset.
          * let myGraphicObject = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "MyGraphicObject" ) ;
          * // Get the instance of this GraphicObject's MaterialMaster
          * let materialMaster = myGraphicObject.materialMaster;
          * // By default, the RGB values of fillColor are set to 1. Set the green and blue values to zero to leave only red.
          * materialMaster.fillColor.green = 0;
          * materialMaster.fillColor.blue  = 0;
          */
        this.materialMaster=null;


        /** The current Geometry of this GraphicObject. Setting this GraphicObject's GraphicAsset will update 
         * its Geometry automatically, but the Geometry can be set directly for further customization.
         * @type {Geometry}
         * @default nc.geometries.WhiteBox
         * @example
         * // Objective: Get the current Geometry of a GraphicObject
         * // Expected Result: The console should have 2 log messages as follows:
         * // 'MyGraphicObject' (Box) sourceWidth, sourceHeight 100 100
         * // 'MyGraphicObject' (Triangle) sourceWidth, sourceHeight 50 100
         *  
         * // Create a GraphicObject using the white box GraphicAsset.
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "MyGraphicObject" );
         * // Console log the Geometry sourceWidth and sourceHeight.
         * console.log("'MyGraphicObject' (Box) sourceWidth, sourceHeight", myGraphicObject.geometry.sourceWidth, myGraphicObject.geometry.sourceHeight);
         * // Update the Geometry of myGraphicObject with the white triangle.
         * myGraphicObject.geometry = nc.geometries.WhiteTriangle;
         * // Console log the Geometry sourceWidth and sourceHeight again.
         * console.log("'MyGraphicObject' (Triangle) sourceWidth, sourceHeight", myGraphicObject.geometry.sourceWidth, myGraphicObject.geometry.sourceHeight);
         */
        this.geometry=null;


        /** A GraphicExpander allows a region of a GraphicObject to be specified as expandable to a new size.
         * When a new size is specified, this region of the GraphicObject will change size, but the area outside 
         * the expandable region will move and stretch to keep aligned to the expanded region. 
         * This property defaults to undefined, but can be enabled by calling 'GraphicObject.configureGraphicExpander()'.
         * @type {GraphicExpander}
         * @example
         * [ReferenceSnippet: GraphicObject_ConfigureGraphicExpander]
         */
        this.graphicExpander=null;


        /** A SpriteSetter is a PlaybackController that switches a GraphicObject's graphicAsset between numerically sequential GraphicAssets.
         * This property defaults to undefined, but can be enabled by calling 'GraphicObject.configureSpriteSetter()'.
         * @type {SpriteSetter}
         * @example
         * 
     * // Objective: Configure a SpriteSetter
     * 
         */
        this.spriteSetter=null;


        /** Object controlling the masking of a GraphicObject. Masking functionality enables selective rendering of portions of GraphicObjects. 
         * MaskGroups can be defined, and then GraphicObjects can be configured as 'mask', which add their shape to the area of the newly defined MaskGroup. 
         * Then, when other GraphicObjects are configured as 'masked', their rendering only occures within areas defined by the MaskGroup.
         * @type {Masking}
         */
        this.masking = null;


        /** Boolean determining if the GraphicObject is automatically omitted from rendering when it is entirely outside of the Camera's viewing area (its frustum).
         * While the value defaults to true, reasons to set it false include situations where the Geometry of a given GraphicObject is being adjusted via EffectNode (on the GPU), 
         * and so while an object's postion may indicate that it should be culled due to being out of view, its Geometry may be distorted into a position that is
         * actually in view of the camera, and should therefore be rendered after all.
         * @default true
         * @type {boolean} 
         */
        this.frustumCulling = null;
    }


    /** Changes this GraphicObject's GraphicAsset, updating its Geometry and Materials.
     * @param {GraphicAsset} graphicAsset The GraphicAsset that this GraphicObject will become. For a list of available GraphicAssets, see 'nc.graphicAssets'.
     * @param {boolean} [maintainEffectNodes] Boolean determining if the current EffectNodes will be maintained during the transformation to the new GraphicAsset. [DEFAULT: false]
     * @param {boolean} [maintainEffectControllerValues] Boolean determining if the current EffectController values will be maintained during the transformation to the new GraphicAsset. [DEFAULT: false]
     * @example
     * // Objective: Set a GraphicAsset on a GraphicObject.
     * // Expected Result: You will see a white triangle. 
     * 
     * // Add a GraphicObject to the main scene using the GraphicObject constructor and the WhiteBox GraphicAsset.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "MyGraphicObject") ;
     * // Call setGraphicAsset() to change the White Box to a White Triangle
     * myGraphicObject.setGraphicAsset( nc.graphicAssets.WhiteTriangle );
     */
    setGraphicAsset(graphicAsset,maintainEffectNodes,maintainEffectControllerValues){}


    /** Sets this GraphicObject's Materials directly.
     * This is used for specialized customization of GraphicObjects, and is not needed when working with standard GraphicAssets.
     * @param {Array.<Material>|Material} materials The new list of Materials for this GraphicObject.
     */
    setMaterials(materials){}


    /** Returns the list of this GraphicObject's Materials.
     * @returns {Array.<Material>}
     */
    getMaterials(){}
    
    
    /** Adds a GraphicExpander instance to this GraphicObject, which allows the GraphicObject to be expanded to a new size from the middle out.
     */
    configureGraphicExpander(){}

    
    /** Adds a SpriteSetter instance to this GraphicObject, which allows the GraphicObject's graphicAsset to be switched to numerically sequential GraphicAssets.
     * @param {GraphicAsset} keyGraphicAsset Specifies the key GraphicAsset.  This GraphicAsset's name should end in a number.  All GraphicAssets whose name matches the key GraphicAsset's name with a different trailing number will be used to set the SpriteSetter's associated GraphicAssets list.  For example, if the key GraphicAsset is named "MyAnimation001", all GraphicAssets with the name "MyAnimation" followed by any sequence of the digits 0-9 will be gathered into this SpriteSetter's associated GraphicAssets.
     * @param {number} [frameRate] Specifies the frames per second at which the SpriteSetter should play.  Note that this is reflected in the SpriteSetter's playbackRate value. [DEFAULT: nc.targetFixedUpdateRate]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this ParticleSystem will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this ParticleSystem is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @example
     * 
     * // Objective: Configure a SpriteSetter
     * 
     */
    configureSpriteSetter(keyGraphicAsset,frameRate,pauseImmunity,speedControl){}
}


/** Object controlling the masking of a GraphicObject. Masking functionality enables selective rendering of portions of GraphicObjects. 
 * MaskGroups can be defined, and then GraphicObjects can be configured as 'mask', which add their shape to the area of the newly defined MaskGroup. 
 * Then, when other GraphicObjects are configured as 'masked', their rendering only occures within areas defined by the MaskGroup.
 * @type Masking
 */
class Masking
{
    constructor()
    {
        /** Dictionary of type that this object inherits from.
         * @type {object}
         */
        this.inheritedTypes = "";


        /** Flag determining if masking functionality is enabled (for both 'mask' and 'masked').
         * @default false
         * @type {boolean}
         */
        this.enabled = null;


        /** String property that determines if this GraphicObject is a 'mask' or 'masked'.
         * When masking functionality is enabled, a 'mask' contributes to the MaskGroup(s) it is associated with.
         * When a GraphicObject is 'masked' it is only rendered in the areas determined by the MaskGroup(s) it is associated with.
         * This setting does nothing when 'GraphicObject.masking.enabled' is false;
         * @default "masked"
         * @type {string}
         */
        this.type = null;


        /** Boolean determining if the affect of masking on a 'masked' GraphicObject is inverted, meaning that the areas where it is masked and the areas where it is not masked are switched.
         * When this value is false, the masked GraphicObject in question is only rendered in areas that 'mask' GraphicObjects also occupy.
         * When this value is true, the masked GraphicObject in question is only rendered in areas that 'mask' GraphicObjects do not occupy.
         * This setting only applies to GraphicObjects with the 'masked' type, 'mask' GraphicObjects are unaffected by this setting.
         * This setting does nothing when 'GraphicObject.masking.enabled' is false.
         * @default false
         * @type {boolean}
         */
        this.invert = null;
    }


    /** Causes this GraphicObject to contribute to the given MaskGroup(s), adding its fully filled Geometry to the MaskGroups' areas.
     * @param {MaskGroup | Array.<MaskGroup>} maskGroups The MaskGroup(s) that this GraphicObject's shape will be added to. For a list of available MaskGroups, see 'nc.maskGroups'.
     * @example
     * // Objective: Use a mask to reveal only a portion of the phrase "Hello World."
     * // Expected Result: You will see the word "World." on screen.
     * 
     * // create a TextBox
     * let textBox = nc.addTextBox( nc.mainScene );
     * textBox.string = "Hello World."
     * textBox.makeMasked( nc.maskGroups.MainMaskGroup ); // mask it with "MainMaskGroup"
     * 
     * // create a GraphicObject rectangle and position it to cover the word "World."
     * this.masker = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Masker" );
     * this.masker.scale.x = 2; // rectangle
     * this.masker.position.x = 75; // position
     * this.masker.masking.makeMask( nc.maskGroups.MainMaskGroup ); // make it a masker for "MainMaskGroup"
     */
    makeMask(maskGroups){}


    /** Causes this GraphicObject to only be rendered in the areas defined by the given MaskGroup(s).
     * @param {MaskGroup | Array.<MaskGroup>} maskGroups The MaskGroup(s) that the rendering of this GraphicObject will be limited to. For a list of available MaskGroups, see 'nc.maskGroups'.
     * @param {boolean} [invert] Inverts the effect of the masking, swapping the areas where this GraphicObject will and won't be rendered. [DEFAULT: false]
     * @example 
     * // Objective: Use a mask to reveal only a portion of the phrase "Hello World."
     * // Expected Result: You will see the word "World." on screen.
     * 
     * // create a TextBox
     * let textBox = nc.addTextBox( nc.mainScene );
     * textBox.string = "Hello World."
     * textBox.makeMasked( nc.maskGroups.MainMaskGroup ); // mask it with "MainMaskGroup"
     * 
     * // create a GraphicObject rectangle and position it to cover the word "World."
     * this.masker = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Masker" );
     * this.masker.scale.x = 2; // rectangle
     * this.masker.position.x = 75; // position
     * this.masker.masking.makeMask( nc.maskGroups.MainMaskGroup ); // make it a masker for "MainMaskGroup"
     */
    makeMasked(maskGroups,invert){}


    /** Sets the MaskGroup or list of MaskGroups that this GraphicObject is associated with.
     * @param {MaskGroup|Array.<MaskGroup>} maskGroups The MaskGroup or list of MaskGroups to set.
     */
    setMaskGroups(maskGroups){}


    /** Gets the list of MaskGroups that this GraphicObject is associated with.
     * @returns {Array.<MaskGroup>} 
     */
    getMaskGroups(){return(null);}
}


/** Masking functionality enables selective rendering of portions of GraphicObjects. 
 * MaskGroups can be defined, and then GraphicObjects can be configured as 'mask', which add their shape to the area of the newly defined MaskGroup. 
 * Then, when other GraphicObjects are configured as 'masked', their rendering only occures within areas defined by the MaskGroup.
 * @type MaskGroup
 */
class MaskGroup
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = "";


        /** Dictionary of type that this object inherits from.
         * @type {object}
         */
        this.inheritedTypes = "";


        /** The name of the MaskGroup
         * @type {string}
         */
        this.name = "";


        /** The numeric value representing this MaskGroup.
         * @type {number}
         */
        this.maskGroupNumber = "";
    }
}


/** Object housing functionality allowing for direct interactions with the Incisor® application from within the javascript runtime. 
 * Such functionality includes the ability to get/set project and application settings, initiate the hosting of files in local directories, 
 * script the opening of new browser tabs, and perform other transactions with the Incisor® application.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - advancedTools]
 */
class IncisorApp
{
    /** Returns an IncrCommsResponseObject whose '.payload' member is copy of the current ProjectSettings of the currently open project
     * in javascript object form. In order to update the ProjectSettings, pass 'IncisorApp.setProjectSettings' a version of this payload
     * that contains the desired modifications.
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async getProjectSettings(){return(null);}


    /** Updates the ProjectSettings of the currently open project in memory. The current ProjectSettings can be retrieved using
     * 'IncisorApp.getProjectSettings', modified, and updated using this function. ProjectSettings updated using this method
     * will be automatically validated against the internal Incisor® schema. Once updated, the current project must be saved in
     * order for the changes to be reflected in the ProjectSettings.json file within the project directory.
     * @param {object} projectSettings The desired ProjectSettings to update the project with.
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async setProjectSettings(projectSettings){return(null);}


    /** Returns an IncrCommsResponseObject whose '.payload' member is copy of the Incisor ApplicationSettings in javascript object form.
     * In order to update the ApplicationSettings, pass 'IncisorApp.setApplicationSettings' a version of this payload
     * that contains the desired modifications.
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async getApplicationSettings(){return(null);}


    /** Updates the Incisor® application settings in memory. The current ApplicationSettings can be retrieved using
     * 'IncisorApp.getApplicationSettings', modified, and updated using this function. ApplicationSettings updated using this method
     * will be automatically validated against the internal Incisor® schema.
     * @param {object} applicationSettings The desired ApplicationSettings to update Incisor® with.
     * @param {boolean} [commitToDisk] Boolean determining if the new settings are immediately saved on disk, ensuring their persistence on subsequent application launches. [DEFAULT: false]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async setApplicationSettings(applicationSettings,commitToDisk){return(null);}


    /** Begins hosting files in the given directory, and returns an IncrCommsResponseObject whose '.payload' member contains the port
     * selected by Incisor® to host from.
     * @param {string} directoryPath The relative or absolute path to the directory to host files from.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @param {boolean} [allowRemoteHosting] Bool stating if external connections can make requests from this host. If true, the 'allowRemoteHosting' item in application settings must also be set to true. [DEFAULT: false]
     * @param {boolean} [enableGzip] Bool stating files hosted from this connection should be compressed using 'gzip'. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async hostLocalDirectory(directoryPath,isPathRelative,allowRemoteHosting,enableGzip){return(null);}


    /** Ends hosting files from the given directory, freeing up the associated port.
     * @param {string} directoryPath The relative or absolute path to the directory to stop hosting files from.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. [DEFAULT: true]
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async stopHostingLocalDirectory(directoryPath,isPathRelative){return(null);}


    /** Opens a new tab in the browser at the given url without requiring user interaction.
     * @param {string} url The url to open the new browser tab to.
     * @async  
     * @returns {IncrCommsResponseObject}
     */
    async openTabToUrl(url){return(null);}


    /** Temporarily stops Incisor's file system watcher, allowing fileIO changes to the project without Incisor auto-refreshing the project in the inspector.
     */
    async pauseProjectDirectoryWatcher(){};


    /** Resumes Incisor's file system watcher, such that fileIO changes result in Incisor auto-refreshing the project in the inspector.
     */
    async resumeProjectDirectoryWatcher(){};
}


/** Object housing basic functionality allowing for direct interactions with the Incisor® application from within the javascript runtime. 
 * Such functionality includes the ability to get the list of optional code modules from the Incisor™ application. 
 * See 'nc.incisorApp' for many more application interaction options.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: unpublished only]
 */
class IncisorAppBasic
{
    /** Returns a list of the names of all of the Incisor® 'optional code' modules. Optional code modules are groups of functionality
     * that can be left out of projects in order to optimize their overall published download size. Optional code modules can be marked 
     * for exclusion in ProjectSettings.
     * @async  
     * @returns {Array.<string>}
     */
    async getOptionalCodeModuleNames(){return(null);}
}


/** Object housing information about this particular SceneObject's LayoutObject functionality.
 * LayoutObject functionality applies to SceneObjects that have been added as elements to a LayoutStack, which is responsible
 * for organizing visual content (TextBoxes, Graphics, Buttons, etc...) into dynamic vertical or horizontal stacks.
 * Until a SceneObject has been configured with LayoutObject functionality (either by calling 'SceneObject.configureLayoutObject'
 * or by adding the SceneObject as an element to a LayoutStack), the 'SceneObject.layoutObject' member will be undefined.
 * [NON-INSTANTIABLE]
 */
class LayoutObject
{
    constructor(parent,name)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The width of this LayoutObject.
         * @type {number}
         */
        this.width=null;


        /** The height of this LayoutObject.
         * @type {number}
         */
        this.height=null;


        /** A buffer that is included when this LayoutObject is laid out within a LayoutStack.
         * This buffer is multiplied by nc.uiZoom.totalZoom if the containing LayoutStack is configured to be affected by iuZoom.
         * @default 0
         * @type {number}
         */
        this.leftBuffer=null;


        /** A buffer that is included when this LayoutObject is laid out within a LayoutStack.
         * This buffer is multiplied by nc.uiZoom.totalZoom if the containing LayoutStack is configured to be affected by iuZoom.
         * @default 0
         * @type {number}
         */
        this.rightBuffer=null;


        /** A buffer that is included when this LayoutObject is laid out within a LayoutStack.
         * This buffer is multiplied by nc.uiZoom.totalZoom if the containing LayoutStack is configured to be affected by iuZoom.
         * @default 0
         * @type {number}
         */
        this.bottomBuffer=null;


        /** A buffer that is included when this LayoutObject is laid out within a LayoutStack.
         * This buffer is multiplied by nc.uiZoom.totalZoom if the containing LayoutStack is configured to be affected by iuZoom.
         * @default 0
         * @type {number}
         */
        this.topBuffer=null;


        /** The justification of this LayoutObject within the LayoutStack that contains it (if applicable). See 'nc.constants.justifications' for a list of available values.
         * @default "left"
         * @type {string}
         */
        this.justification=null;


        /** An override to the width value of this LayoutObject, which would otherwise be set by the 'refreshLayoutCallback' callback function connected to this LayoutObject.
         * @default undefined
         * @type {number}
         */
        this.overrideWidth=null;


        /** An override to the height value of this LayoutObject, which would otherwise be set by the 'refreshLayoutCallback' callback function connected to this LayoutObject.
         * @default undefined
         * @type {number}
         */
        this.overrideHeight=null;


        /** The owner of the function that will be called automatically to refresh the layout of this LayoutObject and determine its layout dimensions.
         * This function is responsible for laying out the LayoutObject's content and returning a Vector2 containing its dimensions, which will
         * then be used to position this LayoutObject within the LayoutStack that contains it.
         * GrapicObjects and TextBoxes automatically perform these functions internally without the need for this callback...
         * Set this value to customize the process of laying out this SceneObject's content, and/or determining its layout width/height.
         * @type {object}
         */
        this.refreshLayoutCallbackOwner=null;


        /** The name of the function that will be called automatically to refresh the layout of this LayoutObject and determine its layout dimensions.
         * This function is responsible for laying out the LayoutObject's content and returning a Vector2 containing its dimensions, which will
         * then be used to position this LayoutObject within the LayoutStack that contains it.
         * GrapicObjects and TextBoxes automatically perform these functions internally without the need for this callback...
         * Set this value to customize the process of laying out this SceneObject's content, and/or determining its layout width/height.
         * @type {string}
         */
        this.refreshLayoutCallbackName=null;


        /** Parameters for the function that will be called automatically to refresh the layout of this LayoutObject and determine its layout dimensions.
         * This function is responsible for laying out the LayoutObject's content and returning a Vector2 containing its dimensions, which will
         * then be used to position this LayoutObject within the LayoutStack that contains it.
         * GrapicObjects and TextBoxes automatically perform these functions internally without the need for this callback...
         * Set this value to customize the process of laying out this SceneObject's content, and/or determining its layout width/height.
         * @type {any}
         */
        this.refreshLayoutCallbackArgs=null;


        /** The LazyUpdater in charge of laying out the contents of the SceneObject that owns this LayoutObject.
         * @type {LazyUpdater}
         */
        this.layoutLazyUpdater=null;
    }


    /** Informs the containing LayoutStack of a change in this LayoutObject's dimensions, telling the LayoutStack that it will need to refresh its Layout.
     * Call this function whenever a custom LayoutObject's dimensions change.
     */
    informParentsOfLayoutChange(){}


    /** Adds an optional callback that occurs after this LayoutObject's layout is refreshed.
    * This callback can be used to perform further actions that use the new layout after it is updated.
    * It should be noted that this callback will not affect the width or height of this LayoutObject,
    * it is only meant to be used for 'additonal styling' of the layout object using the updated layout.
    * @param {object} callbackOwner The object owning the callback function that occurs after this LayoutObject's layout is refreshed
    * @param {string} callbackName The name of the callback function that occurs after this LayoutObject's layout is refreshed
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered after this LayoutObject's layout is refreshed
    */
    addSecondaryLayoutCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given secondaryLayout callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeSecondaryLayoutCallback(callbackOwner,callbackName){}
}


/** Specialized SceneObject that organizes visual content (TextBoxes, Graphics, Buttons, etc...) into dynamic 
 * vertical or horizontal stacks. LayoutStacks automatically adjust their layout based on their elements. 
 * For example if a TextBox element gets larger, the other elements are shifted so that the TextBox doesn't overlap its neighboring elements.
 * LayoutStacks manage this choreography using the "LayoutObject" member of each of its elements, 
 * which can be configured by calling SceneObject.configureLayoutObject.
 * LayoutStacks are also automatically configured as LayoutObjects, so they can also be added to LayoutStacks for nesting.
 * [REQUIREMENT: license - gui]
 * [REQUIREMENT: module - gui]
 * @extends SceneObject
 */
class LayoutStack extends SceneObject
{
    /** Specialized SceneObject that organizes visual content (TextBoxes, Graphics, Buttons, etc...) into dynamic 
     * vertical or horizontal stacks. LayoutStacks automatically adjust their layout based on their elements. 
     * For example if a TextBox element gets larger, the other elements are shifted so that the TextBox doesn't overlap its neighboring elements.
     * LayoutStacks manage this choreography using the "LayoutObject" member of each of its elements, 
     * which can be configured by calling SceneObject.configureLayoutObject.
     * LayoutStacks are also automatically configured as LayoutObjects, so they can also be added to LayoutStacks for nesting.
     * [REQUIREMENT: license - gui]
     * [REQUIREMENT: module - pixelsObjects]
     * @param {SceneObject} [parent] The SceneObject that will become the new LayoutStack's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new LayoutStack. [DEFAULT: 'LayoutStack']
     */
    constructor(parent,name)
    {
        /** Flag that determines if this LayoutStack is a vertical stack organized from top to bottom or a horizontal stack organzied from left to right. 
         * @default true
         * @type {boolean}
         */
        this.isVertical=null;


        /** The pivot point for the LayoutStack, with [0,0] meaning center pivot, and [.5,.5] meaning right-top pivot.
         * LayoutStacks are center-based by default like to most GraphicObjects.
         * It should be noted that pivotPoint and justification seperate concepts and do not affect eachother.
         * Justification affects the alignment of the content within the bounds of the LayoutStack, and pivotPoint
         * affects where the 'origin' of the LayoutStack is relative to those bounds.
         * @default new Vector2(-.5,.5)
         * @type {Vector2}
         */
        this.pivotPoint=null;


        /** Number corresponding to the amount of space between each element in the LayoutStack.
         * For LayoutStacks with standardUiZoomFunctionality enabled, this these spaces will be scaled by nc.uiZoom.totalZoom.
         * @default 0
         * @type {number}
         */
        this.elementSpacer=null;


        /** Optional minimum width for this LayoutStack.
         * @default 0
         * @type {number}
         */
        this.minWidth=null;


        /** Optional minimum height for this LayoutStack.
         * @default 0
         * @type {number}
         */
        this.minHeight=null;


        /** Boolean determining if a border (consisting of a UiOutline) is displayed. 
         * The border automatically changes shape based on the layoutObject.width and layoutObject.height properties.
         * It should be noted that the associated LayoutStack.border member will be undefined until this flag is set to true.
         * @default false
         * @type {boolean}
         */
        this.displayBorder = null;


        /** UiOutline that (when displayed) automatically adjusts to the layoutObject.width and layoutObject.height properties of this LayoutStack.
         * It should be noted that this property is undefined unless LayoutStack.displayBorder is set to true.
         * @default undefined
         * @type {UiOutline}
         */
        this.border = null;


        /** Boolean determining if a background panel (consisting of a UiPanel) is displayed. 
         * The panel automatically changes shape based on the layoutObject.width and layoutObject.height properties.
         * It should be noted that the associated LayoutStack.backgroundPanel member will be undefined until this flag is set to true.
         * @default false
         * @type {boolean}
         */
        this.displayBackgroundPanel = null;


        /** UiPanel that (when displayed) automatically adjusts to the layoutObject.width and layoutObject.height properties of this LayoutStack.
         * It should be noted that this property is undefined unless LayoutStack.displayBackgroundPanel is set to true.
         * @default undefined
         * @type {UiPanel}
         */
        this.backgroundPanel = null;
    }


    /** Adds the specified SceneObject(s) as elements to the LayoutStack. 
     * Please note that SceneObjects added to LayoutStacks are re-assigned to be children of that LayoutStack.
     * If an added SceneObject has not yet been configured with LayoutObject functionality, the standard LayoutObject configuration will be applied.
     * The LayoutObject configuration of any SceneObject can be customized by calling 'SceneObject.configureLayoutObject' before adding it to a LayoutStack.
     * The LayoutObject configuration is a means by which a LayoutStack can determine the layout dimensions of its elements, inform the elements
     * to refresh their layouts, and be informed by elements to update its layout due to a change in dimensions of the elements.
     * @param {SceneObject|Array.<SceneObject>} elements The SceneObject(s) to add as elements to the LayoutStack.
     * @param {number} [index] Optional index enabling inserting elements in locations other than at the end of the elements list. [DEFAULT: (pushed to end)]
     */
    addElements(elements,index){}


    /** Adds a blank element as a spacer between other elements.
     * For LayoutStacks with standardUiZoomFunctionality enabled, this these spacers will be scaled by nc.uiZoom.totalZoom.
     * @param {number} spacerWidth The width (in world units) of the spacer to add.
     * @param {number} spacerHeight The height (in world units) of the spacer to add.
     * @param {number} [index] Optional index enabling inserting spacers in locations other than at the end of the elements list. [DEFAULT: (pushed to end)]
     */
    addSpacerElement(spacerWidth,spacerHeight,index){}


    /** Removes the element at the given index.
     * @param {number} index The index of the element to remove.
     * @param {boolean} [dispose] Boolean determining of the item is disposed. [DEFAULT: true]
     */
    removeElementAt(index,dispose){}


    /** Returns a shallow copy of the current array of elements.
     * @returns {SceneObject[]}
     */
    getElements(){return(null);}


    /** Removes the given element from the LayoutStack.
     * @param {object} element The element to remove.
     * @param {boolean} [dispose] Boolean determining if the item is disposed. [DEFAULT: true]
     */
    removeElement(element,dispose){}


    /** Clears all of the elements from the LayoutStack 
    * @param {boolean} [dispose] Boolean determining if cleared elements are also disposed. [DEFAULT: true]
    */
    clear(dispose){}


    /** Applies the given justification to all of the LayoutStack's elements.
     * Calling this method also sets an internal default, so that when new SceneObjects that have never
     * been configured as LayoutObjects are added as elements, the given justification will be applied.
     * @param {string} justification The justification to apply to all of the LayoutStack's elements. For a list of justifications see 'nc.constants.justifications'.
     */
    justifyAll(justification){}
}


/** Object that manages the calling of a given callback, ensuring that it is only called when necessary. 
 * This is often used to ensure that calls to methods that are performance-expensive are as limited as possible.
 * First connect the performance-heavy task via the constructor callback parameters, then later call the 'updateIfNeeded' method; 
 * if the 'needsUpdate' flag has been set to true since the last 'updateIfNeeded' call, then callback will occur, otherwise it is skipped. 
 * An example of how you can use this is in situation where you are doing manual rendering; you only want to 
 * render once per ScreenUpdate, and you don't want to render if nothing substantive has changed in the scene. 
 * In this case, you would set the 'needsUpdate' flag to true every time something in the scene is adjusted, 
 * and ensure that a call to 'updateIfNeeded' is placed in a ScreenUpdater-driven function. 
 */
class LazyUpdater
{
    /** Object that manages the calling of a given callback, ensuring that it is only called when necessary. 
     * This is often used to ensure that calls to methods that are performance-expensive are as limited as possible.
     * First connect the performance-heavy task via the constructor callback parameters, then later call the 'updateIfNeeded' method; 
     * if the 'needsUpdate' flag has been set to true since the last 'updateIfNeeded' call, then callback will occur, otherwise it is skipped. 
     * An example of how you can use this is in situation where you are doing manual rendering; you only want to 
     * render once per ScreenUpdate, and you don't want to render if nothing substantive has changed in the scene. 
     * In this case, you would set the 'needsUpdate' flag to true every time something in the scene is adjusted, 
     * and ensure that a call to 'updateIfNeeded' is placed in a ScreenUpdater-driven function. 
     * @param {object} updateCallbackOwner The object owning the callback function being managed by this LazyUpdater.
     * @param {string} updateCallbackName The name of the callback function being managed by this LazyUpdater.
     * @param {Array|any} [updateCallbackArgs] Arguments for the callback function. 
     */
    constructor(updateCallbackOwner,updateCallbackName,updateCallbackArgs)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;

        
        /**
         * Flag indicating whether the target method is in need of an update.
         * @default false
         * @type {boolean}
         */
        this.needsUpdate = null;
    }


    /** Calls the target method if the 'needsUpdate' flag is true, and sets it to false either way.
     */
    updateIfNeeded(){return(null);}
}


/** The MaterialMaster is a convenience-based object that represents all of the Materials on a given GraphicObject.
 * To manipulate all of the Materials on a GraphicObject at the same time, you can simply manipulate its MaterialMaster.
 * It should be noted that querying values from the MaterialMaster can be misleading, as the returned values only refer
 * to the last values set on the MaterialMaster itself, and would not reflect individual changes made to the Materials themselves.
 * [NON-INSTANTIABLE]
 */
class MaterialMaster
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** Sets the 'blending' value for all of this GraphicObject's Materials. 
         * @type {string}
         */
        this.blending = null;


        /** Sets the 'auxShaderSegment_vertexSupport' value for all of this GraphicObject's Materials. 
         * @type {string}
         */
        this.auxShaderSegment_vertexSupport = null;


        /** Sets the 'shaderSegment_matrixMath' value for all of this GraphicObject's Materials. 
         * @type {string}
         */
        this.shaderSegment_matrixMath = null;


    
        /** Sets the 'auxShaderSegment_postMatrixMath' value for all of this GraphicObject's Materials. 
         * @type {string}
         */
        this.auxShaderSegment_postMatrixMath = null;


        /** The particleSystemParameters EffectController.
 * This is an instance of the dynamically defined EffectController 'particleSystemParameters' (base type: 'Vector4'). 
 * To get a new instance, use "nc.effectControllers['particleSystemParameters'].new()".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {particleSystemParameters}
 */
this.particleSystemParameters = null;
/** The EffectController for the 'FillColor' EffectNode, which entirely fills the associated Geometry with the red, green, blue, and alpha color values provided.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.fillColor = null;
/** The EffectController for the 'SampleMainTexture' EffectNode that tells it which Texture to render.
 * @type {Texture}
 */
this.mainTexture = null;
/** The EffectController for the 'ColorMultiply' EffectNode, which multiplies the red, green, blue, and alpha color values of the Material it is applied to.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.colorMultiply = null;
/** The EffectController for the 'Shapify' EffectNode. The Shapify EffectNode converts edge data stored in a 'shapified' Texture into a presentable image with edges that stay sharp regardless of the scale of the associated GraphicObject.
 * This is an instance of the dynamically defined EffectController 'shapify' (base type: 'Vector2'). 
 * To get a new instance, use "nc.effectControllers['shapify'].new()".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {shapify}
 */
this.shapify = null;

    }


    /** Sets the EffectNodes for all of this GraphicObject's Materials. 
     * @param {Array.<EffectNode>|EffectNode} effectNodes The new list of EffectNodes that will apply to all of this GraphicObject's Materials.
     */
    setEffectNodes(effectNodes){}


    /** Adds EffectNodes to all of this GraphicObject's Materials. 
     * @param {Array.<EffectNode>|EffectNode} effectNodes The EffectNodes that will be added to all of this GraphicObject's Materials.
     */
    addEffectNodes(effectNodes){}
}


/** Materials are objects that control how the visual 'surfaces' defined in a Geometry are configured and ultimately rendered by WebGL.
 * This visual configuration is managed through the EffectNodes and EffectControllers on each Material.
 */
class Material
{
    /** Materials are objects that control how the visual 'surfaces' defined in a Geometry are configured and ultimately rendered by WebGL.
     * This visual configuration is managed through the EffectNodes and EffectControllers on each Material.
     */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** String determining the blending mode that is applied to this Material. For a list of available blending options, see nc.constants.blendingModes. 
         * @default nc.constants.blendingModes.standard
         * @type {string}
         */
        this.blending = null;


        /** An auxiliary shader support string that enables for the insertion of GLSL shader code before the vertex shader main.
         * This can be used to add custom functionality to this Material's vertex shader beyond the built-in EffectNode functionality.
         * @default ""
         * @type {string}
         */
        this.auxShaderSegment_vertexSupport = null;


        /** A shader segment string, determining the GLSL code used in the 'matrix math' segment at the end of the vertex shader.
         * This can be used to customize the vertex shader matrix math.
         * @default "gl_Position=projectionMatrix*(modelViewMatrix*vec4(vertex,1.0));"
         * @type {string}
         */
        this.shaderSegment_matrixMath = null;


    
        /** An auxiliary shader support string that enables for the insertion of GLSL shader code after the 'matrix math' segment of the vertex shader.
         * This can be used to add custom functionality to this Material's vertex shader beyond the standard built-in functionality.
         * @default ""
         * @type {string}
         */
        this.auxShaderSegment_postMatrixMath = null;


        /** A list of the names of this Material's EffectNodes for quick-reference while debugging or inspecting. 
         * To access and manipulate the actual EffectNodes, use Material.getEffectNodes, Material.setEffectNodes, or Material.addEffectNodes.
         * @type {Array.<string>}
         * @readonly
         */
        this.effectNodesLedger=null;


        /** The the compiled GLSL vertex shader string for this Material, resulting from combining this Material's EffectNodes.
         * This property is generally only meant for troubleshooting, and is read-only.
         * @type {string}
         * @readonly
         */
        this.compiledVertexShader=null;


        /** The the compiled GLSL fragment shader string for this Material, resulting from combining this Material's EffectNodes.
         * This property is generally only meant for troubleshooting, and is read-only.
         * @type {string}
         * @readonly
         */
        this.compiledFragmentShader=null;


        /** Flag determining if triangles within the geometry that are facing away from the camera should be drawn.
         * Please note that though the default value for this property is false, many GraphicAssets come with Material presets that can override the default.
         * @default false
         * @type {boolean}
         */
        this.faceCulling=null;


        /** Flag determining if fragments (pixels) drawn with this Material are tested against other fragment depths (as stored in the depth buffer),
         * ensuring that only the closest fragment is drawn. This flag is useful with geometries that have a full 3D shape such as those from OBJs etc... 
         * Please note that though the default value for this property is determined by the current value of nc.defaultDepthTesting, 
         * many GraphicAssets come with Material presets that can override the default.
         * @default nc.defaultDepthTesting
         * @type {boolean}
         */
        this.depthTest=null;


        /** Flag determining if the depths of fragments (pixels) drawn with this Material are written to the depth buffer, 
         * and can therefore be used to occlude other fragments.
         * Please note that though the default value for this property is determined by the current value of nc.defaultDepthWriting, 
         * many GraphicAssets come with Material presets that can override the default.
         * @default nc.defaultDepthWriting
         * @type {boolean}
         */
        this.depthWrite=null;
    

        /** The particleSystemParameters EffectController.
 * This is an instance of the dynamically defined EffectController 'particleSystemParameters' (base type: 'Vector4'). 
 * To get a new instance, use "nc.effectControllers['particleSystemParameters'].new()".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {particleSystemParameters}
 */
this.particleSystemParameters = null;
/** The EffectController for the 'FillColor' EffectNode, which entirely fills the associated Geometry with the red, green, blue, and alpha color values provided.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.fillColor = null;
/** The EffectController for the 'SampleMainTexture' EffectNode that tells it which Texture to render.
 * @type {Texture}
 */
this.mainTexture = null;
/** The EffectController for the 'ColorMultiply' EffectNode, which multiplies the red, green, blue, and alpha color values of the Material it is applied to.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.colorMultiply = null;
/** The EffectController for the 'Shapify' EffectNode. The Shapify EffectNode converts edge data stored in a 'shapified' Texture into a presentable image with edges that stay sharp regardless of the scale of the associated GraphicObject.
 * This is an instance of the dynamically defined EffectController 'shapify' (base type: 'Vector2'). 
 * To get a new instance, use "nc.effectControllers['shapify'].new()".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {shapify}
 */
this.shapify = null;

    }


    /** Returns this Material's current EffectNodes.
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of the given SceneObject or Material.
     * When a GraphicObject is set to a particular GraphicAsset, it's Materials adopt the GraphicAsset's 
     * EffectNode and EffectController presets by default, but they can be customized at any time.
     * @returns {Array.<EffectNode>}
     */
    getEffectNodes(){return(null);}


    /** Sets the EffectNodes for this Material. 
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of the given SceneObject or Material.
     * When a GraphicObject is set to a particular GraphicAsset, it's Materials adopt the GraphicAsset's 
     * EffectNode and EffectController presets by default, but they can be customized at any time.
     * @param {Array.<EffectNode>|EffectNode} effectNodes The new list of EffectNodes that will apply to this SceneObject and all of its Materials.
     */
    setEffectNodes(effectNodes){}


    /** Adds the given EffectNodes to this Material.
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of the given SceneObject or Material.
     * When a GraphicObject is set to a particular GraphicAsset, it's Materials adopt the GraphicAsset's 
     * EffectNode and EffectController presets by default, but they can be customized at any time.
     * @param {Array.<EffectNode>|EffectNode} effectNodes The EffectNodes to add to this Material.
     */
    addEffectNodes(effectNodes){}


    /** Disposes this Material, and removes internal Incisor® references to it to aid memory management.
     */
    dispose(){}
}


/** A 4x4 Matrix, typically used as a transformation matrix for SceneObjects.
 */
class Matrix4
{
    constructor()
    {
        /** The 16 elements of the 4x4 matrix, stored in column major order.  Defaults to the identity matrix.
         * @type {Array.<number>} 
         */
        this.elements = null;
    }


    /** Sets all of this Matrix4's element values to the element values of the givem Matrix4.
     * @param {Matrix4} matrix The matrix to copy element values from.
     */
    copy(matrix){}


    /** Sets this Matrix4's elements to the provided values.
     * @param {number} element00 Element at column 0, row 0.
     * @param {number} element01 Element at column 0, row 1.
     * @param {number} element02 Element at column 0, row 2.
     * @param {number} element03 Element at column 0, row 3.
     * @param {number} element10 Element at column 1, row 0.
     * @param {number} element11 Element at column 1, row 1.
     * @param {number} element12 Element at column 1, row 2.
     * @param {number} element13 Element at column 1, row 3.
     * @param {number} element20 Element at column 2, row 0.
     * @param {number} element21 Element at column 2, row 1.
     * @param {number} element22 Element at column 2, row 2.
     * @param {number} element23 Element at column 2, row 3.
     * @param {number} element30 Element at column 3, row 0.
     * @param {number} element31 Element at column 3, row 1.
     * @param {number} element32 Element at column 3, row 2.
     * @param {number} element33 Element at column 3, row 3.
     */
    set(element00, element01, element02, element03, element10, element11, element12, element13, element20, element21, element22, element23, element30, element31, element32, element33){}


    /** Returns a new Matrix4 with the same elements as this Matrix4.
     * @returns {Matrix4}
     */
    clone(){}


    /** Sets this Matrix4 to the inverse of the givem Matrix4.  If the Matrix can not be inverted, all elements will be set to 0.
     * @param {Matrix4} matrix The matrix to invert.
     */
    getInverse(matrix){}


    /** Postmultiplies this Matrix4 by the provided Matrix4.
     * @param {Matrix4} matrix The matrix by which this Matrix4 is multiplied.
     */
    multiply(matrix){}


    /** Premultiplies this Matrix4 by the provided Matrix4.
     * @param {Matrix4} matrix The matrix by which this Matrix4 is premultiplied.
     */
    premultiply(matrix){}


    /** Sets this Matrix4 to the result of multiplying the provided Matrix4 parameters.
     * @param {Matrix4} matrixA The first of the multiplied matrices.
     * @param {Matrix4} matrixB The second of the multiplied matrices.
     */
    multiplyMatrices(matrixA,matrixB){}


    /** Copies the numbers in the 'elements' array into the provided Array.
     * @param {Array.<number>} [array] The Array to copy the elements into. [DEFAULT: []]
     * @param {number} [offset] The index in 'array' at which to place the first element. [DEFAULT: 0]
     * @returns {Array.<number>}
     */
    toArray(array,offset){}


    /** Sets this Matrix4 to the identity matrix.
     */
    identity(){}


    /** Sets this Matrix4 to a transformation matrix representing the provided position, rotation, and scale.
     * @param {Vector3} position The position represented by the transformation matrix.
     * @param {Vector3} rotation The rotation represented by the transformation matrix.
     * @param {Vector3} scale The scale represented by the transformation matrix.
     */
    compose(position,rotation,scale){}


    /** Extracts the position, rotation and scale represented by this Matrix4.  Note that it is not always possible to correctly decompose a Matrix4 into these components, such as when the Matrix4 contains skewing/shearing.  Also note that multiple valid decompositions of a Matrix4 are possible.  For example, a rotation of 180 degrees around the Z axis creates the same Matrix4 as a scale of -1 on the X and Y axes.  To address this, the forceRotation and forceScale parameters can be used to indicate that the resulting rotation or scale are already known, and are already contained in the rotation or scale parameters.
     * @param {Vector3} position The resulting position.
     * @param {Vector3} rotation The resulting rotation.  If 'forceRotation' is true, this value is used as input to improve the extraction of scale.
     * @param {Vector3} scale The resulting scale.  If 'forceScale' is true, this value is used as input to improve the extraction of rotation.
     * @param {boolean} [forceRotation] Determines whether the value in 'rotation' is already set to the known rotation to improve the extraction of scale. [DEFAULT: false]
     * @param {boolean} [forceScale] Determines whether the value in 'scale' is already set to the known scale to improve the extraction of rotation. [DEFAULT: false]
     */
    decompose(position,rotation,scale,forceRotation,forceScale){}


    /** Returns the determinant of this Matrix4.  If this is 0, this Matrix4 can not be inverted.
     * @returns {number}
     */
    determinant(){}


    /** Applies this Matrix4's transformation to the provided Vector3.
     * @param {Vector3} vector The Vector3 to be transformed by this Matrix4.  This vector is modified in place.
     */
    applyToVector3(vector){};
}


/** An internal specialized type used for Spine Animation EffectControllers.
 */
class Matrix4Array
{
}


/** Object controlling a 'motion' (continuous change) on a given numeric property or properties (using fixedUpdate). 
 * An object of this type is returned from all 'addMotion' calls, providing a means to manage the given motion process.
 * [NON-INSTANTIABLE]
 */
class Motion
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Name of the Motion.
         * @type {string}
         */
        this.name=null;


        /** The number of properties being affected by this Motion.
         * @type {number}
         */
        this.numProperties=null;


        /** Number determining the influence of this Motion over the associated numeric properties where a value of 0 corresponds to the property remaining at its baseValue with no change,
         * and a value of 1 corresponds to the value of the property being entirely determined by the Motion.
         * @type {number}
         * @default 1
         */
        this.influence=null;


        /** Number informing the Motion's rate of increase on its 'progress' value, affecting the overall speed of the motion experienced by the associated properties.
         * @type {number}
         * @default 1
         */
        this.motionSpeed=null;


        /** The number driving the motionFunction for this motion. In a defined motion over time, this number is equivalent to time.
         * This value is not meant to be manipulated as it is automatically changed over time via the internal fixedUpdate used by this Motion.
         * @type {number}
         * @default 0
         */
        this.progress=null;


        /** The MotionType for this Motion. A MotionType defines a method of continuous change for a given set of numeric properties within a set of bounds over time. 
         * The default MotionType is 'Pendulum', which defines a smooth sinusoidal oscillation between the lower and upper bounds. 
         * MotionTypes can define any set of continuous motions for a set of numeric properties.
         * @default nc.motionTypes.Pendulum
         * @type {MotionType}
         */
        this.motionType=null;


        /** Array containing the base values for this Motion. These are the values that the properties being manipulated will return to if the 'influence' of this Motion is set to 0.
         * Upon initiating a Motion for a given set numeric properties, their current values are stored in this array and used as 'home base' values and blended with the defined motion according to 'influence'.
         * @type {Array.<number>}
         */
        this.baseValues=null;


        /** Array containing the current values for this Motion. These are the values that the MotionType motion function manipulate based its 'progress' property to create the desired movement.
         * @type {Array.<number>}
         */
        this.currentValues=null;


        /** Dictionary of dictionaries (per MotionType) of values that can be used to control this motion dynamically.
         * @type {MotionControllers}
         */
        this.controllers = new MotionControllers();


        /** Array containing the lower bound or bounds for the Motion. The length of this array depends on this Motion's 'numProperties'.
         * While MotionType definitions are not all required to adhere to bounds, it is a common practice for MotionTypes result in property motion that is confined to these bounds.
         * @type {Array.<number>}
         */
        this.lowerBounds=null;


        /** Array containing the upper bound or bounds for the Motion. The length of this array depends on this Motion's 'numProperties'.
         * While MotionType definitions are not all required to adhere to bounds, it is a common practice for MotionTypes result in property motion that is confined to these bounds.
         * @type {Array.<number>}
         */
        this.upperBounds=null;


        /** An un-specified JS object of 'any' type to enable the user to stash persistant elements of their Motion within the motionFunction.
         * @type {object}
         */
        this.workspace = {};


        /** The object owning the optional callback function invoked continuously (every fixedUpdate) during the motion process. This callback is only performed while the influence value is larger than 0.
         * @default undefined
         * @type {object}
         */
        this.updaterCallbackOwner = null;


        /** The name of the optional callback function invoked continuously (every fixedUpdate) during the motion process. This callback is only performed while the influence value is larger than 0.
         * @default undefined
         * @type {string}
         */
        this.updaterCallbackName = null;


        /** The PauseEvent or Array of PauseEvents that this Motion will be immune to. 
         * Set this parameter to [] for this Motion to have no pause immunity.
         * @default nc.defaultPauseImmunity
         * @type {PauseEvent & Array.<PauseEvent>}
         */
        this.pauseImmunity = null;


        /** The SpeedControl or Array of SpeedControls that this Motion is affected by.
         * @default nc.defaultSpeedControl
         * @type {SpeedControl & Array.<SpeedControl>}
         */
        this.speedControl = null;
    }

    
    /** Swoops (interpolates) the Motion's influence from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     */
    swoopInfluence(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}





/** Dictionary of all registered MotionControllers.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class MotionControllers
{
    constructor()
    {
        
    }
}


/** Object defining a particular type of motion that can be added to any property or group of properties via 'nc.addMotion' or 'Vector.addMotion'.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class MotionType
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type="";


        /** Name of the Motion.
         * @type {string}
         */
        this.name="";


        /** A reference to the function that defines the nature of the motion.
         * @type {Function}
         */
        this.motionFunction = function(){};


        /** A list of optional motion controllers. These can be used to dynamically affect the nature of the motion.
         * @type {Array.<string>}
         */
        this.motionControllerNames = [];


        /** A list of optional motion controller default values.
         * @type {Array.<number>}
         */
        this.motionControllerDefaultValues = [];


        /** The description of the MotionType - this will appear in the autocomplete documentation.
         * @type {string}
         */
        this.description = "";


        /** The description of the MotionType controllers - these descriptions will appear in the autocomplete documentation.
         * @type {Array.<string>}
         */
        this.controllerDescriptions = [];
    }
}


/** A ParticleSystemDefinition defines the parameters of a ParticleSystem.
 * To decrease the memory needed and time required to instantiate multiple ParticleSystems that use the same parameters, a single definition is created that one or more ParticleSystems then reference.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - particleSystems]
 */
class ParticleSystemDefinition
{
    /**
     * @param {string} name The name of the new ParticleSystemDefinition.
     */
    constructor(name)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The length of time over which to emit particles. Set to 0 to emit particles forever. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: .2]
         * @type {number}
         */
        this.emissionDuration=null;


        /** The amount of time after its emission that each particle dies. Must not be a negative number. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: .5]
         *  @type {number}
         */
        this.particleLifetime=null;


        /** A per particle perturbation of particleLifetime. Each particle chooses a random amount, limited to ± this value, to add to the base value. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         *  @type {number}
         */
        this.particleLifetimeRandomness=null;
        

        /** A per particle perturbation of that particle's emission time. By default, particles are emitted at evenly spaced intervals. A random number between 0 and this value will added to the default emission time of each particle. Must not be a negative number. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         *  @type {number}
         */
        this.emissionTimeRandomness=null;
        

        /** The alpha (transparency) to apply to each particle. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: ParticleSystemRamp1]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.alpha=null;


        /** A per particle perturbation of 'alpha'. Each particle chooses a random amount, limited to ± this value, to modify the alpha. For example, if the value is .2, each particle generates a random number in the range [.8 - 1.2] to multiply with 'alpha' and generate its own unique version of 'alpha'. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.alphaRandomness=null;


        /** The color to apply to each particle. This may be set to a Vector3 to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp3 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: Vector3(1, 1, 1)]
         * @type {Vector3 & string & ParticleSystemRamp3} 
         */
        this.color=null;


        /** A per particle perturbation of 'color'. Each particle chooses a random amount, limited to ± this value, to modify the color. For example, if the value is .2, each particle generates a random number in the range [.8 - 1.2] to multiply with 'color' and generate its own unique version of 'color'. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp3 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp3} 
         */
        this.brightnessRandomness=null;


        /** The amount to hue shift each particle. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.particleHueShift=null;


        /** A per particle perturbation of 'particleHueShift'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.particleparticleHueShiftRandomness=null;


        /** The shape of the area in which a particle may be created. See nc.constants.particleSystemEmitterShapes for valid values. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: nc.constants.particleSystemEmitterShapes.Point]
         * @type {string} 
         */
        this.emitterShape=null;


        /** If emitterShape is set to nc.constants.particleSystemEmitterShapes.Custom, this expression will be used to choose a position for each emitted particle. Note that precomputed random numbers are available as vec4s named rand0 through rand5, though typically rand2.x and rand2.y are used in this context. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: undefined]
         * @type {string} 
         */
         this.customEmitterShapeExpression=null;


        /** The dimensions of the emitter shape. Use different values for X and Y to create oblong shapes. This may be set to a Vector2 to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp2 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: Vector2(0,0)]
         * @type {Vector2 & string & ParticleSystemRamp2} 
         */
        this.emitterShapeDimensions=null;


        /** The velocity with which particles are emitted away from their initial position. The magnitude of this vector indicates the initial speed of the particles. Note that 'emissionConeAngle' causes particles to emit in a cone centered around this direction. This may be set to a Vector2 to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp2 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: Vector2(0, 500)]
         * @type {Vector2 & string & ParticleSystemRamp2} 
         */
        this.emissionVelocity=null;
        

        /** A per particle perturbation of the magnitude of 'emissionVelocity'. Each particle chooses a random amount, limited to ± this value, to modify the magnitude of 'emissionVelocity'. For example, if the value is .2, each particle generates a random number in the range [.8 - 1.2] to multiply with 'emissionVelocity' and generate its own unique version of 'emissionVelocity'. Thus, particles are emitted with varying velocities. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.emissionVelocityRandomness=null;


        /** A per particle perturbation of the angle of 'emissionVelocity'. Each particle chooses a random amount, limited to ± half of this value in degrees, to modify the angle of 'emissionVelocity'. For example, if the value is 90 degrees, each particle will generate a unique version of 'emissionVelocity' randomly placed within ±45 degrees of 'emissionVelocity'. Thus, particles are emitted in a 90 degree cone. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 360]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.emissionConeAngle=null;


        /** The position with respect to the ParticleSystem's origin from which to emit particles. Note that when moving the ParticleSystem SceneObject itself, particles previoiusly emitted are also moved, which can look unnatural. By expressiong the emitter position as an expression or ParticleSystemRamp2, the ParticleSystem is able to maintain the trajectories of previously emitted particles while the emitter moves. This may be set to a Vector2 to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp2 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: Vector2(0,0)]
         * @type {Vector2 & string & ParticleSystemRamp2}
         */
        this.emitterPosition=null;


        /** The force constantly applied to each particle. Commonly used to simulate gravity. This may be set to a Vector2 to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp2 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: Vector2(0, 0)]
         * @type {Vector2 & string & ParticleSystemRamp2} 
         */
        this.force=null;


        /** A per particle perturbation of 'force'. Each particle chooses a random amount, limited to ± this value, to modify the force. For example, if the value is .2, each particle generates a random number in the range [.8 - 1.2] to multiply with 'force' and generate its own unique version of 'force'. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp2 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp2} 
         */
        this.forceRandomness=null;


        /** An extra amount always added to the X component of each particle's velocity. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.extraVelocityX=null;


        /** A per particle perturbation of 'extraVelocityX'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * Second line
         * @type {number & string & ParticleSystemRamp1}
         */
        this.extraVelocityXRandomness=null;


        /** An extra amount always added to the Y component of each particle's velocity. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.extraVelocityY=null;


        /** A per particle perturbation of 'extraVelocityY'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.extraVelocityYRandomness=null;


        /** The amount by which to stretch each particle in the direction in which is is moving. Particles that are moving faster stretch further. This is typically used as a high performance approximation of motion blur. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.motionStretch=null;


        /** The amount by which a particle's stretch, as caused by 'motionStretch', reduces its alpha. This is typically used as a high performance approximation of motion blur. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.motionStretchAlphaInfluence=null;


        /** An expression used to remap particle age values to a new value. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: undefined]
         * @type {string} 
         */
        this.ageRemap=null;


         /** The speed at which each particle rotates, in degrees per second. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
         this.rotationSpeed=null;


         /** A per particle perturbation of 'rotationSpeed'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.rotationSpeedRandomness=null;
 
 
         /** The rotation in degrees of each particle when it is emitted. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.initialRotation=null;
 
 
         /** A per particle perturbation of 'initialRotation'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.initialRotationRandomness=null;
         
 
         /** The maximum rotation, in degrees, that a particle will reach by oscillating its rotation. Note that this is additively combined with the result of 'rotationSpeed'. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.rotationSwayStrength=null;
 
 
         /** A per particle perturbation of 'rotationSwayStrength'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.rotationSwayStrengthRandomness=null;
 
 
         /** The speed at which to oscillate, in cycles/second, if rotationSwayStrength is not 0. Note that this is additively combined with the result of 'rotationSpeed'. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.rotationSwaySpeed=null;
 
 
         /** A per particle perturbation of 'rotationSwaySpeed'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.rotationSwaySpeedRandomness=null;
 
 
         /** A phase shift to the oscillation, if rotationSwayStrength is not 0. Effectively skips to a different point in the oscillation pattern. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.rotationSwayPhase=null;
 
 
         /** A per particle perturbation of 'rotationSwayPhase'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
          * @type {number & string & ParticleSystemRamp1} 
          */
         this.rotationSwayPhaseRandomness=null;


         /** The distance to wiggle the particle in the X direction around the point where it would otherwise be. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
         this.wiggleStrengthX=null;


        /** A per particle perturbation of 'wiggleStrengthX'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleStrengthXRandomness=null;


        /** The distance to wiggle the particle in the Y direction around the point where it would otherwise be. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleStrengthY=null;


        /** A per particle perturbation of 'wiggleStrengthY'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleStrengthYRandomness=null;


        /** The speed at which to wiggle the particle in the X direction around the point where it would otherwise be. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleSpeedX=null;


        /** A per particle perturbation of 'wiggleSpeedX'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleSpeedXRandomness=null;


        /** The speed at which to wiggle the particle in the Y direction around the point where it would otherwise be. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleSpeedY=null;


        /** A per particle perturbation of 'wiggleSpeedY'. Each particle chooses a random amount, limited to ± this value, to add to the base value. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleSpeedYRandomness=null;


        /** Used to constrain wiggling particles to a circle shape. At a 'wiggleCircularStrength' of 0, a particle wiggling eqully on X and Y is allowed to move within the bounds of a square. At a 'wiggleCircularStrength' of 1, a particle wiggling eqully on X and Y is only allowed to move within the bounds of a circle. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.wiggleCircularStrength=null;


        /** The scale to apply to each particle. This may be set to a Vector2 to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp2 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: string]
         * @type {Vector2 & string & ParticleSystemRamp2} 
         */
        this.particleScale=null;


        /** A per particle perturbation of the magnitude of 'particleScale'. Each particle chooses a random amount, limited to ± this value, to modify the magnitude of 'particleScale'. For example, if the value is .2, each particle generates a random number in the range [.8 - 1.2] to multiply with 'particleScale' and generate its own unique version of 'particleScale'. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.particleScaleRandomness=null;


        /** The amount to bias all random numbers toward the center of their range. Typically ranges from 0 (no bias) to 1 (random numbers from -1 to 1 are squared, pulling them toward 0). However, values outside this range may be used for varying effects. This may be set to a number to apply a constant value, a string to apply a GLSL expression, or a ParticleSystemRamp1 to apply a value that changes based on a particle's age or time of emission. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: 0]
         * @type {number & string & ParticleSystemRamp1} 
         */
        this.randomnessDistribution=null;


        /** This is the default value of randomizeOnPlay for any ParticleSystem instantiated using this ParticleSystemDefinition. Note that the value of randomizeOnPlay for each ParticleSystem instance can then be changed independently. When true, the ParticleSystem will automatically call randomize() each time it is restarted, including when playback loops. [DEFAULT: true]
         * @type {boolean} 
         */
        this.randomizeOnPlay=null;


        /** The total number of particles that are required by this ParticleSystemDefinition. Because particles that have 'died' can often be reused as later particles, this number will often be less than the total number seen throughout the ParticleSystem's playback.
         * @type {number}
         * @readonly
         */
        this.particlePoolCount=null;


        /** The name of the EffectNode automatically created by this ParticleSystemDefinition. Useful when altering the EffectNodes of a ParticleSystem, because without this EffectNode applied, the ParticleSystem behavior will be lost.
         * @type {string}
         * @readonly
         */
        this.effectNodeName=null;


        /** When 'graphicAssets' contains multiple GraphicAssets, the draw order of all the particles is shuffled to randomly interleave the particles. This seed will deterministically alter the outcome of this shuffle, creating a different draw order of the particles. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. To randomize the behavior of a ParticleSystem without this costly rebuild, see ParticleSystem.randomize(). [DEFAULT: 0]
         * @type {number} 
         */
        this.particleDrawOrderSeed=null;
    }


    /** Returns the ParticleInfo objects used to populate the ParticleSystem.
     * @returns {Array.<ParticleInfo>}
     */
    getParticleInfo(){return null;}


    /** Sets the ParticleInfo objects used to populate the ParticleSystem.
     * @param {Array.<ParticleInfo>|ParticleInfo} particleInfo Array of ParticleInfo objects used to populate the ParticleSystem.
     */
    setParticleInfo(particleInfo){return null;}
}


/** A ParticleSystem uses the Geometry and EffectNode create by a ParticleSystemDefinition to manage the behavior of many particles contained within a single SceneObject.
 * To reduce the number of SceneObjects, all particles in a single ParticleSystem are merged into one SceneObject and their behavior is controlled by the EffectNode created by the ParticleSystemDefinition.
 * [REQUIREMENT: module - particleSystems]
 * @extends GraphicObject
 */
class ParticleSystem extends GraphicObject
{
    /**
     * @param {ParticleSystemDefinition} [particleSystemDefinition] The definition used to build this ParticleSystem. If left undefined, then 'MainParticleSystem' will be chosen - if 'MainParticleSystem' is not yet defined, it will automatically be defined and then used as the default. [DEFAULT: nc.particleSystemDefs.MainParticleSystem]
     * @param {SceneObject} [parent] The SceneObject that will become the new ParticleSystem's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new ParticleSystem. [DEFAULT: 'ParticleSystem']
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this ParticleSystem will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this ParticleSystem is affected by. [DEFAULT: nc.defaultSpeedControl]
     */
    constructor(particleSystemDefinition,parent,name,pauseImmunity,speedControl)
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {ParticleSystemDefinition}
         */
        this.definition=null;

        
        /** The PlaybackController managing the ParticleSystem's playback.
         * @type {PlaybackController}
         */
        this.playbackController=null;
    }


    /** Randomly picks a new value for the material's particleSystemRandomSeed EffectController, which seeds the random number generation used in the ParticleSystem's EffectNode. The particleSystemRandomSeed EffectController can also be directly set to a desired value. Suggested values are in the range [0, 10].
     */
    randomize(){return null;}


    /** Forces the ParticleSystem to stop creating new particles. Previously emitted particles will not be affected and will be allowed to proceed to the end of their life. Commonly used to dynamically decide the duration of a ParticleSystem that is emitting infinitely, but can also stop a ParticleSystem with a known duration early.
     * @param {boolean} disableAfterParticlesDie If true, the ParticleSystem will be automatically disabled at the latest possible time one of the existing particles could die.
     */
    stopEmitting(disableAfterParticlesDie){return null;}
}


/**
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - particleSystems]
 */
class ParticleSystemRamp
{
    constructor()
    {
        /** The input type used when evaluating. See nc.particleSystemRampInputTypes for valid values.
         * @type {string} 
         */
        this.inputType=null;


        /** When using inputType equal to 'EmissionTime', the emission time is divided by this number and the fractional component of the result is used to look up a value in the ramp.
         * This means that particles emitted after this time will use values that wrap around to the beginning of the ramp.
         * When using a non-infinite emissionDuration, it is common to set this value to emissionDuration + emissionTimeRandomness so that the ramp applies over the duration of the particle emission.
         * @type {number} 
         */
        this.inputMaximum=null;


        /** The type of interpolation to apply between the keyframes.
         * See nc.constants.particleSystemRampInterpolationTypes for valid values.
         * @type {string}
         */
        this.interpolationType=null;


        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;
    }
    

    /**
     * Refreshes the order of the keyframes, ensuring they are stored in order of increasing time.
     */
    refreshKeyframeOrder(){return(null);}


    /**
     * Removes the keyframe with the given time value.
     * @param {number} x The time value of the keyframe to remove. If no such keyframe exists, nothing is removed.
     */
    removeKeyframe(x){return(null);}
}


/** Object representing keyframes with number values used by ParticleSystemDefinition members.
 * [REQUIREMENT: module - particleSystems]
 */
class ParticleSystemRamp1 extends ParticleSystemRamp
{
    constructor()
    {
        /** Array of keyframes representing the ramp. Each keyframe is specified as an array with two elements. The first element must be a number representing the time of the keyframe. Ramp evaluations are performed in the range 0-1, but keyframes may specify times outside this range. The second element must be a number. [DEFAULT: []]
         *  @type {Array}
         */
        this.values=null;
    }
    

    /**
     * Adds a new keyframe. If a keyframe already exists at this time value, it is overwritten.
     * @param {number} x The time value for this keyframe.
     * @param {number} y The value stored at this keyframe.
     */
    addKeyframe(x, y){return(null);}


    /**
     * Tests whether another ParticleSystemRamp1 has identical contents to this ParticleSystemRamp1.
     * @param {ParticleSystemRamp1} particleSystemRamp1 The ParticleSystemRamp1 to compare to.
     * @returns {boolean}
     */
    isEqual(particleSystemRamp1){return(null);}
}


/** Object representing keyframes with Vector2 values used by ParticleSystemDefinition members.
 * [REQUIREMENT: module - particleSystems]
 * @extends ParticleSystemRamp
 */
class ParticleSystemRamp2 extends ParticleSystemRamp
{
    constructor()
    {
        /** Array of keyframes representing the ramp. Each keyframe is specified as an array with two elements. The first element must be a number representing the time of the keyframe. Ramp evaluations are performed in the range 0-1, but keyframes may specify times outside this range. The second element must be a Vector2. [DEFAULT: []]
         *  @type {Array}
         */
        this.values=null;
    }
    

    /**
     * Adds a new keyframe. If a keyframe already exists at this time value, it is overwritten.
     * @param {number} x The time value for this keyframe.
     * @param {Vector2} y The value stored at this keyframe.
     */
    addKeyframe(x, y){return(null);}


    /**
     * Tests whether another ParticleSystemRamp2 has identical contents to this ParticleSystemRamp2.
     * @param {ParticleSystemRamp2} particleSystemRamp2 The ParticleSystemRamp2 to compare to.
     * @returns {boolean}
     */
    isEqual(particleSystemRamp2){return(null);}
}


/** Object representing keyframes with Vector3 values used by ParticleSystemDefinition members.
 * [REQUIREMENT: module - particleSystems]
 * @extends ParticleSystemRamp
 */
class ParticleSystemRamp3 extends ParticleSystemRamp
{
    constructor()
    {
        /** Array of keyframes representing the ramp. Each keyframe is specified as an array with two elements. The first element must be a number representing the time of the keyframe. Ramp evaluations are performed in the range 0-1, but keyframes may specify times outside this range. The second element must be a Vector3. [DEFAULT: []]
         *  @type {Array}
         */
        this.values=null;
    }
    

    /**
     * Adds a new keyframe. If a keyframe already exists at this time value, it is overwritten.
     * @param {number} x The time value for this keyframe.
     * @param {Vector3} y The value stored at this keyframe.
     */
    addKeyframe(x, y){return(null);}


    /**
     * Tests whether another ParticleSystemRamp3 has identical contents to this ParticleSystemRamp3.
     * @param {ParticleSystemRamp3} particleSystemRamp3 The ParticleSystemRamp3 to compare to.
     * @returns {boolean}
     */
    isEqual(particleSystemRamp3){return(null);}
}

/** Object representing keyframes with Vector4 values used by ParticleSystemDefinition members.
 * [REQUIREMENT: module - particleSystems]
 * @extends ParticleSystemRamp
 */
class ParticleSystemRamp4 extends ParticleSystemRamp
{
    constructor()
    {
        /** Array of keyframes representing the ramp. Each keyframe is specified as an array with two elements. The first element must be a number representing the time of the keyframe. Ramp evaluations are performed in the range 0-1, but keyframes may specify times outside this range. The second element must be a Vector4. [DEFAULT: []]
         * @type {Array}
         */
        this.values=null;
    }
    

    /**
     * Adds a new keyframe. If a keyframe already exists at this time value, it is overwritten.
     * @param {number} x The time value for this keyframe.
     * @param {Vector4} y The value stored at this keyframe.
     */
    addKeyframe(x, y){return(null);}


    /**
     * Tests whether another ParticleSystemRamp4 has identical contents to this ParticleSystemRamp4.
     * @param {ParticleSystemRamp4} particleSystemRamp4 The ParticleSystemRamp4 to compare to.
     * @returns {boolean}
     */
    isEqual(particleSystemRamp4){return(null);}
}


/** Object to allow adding graphics to a ParticleSystem with different emission rates and relative scales.
 * [REQUIREMENT: module - particleSystems]
 */
class ParticleInfo
{
    /**
     * @param {GraphicAsset} graphicAsset The GraphicAsset to add for this particle. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: [nc.graphicAssets.WhiteBox]]
     * @param {number} particlesPerSecond The number of this particle to add ever second of 'emissionDuration'. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: [500]]
     * @param {number} scale The scale to apply to each of these particles. Useful for reusing assets with mismatched scales in the same particle system. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization. [DEFAULT: [1]]
     */
    constructor(graphicAsset,particlesPerSecond,scale)
    {
        /** The GraphicAsset to add for this particle. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization.
         *  @type {GraphicAsset}
         */
        this.graphicAsset=null;


        /** The number of this particle to add ever second of 'emissionDuration'. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization.
         *  @type {number}
         */
        this.particlesPerSecond=null;


        /** The scale to apply to each of these particles. Useful for reusing assets with mismatched scales in the same particle system. Note that changing this value at run time causes a costly rebuild of the particle system and is only recommended during initialization.
         *  @type {number}
         */
        this.scale=null;
    }
    

    /**
     * Returns a deep copy of this ParticleInfo instance.
     */
    clone(){return(null);}
}


/** Dictionary of all registered ParticleSystemDefinitions.
 * [NON-INSTANTIABLE]
 */
class ParticleSystemDefinitions 
{
    constructor()
    {
        
    }
}


/** Object housing functionality manipulate paths including 'splitPath', 'getFileName', and 'getParentDirectory'.
 * [NON-INSTANTIABLE]
 */
class Paths
{
    constructor()
    {
        /**
         * The path to the project directory.
         * [REQUIREMENT: unpublished only]
         * @type {string}
         */
        this.projectPath = null;


        /**
         * The path to the application support directory.
         * [REQUIREMENT: unpublished only]
         * @type {string}
         */
        this.applicationSupportPath = null;


        /**
         * The path to the desktop.
         * [REQUIREMENT: unpublished only]
         * @type {string}
         */
        this.desktopPath = null;


        /**
         * The path to the current user directory.
         * [REQUIREMENT: unpublished only]
         * @type {string}
         */
        this.userDirectoryPath = null;
    }


    /**
     * Returns an array of separated path components. 
     * All paths in Incisor® use '\' as a path separator.
     * @param {string} path The path to split.
     * @returns {Array.<string>}
     */
    splitPath(path){return(null);}


    /**
     * Returns the name of the last path component of the provided path.
     * All paths in Incisor® use '\' as a path separator.
     * @param {string} path The path to return the last path component of.
     * @returns {string}
     */
    getFileName(path){return(null);}


    /**
     * Returns the provided path minus the last path component.
     * All paths in Incisor® use '\' as a path separator.
     * @param {string} path The path to return the last path component of.
     * @returns {string}
     */
    getParentDirectory(path){return(null);}
}


/** Object that can be used to define a PDF file, which can then be written to disk.
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - pdfs]
 */
class Pdf 
{
     /** Object that can be used to define a PDF file, which can then be written to disk.
     * [REQUIREMENT: unpublished only]
     * [REQUIREMENT: license - pdfs]
     */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The default font size for text within this Pdf.
         * @type {number}
         * @default 40
         */
        this.defaultFontSize = null;


        /** The default font for text within this Pdf. Please note that any fonts (ttf or otf files) used within Pdfs must reside within 
         * the 'Pdf Fonts' directory of the Incisor® application support directory, which can be accessed from the Incisor® menu.
         * @type {string}
         * @default "Noto Sans"
         */
        this.defaultFontName = null;
    }


    /** Defines a new font that can be used within this Pdf. Please note that any fonts (ttf or otf files) used within Pdfs must reside within 
     * the 'Pdf Fonts' directory of the Incisor® application support directory, which can be accessed from the Incisor® menu.
     * @param {string} name The name of the newly defined font to be made available to use within this Pdf.
     * @param {string} regularFontFileName The name of the font file (within the application support 'Pdf Fonts' directory) to be used for regular text.
     * @param {string} [boldFontFileName] The name of the font file (within the application support 'Pdf Fonts' directory) to be used for bold text. [DEFAULT: regularFontFileName]
     * @param {string} [italicFontFileName] The name of the font file (within the application support 'Pdf Fonts' directory) to be used for italic text. [DEFAULT: regularFontFileName]
     * @param {string} [boldItalicFontFileName] The name of the font file (within the application support 'Pdf Fonts' directory) to be used for bold italic text. [DEFAULT: regularFontFileName]
     */
    defineFont(name,regularFontFileName,boldFontFileName,italicFontFileName,boldItalicFontFileName){}


    /** Adds a new PdfSection to this Pdf and returns it. A PdfSection is a group of pages with a shared style.
     * @returns {PdfSection}
     */
    addSection(){return(null);}


    /** Writes the Pdf file to the given path.
     * @param {string} filePath The relative or absolute path for the file to be written.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     */
    writePdf(filePath,isPathRelative){}
}


/** A PdfSection is an object defining a group of pages within a Pdf that all share the same page style.
 * To make a new PdfSection, call 'addSection' on the Pdf you wish to add the section to.
 * [NON-INSTANTIABLE]
 */
class PdfSection 
{
    /** A PdfSection is an object defining a group of pages within a Pdf that all share the same page style.
    * To make a new PdfSection, call 'addSection' on the Pdf you wish to add the section to.
    * [NON-INSTANTIABLE]
    */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The width of the pages within this PdfSection.
         * @type {number}
         * @default 2550
         */
        this.pageWidth = null;


        /** The height of the pages within this PdfSection.
         * @type {number}
         * @default 3300
         */
        this.pageHeight = null;


        /** The size of the left margin of the pages within this PdfSection.
         * @type {number}
         * @default 150
         */
        this.leftMargin = null;


        /** The size of the right margin of the pages within this PdfSection.
         * @type {number}
         * @default 150
         */
        this.rightMargin = null;


        /** The size of the top margin of the pages within this PdfSection.
         * @type {number}
         * @default 150
         */
        this.topMargin = null;


        /** The size of the bottom margin of the pages within this PdfSection.
         * @type {number}
         * @default 150
         */
        this.bottomMargin = null;


        /** The path of the backgroundImage within this PdfSection.
         * @type {PdfImage}
         * @default undefined
         */
        this.backgroundImage = null;


        /** The header element for this PdfSection.
         * @type {PdfHeader}
         */
        this.header = null;


        /** The footer element for this PdfSection.
        * @type {PdfFooter}
        */
        this.footer = null;
    }


    /** Adds a new PdfParagraph to this PdfSection and returns it. A PdfParagraph is simply a block of text.
     * @returns {PdfParagraph}
     */
    addParagraph(){return(null);}


    /** Adds a background image to this PdfSection.
     * @param {string} imagePath The path of the background image being added within this PdfSection.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @param {string} [justificationH] The horizontal justification of the background image being added to this PdfSection. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
     * @param {string} [justificationV] The vertical justification of the background image being added to this PdfSection. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
     */
    addBackgroundImage(imagePath, isPathRelative, justificationH, justificationV){return(null);}


    /**
     * Adds a new Image to this PdfSection and returns it.
     * @param {string} imagePath The path of the image being added within this PdfSection.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @param {string} [justificationH] The horizontal justification of the image being added to this PdfSection. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
     * @param {string} [justificationV] The vertical justification of the image being added to this PdfSection. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
     * @returns {PdfImage}
     */
    addImage(imagePath, isPathRelative, justificationH, justificationV){return(null);}


    /**
     * Adds a new PdfTable to this PdfSection and returns it.
     * @param {number} numRows The number of rows to add to this PdfTable. 
     * @param {number} numCols The number of columns to add to each PdfRow in this PdfTable.
     * @param {Array.<number> | number} columnWidths An array containing the desired widths for each column in this PdfTable.
     * @returns {PdfTable}
     */
    addTable(numRows, numCols, columnWidths){return(null);}


    /** Adds a new PdfTextFrame to this PdfSection and returns it.
     * @param {number} width The width of the PdfTextFrame being added.
     * @param {number} height The height of the PdfTextFrame being added.
     * @returns {PdfTextFrame}
     */
    addTextFrame(width, height){return(null);}


    /**
     * Adds a page break after this PdfSection.
     */
    addPageBreak() { }


    /**
     * Sets all the margins of this PdfSection to a specified value.
     * @param {number} margin Value to set all margins on this PdfSection to.
     */
    setMargins(margin) {return (null);}
}


/** A PdfParagraph is an object defining a block of text and the associated formatting within a Pdf.
 * To make a new PdfParagraph, call 'addParagraph' on the PdfSection, PdfCell, PdfHeader or PdfFooter, you wish to add the block of text to.
 * [NON-INSTANTIABLE]
 */
class PdfParagraph 
{
    /** A PdfParagraph is an object defining a block of text and the associated formatting within a Pdf.
    * To make a new PdfParagraph, call 'addParagraph' on the PdfSection, PdfCell, PdfHeader or PdfFooter, you wish to add the block of text to.
    * [NON-INSTANTIABLE]
    */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The text to be displayed in this PdfParagraph.
         * @type {string}
         * @default ""
         */
        this.text = null;


        /** The justification of the text in this PdfParagraph.
         * For acceptable values, see 'nc.constants.justfications'.
         * @type {string}
         * @default "center"
         */
        this.justificationH = null;


        /** The name of the font that will be used to render the text in this PdfParagraph.
         * This value will default to the defualtFontName value of the containing Pdf.
         * To use a new font, you must define it using "Pdf.defineFont", and also ensure that the associated font files
         * are in the 'Pdf Fonts' directory of the Incisor® application support directory, which can be accessed from the Incisor® menu.
         * @type {string}
         * @default defaultFontName 
         */
        this.fontName = null;


        /**
         * The color of the text in this PdfParagraph.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.fontColor = null;


        /** The height of the pages within this PdfSection. This value will default to the defaultFontSize value of the containing Pdf.
         * @type {number}
         * @default defaultFontSize 
         */
        this.fontSize = null;


        /** The space size that will be added after this PdfParagraph.
         * @type {number}
         * @default 0
         */
        this.spaceAfter = null;


        /** The space size that will be added before this PdfParagraph.
         * @type {number}
         * @default 0
         */
        this.spaceBefore = null;


        /** The left indentation amount of this PdfParagraph.
         * @type {number}
         * @default 0
         */
        this.leftIndent=null;


        /** The right indentation amount of this PdfParagraph.
         * @type {number}
         * @default 0
         */
        this.rightIndent=null;


        /** Boolean determining if the text in this PdfParagraph should be bold.
         * @type {boolean}
         * @default false
         */
        this.bold = null;


        /** Boolean determining if the text in this PdfParagraph should be italicized.
         * @type {boolean}
         * @default false
         */
        this.italic = null;


        /** The underline type of the text in this PdfPagraph.
         * For acceptable values, see 'nc.constants.pdfUnderlineTypes'.
         * @type {string}
         * @default ""
         */
        this.underline = null;
    }
    /** Adds a page number to the end of this PdfParagraph.
     */
    addPageField(){}
}


/**
* A PdfHeader is an object defining a heading element and the associated formatting within a PdfSection.
* Each section has exactly one PdfHeader.
* [NON-INSTANTIABLE] 
*/
class PdfHeader
{
    /**
     * A PdfHeader is an object defining a heading element and the associated formatting with a PdfSection.
     * Each section has exactly one PdfHeader.
     * [NON-INSTANTIABLE] 
     */ 
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


    }
    /** Adds a new PdfParagraph to this PdfHeader and returns it. A PdfParagraph is simply a block of text.
    * @returns {PdfParagraph}
    */
    addParagraph(){return(null);}


    /**
     * Adds a new Image to this PdfHeader and returns it.
     * @param {string} imagePath The path of the image being added to this PdfHeader.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @param {string} [justificationH] The horizontal justification of the image being added to this PdfHeader. For acceptable values, see 'nc.constants.justfications'.
     * @param {string} [justificationV] The vertical justification of the image being added this PdfHeader. For acceptable values, see 'nc.constants.justfications'.
     * @returns {PdfImage}
     */
    addImage(imagePath, isPathRelative, justificationH, justificationV){return(null);}


    /**
     * Adds a new PdfTable to this PdfHeader and returns it.
     * @param {number} numRows The number of rows to add to this PdfTable. 
     * @param {number} numCols The number of columns to add to each PdfRow in this PdfTable.
     * @param {Array.<number> | number} columnWidths An array containing the desired widths for each column in this PdfTable.
     * @returns {PdfTable}
     */
    addTable(numRows, numCols, columnWidths){return(null);}


    /** Adds a new PdfTextFrame to this PdfSection and returns it.
     * @param {number} width The width of the PdfTextFrame being added.
     * @param {number} height The height of the PdfTextFrame being added.
     * @returns {PdfTextFrame}
     */
    addTextFrame(width, height){return(null);}
}


/**
* A PdfFooter is an object defining the footer element and associated formatting within a PdfSection.
* * Each section has exactly one PdfFooter.
* [NON-INSTANTIABLE] 
*/
class PdfFooter
{
    /**
    * A PdfFooter is an object defining the footer element and associated formatting within a PdfSection.
    * * Each section has exactly one PdfFooter.
    * [NON-INSTANTIABLE] 
    */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


    }
    /** Adds a new PdfParagraph to this PdfHeader and returns it. A PdfParagraph is simply a block of text.
    * @returns {PdfParagraph}
    */
    addParagraph(){return(null);}


    /**
    * Adds a new Image to this PdfFooter and returns it.
    * @param {string} imagePath The path of the image being added to this PdfFooter.
    * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
    * @param {string} [justificationH] The horizontal justification of the image being added to this PdfFooter. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
    * @param {string} [justificationV] The vertical justification of the image being added to this PdfFooter. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
    * @returns {PdfImage}
    */
    addImage(imagePath, isPathRelative, justificationH, justificationV){return(null);}


    /**
     * Adds a new PdfTable to this PdfFooter and returns it.
     * @param {number} numRows The number of rows to add to this PdfTable. 
     * @param {number} numCols The number of columns to add to each PdfRow in this PdfTable.
     * @param {Array.<number> | number} columnWidths An array containing the desired widths for each column in this PdfTable.
     * @returns {PdfTable}
     */
    addTable(numRows, numCols, columnWidths){return(null);}


    /** Adds a new PdfTextFrame to this PdfSection and returns it.
     * @param {number} width The width of the PdfTextFrame being added.
     * @param {number} height The height of the PdfTextFrame being added.
     * @returns {PdfTextFrame}
     */
    addTextFrame(width, height){return(null);}
}


/**
 * A PdfImage is an object defining an image element within a Pdf.
 * A PdfImage can reside within a PdfSection, PdfHeader, PdfFooter or PdfCell.
 */
class PdfImage
{
    /**
    * A PdfImage is an object defining an image element within a Pdf.
    * A PdfImage can reside within a PdfSection, PdfHeader, PdfFooter or PdfCell.
    * [NON-INSTANTIABLE] 
    */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /**
         * @type {boolean}
         * @default true
         */
        this.isPathLocal = null;


        /**
         * @type {string}
         * @default ""
         */
        this.imagePath = null;


        /** The horizontal justification of this PdfImage.
         * For acceptable values, see 'nc.constants.justfications'.
         * @type {string}
         * @default "center"
         */
        this.justificationH = null;


        /** The vertical justification of this PdfImage
         * For acceptable values, see 'nc.constants.justfications'.
         * @type {string}
         * @default "center"
         */
        this.justificationV = null;


        /** The horizontal scale of this PdfImage.
         * @type {number}
         * @default 1.0
         */
        this.scaleWidth = null;


        /** The vertical scale of this PdfImage.
         * @type {number}
         * @default 1.0
         */
        this.scaleHeight = null;
    }
    /** Sets the horizontal and vertical scales of this PdfImage.
     * @param {number} scaleValue The factor to scale the image by.
     */
    scaleImage(scaleValue){}
}


/**
 * A PdfTable is an object that represents a table element within a Pdf
 * A PdfTable can reside within a PdfSection, PdfHeader or PdfFooter.
 * [NON-INSTANTIABLE]
 */
class PdfTable
{
    /**
     * A PdfTable is an object that represents a table element within a Pdf
     * A PdfTable can reside within a PdfSection, PdfHeader or PdfFooter.
     * [NON-INSTANTIABLE]
     */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The total width of this PdfTable. This value is derived by adding up each column width in the table.
         * @type {number}
         * @readonly
         * @default 0
         */
        this.totalWidth = null;


        /** The thickness of the left border in this PdfTable.
         * @type {number}
         * @default 10
         */
        this.leftBorderThickness = null;


        /** The thickness of the right border in this PdfTable.
         * @type {number}
         * @default 10
         */
        this.rightBorderThickness = null;


        /** The thickness of the bottom border in this PdfTable.
         * @type {number}
         * @default 10
         */
        this.bottomBorderThickness = null;


        /** The thickness of the top border in this PdfTable.
         * @type {number}
         * @default 10
         */
        this.topBorderThickness = null;


        /** The thickness of the diagonalDown (top left to bottom right diagonal) in this PdfTable.
         * @type {number}
         * @default 0
         */
        this.diagonalDownThickness = null;


        /** The thickness of the diagonalUp (top right to bottom left diagonal) in this PdfTable.
         * @type {number}
         * @default 0
         */
        this.diagonalUpThickness = null;


        /** The color of the left border in this PdfTable.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.leftBorderColor = null;


        /** The color of the right border in this PdfTable.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.rightBorderColor = null;


        /** The color of the bottom border in this PdfTable.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.bottomBorderColor = null;


        /** The color of the top border in this PdfTable.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.topBorderColor = null;


        /** The color of the diagonalDown (top left to bottom right diagonal) in this PdfTable.
         * @type {Color}
         * @default Color(1,1,1,1)
         */
        this.diagonalDownColor = null;


        /** The thickness of the diagonalUp (top right to bottom left diagonal) in this PdfTable.
         * @type {Color}
         * @default Color(1,1,1,1)
         */
        this.diagonalUpColor = null;


        /** An array containing the PdfRows that reside in this PdfTable.
         * @type {PdfRow[]}
         * @default []
         */
        this.rows = null;


        /** The number of columns for each row in this PdfTable.
         * @readonly
         * @type {number}
         * @default 0
         */
        this.numColumns = null;
    }
    /** Sets the thickness and color for all borders in this PdfTable.
     * @param {number} [thickness] The thickness to set all borders to.
     * @param {Color} [color] The color to set all borders to.
     */
    setBorder(thickness, color){}


    /** Adds a PdfRow to this PdfTable.
     */
    addRow(){}


    /** Returns the PdfCell at the given row and column if it exists.
     * @param {number} row The row of the cell to get.
     * @param {number} column The column of the cell to get.
     * @returns {PdfCell & undefined}
     */
    getCell(row, column){return(null);}
}


/**
 * A PdfRow is an object that represents a row that resides within a PdfTable.
 * [NON-INSTANTIABLE]
 */
class PdfRow
{
    /**
     * A PdfRow is an object that represents a row that resides within a PdfTable.
     * [NON-INSTANTIABLE]
     */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The height of this PdfRow.
         * @type {number}
         * @default 50
         */
        this.height = null;


        /** Setting that determines how the height of a row is calculated in this table.
         * For acceptable values, see 'nc.constants.pdfHeightRuleTypes'.
         * @type {string}
         * @default "autoFit"
         */
        this.heightRule = null;


        /** Array of PdfCells that reside within this PdfRow.
         * @type {PdfCell[]}
         * @default []
         */
        this.cells = null;
    }
}


/**
 * A PdfCell is an object that resides within a PdfRow and can contain PdfParagraphs, PdfImages and PdfTables within it.
 * [NON-INSTANTIABLE]
 */
class PdfCell
{
    /**
 * A PdfCell is an object that resides within a PdfRow and can contain PdfParagraphs, PdfImages and PdfTables within it.
 * [NON-INSTANTIABLE]
 */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;      


        /** The background color of this PdfCell.
         * @type {Color}
         * @default Color(1,1,1,1)
         */
        this.backgroundColor=null;


        /** The verticialJustifcation of this PdfCell.
         * For acceptable values, see 'nc.constants.justfications'.
         * @type {string}
         * @default "center"
         */
        this.justificationV=null;


        /** The horizontalJustifcation of this PdfCell.
         * For acceptable values, see 'nc.constants.justfications'.
         * @type {string}
         * @default "center"
         */
        this.justificationH=null;


        /** The left indentation amount of this PdfCell.
         * @type {number}
         * @default 0
         */
        this.leftIndent=null;


        /** The right indentation amount of this PdfCell.
         * @type {number}
         * @default 0
         */
        this.rightIndent=null;


        /** The thickness of the left border in this PdfCell.
         * @type {number}
         * @default 1
         */
        this.leftBorderThickness = null;


        /** The thickness of the right border in this PdfCell.
         * @type {number}
         * @default 1
         */
        this.rightBorderThickness = null;


        /** The thickness of the bottom border in this PdfCell.
         * @type {number}
         * @default 1
         */
        this.bottomBorderThickness = null;


        /** The thickness of the top border in this PdfCell.
         * @type {number}
         * @default 1
         */
        this.topBorderThickness = null;


        /** The thickness of the diagonalDown (top left to bottom right diagonal) in this PdfCell.
         * @type {number}
         * @default 0
         */
        this.diagonalDownThickness = null;


        /** The thickness of the diagonalUp (top right to bottom left diagonal) in this PdfCell.
         * @type {number}
         * @default 0
         */
        this.diagonalUpThickness = null;


        /** The color of the left border in this PdfCell.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.leftBorderColor = null;


        /** The color of the right border in this PdfCell.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.rightBorderColor = null;


        /** The color of the bottom border in this PdfCell.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.bottomBorderColor = null;


        /** The color of the top border in this PdfCell.
         * @type {Color}
         * @default Color(0,0,0,1)
         */
        this.topBorderColor = null;


        /** The color of the diagonalDown (top left to bottom right diagonal) in this PdfCell.
         * @type {Color}
         * @default Color(1,1,1,1)
         */
        this.diagonalDownColor = null;


        /** The thickness of the diagonalUp (top right to bottom left diagonal) in this PdfCell.
         * @type {Color}
         * @default Color(1,1,1,1)
         */
        this.diagonalUpColor = null;


        /** The space size that will be added after this PdfCell.
         * @type {number}
         * @default 0
         */
        this.spaceAfter = null;


        /** The space size that will be added before this PdfCell.
         * @type {number}
         * @default 0
         */
        this.spaceBefore = null;
    }
    /** Sets the thickness and color for all borders in this PdfCell.
     * @param {number} [thickness] The thickness to set all borders to.
     * @param {Color} [color] The color to set all borders to.
     */
    setBorder(thickness, color){}


    /** Adds a new PdfParagraph to this PdfCell and returns it. A PdfParagraph is simply a block of text.
     * @returns {PdfParagraph}
     */
    addParagraph(){return(null);}


    /**
    * Adds a new Image to this PdfCell and returns it.
    * @param {string} imagePath The path of the image being added within this PdfCell.
    * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
    * @param {string} [justificationH] The horizontal justification of the image being added to this PdfCell. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
    * @returns {PdfImage}
    */
    addImage(imagePath, isPathRelative, justificationH){return(null);}


    /**
     * Adds a new PdfTable to this PdfCell and returns it.
     * @param {number} numRows The number of rows to add to this PdfTable. 
     * @param {number} numCols The number of columns to add to each PdfRow in this PdfTable.
     * @param {Array.<number> | number} columnWidths An array containing the desired widths for each column in this PdfTable.
     * @returns {PdfTable}
     */
    addTable(numRows, numCols, columnWidths){return(null);}


    /**
     * Merges this cell right by a specificed number of cells.
     * @param {number} numberOfCells The number of cells to merge.
     */
    mergeCellRight(numberOfCells) { }


    /** Adds a new PdfTextFrame to this PdfSection and returns it.
     * @param {number} width The width of the PdfTextFrame being added.
     * @param {number} height The height of the PdfTextFrame being added.
     * @returns {PdfTextFrame}
     */
    addTextFrame(width, height) { return (null); }
}


/**
 * A PdfTextFrame is an object that resides within a PdfSection, PdfHeader or PdfFooter and can contain PdfParagraphs, PdfImages and PdfTables within it.
 * [NON-INSTANTIABLE]
 */
class PdfTextFrame
{
    /**
     * A PdfTextFrame is an object that resides within a PdfSection, PdfHeader or PdfFooter and can contain PdfParagraphs, PdfImages and PdfTables within it.
     * [NON-INSTANTIABLE]
     */
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;
        
        
        /** The size of the left margin of the pages within this PdfTextFrame.
         * @type {number}
         * @default 0
         */
        this.leftMargin = null;


        /** The size of the right margin of the pages within this PdfTextFrame.
         * @type {number}
         * @default 0
         */
        this.rightMargin = null;


        /** The size of the top margin of the pages within this PdfTextFrame.
         * @type {number}
         * @default 0
         */
        this.topMargin = null;


        /** The size of the bottom margin of the pages within this PdfTextFrame.
         * @type {number}
         * @default 0
         */
        this.bottomMargin = null;


        /** The height of this PdfTextFrame.
         * @type {number}
         * @default 0
         */
        this.height = null;


        /** The width of this PdfTextFrame.
         * @type {number}
         * @default 0
         */
        this.width = null;
    }


    /** Adds a new PdfParagraph to this PdfTextFrame and returns it. A PdfParagraph is simply a block of text.
     * @returns {PdfParagraph}
     */
    addParagraph(){return(null);}


    /**
    * Adds a new Image to this PdfTextFrame and returns it.
    * @param {string} imagePath The path of the image being added within this PdfTextFrame.
    * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
    * @param {string} [justificationH] The horizontal justification of the image being added to this PdfTextFrame. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
    * @param {string} [justificationV] The vertical justification of the image being added to this PdfTextFrame. For acceptable values, see 'nc.constants.justfications'. [DEFAULT: "center"]
    * @returns {PdfImage}
    */
    addImage(imagePath, isPathRelative, justificationH, justificationV){return(null);}


    /**
     * Adds a new PdfTable to this PdfTextFrame and returns it.
     * @param {number} numRows The number of rows to add to this PdfTextFrame. 
     * @param {number} numCols The number of columns to add to each PdfRow in this PdfTextFrame.
     * @param {Array.<number> | number} columnWidths An array containing the desired widths for each column in this PdfTextFrame.
     * @returns {PdfTable}
     */
    addTable(numRows, numCols, columnWidths){return(null);}
}

/** A PivotPointAdjuster gives a GraphicObject a unique copy of its Geometry, which can then be modified using the PivotPointAdjuster's position, rotation, and scale members.
 * Note that changing the position, rotation, or scale at run time causes a costly rebuild of the Geometry data and is only recommended during initialization.
 * [NON-INSTANTIABLE]
 */
class PivotPointAdjuster
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The position offset to apply to every vertex in the Geometry.
         * Note that changing this at run time causes a costly rebuild of the Geometry data and is only recommended during initialization.
         * @type {Vector3}
         */
        this.position=null;


        /** The rotation to apply to every vertex in the Geometry.
         * Note that changing this at run time causes a costly rebuild of the Geometry data and is only recommended during initialization.
         * @type {Vector3}
         */
        this.rotation=null;


        /** The lazy updater responsible for updating the GraphicObject's Geometry.
         * @type {LazyUpdater}
         */
        this.lazyUpdater=null;
    }


    /** Removes and destroys the PivotPointAdjuster, restoring the original Geometry if possible.
     */
    dispose(){}
}/** A PixelsObject is an RGBA bitmap image in a simple, 'data-only' format, used for basic image access and manipulation.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - pixelsObjects]
 */
class PixelsObject
{
    constructor()
    {

        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The width of the PixelsObject. 
         * @type {number}
         * @readonly
         */
        this.width=null;

    
        /** The height of the PixelsObject. 
         * @type {number}
         * @readonly
         */
        this.height=null;
    }


    /** Writes the bitmap from this PixelsObject to a ".png" file at the given path.
     * @param {string} filePath The relative or absolute path to the file in question.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @param {boolean} [writeRawBase64] Bool stating if the file written will be in Base64 text format. [DEFAULT: false]
     * @async  
     * @returns {IncrCommsResponseObject}
     * [REQUIREMENT: license - fileIO]
     */
    async writePngFile(filePath,isPathRelative,writeRawBase64){return(null);}


    /** Returns a Vector4 containing the RGBA color of the pixel at the given coordinates. 
     * @param {number} x The horizontal index of the pixel to get the color of.
     * @param {number} y The vertical index of the pixel to get the color of. The vertical position of pixels in PixelObjects map from bottom to top.
     * @returns {Vector4} 
     */
    getPixel(x,y){return(null);}


    /** Sets the RGBA color Value of the pixel at the given coordinates
     * @param {number} x The horizontal index of the pixel to set the color of.
     * @param {number} y The vertical index of the pixel to get set color of. The vertical position of pixels in PixelObjects map from bottom to top.
     * @param {Vector4} color Vector with the RGBA color value for the desired pixel.
     */
    setPixel(x,y,color){}


    /** Performs a transformation on the bitmap data stored in this PixelsObject that approximates the reversal of "premultiplication" of images with transparency.
     * Depending on the source of the content within this PixelsObject, you may want to invoke 'unMultiply' before writing it to an image on disk. This is because
     * Incisor® primarily works with normal 'unmultiplied' source images and premultiplies images during runtime, so PixelsObjects created from composites of those 
     * premultiplied images will likely need to be unmultiplied prior to being written to disk to ensure that the resulting image is saved in the original 
     * 'unmultiplied' color space.
     */
    unMultiply(){}
}


/** Object housing functionality for PixelsObjects, which are RGBA bitmap images in a simple, 'data-only' format, used for basic image access and manipulation.
 * [REQUIREMENT: module - pixelsObjects]
 */
class PixelsObjects
{
    /** Returns a uniformly colored PixelsObject of the width, height, and color provided.
     * @param {number} width The width of the desired PixelsObject.
     * @param {number} height The height of the desired PixelsObject.
     * @param {Vector4} color Vector with the RGBA color values for the new PixelsObject.
     * @returns {PixelsObject}
     */
    getNewBlankPixelsObject(width,height,color){return(null);}


    /** Returns a PixelsObject generated from the given RenderTarget or Texture.
     * It should be noted that the texture will need to be loaded before invoking this function - see nc.addTierLoadedCallback and nc.awaitLoadedTiers for more information.
     * @param {RenderTarget|Texture} source The RenderTarget or Texture to generate the PixelsObject from. It should be noted that Textures that were originally created from PixelsObjects cannot be used to create a PixelsObject.
     * @returns {PixelsObject}
     */
    getPixelsObject(source){return(null);}
}


/** A time-based PlaybackController with "startTime", "time", and "endTime" properties.
 *@extends PlaybackController
 */
class TimePlaybackController extends PlaybackController
{
    /** Object managing the playing, pausing, and stopping of timed items such as Timelines, Sounds, or ParticleSystems.
     * @param {string} [name] The name of the PlaybackController. [DEFAULT: "TimePlaybackController"]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this PlaybackController will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this PlaybackController is affected by. [DEFAULT: nc.defaultSpeedControl]
     */
    constructor(name,pauseImmunity,speedControl)
    {
        /** The current time (in seconds) of the PlaybackController. While playing, this value is automatically updated every fixedUpdate, or it can also be set manually at any time.
         * @type {number}
         */
        this.time = null;


        /** The starting time of the PlaybackController.
         * @type {number}
         */
        this.startTime = null;


        /** The end time of the PlaybackController.
         * @type {number}
         */
        this.endTime = null;


       /** The initial time for this TimePlaybackController when it is included in a newly instantiated Construct.
         * This property will be set to the TimePlaybackController's 'startTime' as a default.
         * @type {number}
         */
        this.initialTime=null;
    }
}


/** A value-based PlaybackController with "startValue", "value", and "endValue" properties.
 * @extends PlaybackController
 */
class ValuePlaybackController extends PlaybackController
{
    /** Object managing the playing, pausing, and stopping of timed items such as SpriteSetters.
     * @param {string} [name] The name of the PlaybackController. [DEFAULT: "ValuePlaybackController"]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this PlaybackController will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this PlaybackController is affected by. [DEFAULT: nc.defaultSpeedControl]
     */
    constructor(name,pauseImmunity,speedControl)
    {
        /** The current value (in seconds) of the PlaybackController. While playing, this value is automatically updated every fixedUpdate, or it can also be set manually at any time.
         * @type {number}
         */
        this.value = null;


        /** The starting value of the PlaybackController.
         * @type {number}
         */
        this.startValue = null;


        /** The end value of the PlaybackController.
         * @type {number}
         */
        this.endValue = null;



       /** The initial value for this ValuePlaybackController when it is included in a newly instantiated Construct.
         * This property will be set to the ValuePlaybackController's 'startValue' as a default.
         * @type {number}
         */
        this.initialValue=null;
    }
}


/** Object managing the playing, pausing, and stopping of items that change over time such as Timelines, Sounds, or ParticleSystems.
 * [NON-INSTANTIABLE]
 */
class PlaybackController
{
    constructor(name,pauseImmunity,speedControl)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** Boolean flag determining if the PlaybackController will hault the next time the time reachs the endTime (or startTime if playback is a negative value). If this flag is false, the PlaybackController loops and continues playing indefinitely.
         * @default false
         * @type {boolean}
         */
        this.lazyStop = null;


        /** The read-only length of this PlaybackController in seconds. To change the duration, adjust the 'startTime' or 'endTime' properties.
         * @readonly
         * @type {number}
         */
        this.duration = null;


        /** Read-only string denoting the current playback state: 'stopped', 'paused', or 'playing'. State values are available in 'nc.constants.playbackStates'.
         * @default nc.constants.playbackStates.stopped
         * @readonly
         * @type {string}
         */
        this.playbackState = null;


        /** Value multiplying the progression of the 'time' value. To play twice as fast use 2, for items that can play backwards, use negative values.
         * @default 1
         * @type {number}
         */
        this.playbackRate = null;


        /** Read-only value denoting the net playbackRate, including the effects of this PlaybackController's SpeedControls.
         * @type {number}
         * @readonly
         */
        this.netPlaybackRate = null;


        /** The PauseEvent or Array of PauseEvents that this PlaybackController will be immune to. 
         * Set this parameter to [] for this PlaybackController to have no pause immunity.
         * @default nc.defaultPauseImmunity
         * @type {PauseEvent & Array.<PauseEvent>}
         */
        this.pauseImmunity = null;


        /** The SpeedControl or Array of SpeedControls that this PlaybackController is affected by.
         * @default nc.defaultSpeedControl
         * @type {SpeedControl & Array.<SpeedControl>}
         */
        this.speedControl = null;
    

        /** Boolean determining if the PlaybackController automatically starts playing when included in a newly instantiated Construct.
         * @type {boolean}
         * @default true
         */
        this.autoplayWhenInConstruct=null;
    }


    /** Changes the playbackState to "playing", and begins the progression of the 'time' value.
     * While playing, the PlaybackController automatically updates the 'time' value once every fixedUpdate.
    */
    play(){}


    /** Starts playing with 'time=startTime' (or if playbackRate is negative, 'time=endTime') and sets the 'lazyStop' value to true.
     * An optional callback function can be provided for when playbackController stops - this callback is consumed upon stopping.
     * @param {object} [lazyStopCallbackOwner] The object owning the optional callback function that is triggered when a lazy stop occurs.
     * @param {string} [lazyStopCallbackName] The name of the optional callback function that is triggered when a lazy stop occurs.
     * @param {Array|any} [lazyStopCallbackArgs] Parameters for the optional callback function that is triggered when a lazy stop occurs.
     */
    playOnce(lazyStopCallbackOwner,lazyStopCallbackName,lazyStopCallbackArgs){}


    /** Changes the playbackState to "paused", and pauses the progression of the 'time' value.
    */
    pause(){}


    /** Changes the playbackState to "stopped" and sets the 'time' value to 'startTime'.
    */
    stop(){}


    /** Adds a callback that occurs any time the 'time' property is updated, which happens while this PlaybackController
     * is playing, but also when time is set directly. The time value will be sent to this callback as its
     * first parameter, with any user-defined args following.
     * @param {object} callbackOwner The object owning the callback function that is triggered when time is updated.
     * @param {string} callbackName The name of the callback function that is triggered when time is updated.
     * @param {Array|any} [callbackArgs] Args for the callback function that is triggered when time is updated.
     */
    addTimeUpdateCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given timeUpdate callback.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed.
     */
    removeTimeUpdateCallback(callbackOwner,callbackName){}


    /** Adds a callback that occurs upon the next 'lazyStop', which occurs any time the time reaches the startTime or endTime while
     * the 'lazyStop' flag is true. It should be noted that all lazyStop callbacks are consumed upon encountering a lazyStop, and would 
     * need to be-added to be triggered upon subsequent lazyStops.
     * @param {object} callbackOwner The object owning the optional callback function that is triggered when a lazy stop occurs.
     * @param {string} callbackName The name of the optional callback function that is triggered when a lazy stop occurs.
     * @param {Array|any} [callbackArgs] Parameters for the optional callback function that is triggered when a lazy stop occurs.
     */
    addLazyStopCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given lazyStop callback.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed.
     */
    removeLazyStopCallback(callbackOwner,callbackName){}


    /** Adds a callback that occurs if/when any component of this PlaybackController has changed.
     * This can be used to manage processes that run entirely outside of the Incisor® system by providing a callback to update said processes upon any change.
     * A string denoting the triggering change will be passed in as the callback function's first parameter, and user-defined parameters will follow.
     * @param {object} callbackOwner The object owning the optional callback function that is triggered when any component of this PlaybackController has changed.
     * @param {string} callbackName The name of the optional callback function that is triggered when any component of this PlaybackController has changed.
     * @param {Array|any} [callbackArgs] Parameters for the optional callback function that is triggered when any component of this PlaybackController has changed.
     */
    addStateChangeCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given stateChange callback.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed.
     */
    removeStateChangeCallback(callbackOwner,callbackName){}


    /** Removes internal Incisor® references to this PlaybackController in order to aid memory management.
     */
    dispose(){}    
}


/** A Precomp (short for 'precomposition'), is an object with its own Scene, Camera, RenderTarget, and GraphicAsset.
 * When the Precomp's Camera renders, it informs the associated GraphicAsset, which can be instantiated by making
 * new GraphicObject. Precomps can be used for optimization in many ways, including precomposing several ScenenObjects
 * together, rendering the Scene, and using the resulting GraphicAsset to recreate the collection in a single GraphicObject.
 */
class Precomp
{
    /** A Precomp (short for 'precomposition'), is an object with its own Scene, Camera, RenderTarget, and GraphicAsset.
    * When the Precomp's Camera renders, it informs the associated GraphicAsset, which can be instantiated by making
    * new GraphicObject. Precomps can be used for optimization in many ways, including precomposing several ScenenObjects
    * together, rendering the Scene, and using the resulting GraphicAsset to recreate the collection in a single GraphicObject.
    * @param {string} name The name of the new Precomp. This name must be unique among Precomps, GraphicAssets, Geometries, and Textures.
    * @param {number} coreWidth The number informing the initial coreViewWidth of the Precomp's Camera, and the initial coreWidth of the Precomp's RenderTarget.
    * @param {number} coreHeight The number informing the initial coreViewHeight of the Precomp's Camera, and the initial coreHeight of the Precomp's RenderTarget. 
    * @param {boolean} autoRender The initial 'autoRender' setting for the Precomp's Camera. It should be noted that if autoRender is set to false, an internal callback will automatically render this Precomp once when its content is loaded.
    * @example
    * // Objective: Use a Precomp ("precomposition")
    * // Expected Result: You will see 2 red boxes, both containing the word "Hello". The word "Hello" will be zooming in and out.
    * 
    * // Create a Precomp setting the initial width of its camera to 200 x 200.
    * let precomp = new Precomp( "MyPrecomp", 200, 200, true );
    * precomp.camera.backgroundColor = new Color( .5, .1, .1, 1 ); // adjust the color to red
    * 
    * // Create a TextAssembly and add it to the Scene provided by the Precomp.
    * let textAssembly = new TextAssembly( precomp.scene, "TextAssembly" ); 
    * textAssembly.string = "Hello";
    * // Add motion to the TextAssembly in order to expand and shrink the text over a speed interval.
    * textAssembly.scale.addMotion.all( .25, 20, .2 );
    * 
    * // Create 2 GraphicObjects, each using the GraphicAsset from "MyPrecomp".
    * let graphicObject1 = new GraphicObject( nc.graphicAssets.MyPrecomp, nc.mainScene, "SceneViewerGraphicObject1" );
    * graphicObject1.position.x = -150;
    * let graphicObject2 = new GraphicObject( precomp.graphicAsset, nc.mainScene, "SceneViewerGraphicObject2" );
    * graphicObject2.position.x = 150;
    */
    constructor(name,coreWidth,coreHeight,autoRender)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the Precomp. This name will also be used for the GraphicAsset, Texture, and Geometry that are created as part of this Precomp.
         * @type {string}
         */
        this.name=null;


        /** The Scene holding the this Precomp's content. This is the Scene that is rendered to inform the associated GraphicAsset.
         * @type {Scene}
         */
        this.scene=null;


        /** The OrthographicCamera that resides in, and renders, this Precomp's Scene.
         * @type {OrthographicCamera}
         */
        this.camera=null;

    
        /** The RenderTarget that this Precomp's Camera renders to.
         * @type {RenderTarget}
         */
        this.renderTarget=null;


        /** The GraphicAsset using this Precomp's RenderTarget (using its Texture)
         * @type {GraphicAsset}
         */
        this.graphicAsset=null;


        /** Boolean determining if this Precomp attempts to manage its own delayed rendering.
         * With this value set to true and 'autorender=true', this Precomp will change the 'autoRenderOrder' of its own Camera to account for any Precomp nesting that migth occur.
         * With this value set to true and 'autorender=false', this Precomp will set up an internal callback to render its Scene content once it all loads.
         * If this value is set to false, no delayed rendering management actions occur unless manually triggered.
         * The Precomp can be rendered at any time by calling 'Precomp.camera.render'.
         * @default true
         * @type {boolean}
         */
        this.automaticallyManageLoadingTierDelayedContentRendering=null;
    }


    /** An awaitable method that writes the rendered content from this Precomp's RenderTarget to disk as a '.png' file once it has all loaded.
     * A callback function can be provided to manipulate the contents of this Precomp once it has loaded before it is rendered and write to file.
     * [REQUIREMENT: unpublished only]
     * [REQUIREMENT: license - fileIO]
     * @param {string} filePath The relative or absolute path to the png file to be written to disk.
     * @param {boolean} [isPathRelative] Bool stating if the given path is relative to the project path or an absolute path. If an absolute path is used that is outside of the project directory, the 'allowUniversalFileIO' item in application settings must be set to true. [DEFAULT: true]
     * @param {object} [postLoadCallbackOwner] The owner of the optional callback function that is called once the Precomp Scene's content is loaded before it is rendered. 
     * @param {string} [postLoadCallbackName] The name of the optional callback function that is called once the Precomp Scene's content is loaded before it is rendered. 
     * @param {Array|any} [postLoadCallbackArgs] Parameters for the optional callback function that is called once the Precomp Scene's content is loaded before it is rendered. 
     * @param {boolean} [unMultiply] Boolean determining if the contents of the RenderTarget are 'un-multiplied' before the '.png' is written. Since textures loaded in Incisor® use premultiplied alpha, un-multiplication would need to happen to get a file with transparency that was equivalent to the original asset files. [DEFAULT: true]
     * @param {boolean} [writeRawBase64] Boolean  Bool stating if the file written will be in Base64 text format. [DEFAULT: false]
     * @async  
     */
    async writePngFile(filePath,isPathRelative,postLoadCallbackOwner,postLoadCallbackName,postLoadCallbackArgs,unMultiply,writeRawBase64){}
}







/** Object housing the configuration settings for this project. Accessible via 'nc.projectConfiguration'.
 * Many of the members of this object are customizable on a 'per configuration' basis by editing the ProjectSettings.
 * The user-customizable 'PreloadConfiguration' code is executed within this object, so members created within that code will be accessible on this object.
 * [NON-INSTANTIABLE]
 */
class ProjectConfiguration
{
    constructor()
    {
        /** The specific 'version number' designation of the version of Incisor® that generated this project code.
         * @type {string}
         * @readonly
         */ 
        this.incisorVersion = null;


        /** The 'version set' designation of the version of Incisor® that generated this project code.
         * @type {string}
         * @readonly
         */ 
        this.incisorVersionSet = null;


        /** The name of the current Incisor® project as determined in the 'ProjectSettings'.
         * @type {string}
         * @readonly
         */ 
        this.projectName = null;


        /** The date when the current project was published using the format "YYYY.MM.DD.hh.mm.ss". For unpublished projects, this value will be 'devMode'.
         * @type {string}
         * @readonly
         */ 
        this.publishTimestamp = null;


        /** The core canvas pixel width. This represents the pixel width of the canvas RenderTarget at it's native scale. 
         * Runtime changes to this value must be made in PreloadConfiguration code, which is located in the 'ProjectCode/PreloadConfiguration' local directory.
         * @default 1920
         * @type {number}
         */ 
        this.coreCanvasResolutionX = null;


        /** The core canvas pixel height. This represents the pixel height of the canvas RenderTarget at it's native scale. 
         * Runtime changes to this value must be made in PreloadConfiguration code, which is located in the 'ProjectCode/PreloadConfiguration' local directory.
         * @default 1080
         * @type {number}
         */ 
        this.coreCanvasResolutionY = null;


        /** Boolean determining if any portion of the canvas will be transparent, enabling the html page to be partially viewed "through" the canvas.
         * @default false
         * @type {boolean}
         */ 
        this.canvasTransparency = null;


        /** String value denoting the default camera type used for the 'mainCamera' in the 'mainScene'.
         * Runtime changes to this value must be made in PreloadConfiguration code, which is located in the 'ProjectCode/PreloadConfiguration' local directory.
         * Possible values for this property are 'orthographic' or 'perspective'.
         * @default 'orthographic'
         * @type {string}
         */ 
        this.mainCameraType = null;


        /** String value denoting the masking mode for this project.
         * The masking mode determines how different MaskGroups interact with eachother.
         * Possible values for this property are 'overlapping' or 'disjoint'.
         * When the maskingMode is 'overlapping', up to 8 MaskGroups can be defined and GraphicObjects can subscribe to any combination of those MaskGroups.
         * When the maskingMode is 'disjoint', up to 255 MaskGroups can be defined, but GraphicObjects can only subscribe to one mask at a time.
         * @default 'overlapping'
         * @type {string}
         */ 
        this.maskingMode = null;


        /** Boolean value determining if the drawing buffer is preserved for reading.
         * Preserving the drawing buffer enables several useful development features, 
         * but may cause performance issues in published software on some devices.
         * It is therefore recommended that this flag be set to true for when the project
         * is unpublished, and false for when the project is published. This can be done
         * using a 'CODE.includeIf___published' within the 'preloadConfiguration' method 
         * in the PreloadConfiguration code.
         * @default true
         * @type {boolean}
         */ 
        this.preserveDrawingBuffer = null;


        /** DOM object that the canvas will be made a child of.
         * For many projects the best value for this item is the default. 
         * Changes to this value must be made in PreloadConfiguration code, which is located in the 'ProjectCode/PreloadConfiguration' local directory.
         * @default document.body
         * @type {object}
         */ 
        this.canvasParent = null;


        /** Ready-only bool indicating if the project that is currently running is published.
         * @type {boolean}
         * @readonly
         */ 
        this.isProjectPublished = null;


        /** URL parameters.
         * URL parameters included in the url used to access this project are automatically parsed and provided in this object.
         * @type {object}
         */ 
        this.urlParams = null;


        /** List of Nodes added to the presets for all GraphicAssets. This item is determined by the associated field in the ProjectSettings.
         * @type {Array.<string>} 
         */
        this.defaultGraphicAssetEffectNodes = null;


        /** Object housing the details of the current asset configuration.
         * Runtime changes to this value must be made in PreloadConfiguration code, which is located in the 'ProjectCode/PreloadConfiguration' local directory.
         * When setting these values, ensure the chosen values exist within the 'assetConfigurationDefinitions' in the 'ProjectSettings.json' file, and the
         * overall assetConfiguration must in the list of 'supportedAssetConfigurations' listed within the current configuration within the 'ProjectSettings.json' file.
         * @type {AssetConfiguration}
         */
        this.assetConfiguration = new AssetConfiguration();


        /** Object housing information about the loading tiers in this project.
         * Loading tiers are a means to organize AssetComponents into separately downloadable groups.
         */
        this.loadingTierDefinitions = {
            /** Information about the 100 loading tier.
* @type {LoadingTierDefinition}
*/
"100":null

        };


        /** Object housing information about the fonts in this project.
         */
        this.fontDefinitions = {
            /** Information about the NullFont font.
* @type {FontDefinition}
*/
"NullFont":null,
/** Information about the SampleFont font.
* @type {FontDefinition}
*/
"SampleFont":null

        };
    }

    
    /** Refreshes the project within the browser, applying current/updated values of 'ProjectConfiguration.urlParams'.
     * For example, a project could have functionality to allow the end-user to change a custom configuration (e.i. themeColor) of the project
     * from within the published project runtime, and this could be done by calling "nc.projectConfiguration.urlParams.themeColor = 'purple';",
     * and then calling "nc.projectConfiguration.refreshWithUpdatedParams();". The browser would then refresh, the url would include
     * the suffix "?themeColor=purple", and the nc.projectConfiguration.urlParams would be updated from the very beginning of the project
     * runtime, allowing the configuration to inform the loading and setup process.
     */
    refreshWithUpdatedParams(){}


    /** An function that can override Incisor's built-in placement of the canvasElement, which as a default behaviour simply
     * stretches the canvas over the entire browser window. This function is initially undefined, and can be defined to create custom
     * canvas layout behaviours. This function is automatically called if the browser window is resized but it can also be called directly 
     * (if defined) in the event that the canvas needs to be moved for reasons not stemming from something other than a browser resize event.
     * @param {HTMLCanvasElement} canvasElement The main canvas element for this project (accessable via 'nc.canvasElement').
     * @param {number} left The input position of the left side of the canvas within the page window.
     * @param {number} top The input position of the top side of the canvas within the page window.
     * @param {number} width The input width of the canvas within the page window.
     * @param {number} height The inpu height of the canvas within the page window.
     */
    canvasPositionOverride(canvasElement,left,top,width,height){}
}


/** Dictionary of asset configurations.
 * [NON-INSTANTIABLE]
 */
class AssetConfiguration 
{
    constructor()
    {
        /** Asset configuration for 'assetPackageScale'.
 * Available options for this asset configuration can be found in the 'assetConfigurationDefinitions' item in the 'ProjectSettings'.
 * This asset configuration is a built-in configuration.
 * This is the current value for the 'assetPackageScale' configuration. This configuration changes the base resolution for all image assets loaded within the project.'
 * Image assets can opt out of adherence to 'assetPackageScale' by changing the 'applyAssetPackageScaling' in the asset settings to false.
 * @type {string}
 */
this["assetPackageScale"]="";
/** Asset configuration for 'soundQuality'.
 * Available options for this asset configuration can be found in the 'assetConfigurationDefinitions' item in the 'ProjectSettings'.
 * This asset configuration is a built-in configuration.
 * This is the current value for the 'soundQuality' configuration. This configuration changes the compression bitrate and the number of channels for all sound assets loaded within the project.'
 * @type {string}
 */
this["soundQuality"]="";
/** Asset configuration for 'language'.
 * Available options for this asset configuration can be found in the 'assetConfigurationDefinitions' item in the 'ProjectSettings'.
 * This asset configuration is a built-in configuration.
 * This is the current value for the 'language' configuration. The language configuration determines which phrases are referenced in the 'ProjectTranscript.json.'
 * This configuration can also be used to determine which language-specific assets to load based on flags within the given asset settings.
 * @type {string}
 */
this["language"]="";

    }
}


/** Object housing functionality for publishing projects. 
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: unpublished only]
 * [REQUIREMENT: license - publishing]
 */
class Publishing
{
    /** Compiles the user code from the current project together with the Incisor® code to produce a complete, optimized, and ready-to-host web package. 
     * Publishing configuration options such as asset packaging settings, code formatting settings, and more are defined in ProjectSettings.
     * By default, newly published projects will be placed in the 'Publishing' directory in the project.
     * @param {string} [configurationName] The name of the configuration to be used in publishing this project. 
     * @param {boolean} [hostPublishedProject] Flag determining if the published project should be automatically hosted. [Default: false]
     * @returns {IncrCommsResponseObject}
     */
    publishProject(configurationName,hostPublishedProject){return(null);}
}


/** RenderTargets are objects that contain Textures to render to, as well as settings 
 * for how those textures may be resized automatically based on environmental factors 
 * such as canvas size, canvas aspect ratio, and the current asset package scale.
 */
class RenderTarget
{
    /** RenderTargets are objects that contain Textures to render to, as well as settings 
     * for how those textures may be resized automatically based on environmental factors 
     * such as canvas size, canvas aspect ratio, and the current asset package scale.
     * @param {string} name The name given to the RenderTarget. This name must be unique.
     * @param {number} coreWidth The base width value of this RenderTarget, prior to the application of any automatic resolution or aspect ratio adjustments that can occur.
     * @param {number} coreHeight The base height value of this RenderTarget, prior to the application of any automatic resolution or aspect ratio adjustments that can occur.
     */
    constructor(name, coreWidth, coreHeight)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /**
         * The name of the RenderTarget. This name must be unique.
         * @type {string}
         */
        this.name = null;


        /** The base width value of this RenderTarget. To get the final horizontal render resolution of this RenderTarget's Texture,
         * start with this value, then apply all of the enabled automatic adjustments (such as canvasAspectMatching and 
         * assetPackageScaleResolutionScaling).
         * @default 500
         * @type {number}
         */
        this.coreWidth = null;
    

        /** The base height value of this RenderTarget. To get the final vertical render resolution of this RenderTarget's Texture,
         * start with this value, then apply all of the enabled automatic adjustments (such as canvasAspectMatching and 
         * assetPackageScaleResolutionScaling).
         * @default 500
         * @type {number}
         */
        this.coreHeight = null;

         
        /** Flag determining whether or not this RenderTarget automatically matches the aspect ratio of the canvas.
         * @default false
         * @type {boolean}
         */
        this.canvasAspectMatching = null;

    
        /** Flag determining whether or not this RenderTarget automatically scales its resolution based on the size of the canvas.
         * @default false
         * @type {boolean}
         */
        this.canvasSizeResolutionScaling = null;


        /** Flag determining whether or not the canvasSizeResolutionScaling factor for this RenderTarget is capped to 1.
         * This only applies if canvasSizeResolutionScaling is true.
         * @default false
         * @type {boolean}
         */
        this.capCanvasSizeResolutionScaling = null;


        /** Flag determining whether or not this RenderTarget automatically scales its resolution based on the current assetPackageScale.
         * The current assetPackageScale can be found at nc.projectConfiguration.assetConfiguration.assetPackageScale.
         * @default false
         * @type {boolean}
         */
        this.assetPackageScaleResolutionScaling = null;


        /** Additional factor that multiplies this RenderTarget's resolution scale.
         * @default 1
         * @type {number}
         */
        this.auxiliaryResolutionScaleFactor = null;


        /** Flag determining whether or not this RenderTarget automatically scales its resolution based on 
         * the current nc.globalRenderTargetResolutionScaler value.
         * @default true
         * @type {boolean}
         */
        this.globalRenderTargetResolutionScaling = null;


        /** The LazyUpdater in charge of updating the size of this RenderTarget's Texture. The 'updateIfNeeded' call for
         * this LazyUpdater is called whenever this RenderTarget is rendered to, but you can call it directly if you need 
         * to ensure that changes to the RenderTarget size are applied immediately for any reason.
         * @type {LazyUpdater} 
         */
        this.resizeLazyUpdater = null;


        /** The Texture associated with this RenderTarget.
         * @type {Texture}
         */
        this.texture = null;

        
        /** Aan object containing a complete record of all of the factors that contribute to the final render resolution of this RenderTarget.
         * [REQUIREMENT: unpublished only]
         * @readonly
         * @type {object}
         */
        this.renderResolutionLedger = null;
    }


    /**
     * Returns a vector containing the current render resolution for this RenderTarget.
     */
    getCurrentRenderResolution(){}
}




/** 
 * SceneObjects are the fundamental objects that populate a given project's world/hierarchy. Every object in a Scene's hierarchy inherits from SceneObject.
 */
class SceneObject
{
     /** SceneObjects are the fundamental objects that populate a given project's world/hierarchy. Every object in a Scene's hierarchy inherits from SceneObject.
     * @param {SceneObject} [parent] The SceneObject that will become the new SceneObject's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new SceneObject. [DEFAULT: 'SceneObject']
     * @example 
     * 
     * // Objective: Create a SceneObject with a graphic and rotate it.
     * // Expected Result: The white box has rotated 45 degrees into a diamond shape.
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * // Add a GraphicObject to the SceneObject using the GraphicObject constructor.
     * // Note: To use a custom graphic, add your image file to the assets directory and access it using nc.graphicAssets['MyImage']
     * new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "MyGraphicObject" );
     * // Rotate the SceneObject 45 degrees around the z axis.
     * mySceneObject.rotation.z = 45;
     */
    constructor(parent,name)
    {
        /** Type identifier.
         * @type {string}
         * @example
         * // Objective: Determine the type of a SceneObject
         * // Expected Result: The console should have 3 log messages as follows:
         * //   MySceneObject is of type SceneObject
         * //   MyGraphicObject is of type GraphicObject
         * //   MyButton is of type Button
         * 
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * // Create a GraphicObject using the GraphicObject constructor adding it to "mySceneObject".
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "MyGraphicObject" );
         * // Create a Button using the Button constructor and adding it to myGraphicObject.
         * let myButton = new Button( nc.graphicAssets.WhiteTriangle, myGraphicObject, "MyButton" );
         * 
         * console.log(mySceneObject.name + ' is of type ' + mySceneObject.type);
         * console.log(myGraphicObject.name + ' is of type ' + myGraphicObject.type);
         * console.log(myButton.name + ' is of type ' + myButton.type);
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {any}
         * @example
         * // Objective: Determine the inherited types of a Button.
         * // Expected Result: The console log should read "inherited types {"SceneObject":true,"GraphicObject":true,"Button":true}".
         *
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * // Add a Button named "MyButton" to the SceneObject.
         * let myButton = new Button( nc.graphicAssets.WhiteBox, mySceneObject, "MyButton" );
         * console.log("inherited types", JSON.stringify( myButton.inheritedTypes ) );
         * 
         */
        this.inheritedTypes=null;


        /** The name of the SceneObject.
         * @type {string}
         * @default 'SceneObject'
         * @example
         * // Objective: Set and Get the name of a SceneObject.
         * // Expected Result: The console should have 2 log messages as follows:
         * //    original name is MySceneObject
         * //    new name is MyDifferentSceneObject
         *  
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * console.log("original name is", mySceneObject.name );
         * // Update the name of the SceneObject.
         * mySceneObject.name = "MyDifferentSceneObject";
         * console.log("new name is", mySceneObject.name );
         */
        this.name=null;


        /** Boolean determining if this SceneObject is enabled.
         * Enabled SceneObjects are shown normally within the Scene while disabled SceneObjects are not shown.
         * If a SceneObject is disabled, all of its children inherit its disabled state, but if it is enabled
         * all of its childrens' states depend on their own 'enabled' properties.
         * @type {boolean}
         * @default true
         * @example
         * // Objective: Disable a SceneObject to disable its children.
         * // Expected Result: You do not see the white box.
         * 
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * // Add a GraphicObject to the SceneObject using the GraphicObject constructor.
         * new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "WhiteBox" );
         * // Set mySceneObject to enabled = false.
         * mySceneObject.enabled = false;
         */
        this.enabled=null;


       /** The the array of this SceneObject's children SceneObjects in the hierarchy.
         * @type {Array.<SceneObject>}
         * @example
         * // Objective: Add children to a SceneObject.
         * // Expected Result: The console log should read "children count 2".
         * 
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * // Add 2 GraphicObjects to the SceneObject using the GraphicObject constructor.
         * new GraphicObject( nc.graphicAssets.WhiteBox, this.mySceneObject, "WhiteBox" );
         * new GraphicObject( nc.graphicAssets.WhiteTriangle, this.mySceneObject, "WhiteTriangle" );
         * console.log("children count", mySceneObject.children.length); 
         */
        this.children=null;


        /** The SceneObject that is this SceneObject's parent in the hierarcy.
         * If this SceneObject is of type 'Scene', this value is left undefined.
         * Set this property to change the parent of this SceneObject, or use 'SceneObject.setParent' to do the same thing but with the 'maintainGlobalPostion' optional parameter.
         * @type {SceneObject}
         * @example
         * // Objective: Get the parent of a scene object.
         * // Expected Result: The console log should read "parent name is MySceneObject".
         * 
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * // Add a GraphicObject to the SceneObject using the GraphicObject constructor.
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.WhiteBox, this.mySceneObject, "WhiteBox" );
         * // Console log the parent name of this GraphicObject.
         * console.log("parent name is", myGraphicObject.parent.name);
         */
        this.parent=null;


        /** The Scene in which this SceneObject resides.
         * @readonly
         * @type {Scene}
         * @example
         * // Objective: Determine the containing scene of a SceneObject.
         * // Expected Result: The console should have 2 log messages as follows:
         * //    The containing scene for 'MyMainSceneObject' is MainScene
         * //    The containing scene for 'MyOtherSceneObject' is MyScene
         * 
         * // Create a SceneObject using the SceneObject constructor. This will add "MyMainSceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MyMainSceneObject" );
         * console.log("The containing scene for 'MyMainSceneObject' is", mySceneObject.containingScene.name);
         * 
         * // Create a new Scene and name it "MyScene".
         * let myScene = new Scene("MyScene");
         * // Create a SceneObject using the SceneObject constructor. This will add "MyOtherSceneObject" to myScene ("MyScene").
         * let myOtherSceneObject = new SceneObject( myScene, "MyOtherSceneObject" );
         * console.log("The containing scene for 'MyOtherSceneObject' is", myOtherSceneObject.containingScene.name);
         */
        this.containingScene=null;


        /** The position of this SceneObject relative to it's parent.
         * @type {Vector3}
         * @default new Vector3(0,0,0)
         * @example
         * // Objective: Move the position of the "WhiteTriangle" relative to the "WhiteBox".
         * // Expected Result: The "WhiteTriangle" is 300 world units above and 300 world units to the right of the "WhiteBox".
         * 
         * // Note: To use a custom graphic, add your image file to the assets directory and access it using nc.graphicAssets['MyImage']
         * 
         * // Add a GraphicObject to the main scene using the GraphicObject constructor.
         * new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteBox" );
         * // Add another GraphicObject to the main scene using the GraphicObject constructor, this time using the WhiteTriangle GraphicAsset.
         * let whiteTriangleGraphicObject =  new GraphicObject( nc.graphicAssets.WhiteTriangle, nc.mainScene, "WhiteTriangle" );
         * // Update the position of the "WhiteTriangle", moving it 300 world units above and 300 world units to the right of the "WhiteBox".
         * whiteTriangleGraphicObject.position.x = 300;
         * whiteTriangleGraphicObject.position.y = 300;
         */
        this.position=null;


        /** The scale of this SceneObject relative to it's parent.
         * @type {Vector3}
         * @default new Vector3(1,1,1)
         * @example
         * // Objective: Using the scale property, increase the size of a GraphicObject.
         * // Expected Result: You will see a blue box in the center of the screen and a larger red box, now in the shape of a rectangle, to the right of it.
         * 
         * // Note: To use a custom graphic, add your image file to the assets directory and access it using nc.graphicAssets['MyImage']
         * 
         * // Add a GraphicObject to the main scene using the GraphicObject constructor. 
         * let blueBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "BlueBox" );
         * // Use fillColor to make it blue.
         * blueBox.fillColor = new Color( 0, 0, 1, 1 ); // blue
         * 
         * // Add another GraphicObject to the main scene using the GraphicObject constructor.
         * let redBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "RedBox" );
         * // Use fillColor to make it red.
         * redBox.fillColor = new Color( 1, 0, 0, 1 ); // red
         * // Use position to move the red box to the right 500 world units.
         * redBox.position.x = 500;
         * // Use scale to make the red box a larger rectangle 
         * redBox.scale.x = 2;
         * redBox.scale.y = 4;
         */
        this.scale=null;


        /** The rotation (in degrees) of this SceneObject relative to it's parent. Positive values correspond to counter-clockwise rotation around the given axis.
         * @type {Vector3}
         * @default new Vector3(0,0,0)
         * @example 
         * // Objective: Create a SceneObject with a graphic and rotate it.
     * // Expected Result: The white box has rotated 45 degrees into a diamond shape.
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * // Add a GraphicObject to the SceneObject using the GraphicObject constructor.
     * // Note: To use a custom graphic, add your image file to the assets directory and access it using nc.graphicAssets['MyImage']
     * new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "MyGraphicObject" );
     * // Rotate the SceneObject 45 degrees around the z axis.
     * mySceneObject.rotation.z = 45;
         */
        this.rotation=null;


        /** Boolean that reflects if the overall state of this SceneObject is 'enabled', incorporating the state of its anscesters.
         * @type {boolean}
         * @readonly
         * @example
         * // Objective: Use isEnabledWithInheritance to determine the enabled value at various levels of the heirarchy.
         * // Expected Result: The console should have 2 log messages as follows:
         * //   Top level scene object, enabled is true
         * //   Bottom level scene object, enabled is false
         * 
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject1" to the SceneObject.
         * let myGraphicObject1 = new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "GraphicObject1" );
         * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject2" to the GraphicObject myGraphicObject1 (GraphicObject1). 
         * let myGraphicObject2 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject1, "GraphicObject2" );
         * 
         * // Set myGraphicObject1 to enabled = false. ("GraphicObject1").
         * myGraphicObject1.enabled = false;
         * // Console log the isEnabledWithInheritance value of the top level SceneObject ("MySceneObject").
         * console.log("Top level scene object, enabled is", mySceneObject.isEnabledWithInheritance); // true
         * // Console log the isEnabledWithInheritance value of the bottom level SceneObject ("GraphicObject2").
         * console.log("Bottom level scene object, enabled is", myGraphicObject2.isEnabledWithInheritance); // false
         */
        this.isEnabledWithInheritance=null;


         /** Number indicating how many ancesters this SceneObject has.
         * @type {number}
         * @readonly
         * @example
         * // Objective: Retrieve the hierarchy depth of a SceneObject.
         * // Expected Result: The console log should read "myGraphicObject2 hierarchy depth is 3".
         *
         * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
         * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
         * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject1" to the SceneObject.
         * let myGraphicObject1 = new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "GraphicObject1" );
         * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject2" to the GraphicObject myGraphicObject1 (GraphicObject1). 
         * let myGraphicObject2 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject1, "GraphicObject2" );
         * // Console log the hierarchy depth of myGraphicObject2 ("GraphicObject2").
         * console.log("myGraphicObject2 hierarchy depth is", myGraphicObject2.hierarchyDepth);
         */
        this.hierarchyDepth=null;


         /** Object housing information about this particular SceneObject's LayoutObject functionality.
          * LayoutObject functionality applies to SceneObjects that have been added as elements to a LayoutStack, which is responsible
          * for organizing visual content (TextBoxes, Graphics, Buttons, etc...) into dynamic vertical or horizontal stacks.
          * Until a SceneObject has been configured with LayoutObject functionality (either by calling 'SceneObject.configureLayoutObject'
          * or by adding the SceneObject as an element to a LayoutStack), the 'SceneObject.layoutObject' member will be undefined.
          * [NON-INSTANTIABLE]
          * @type {LayoutObject}
          * @example
          * 
     * // Objective: Configure a layout object.
     * // Expected Result: The console should read "layout object width and height after configuration: 20 10".
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * this.mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * 
     * // Add a callback function.
     * this.myCallback = function(args) {
     *     // return a Vector2 with a width of 20 and a height of 10
     *     return new Vector2( 20, 10 ); 
     * }
     * 
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.mySceneObject.configureLayoutObject( this, "myCallback" );
     * console.log('layout object width and height after configuration:', this.mySceneObject.layoutObject.width, this.mySceneObject.layoutObject.height);
     * 
          */
        this.layoutObject=null;


         /** Object housing functionality that enables for keyboard navigation of this SceneObject's ui-related descendants.
          * Keyboard navigation enables the end-user to press the tab, space, and enter keys to outline and trigger
          * any 'uiKeyboardNavigable' descendants of the SceneObject owning this UiKeyboardNavigator when it is 'in focus' 
          * according to 'nc.singularFocusObject'.
          * This property defaults to undefined, but can be enabled, by calling 'SceneObject.configureUiKeyboardNavigator()'.
          * [NON-INSTANTIABLE]
          * [REQUIREMENT: module - extendedUi]
          * @type {UiKeyboardNavigator}
          */
        this.uiKeyboardNavigator=null;


         /** 
          * Object housing functionality that enables for this SceneObject to be accessible via keyboard navigation.
          * Keyboard navigation enables the end-user to press the arrow keys, tab, space, and enter keys to outline and trigger
          * any 'uiKeyboardNavigable' SceneObjects within a UiKeyboardNavigator-enabled parent that is currently 'in focus'
          * according to 'nc.singularFocusObject'.
          * This property defaults to undefined, but can be enabled, by calling 'SceneObject.configureUiKeyboardNavigable()'.
          * [NON-INSTANTIABLE]
          * [REQUIREMENT: module - extendedUi]
          * @type {UiKeyboardNavigable}
          */
        this.uiKeyboardNavigable=null;


        /** Object housing functionality that enables for the SceneObject owning it to be 'visually focused', which focuses the end-user's 
         * attention the given SceneObject by placing it in front of a dimmer layer whenever the object is the the current 'singularFocusObject'.
         * Calling 'configureUiVisualFocus' populates the 'uiVisualFocus' member for the owning SceneObject.
         * It should be noted that the dimmer layer that the newly focused item is placed in front of is actually a button which, 
         * when pressed, calls the 'attemptExitUiVisualFocus' member of the current singularFocusObject if that member is defined.
         * [NON-INSTANTIABLE]
         * [REQUIREMENT: module - extendedUi]
         * @type {UiVisualFocus}
         */
        this.uiVisualFocus=null;


        /** Flag that determines if this SceneObject's global position is always snapped to the nearest integer (for x and y only).
         * This property is mainly used to help provide pixel-perfect rendering for TextBoxes, see 'TextBox.useNearestPixelRendering' for more information.
         * @type {boolean}
         * @default false
         */
        this.snapToNearestWorldPosition = null;


        /** Sets up a 'focus fallback' for this SceneObject. Once set, if 'nc.relinquishFocus' is called while this SceneObject
         * is focused, then the fallback object will automatically become the new focused object.
         * @type {SceneObject}
         * @default nc.defaultFocusFallback
         */
        this.focusFallback = null;


        /** A dictionary of the CustomAddOns included on a given SceneObject.
        * It should be noted that by default, each of the CustomAddOns are undefined, and that their member will be populated
        * once they are added to a SceneObject in the Incisor inspector or directly through code.
        */
        this.customAddOns = {
            
        };


        /** Flag that determines if this SceneObject's children will be ignored during any 'gatherObjectBlueprint' calls.
         * This flag should be set to true for objects that dynamically generate their own children objects so that those children
         * are not mistakenly duplicated when a blueprint is used to reproduce a collection of objects.
         * This flag general defaults to false, except with Construct instances and TextAssemblies, since those
         * obects produce their own children on the fly. You would also want to set this flag to true if you
         * are making a CustomObject that produces it's own children or a CustomAddOn that produces children within its owner.
         * @default false
         * @type {boolean}
         */
        this.excludeChildrenFromBlueprint = null;


        /** Matrx4 representing the transformation of this SceneObject with respect to its parent.  If 'localMatrixOverrideMode' is false, this is automatically calculated based on the position, rotation, and scale of the SceneObject.
         * @default Matrix4()
         * @type {Matrix4} 
         */
        this.localMatrix = null;


        /** Matrx4 representing the transformation of the SceneObject with respect to the Scene that contains it.  If 'worldMatrixOverrideMode' is false, this is automatically calculated by multiplying this SceneObject's parent's worldMatrix by this SceneObject's localMatrix.  Because the same calculation is done for all ancestors, this Matrix4 accumulates the transformations of all ancestor SceneObjects.
         * @default Matrix4()
         * @type {Matrix4} 
         */
        this.worldMatrix = null;


        /** If true, this SceneObejct's localMatrix will no longer be automatically be updated to reflect the SceneObejct's position, rotation, and scale.  This is useful if the localMatrix is being calculated manually, so automatic updates are undesired.
         * @default false
         * @type {boolean} 
         */
        this.localMatrixOverrideMode = null;


        /** If true, this SceneObejct's worldMatrix will no longer be automatically be updated to reflect the transformations of itself and its ancestors.  This is useful if the worldMatrix is being calculated manually, so automatic updates would interfere.
         * @default false
         * @type {boolean} 
         */
        this.worldMatrixOverrideMode = null;


        /** Flag indicating if this SceneObject has been disposed. If the SceneObject has not been disposed, this property will be undefined.
         * @type {boolean} 
         * @default undefined
         */
        this.isDisposed = null;


        /** The EffectController for the 'FillColor' EffectNode, which entirely fills the associated Geometry with the red, green, blue, and alpha color values provided.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.fillColor = null;
/** The EffectController for the 'ColorMultiply' EffectNode, which multiplies the red, green, blue, and alpha color values of the Material it is applied to.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.colorMultiply = null;
/** The EffectController for the 'Shapify' EffectNode. The Shapify EffectNode converts edge data stored in a 'shapified' Texture into a presentable image with edges that stay sharp regardless of the scale of the associated GraphicObject.
 * This is an instance of a dynamically defined EffectController with base type 'Vector2'. 
 * To get a new instance, use "nc.effectControllers['shapify'].new()".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {shapify}
 */
this.shapify = null;

    }


    /** Sets this SceneObject's 'enabled' value to true.
     * @example
     * // Objective: Call enable() on a previously disabled SceneObject.
     * // Expected Result: The console should have 2 log messages as follows:
     * //    enabled state is false
     * //    enabled state is true
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * this.mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * 
     * // Add a callback function.
     * this.myCallback = function(args) {
     *     console.log('enabled state is', args);
     * }
     * 
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.mySceneObject.addEnabledStateChangeCallback( this, "myCallback" );
     * // Set the enabled state of mySceneObject to false.
     * this.mySceneObject.enabled = false;
     * // Call enable() on mySceneObject. This will fire an enabled state change callback.
     * this.mySceneObject.enable();
     */
    enable(){}


    /** Sets this SceneObject's 'enabled' value to false.
     * @example
     * // Objective: Call disable() on a previously enabled SceneObject.
     * // Expected Result: The console should read "enabled state is false".
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * this.mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * 
     * // Add a callback function.
     * this.myCallback = function(args) {
     *     console.log('enabled state is', args);
     * }
     * 
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.mySceneObject.addEnabledStateChangeCallback( this, "myCallback" );
     * // By default, the SceneObject is already enabled. Call disable() on mySceneObject. This will fire an enabled state change callback.
     * this.mySceneObject.disable();
     */
    disable(){}


     /** Adds a callback function to the list of callbacks that occur whenever the state of this SceneObject's 'enabled' property changes.
     * The true/false enabled state is sent to the callback as its first paremeter, followed by any 'callbackArgs' provided.
     * @param {object} callbackOwner The object owning the callback function that is called when this SceneObject's enabled state changes.
     * @param {string} callbackName The name of the function that is called when this SceneObject's enabled state changes.
     * @param {Array|any} [callbackArgs] Arguments for the function that is called when this SceneObject's enabled state changes. 
     * @example
     * // Objective: Add an 'Enabled State Change' callback.
     * // Expected Result: The console should have 2 log messages as follows:
     * //    enabled state is false
     * //    enabled state is true
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * this.mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     *
     * // Add a callback function.
     * this.myCallback = function(args) {
     *    console.log('enabled state is', args);
     * }
     *
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.mySceneObject.addEnabledStateChangeCallback( this, "myCallback" );
     * // Set mySceneObject to enabled = false. This will fire an enabled state change callback.
     * this.mySceneObject.enabled = false;
     * // Set mySceneObject to enabled = true. This will fire an enabled state change callback.
     * this.mySceneObject.enabled = true;
     */
    addEnabledStateChangeCallback(callbackOwner,callbackName,callbackArgs){}


     /** Adds a callback for when this SceneObject encounters a change in uiZoom. This is similar to adding a callback to the
     * general uiZoomChange AppEvent, but with the added benefit that these callbacks happen in hierarchy-depth order from greatest
     * to least. This means that callbacks associated with an object having 7 ancestors will occur before that of an object with 2 ancestors.
     * This hierarchy-depth sorting enables layout changes to happen in a way that works better with LazyUpdaters.
     * The nc.uiZoom.totalZoom value is sent to the callback as its first paremeter, followed by any 'callbackArgs' provided.
     * @param {object} callbackOwner The object owning the callback function that is called upon uiZoom change.
     * @param {string} callbackName The name of the function that is called upon uiZoom change.
     * @param {Array|any} [callbackArgs] Arguments for the function that is called upon uiZoom change. 
     * @param {number} [additionalCallbackOrder] An additional sorting value affecting when this callback will happen relative to other such callbacks associated with this SceneObject. [DEFAULT: 0] 
     */
    addUiZoomCallback(callbackOwner,callbackName,callbackArgs,additionalCallbackOrder){}


     /** Removes the given callback.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the function.
     */
    removeUiZoomCallback(callbackOwner,callbackName){}

    
   /** Removes an 'enabledStateChange' callback.
     * @param {object} callbackOwner The object owning the callback function to remove.
     * @param {string} callbackName The name of the callback function to remove.
     * @example
     * // Objective: Add an 'Enabled State Change' callback.
     * // Expected Result: The console should have 2 log messages as follows:
     * //    enabled state is false
     * //    enabled state is true
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * this.mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * 
     * // Add a callback function.
     * this.myCallback = function(args) {
     *     console.log('enabled state is', args);
     * }
     * 
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.mySceneObject.addEnabledStateChangeCallback( this, "myCallback" );
     * // Set mySceneObject to enabled = false. This will fire an enabled state change callback.
     * this.mySceneObject.enabled = false;
     * // Set mySceneObject to enabled = true. This will fire an enabled state change callback.
     * this.mySceneObject.enabled = true;
     * // Remove the reference to a callback function passing the owner of the function and the function name.
     * this.mySceneObject.removeEnabledStateChangeCallback( this, "myCallback" );
     * // Set mySceneObject to enabled = false. This will NO LONGER fire an enabled state change callback and no console message will be logged.
     * this.mySceneObject.enabled = false;
     */
   removeEnabledStateChangeCallback(callbackOwner,callbackName){}


    /** Removes this SceneObject and its descendants from the hierarchy, and removes internal Incisor® references to aid memory management.
     * @example
     * // Objective: Call dispose() on a SceneObject.
     * // Expected Result: The console should have 2 log messages as follows:
     * //    descendants before disposal 3
     * //    after wait descendants after disposal 1 
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject1" to the SceneObject.
     * let myGraphicObject1 = new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "GraphicObject1" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject2" to myGraphicObject1.
     * let myGraphicObject2 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject1, "GraphicObject2" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject3" to myGraphicObject2.
     * let myGraphicObject3 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject2, "GraphicObject3" );
     * 
     * // Log the number of descendants of mySceneObject before calling dispose().
     * console.log( "descendants before disposal", mySceneObject.getDescendants().length );
     * // Call dispose() on myGraphicObject2.
     * myGraphicObject2.dispose();
     * 
     * // The call to dispose() can take some time to complete so lets wait 2 seconds before we log again.
     * 
     * // Create a callback function to log the descendants after calling dispose().
     * this.myWait = function() {
     *     console.log( "after wait descendants after disposal", mySceneObject.getDescendants().length );
     * }
     * // Using nc.WaitThen, wait 2 seconds before attempting to log the descendants again.
     * nc.waitThen( 2, this, "myWait" );
     */
    dispose(){}


    /** Adds a callback function to the list of callbacks that occur when this SceneObject is disposed.
     * @param {object} callbackOwner The object owning the callback function that is called when this SceneObject is disposed.
     * @param {string} callbackName The name of the function that is called when this SceneObject is disposed.
     * @param {Array|any} [callbackArgs] Arguments for the function that is called when this SceneObject is disposed. 
     * @example
     * // Objective: Add a 'Disposal' callback.
     * // Expected Result: The console should read "disposal callback: myDisposalData".
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * this.mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * 
     * // Add a callback function.
     * this.myCallback = function(args) {
     *    console.log('disposal callback:', args);
     * }
     * 
     * // Add a reference to a callback function passing the owner of the function, the function name, and any additional data we want.
     * this.mySceneObject.addDisposalCallback( this, "myCallback", ["myDisposalData"] );
     * // Call dispose() on mySceneObject. This will fire a disposal callback.
     * this.mySceneObject.dispose();
     */
    addDisposalCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given callback function from the list of callbacks that occur when this SceneObject is disposed.
     * @param {object} callbackOwner The object owning the callback function that is called when this SceneObject is disposed.
     * @param {string} callbackName The name of the function that is called when this SceneObject is disposed.
     */
    removeDisposalCallback(callbackOwner,callbackName){}



    /** Adds a callback function to the list of callbacks that occur when this SceneObject is 'rendered'.
     * @param {object} callbackOwner The object owning the callback function that is called when this SceneObject is rendered.
     * @param {string} callbackName The name of the function that is called when this SceneObject is rendered.
     * @param {Array|any} [callbackArgs] Arguments for the function that is called when this SceneObject is rendered. 
     */
    addRenderCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given callback function.
     * @param {object} callbackOwner The object owning the callback function.
     * @param {string} callbackName The name of the function.
     */
    removeRenderCallback(callbackOwner,callbackName){}





    /** Makes this SceneObject the child of the given SceneObject in the hierachy.
     * @param {SceneObject} parent The SceneObject that will become this SceneObject's new parent.
     * @param {boolean} [maintainGlobalPosition] Boolean determining if the global position, scale, and rotation should be preserved during the change in hierarchy. Note that this preservation is not always possible during a parent change. [DEFAULT: false]
     * @example
     * // Objective: Set the parent of a SceneObject
     * // Expected Result: The console should have 2 log messages as follows:
     * //    GraphicObjectChild's parent is GraphicObjectA
     * //    GraphicObjectChild's parent is now GraphicObjectB
     * 
     * // Create a GraphicObject using the GraphicObject constructor. Name it "GraphicObjectA".
     * let graphicObjectA = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "GraphicObjectA" );
     * // Create a second GraphicObject using the GraphicObject constructor. Name it "GraphicObjectB".
     * let graphicObjectB = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "GraphicObjectB" );
     * // Create a third GraphicObject using the GraphicObject constructor. This time, make its parent graphicObjectA. Name it "GraphicObjectChild".
     * let graphicObjectChild = new GraphicObject( nc.graphicAssets.WhiteBox, graphicObjectA, "GraphicObjectChild" );
     * // Console log the parent.
     * console.log("GraphicObjectChild's parent is", graphicObjectChild.parent.name);
     * // Set the parent to graphicObjectB.
     * graphicObjectChild.setParent( graphicObjectB );
     * // Console log the parent.
     * console.log("GraphicObjectChild's parent is now", graphicObjectChild.parent.name);
     */
    setParent(parent,maintainGlobalPosition){}


    /** Returns a list of this SceneObject's ancesters.
     * @returns {Array.<SceneObject>}
     * @example
     * // Objective: Get the ancestors of a SceneObject.
     * // Expected Result: The console should have 2 log messages as follows:
     * //    myGraphicObject3 ancestors count 4
     * //    myGraphicObject1 ancestors count 2
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject1" to the SceneObject.
     * let myGraphicObject1 = new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "GraphicObject1" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject2" to the GraphicObject myGraphicObject1 (GraphicObject1). 
     * let myGraphicObject2 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject1, "GraphicObject2" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject3" to the GraphicObject myGraphicObject2 (GraphicObject2). 
     * let myGraphicObject3 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject2, "GraphicObject3" );
     * // Console log the ancestors count.
     * console.log( "myGraphicObject3 ancestors count", myGraphicObject3.getAncestors().length );
     * console.log( "myGraphicObject1 ancestors count", myGraphicObject1.getAncestors().length );
     */
    getAncestors(){return(null);}


    /** Returns a list of this SceneObject's descendants.
     * @param {boolean} [enabledOnly] Boolean determining if only enabled SceneObjects are added to the returned list. [DEFAULT: true]
     * @param {boolean} [includeEnclosedScenes] Boolean determining if sub-descendants of ScrollingPanels' Scenes will be included in the returned list. [DAFAULT: false]
     * @returns {Array.<SceneObject>}
     * @example
     * // Objective: Get the descendants of a SceneObject.
     * // Expected Result: The console should have 2 log messages as follows:
     * //    myGraphicObject3 descendants count 0
     * //    myGraphicObject1 descendants count 2
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * let mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject1" to the SceneObject.
     * let myGraphicObject1 = new GraphicObject( nc.graphicAssets.WhiteBox, mySceneObject, "GraphicObject1" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject2" to the GraphicObject myGraphicObject1 (GraphicObject1). 
     * let myGraphicObject2 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject1, "GraphicObject2" );
     * // Using the GraphicObject constructor, add a GraphicObject named "GraphicObject3" to the GraphicObject myGraphicObject2 (GraphicObject2). 
     * let myGraphicObject3 = new GraphicObject( nc.graphicAssets.WhiteTriangle, myGraphicObject2, "GraphicObject3" );
     * // Console log the descendants count.
     * console.log( "myGraphicObject3 descendants count", myGraphicObject3.getDescendants().length );
     * console.log( "myGraphicObject1 descendants count", myGraphicObject1.getDescendants().length );
     */
    getDescendants(enabledOnly,includeEnclosedScenes){return(null);}


    /** Returns a Vector3 with the global position of this SceneObject within the Scene.
     * @param {Vector3} [returnVector3] Optional Vector3 that can be supplied to avoid the generation of a new Vector3 object for efficiency.
     * @returns {Vector3}
     * @example
     * // Objective: Get the global position of a SceneObject.
     * // Expected Result: 'InnerSceneObject' global position x,y 200 200
     * 
     * // Create a new Scene and name it "MyScene".
     * let myScene = new Scene("MyScene");
     * // Create a SceneObject using the SceneObject constructor. This will add "OuterSceneObject" to "MyScene".
     * let outerSceneObject = new SceneObject( myScene, "OuterSceneObject" );
     * // Create a SceneObject using the SceneObject constructor. This will add "InnerSceneObject" to "OuterSceneObject".
     * let innerSceneObject = new SceneObject( outerSceneObject, "InnerSceneObject" );
     * // Update the position of the outerSceneObject, moving it up and to the right, 100 world units.
     * outerSceneObject.position.x = 100;
     * outerSceneObject.position.y = 100;   
     * // Update the position of the innerSceneObject, moving it up and to the right, 100 world units.
     * innerSceneObject.position.x = 100;
     * innerSceneObject.position.y = 100;  
     * // Console log the x and y of mySceneObject using getGlobalPosition(). 
     * console.log( "'InnerSceneObject' global position x,y", innerSceneObject.getGlobalPosition().x, innerSceneObject.getGlobalPosition().y );
     */
    getGlobalPosition(returnVector3){return(null);}

    
    /** Swoops this SceneObject's position using global coordinates.
     * @param {Array.<number>} endValues The array of target global position values [x,y,z].
     * @param {number} [duration=0] The duration for the interpolation in seconds. [DEFAULT: 0]
     * @param {TweenType} [tweenType=nc.tweenTypes.Linear] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear] 
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity=nc.defaultPauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl=nc.defaultSpeedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @returns {Swooper}
     * @example
     * // Objective: "Swoop" the position of the white box.
     * // Expected Result: The white box moves up and to the right, 300 world units, over a duration of 10 seconds.
     *  
     * // Add a GraphicObject to the main scene using the GraphicObject constructor.  
     * let whiteBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteBox" );
     * // Call swoopGlobalPosition() giving it the array of x,y,z values to swoop to over a duration of 10 seconds.
     * whiteBox.swoopGlobalPosition( [300,300,0], 10 );
     */
    swoopGlobalPosition(endValues,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl){return(null);}


     /** Returns a Vector3 with the global scale of this SceneObject within the Scene.
      * @param {Vector3} [returnVector3] Optional Vector3 that can be supplied to avoid the generation of a new Vector3 object for efficiency.
      * @returns {Vector3}
      * @example
      * // Objective: Get the global scale of a SceneObject.
      * // Expected Result: The console should read "scale x,y 2 2.
      *    
      * // Add a GraphicObject to the main scene using the GraphicObject constructor. 
      * let whiteBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteBox" );
      * // Use scale to make the "WhiteBox" twice as large
      * whiteBox.scale.x = 2;
      * whiteBox.scale.y = 2;
      * 
      * console.log( "scale x,y", whiteBox.getGlobalScale().x, whiteBox.getGlobalScale().y );
      */
    getGlobalScale(returnVector3){return(null);}


     /** Swoops this SceneObject's scale using global coordinates.
     * @param {Array.<number>} endValues The array of target global scale values [x,y,z].
     * @param {number} [duration=0] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType=nc.tweenTypes.Linear] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes.  
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity=nc.defaultPauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl=nc.defaultSpeedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @returns {Swooper}
     * @example
     * // Objective: "Swoop" the scale of the white box.
     * // Expected Result: The white box expands to 5 times its original size over a duration of 10 seconds.
     *   
     * // Add a GraphicObject to the main scene using the GraphicObject constructor.  
     * let whiteBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteBox" );
     * // Call swoopGlobalScale() giving it the array of x,y,z values to expand to over a duration of 10 seconds.
     * whiteBox.swoopGlobalScale( [5,5,0], 10 );
     */
    swoopGlobalScale(endValues,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl){return(null);}

    /** Returns a Vector3 containing the coordinates for this SceneObject within the given Camera's view area.
     * The camera's view area bounds are confined to x within [-.5, .5] and y within [-.5, .5] where -.5 corresponds to left and bottom.
     * @param {Camera} camera The Camera to 'look through' when obtaining the view position of this SceneObject. [DEFAULT: nc.mainCamera]
     * @param {Vector3} [returnVector3] Optional Vector3 that can be supplied to avoid the generation of a new Vector3 object for efficiency.
     * @returns {Vector3}
     * @example
     * // Objective: Get the view position of a SceneObject within a Camera's view area
     * // Expected Result: The console should have 2 log messages that look something like the following:
     * //    'MyGraphicObject' view position x,y 0.030978934324659233 0
     * //    'MyGraphicObject' view position x,y 0.061957868649318466 0
     * //
     * // NOTE: Because view position is relative to the Camera's view area, your x value will depend on the resolution of your screen. 
     * //       Try resizing your screen and running the test again. You will notice your x value has changed.
     * //
     * 
     * // Using the GraphicObject constructor, add a GraphicObject named "MyGraphicObject" to the main scene
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "MyGraphicObject" );
     * // Update the x position of myGraphicObject, moving it to the right 100 world units.
     * myGraphicObject.position.x = 100;
     * // Console log the x and y of "MyGraphicObject" using getViewPosition(). 
     * console.log( "'MyGraphicObject' view position x,y", myGraphicObject.getViewPosition().x, myGraphicObject.getViewPosition().y );
     * // Update the x position of myGraphicObject again, moving it to the right 200 world units.
     * myGraphicObject.position.x = 200;
     * // Console log the x and y of "MyGraphicObject" using getViewPosition(). 
     * console.log( "'MyGraphicObject' view position x,y", myGraphicObject.getViewPosition().x, myGraphicObject.getViewPosition().y );
     */
    getViewPosition(camera,returnVector3){return(null);}


    /** Returns a Vector3 with the global rotation of this SceneObject within the Scene.
    * @param {Vector3} [returnVector3] Optional Vector3 that can be supplied to avoid the generation of a new Vector3 object for efficiency.
    * @returns {Vector3}
    */
    getGlobalRotation(returnVector3){return(null);}


     /** Swoops this SceneObject's rotation using global coordinates.
     * @param {Array.<number>} endValues The array of target global scale values [x,y,z].
     * @param {number} [duration=0] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType=nc.tweenTypes.Linear] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes.  
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity=nc.defaultPauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl=nc.defaultSpeedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @returns {Swooper}
     */
    swoopGlobalRotation(endValues,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl){return(null);}


    /** Sets the EffectNodes for the Materials associated with this SceneObject.  
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of the given SceneObject or Material.
     * When a GraphicObject is set to a particular GraphicAsset, it's Materials adopt the GraphicAsset's 
     * EffectNode and EffectController presets by default, but they can be customized at any time.
     * @param {Array.<EffectNode>|EffectNode} effectNodes The new list of EffectNodes that will apply to the Materials associated with this SceneObject.
     * @param {boolean} [alsoSetDescendants=true] Boolean determining if this SceneObject's descendants' Materials will also adopt the provided list of EffectNodes. [DEFAULT: true]
     */
    setEffectNodes(effectNodes,alsoSetDescendants){}


    /** Adds the given EffectNodes to the Materials associated with this SceneObject.
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of the given SceneObject or Material.
     * When a GraphicObject is set to a particular GraphicAsset, it's Materials adopt the GraphicAsset's 
     * EffectNode and EffectController presets by default, but they can be customized at any time.
     * @param {Array.<EffectNode>|EffectNode} effectNodes The EffectNodes to add to this SceneObject and its Materials.
     * @param {boolean} [alsoAddToDescendants=true] Boolean determining if the given EffectNodes will also be added to the SceneObject's descendants' Materials. [DEFAULT: true]
     */
    addEffectNodes(effectNodes,alsoAddToDescendants){}


    /** Sets the Layers of all of the GraphicObject descendants of this SceneObject to the supplied Layer.
     * @param {Layer} layer The layer to change this SceneObject's descendants to.
     * @param {Array.<SceneObject>} [sceneObjectList] Optional list designating exactly which decendants to set the layers for. If left undefined, all GraphicObject descendants' layers will be updated. 
     * @example
     * // Objective: Swap the position of GraphicObjects using setLayers().
     * // Action: Click the white triangle Button to swap the layering of the red and white boxes.
     * // Expected Result: Upon clicking the white triangle Button, the red and white boxes will swap positions.
     * 
     * // Start by creating 2 different GraphicObjects, red and white.
     * let redBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "RedBox" );
     * redBox.fillColor = new Color( 1,0,0,1 ); // make the white box red
     * 
     * let whiteBox = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "WhiteBox" );
     * // Offset the White Box, 25 world units, down and to the right.
     * whiteBox.position.x = 25;
     * whiteBox.position.y = -25;
     * 
     * // Define a new Layer named "LayerA" and set the red box to "LayerA".
     * nc.defineLayer( "LayerA", nc.mainScene );
     * redBox.layer = nc.layers.LayerA;
     * // Define a new Layer named "LayerB" and set the white box to "LayerB".
     * nc.defineLayer( "LayerB", nc.mainScene );
     * whiteBox.layer = nc.layers.LayerB;
     * 
     * // Using the nc factory method, create a white triangle button to handle the action of swapping layers.
     * let button = nc.addButton( nc.graphicAssets.WhiteTriangle, nc.mainScene, "MyButton" );
     * button.position.x = -120; // offset the button to the left
     * // Add a button callback function.
     * this.mySwapCallback = function(args) {
     *     // Swap the red and white Layers of the boxes.
     *     if ( redBox.layer === nc.layers.LayerA ) {
     *         redBox.setLayers( nc.layers.LayerB );
     *         whiteBox.setLayers( nc.layers.LayerA );
     *     } else {
     *         redBox.setLayers( nc.layers.LayerA );
     *         whiteBox.setLayers( nc.layers.LayerB );
     *     }
     * }
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * button.addReleaseCallback( this, "mySwapCallback" );
     */
    setLayers(layer,sceneObjectList){}


    /** Sets the SubLayer values of all of the GraphicObject descendants of this SceneObject to the supplied subLayer value.
     * @param {Layer} subLayer The subLayer to change this SceneObject's descendants to.
     * @param {Array.<SceneObject>} [sceneObjectList] Optional list designating exactly which decendants to set the layers for. If left undefined, all GraphicObject descendants' layers will be updated. 
     */
    setSubLayers(subLayer,sceneObjectList){}


    /** Function to configure the SceneObject with LayoutObject functionality, which prepares it to be added as an element to a LayoutStack.
     * Once configured, the configuration information can be found (and adjusted if necessary) in the SceneObject.layoutObject.
     * Most SceneObject-inheriting objects have standard LayoutObject functionality that is automatically configured when
     * they are added as elements to a LayoutStack, so this method is mainly for creating custom LayoutObject functionality.
     * Configuration consists of supplying a callback to a user-defined function that refreshes the layout of the
     * SceneObject in question and returns a Vector2 containing the resulting dimensions.
     * @param {object} refreshLayoutCallbackOwner The object owning the callback function that is called by the LayoutStack containing this LayoutObject when the layout is refreshed.
     * @param {string} refreshLayoutCallbackName The name of the callback function that is called by the LayoutStack containing this LayoutObject when the layout is refreshed.
     * @param {Array|any} refreshLayoutCallbackArgs Arguments for the callback function that is called by the LayoutStack containing this LayoutObject when the layout is refreshed. 
     * @example
     * 
     * // Objective: Configure a layout object.
     * // Expected Result: The console should read "layout object width and height after configuration: 20 10".
     * 
     * // Create a SceneObject using the SceneObject constructor. This will add "MySceneObject" to the main scene.
     * this.mySceneObject = new SceneObject( nc.mainScene, "MySceneObject" );
     * 
     * // Add a callback function.
     * this.myCallback = function(args) {
     *     // return a Vector2 with a width of 20 and a height of 10
     *     return new Vector2( 20, 10 ); 
     * }
     * 
     * // Add a reference to a callback function passing the owner of the function and the function name.
     * this.mySceneObject.configureLayoutObject( this, "myCallback" );
     * console.log('layout object width and height after configuration:', this.mySceneObject.layoutObject.width, this.mySceneObject.layoutObject.height);
     * 
     */
    configureLayoutObject(refreshLayoutCallbackOwner,refreshLayoutCallbackName,refreshLayoutCallbackArgs){};


    /** Function to configure the SceneObject with UiKeyboardNavigator functionality, which enables the end-user to 
     * press the tab, space, and enter keys to outline and trigger any 'uiKeyboardNavigable' descendants of 
     * the SceneObject owning this UiKeyboardNavigator when it is 'in focus' according to 'nc.singularFocusObject'. 
     * Calling 'configureUiKeyboardNavigator' populates the 'uiKeyboardNavigator' member for the owning SceneObject.
     */
    configureUiKeyboardNavigator(){};


    /** Function to configure the SceneObject with UiKeyboardNavigable functionality, which enables the end-user 
     * access the SceneObject using keyboard navigation.  
     * Calling 'configureUiKeyboardNavigable' populates the 'uiKeyboardNavigable' member for the owning SceneObject.
     * @param {object} setOutlineCallbackOwner The owner of the callback that occurs whenever keyboard navigation changes the 'outline' state of the UiKeyboardNavigable object. The outline state will be sent to the callback as its first parameter.
     * @param {string} setOutlineCallbackName The name of the callback that occurs whenever keyboard navigation changes the 'outline' state of the UiKeyboardNavigable object. The outline state will be sent to the callback as its first parameter. 
     * @param {object} triggerCallbackOwner The owner of the callback that occurs whenever keyboard navigation triggers the UiKeyboardNavigable object via the spacebar or enter keys.
     * @param {string} triggerCallbackName The name of the callback that occurs whenever keyboard navigation triggers the UiKeyboardNavigable object via the spacebar or enter keys
     */
    configureUiKeyboardNavigable(setOutlineCallbackOwner,setOutlineCallbackName,triggerCallbackOwner,triggerCallbackName){};


    /** Function to configure the SceneObject with UiVisualFocus functionality, which focuses the end-user's attention
     * on the given SceneObject by placing it in front of a dimmer layer whenever the object is the the current 'singularFocusObject'.
     * Calling 'configureUiVisualFocus' populates the 'uiVisualFocus' member for the owning SceneObject.
     * It should be noted that the dimmer layer that the newly focused item is placed in front of is actually a button which, 
     * when pressed, calls the 'attemptExitUiVisualFocus' member of the current singularFocusObject if that member is defined.
     */
    configureUiVisualFocus(){};


    /** The worldMatrix is normally updated during scene traversal for rendering.  If an updated worldMatrix is needed before then, this function forces the worldMatrix to be updated.
     * @param {boolean} [updateAncestors] If true, the world matrices of all ancestors whose 'worldMatrixOverrideMode' is false will first be updated.  This is useful if the worldMatrix is being updated to account for an ancestor's transformation changing. [DEFAULT: false]
     * @param {boolean} [updateDescendants] If true, the world matrices of all descendants whose 'worldMatrixOverrideMode' is false with also be updated.  This is useful if the world matrices of descendants need to immediately account for this SceneObejct's updated worldMatrix. [DEFAULT: false]
     */
    updateWorldMatrix(updateAncestors,updateDescendants){}
}


/** A Scene is a root SceneObject in the hierarchy. All SceneObjects are either Scenes or descendants of Scenes.
 * @extends SceneObject
 */
class Scene extends SceneObject
{
    /** A Scene is a root SceneObject in the hierarchy. All SceneObjects are either Scenes or descendants of Scenes.
     * @param {string} name The name of the new Scene. This name must be unique.
     */
    constructor(name)
    {
        /** A read-only list of this Scene's layer names in order from back to front.
         * @type {Array.<string>}
         * @readonly
         */
        this.layerOrderLedger = null;
    }


    /** Defines a new Layer within this Scene. For a list of all Layers within all Scenes, see 'nc.layers'. For a list of all Layers within specific Scenes, see 'nc.layersByScene'.
     * @param {string} name The name of the new Layer.
     * @param {Layer} [placeBehindThisLayer] Supply this optional Layer, and the newly defined Layer will be populated behind the provided Layer. [DEFAULT: nc.layers.DefaultLayer]
     * @returns {Layer}
     */
    defineLayer(name,placeBehindThisLayer){}
}


/** Object representing a rendering order group. 
 * The 'GraphicObject.layer' property can assigned to specific Layers to manipulate the render order of the given GraphicObject. 
 * Use 'Scene.defineLayer' to add a new Layer to a Scene.
 * To manipulate the render order of GraphicObjects within the same Layer, see the 'GraphicObject.subLayer' property.
 * [NON-INSTANTIABLE]
 */
class Layer
{
    constructor(_layerName)
    {
        /** The type identifier.
        * @type {string}
        */
        this.type = "Layer";


        /** The name of the Layer
         * @type {string}
         */
        this.name = _layerName;
    }
}


/** Dictionary of Layers in the 'MainScene' Scene.
 * [NON-INSTANTIABLE]
 */
class LayersInScene0
{
constructor()
{
/** Layer within the 'MainScene' Scene.
 * @type {Layer}
 */
this["DefaultLayer"] = new Layer();
}
}
/** Dictionary of Layers in the 'incr_textRenderingScene' Scene.
 * [NON-INSTANTIABLE]
 */
class LayersInScene1
{
constructor()
{
/** Layer within the 'incr_textRenderingScene' Scene.
 * @type {Layer}
 */
this["DefaultLayer"] = new Layer();
}
}
/** Dictionary of Layers in the 'Construct Editor Scene: MenuConstruct' Scene.
 * [NON-INSTANTIABLE]
 */
class LayersInScene2
{
constructor()
{
/** Layer within the 'Construct Editor Scene: MenuConstruct' Scene.
 * @type {Layer}
 */
this["DefaultLayer"] = new Layer();
}
}



/** Dictionary of Dictionaries of Layers per Scene.
 * [NON-INSTANTIABLE]
 */
class LayersByScene 
{
    constructor()
    {
        /** Dictionary of Layers in the 'MainScene' Scene.
 * @type {LayersInScene0}
 */
this["MainScene"] = new LayersInScene0();
/** Dictionary of Layers in the 'incr_textRenderingScene' Scene.
 * @type {LayersInScene1}
 */
this["incr_textRenderingScene"] = new LayersInScene1();
/** Dictionary of Layers in the 'Construct Editor Scene: MenuConstruct' Scene.
 * @type {LayersInScene2}
 */
this["Construct Editor Scene: MenuConstruct"] = new LayersInScene2();

    }
}




/** A ScrollingPanel is a specialized GraphicObject with a Scene that it renders to its RenderTarget/Texture.
 * The Cameara that renders the Scene is the 'view window' into the Scene in question, and if the content from the Scene is larger
 * than the Camera's bounds, then scroll pills appear, and the end-user can navigate around the Scene by scrolling.
 * Within the Scene, a LayoutStack manages the layout of the contained content an informs the ScrollingPanel of the contents' size.
 * @extends CursorInputOverrideButton
 */
class ScrollingPanel extends CursorInputOverrideButton
{
    /** A ScrollingPanel is a specialized GraphicObject with a Scene that it renders to its RenderTarget/Texture.
    * The Cameara that renders the Scene is the 'view window' into the Scene in question, and if the content from the Scene is larger
    * than the Camera's bounds, then scroll pills appear, and the end-user can navigate around the Scene by scrolling.
    * Within the Scene, a LayoutStack manages the layout of the contained content an informs the ScrollingPanel of the contents' size.
    * @param {SceneObject} parent The SceneObject that will become the new SceneObject's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
    * @param {string} name The name of the ScrollingPanel. [DEFAULT: "ScrollingPanel"]
    */
    constructor(parent,name)
    {
        /** The Scene where the content in this ScrollingPanel resides.
         * @type {Scene}
         */
        this.scene=null;


        /** The LayoutStack that manages the content in this ScrollingPanel. 
         * In order for any content to be properly recognized by this ScrollingPanel, it must be added to the LayoutStack using 'ScrollingPanel.layoutStack.addElements'
         * @type {LayoutStack}
         */
        this.bodyStack=null;


        /** The Camera that renders the 'view window' of this ScrollingPanel to it's RenderTarget/Texture. 
         * @type {OrthographicCamera}
         */
        this.camera=null;


        /** The RenderTarget that this ScrollingPanel is rendered to. 
         * @type {RenderTarget}
         */
        this.renderTarget=null;


        /** The width of the ScrollingPanel. This also informs the width of the Camera's view area within the Scene. 
         * @default 500
         * @type {number}
         */
        this.width=null;


        /** The height of the ScrollingPanel. This also informs the height of the Camera's view area within the Scene. 
         * @default 500
         * @type {number}
         */
        this.height=null;


        /** Flag determining if the end-user can scroll by dragging anywhere within the ScrollingPanel.
         * If false, the user can still Scroll using the standard mouse/trackpad methods, or by dragging the scroll pills.
         * @default true
         * @type {boolean}
         */
        this.dragPanelToScroll=null;


        /** Flag determining if the scrolling motion maintains momentum when the end-user 'flings' their finger across the ScrollPanel (if 'dragPanelToScrol=true').
         * @default true
         * @type {boolean}
         */
        this.dragPanelMomentum=null;


        /** Value that multiplies the momentum speed of the ScrollingPanel (if applicable) each fixedUpdate, causing the 'flung' scrolling to slow down eventually.
         * @default 0.9
         * @type {number}
         */
        this.panelDragMomentumDecay=null;


        /** A UiPanel/Button that can be dragged up and down to control the vertical scroll of this ScrollingPanel.
         * The scroll pills are children of the ScrollingPanel, and are not within the ScrollingPanel's Scene.
         * @type {UiPanel}
         */
        this.scrollPillVertical=null;


        /** A UiPanel/Button that can be dragged left and right to control the horizontal scroll of this ScrollingPanel.
         * The scroll pills are children of the ScrollingPanel, and are not within the ScrollingPanel's Scene.
         * @type {UiPanel}
         */
        this.scrollPillHorizontal=null;


        /** Width of the verticalScrollPill and height of the horizontalScrollPill. 
         * This value will be automatically adjusted down if it is more than 25% of the width or height of this ScrollingPanel.
         * @default nc.uiStyle.spacer_medium
         * @type {number}
         */
        this.scrollPillThickness=null;


        /** Number determining the length to width ratio of the scroll pills. 
         * This value will be automatically adjusted down if it results in a scroll pill that is longer than 50% of its range of motion.
         * @default 3
         * @type {number}
         */
        this.scrollPillShapeRatio=null;


        /** The Color of the scroll pills. 
         * @type {Color}
         */
        this.scrollPillColor=null;


        /** The Color of the scroll pills when highlighted. The 'alpha' value from this color is disregarded.
         * @type {Color}
         */
        this.scrollPillHighlightColor=null;


        /** The baseline opacity of the scroll pills.
         * @type {number}
         */
        this.scrollPillOpacity=null;


        /** The current vertical scroll amount ranging from 0 to 1.
         * @type {number}
         */
        this.scrollAmountVertical=null;


        /** The current horizontal scroll amount ranging from 0 to 1.
         * @type {number}
         */
        this.scrollAmountHorizontal=null;


        /** The number of seconds (since the latest scrolling activity) before the scroll pills will fade away.
         * The pills will re-appear upon new scroll activity. Set this value to 0 to make the scroll pills never fade away.
         * @default 1.2
         * @type {number}
         */
        this.scrollPillFadeDelay=null;


        /** The pivot point of the ScrollingPanel.
         * @default new Vector2(-.5,.5)
         * @type {Vector2}
         */
        this.pivotPoint=null;


        /** A ScrollingPanel is ultimately a 'pre-rendered' Scene that is positioned in the outer Scene and then rendered again. 
        * Because of this, certain canvas sizes or TextBox positioning can lead to slightly blurrier rendering that can be noticable for finer detail.
        * Calling this function can mitigate such fine-detail-blurriness, as it sets the downscalingMode and upscalingMode to 'nearest',
        * and sets the 'snapToNearestWorldPosition' to true. These settings help to ensure that the ScrollingPanel texture pixels are always 
        * aligned with the canvas pixels, preserving the original crispy edges. The tradeoff with using this mode is that 
        * the position of text will appear to always snap to the nearest pixel, which can lead to jerky-looking 
        * movement at slow speeds, and also rotation and other transformations will tear badly.
        * @default false
        * @type {boolean}
        */
        this.useNearestPixelRendering = null;


        /** Boolean determining if uiZoom affects the affective view size of the ScrollingPanel.
         * @default true
         * @type {boolean}
         */
        this.uiZoomAffectsPanelSize = null;
    }


    /** Re-parents a descendant of the ScrollingPanel Scene to the SceneContaining the ScrollingPanel itself while maintaining visual global position.
     * @param {SceneObject} sceneObject The SceneObject to move from the ScrollingPanel Scene to the Scene that contains the ScrollingPanel.
     */
    popToOuterSceneAndMaintainPosition(sceneObject){}


    /** Returns a Vector3 corresponding to the global position of a SceneObject residing in the ScrollingPanel Scene, but from the context of
     * the 'outer' Scene which contains the ScrollingPanel itself. This can be used to align something in the 'outer' Scene with something
     * inside the ScrollingPanel Scene.
     * @param {SceneObject} sceneObject The SceneObject within the ScrollingPanel Scene to get the position of.
     */
    getOuterScenePosition(sceneObject){}


    /** Scrolls the ScrollingPanel so that the given SceneObject is visible within its Camera's viewing area.
     * Dimensions, and buffer values can be supplied to ensure that the entire SceneObject is made visible upon calling this function. 
     * @param {SceneObject} sceneObject The SceneObject to scroll to.
     * @param {number} [width] The width of the SceneObject can be supplied here to help ensure that the entire object is visible within the Camera's viewing area. If the SceneObject has a configured LayoutObject, then this parameter can be left undefined, and the LayourObject's width will automatically be applied. [DEFAULT: 0]
     * @param {number} [height] The height of the SceneObject can be supplied here to help ensure that the entire object is visible within the Camera's viewing area. If the SceneObject has a configured LayoutObject, then this parameter can be left undefined, and the LayourObject's height will automatically be applied. [DEFAULT: 0]
     * @param {number} [widthBuffer] A buffer can be supplied here to ensure that the scrolling results in the SceneObject being visible with X amount of room to spare. [DEFAULT: 0]
     * @param {number} [heightBuffer] A buffer can be supplied here to ensure that the scrolling results in the SceneObject being visible with Y amount of room to spare. [DEFAULT: 0]
     */
    scrollToObject(sceneObject,width,height,widthBuffer,heightBuffer){}
}


/** A specialized SceneObject which populates and manipulates 'symbol' objects to create a spinning reel to be used for slot games.
 * The 'spinning' effect is created by moving each GraphicObject along a modulus-style path, where the represented symbol changes when each GraphicObject reaches the 'jump' point in the path.
 * The symbols can be customized by supplying a CustomObjectDefinition or CustomAddOnDefinition, which will be used in the population of each symbol.
 * [REQUIREMENT: module - slotReels]
 * [REQUIREMENT: license - proGaming]
 * @extends SceneObject
 */
class SlotReel extends SceneObject
{
    /** A specialized SceneObject which populates and manipulates 'symbol' objects to create a spinning reel to be used for slot games.
     * The 'spinning' effect is created by moving each GraphicObject along a modulus-style path, where the represented symbol changes when each GraphicObject reaches the 'jump' point in the path.
     * The symbols can be customized by supplying a CustomObjectDefinition or CustomAddOnDefinition, which will be used in the population of each symbol.
     * @param {SceneObject} [parent] The parent of the new SlotReel. 
     * @param {string} [name] The name of the new SlotReel.
     * @param {number} [numMainSymbols] The number of symbol objects meant to be the main, visible symbols within this SlotReel. [DEFAULT: 3]
     * @param {number} [numTopBufferSymbols] The number of symbol objects that will be populated 'above' the main visible symbols for this SlotReel. It should be noted that since the motion of the symbols in this SlotReel is completely customizable, these buffer symbols will not necessarily be above the main symbols. [DEFAULT: 1]
     * @param {number} [numBottomBufferSymbols] The number of symbol objects that will be populated 'below' the main visible symbols for this SlotReel. It should be noted that since the motion of the symbols in this SlotReel is completely customizable, these buffer symbols will not necessarily be below the main symbols. [DEFAULT: 1]
     * @param {CustomObjectDefinition|CustomAddOnDefinition} [symbolDefinition] Provide a CustomObjectDefinition or CustomAddOnDefinition here, and the given definition will be used to populate customized symbol objects with that definition. If a CustomObjectDefinition is supplied then the populated symbols will be instances of that CustomObject, if a CustomAddOnDefinition is supplied then the populated symbols will be GraphicObjects that each include the given CustomAddOn. The supplied definition should implement the 'setSymbol' function, which takes a single string parameter which will be passed whenever the associated symbol is altered. It can also implement the 'symbolPosition' numeric property, which will be updated by the SlotReel as each symbol moves along the symbol path for this SlotReel. The provided CustomObjectDefinition or CustomAddOnDefinition are where any further customizations for each symbol GraphicObject can be defined. [DEFAULT: undefined]
     */
    constructor(parent,name,numMainSymbols,numTopBufferSymbols,numBottomBufferSymbols,symbolDefinition)
    {
        /** If no 'symbolPathConstructDefinition' is connected to this SlotReel, then the defaultSymbolPathTravelX and defaultSymbolPathTravelY define the spinning motion of this SlotReel.
         * The defaultSymbolPathTravelY value determines the amount of vertical travel per 'symbolPosition'. The symbolPosition property value is populated by the SlotReel as the symbols move, and it corresponds to each symbol's location 
         * along the symbol path, where a value of 0 corresponds to the center of the first main visible symbol, 1 corresponds to the next main visible symbol, and -1 corresponds to the top buffer symbol just above the symbol in position 0.
         * So, the default value of 200 for this property means that each symbol will be 200 vertical world units from the next.
         * @default 200
         * @type {number}
         */
        this.defaultSymbolPathTravelY=null;


        /** If no 'symbolPathConstructDefinition' is connected to this SlotReel, then the defaultSymbolPathTravelX and defaultSymbolPathTravelY define the spinning motion of this SlotReel.
         * The defaultSymbolPathTravelX value determines the amount of horizontal travel per 'symbolPosition'. The symbolPosition property value is populated by the SlotReel as the symbols move, and it corresponds to each symbol's location 
         * along the symbol path, where a value of 0 corresponds to the center of the first main visible symbol, 1 corresponds to the next main visible symbol, and -1 corresponds to the top buffer symbol just above the symbol in position 0.
         * So, the default value of 0 for this property means that each symbol does not travel horizontally as it moves along the symbol path.
         * @type {number}
         */
        this.defaultSymbolPathTravelX=null;


        /** The spinSpeed property represents the rate of motion for each symbol object during the reel spin. The value corresponds to the amount of travel per 60th
         * of a second, where a value of 1 indicates that each symbol will move one full symbol position each 60th of a second.
         * @default -0.25
         * @type {number}
         */
        this.spinSpeed=null;


        /** The owner of the function that defines this SlotReel's motion during the 'windup' state. The windup motion for this SlotReel can be customized by providing a bespoke function here.
         * The windup function should take 2 numeric parameters (progress and windupMagnitude), and return a symbolPostion offset value. The progress parameter sent to the windup function
         * will interpolate smoothly from 0 to 1 over a time corresponding to this SlotReel's 'windupDuration' property. The windupMagnitude value sent to the windup function will be taken
         * directly from ths SlotReel's 'windupMagnitude' property, and can be used (optionally) in the function to change the motion dynamically. The windup function should return a value corresponding
         * to the 'symbolPosition' offset that all of the symbols will experience given the current 'progress' value; so for a windup function to make the symbols move up half a symbol position,
         * the provided windup function should return a value of 0.5 at its peak.
         * @type {object}
         */
        this.windupMotionFunctionOwner=null;


        /** The name of the function that defines this SlotReel's motion during the 'windup' state. The windup motion for this SlotReel can be customized by providing a bespoke function here.
         * The windup function should take 2 numeric parameters (progress and windupMagnitude), and return a symbolPostion offset value. The progress parameter sent to the windup function
         * will interpolate smoothly from 0 to 1 over a time corresponding to this SlotReel's 'windupDuration' property. The windupMagnitude value sent to the windup function will be taken
         * directly from ths SlotReel's 'windupMagnitude' property, and can be used (optionally) in the function to change the motion dynamically. The windup function should return a value corresponding
         * to the 'symbolPosition' offset that all of the symbols will experience given the current 'progress' value; so for a windup function to make the symbols move up half a symbol position,
         * the provided windup function should return a value of 0.5 at its peak.
         * @type {string}
         */
        this.windupMotionFunctionName=null;


        /** The amount of time that this SlotReel will spend in the 'windup' state.
         * @type {number}
         */
        this.windupDuration=null;


        /** A value sent to the windup motion function that can be used (optionally) within the function to enable the windup motion to be manipulated dynamically.
         * @type {number}
         */
        this.windupMagnitude=null;


        /** The owner of the function that defines this SlotReel's motion during the 'bounce' state. The bounce motion for this SlotReel can be customized by providing a bespoke function here.
         * The bounce function should take 2 numeric parameters (progress and bounceMagnitude), and return a symbolPostion offset value. The progress parameter sent to the bounce function
         * will interpolate smoothly from 0 to 1 over a time corresponding to this SlotReel's 'bounceDuration' property. The bounceMagnitude value sent to the bounce function will be taken
         * directly from ths SlotReel's 'bounceMagnitude' property, and can be used (optionally) in the function to change the motion dynamically. The bounce function should return a value corresponding
         * to the 'symbolPosition' offset that all of the symbols will experience given the current 'progress' value; so for a bounce function to make the symbols move up half a symbol position,
         * the provided bounce function should return a value of 0.5 at its peak.
         * @type {object}
         */
        this.bounceMotionFunctionOwner=null;


        /** The name of the function that defines this SlotReel's motion during the 'bounce' state. The bounce motion for this SlotReel can be customized by providing a bespoke function here.
         * The bounce function should take 2 numeric parameters (progress and bounceMagnitude), and return a symbolPostion offset value. The progress parameter sent to the bounce function
         * will interpolate smoothly from 0 to 1 over a time corresponding to this SlotReel's 'bounceDuration' property. The bounceMagnitude value sent to the bounce function will be taken
         * directly from ths SlotReel's 'bounceMagnitude' property, and can be used (optionally) in the function to change the motion dynamically. The bounce function should return a value corresponding
         * to the 'symbolPosition' offset that all of the symbols will experience given the current 'progress' value; so for a bounce function to make the symbols move up half a symbol position,
         * the provided bounce function should return a value of 0.5 at its peak.
         * @type {string}
         */
        this.bounceMotionFunctionName=null;


        /** The amount of time that this SlotReel will spend in the 'bounce' state.
         * @type {number}
         */
        this.bounceDuration=null;


        /** A value sent to the bounce motion function that can be used (optionally) within the function to enable the bounce motion to be manipulated dynamically.
         * @type {number}
         */
        this.bounceMagnitude=null;


        /** Boolean indicating if this SlotReel is in 'assembleReelDataOnTheFly' mode. When true, the data for this reel is initially only seeded with a small portion of 
         * of reel data, and each reel spin adds its symbols (as provided to the 'setTarget' function) to the end of the reel data array. The reel data continues to grow with each 
         * spin until it meets the 'reelDataAssemblyMax' threshold, at which point the additional symbols overwrite a random portion of the existing reel data. 
         * When false, the entire reel must be provided initially.
         * @default false
         * @type {boolean}
         */
        this.assembleReelDataOnTheFly=null;


        /** When 'assembleReelDataOnTheFly' for this SlotReel is true, this property acts a reel data length cap. Once the reel data length reaches this value additional symbols provided
         * in the 'setTarget' call are randomly placed within the reel data, overwriting previously placed reel data.
         * @default 200
         * @type {number}
         */
        this.reelDataAssemblyMax=null;


        /** Read-only string indicating which state this SlotReel is in. 
         * States include 'stopped', 'windup', 'spinFree', 'stopping', 'stopImminent', and 'bounce', which can be found in constants.slotReelStates.
         * - The 'stopped' state corresponds when the SlotReel is stopped.
         * - The 'windup' state corresponds just before the main portion of the spin, when the SlotReel is 'winding up'.
         * - The 'spinFree' state corresponds to when SlotReel is freely spinning, which will continue indefinitely until 'beginStop' or 'slam' are called.
         * - The 'stopping' state corresponds to the time during the spin after 'beginStop' has been called; the SlotReel will continue in this state until the final stopping symbols have been found.
         * - The 'stopImminent' state corresponds to when the final stopping symbols are active/visible on the SlotReel, and they just need to travel into their final position.
         * - The 'bounce' state corresponds to right before the SlotReel spin is over, and the symbols are bouncing around to simulate a physical recoil action.
         * @type {string}
         * @readonly
         */
        this.reelState=null;


        /** The PauseEvent or Array of PauseEvents that this SlotReel will be immune to. 
         * Set this parameter to [] for this Swooper to have no pause immunity.
         * @default nc.defaultPauseImmunity
         * @type {PauseEvent & Array.<PauseEvent>}
         */
        this.pauseImmunity = null;


        /** The SpeedControl or Array of SpeedControls that this SlotReel is affected by.
         * @default nc.defaultSpeedControl
         * @type {SpeedControl & Array.<SpeedControl>}
         */
        this.speedControl = null;


        /** The number of 'symbol' GraphicObjects that are meant to be the main visible symbols for this SlotReel. 
         * This property is read-only since its value is set once in the constructor.
         * @type {number}
         * @readonly
         */
        this.numMainSymbols=null;


        /** The number of symbol objects that will be populated 'above' the main visible symbols for this SlotReel. 
         * It should be noted that since the motion of the symbols in this SlotReel is completely customizable, these buffer symbols will not necessarily be above the main symbols.
         * This property is read-only since its value is set once in the constructor.
         * @type {number}
         * @readonly
         */
        this.numTopBufferSymbols=null;


        /** The number of symbol objects that will be populated 'below' the main visible symbols for this SlotReel. 
         * It should be noted that since the motion of the symbols in this SlotReel is completely customizable, these buffer symbols will not necessarily be below the main symbols.
         * This property is read-only since its value is set once in the constructor.
         * @type {number}
         * @readonly
         */
        this.numBottomBufferSymbols=null;


        /** The total number of symbol objects that will be populated for this SlotReel, which includes the numMainSymbols, numTopBufferSymbols, and numBottomBufferSymbols.
        * This property is read-only since its value is effectively set once in the constructor.
        * @type {number}
        * @readonly
        */
        this.numSymbols=null;


        /** The definition of the CustomObject CustomAddOn that was used to populate each of the symbol objects. 
         * The CustomObject or CustomAddOn in question should implement the 'setSymbol' function, which takes a single string parameter which will be passed whenever the associated symbol is altered. 
         * It can also implement the 'symbolPosition' numeric property, which will be updated by the SlotReel as each symbol moves along the symbol path for this SlotReel. 
         * The definition of this object is also where further customization of each symbol can be defined.
         * This property is read-only since its value is set once in the constructor.
         * @type {CustomAddOnDefinition}
         * @readonly
         */
        this.symbolDefinition=null;


        /** Boolean determining if the SlotReel's positioning of its symbol objects along the reel path is overriden. 
         * To entirely override reel path positioning of the symbols, set this property to true, and be sure to implement an 'updateSymbolPosition' function within the symbolDefinition object. 
         * Within that function, you can create custom positioning for each symbol based on the 'symbolPosition' property, which indicates the relative or 'unit' position of 
         * each symbol (ie a reel with 3 main symbols and a single buffer on top and bottom would have symbols with symbolPosition values of -1, 0, 1, 2, 3). Using the 'symbolPosition'
         * property, you can write functionality to position each symbol as desired based on its relative position.
         * @type {boolean}
         * @default false
         */
        this.symbolPathOverrideMode=null;
    }


    /** Call this function to provide this SlotReel with its initial reel data, and the symbols that will appear when the SlotReel is first displayed.
     * Reel data consists of an array of strings that represent the designation of each symbol on the 'reel strip'.
     * The data that is provided depends on whether or not the SlotReel is in 'assembleReelDataOnTheFly' mode. 
     * If assembleReelDataOnTheFly is true, then only a small portion of reel data need be provided, as each subsequent call to 'setTarget' will add to the reel data.
     * If assembleReelDataOnTheFly is false, then the entire reel data set must be provided here.
     * @param {Array.<string>} reelData The set of initial reel data to provide to this SlotReel. If assembleReelDataOnTheFly is true, only a small portion of reel data need be provided, otherwise the entire reel data set must be provided here.
     * @param {Array.<string>} [initialSymbols] An array of strings representing the initial symbols to populate on the reel when it is first displayed. If left undefined, starting symbols will be taken directly from the reelData provided. 
     */
    populateInitialReelData(reelData,initialSymbols){}


    /** Sets the target position in the reel data (the reel stop), or the target group of symbols to be displayed to be displayed when the SlotReel comes to a stop.
     * If assembleReelDataOnTheFly is false, then provide an index in the reel data here, and the symbol at that index will be displayed in this SlotReel's first main visible
     * position (position 0) spin ends, with the subsequent symbols displayed below respectively.
     * If assembleReelDataOnTheFly is true, then provide an array of strings corresponding to the symbols to be displayed when the SlotReel spin stops - in this case
     * be sure to provide enough symbol strings for the top buffer symbols, the main symbols, and the bottom buffer symbols.
     * @param {number | Array.<string>} target If assembleReelDataOnTheFly is false provide the final stopping reel data index, if it's true provide final stopping set of symbols in an array. 
     */
    setTarget(target){}


    /** Function that begins the spin sequence for this SlotReel, changing the reelState from 'stopped' to 'windup'.
     * The SlotReel will perform the windup sequence, and then the reelState will be changed to 'spinFree', 
     * which will lead the SlotReel to spin until further interaction.
     */
    beginSpin(){}


    /** Function the starts the process of stopping a reel from spinning, changing the reelState from 'spinFree' to 'stopping'.
     * While the reelState is 'stopping', the SlotReel will continue to spin until it encounters the set of symbols it needs for the 
     * final stopped position. A 'performSplice' boolean (when true) will tell the SlotReel to jump to the position in the reel data such that
     * each new symbol made visible during the spin will be one of the final symbols needed - this expedites the stopping process. 
     * This value should be false if the reel is meant to spin just a finite number of positions (i.e. 1 position), as a value of true
     * would only extend the stopping process in this case.
     * @param {boolean} [performSplice] Boolean indicating if the SlotReel should jump to a place in the reel data such that the very next symbols made visible will be the final stopping symbols needed to stop the spin. [DEFAULT: true]
     */
    beginStop(performSplice){}


    /** Function that can be called during the SlotReel spin sequence to abruptly skip to the 'bounce' reelState.
     */
    slam(){}


    /** Returns the 'symbol' object at the given index. 
     * Any index in [-numTopBufferSymbols, numMainSymbols+numBottomBufferSymbols-1] can be provided, as that is the set of available symbolPositions.
     * If the SlotReel is currently in any reelState other than 'stopped' then the 'symbol' GraphicObject with the symbolPosition that is nearest to the index provided will be returned.
     * It should be noted that the type of the returned object depends on the original 'symbolDefinition' supplied to the SlotReel's constructor. If a CustomObjectDefinition was provided, 
     * then the returned object will have that type, otherwise the returned object will be of type GraphicObject.
     * @param {number} index The index of the 'symbol' GraphicObject to fetch. Any index in [-numTopBufferSymbols, numMainSymbols+numBottomBufferSymbols-1] can be provided, as that is the set of available symbolPositions.
     * @returns {SceneObject}
     */
    getSymbol(index){return(null);}


    /** Returns an Array with all of the 'symbol' objects in this SlotReel.
     * It should be noted that the type of the objects in the returned array depends on the original 'symbolDefinition' supplied to the SlotReel's constructor. 
     * If a CustomObjectDefinition was provided, then the returned array will contain objects of that type, otherwise the the array will contain GraphicObjects.
     * @param {boolean} [presortBySymbolPosition] Boolean indicating if the returned symbols should be sorted by their 'symbolPosition' values.
     * @returns {Array.<SceneObject>}
     */
    getSymbols(presortBySymbolPosition){return(null);}


    /** Adds a callback that occurs whenever the 'reelState' of this SlotReel is changed.
    * The new reelState and the previous reelState are sent to the callback as its first two parameters.
    * - The 'stopped' state corresponds when the SlotReel is stopped.
    * - The 'windup' state corresponds just before the main portion of the spin, when the SlotReel is 'winding up'.
    * - The 'spinFree' state corresponds to when SlotReel is freely spinning, which will continue indefinitely until 'beginStop' or 'slam' are called.
    * - The 'stopping' state corresponds to the time during the spin after 'beginStop' has been called; the SlotReel will continue in this state until the final stopping symbols have been found.
    * - The 'stopImminent' state corresponds to when the final stopping symbols are active/visible on the SlotReel, and they just need to travel into their final position.
    * - The 'bounce' state corresponds to right before the SlotReel spin is over, and the symbols are bouncing around to simulate a physical recoil action.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever the FlowState changes.
    * @param {string} callbackName The name of the callback function that occurs whenever the FlowState changes.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever the FlowState changes.
    */
    addReelStateChangeCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeReelStateChangeCallback(callbackOwner,callbackName){}
}


/** A specialized PlaybackController that manages the playback of sound assets.
 * [REQUIREMENT: module - sounds]
 * [NON-INSTANTIABLE]
 * @extends TimePlaybackController
 */
class Sound extends TimePlaybackController
{
    constructor()
    {
        /** The Sounds's name. This must be unique among Sounds.
         * @type {string}
         * @readonly
         */
        this.name=null;


        /** Boolean indicating if this Sound is currently loaded. 
         * @type {boolean}
         * @readonly
         */
        this.isLoaded=null;


        /** The LoadingTier that this Sound belongs too.
         * LoadingTiers are a means to organize AssetComponents into separately downloadable groups. 
         * @type {Array.<number>}
         * @readonly
         */
        this.loadingTierRequirements=null;


        /** String indicating the source of this Sound if it is a duplicate.
         * Incisor® automatically detects when two or more AssetComponents are identical, ensuring that only one 
         * copy of the associated data is loaded to reduce the loaded size of the project.
         * Those AssetComponents that are duplicates are marked by indicating the name of the source of their data.
         * This member is undefined for AssetComponents that are not duplicates.
         * @default undefined
         * @type {string}
         * @readonly
         */
        this.duplicateSource=null;


        /** The current volume setting for this Sound, where 0 is quiet and 1 is full volume.
         * @type {number}
         */
        this.mainVolume = null;


        /** The VolumeControls that this Sounds currently subscribes to.
         * VolumeControls are a way to control the volumes of groups of sounds, much like a 'audio bus'.
         * @default [nc.volumeControls.MainVolumeControl]
         * @type {Array.<VolumeControl>}
         */
        this.volumeControl = null;


        /** The net volume, including the mainVolume of the Sound, and all of the volumes of the Sound's VolumeControls.
         * @type {number}
         * @readonly
         */
        this.netVolume=null;
    }


    /** Interpolates the mainVolum over the designated period of time.
     * @param {number} volume The target volume to swoop to.
     * @param {number} duration The duration of the volume change [DEFAULT: 0]
     * @param {object} completionCallbackOwner The object owning the function that will be called when the swoop is complete.
     * @param {string} completionCallbackName The name of the function that will be called when the swoop is complete.
     * @param {Array|any} completionCallbackArgs Parameters for the function that will be called when the swoop is complete.
     * @returns {Swooper}
     */
    swoopVolume(volume,duration,completionCallbackOwner,completionCallbackName,completionCallbackArgs){return(null);}
}


/** VolumeControls are a way to control the volumes of groups of sounds, much like a 'audio bus'.
 * To make a particular Sound subscribe to a VolumeControl, add the VolumeControl to the Sound's 'volumeControl' array.
 * [REQUIREMENT: module - sounds]
 * [NON-INSTANTIABLE]
 */
class VolumeControl
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The VolumeControl's name. This must be unique among VolumeControls.
         * @type {string}
         * @readonly
         */
        this.name=null;


        /** The volume value for this VolumeControl. The volume values for Sounds typically range from 0 to 1.
         * @type {number}
         */
        this.volume=null;
    }
}


/** An internal CustomObject used within imported SpineAnimations.
 */
class incr_SpineBone extends SceneObject
{
    /** An internal CustomObject used within imported SpineAnimations.
    * @param {SceneObject} parent
    * @param {string} name
    */
    constructor(parent,name){}
}


/** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
 */
class incr_SpineBoneUpdaterAddOn extends CustomAddOn_SceneObject
{
    /** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
    * @param {SceneObject} owner
    */
    constructor(owner){}
}


/** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
 */
class incr_SpineConstrainedTransformationAddOn  extends CustomAddOn_SceneObject
{
    /** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
    * @param {SceneObject} owner
    */
    constructor(owner){}
}


/** An internal CustomAddOn_GraphicObject used within imported SpineAnimations.
 */
class incr_SpineDeformAddOn extends CustomAddOn_GraphicObject
{
    /** An internal CustomAddOn_GraphicObject used within imported SpineAnimations.
    * @param {SceneObject} owner
    */
    constructor(owner){}
}


/** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
 */
class incr_SpineInverseKinematicConstraintAddOn extends CustomAddOn_SceneObject
{
    /** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
    * @param {SceneObject} owner
    */
    constructor(owner){}
}


/** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
 */
class incr_SpinePathConstraintAddOn  extends CustomAddOn_SceneObject
{
    /** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
    * @param {SceneObject} owner
    */
    constructor(owner){}
}


/** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
 */
class incr_SpineTransformConstraintAddOn extends CustomAddOn_SceneObject
{
    /** An internal CustomAddOn_SceneObject used within imported SpineAnimations.
    * @param {SceneObject} owner
    */
    constructor(owner){}
}


/** An internal CustomObject used within imported SpineAnimations.
 */
class incr_SpinePath extends Curve
{
    /** An internal CustomObject used within imported SpineAnimations.
    * @param {SceneObject} parent
    * @param {string} name
    */
    constructor(parent,name){}
}


/** A SpriteSetter is a PlaybackController that switches a GraphicObject's graphicAsset between numerically sequential GraphicAssets.  It is typically used to create a sprite animation.
 * [NON-INSTANTIABLE]
 * @extends ValuePlaybackController
 */
class SpriteSetter extends ValuePlaybackController
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;
    }


    /** Returns a copy of the array of GraphicAssets that are iterated through during playback.
     * @returns {Array.<GraphicAsset>}
     */
    getAssociatedGraphicAssets(){return null;}


    /** Manually populates the array of GraphicAssets that will be iterated through during playback.
     * @param {Array.<GraphicAsset>|GraphicAsset} graphicAsset GraphicAsset or Array of Graphic Assets that will be iterated through during playback.
     */
    setAssociatedGraphicAssets(graphicAsset){return null;}


    /** Sets the key GraphicAsset. This GraphicAsset's name should end in a number. 
     * All GraphicAssets whose name matches the key GraphicAsset's name with a different trailing number will be used to set the SpriteSetter's associated GraphicAssets list. 
     * For example, if the key GraphicAsset is named "MyAnimation001", all GraphicAssets with the name "MyAnimation" followed by any sequence of the digits 0-9 will be gathered into this SpriteSetter's associated GraphicAssets.
     * @param {GraphicAsset} graphicAsset The GraphicAssets used for automatical detection all all numerically similar GraphicAssets.
     */
    setKeyGraphicAsset(graphicAsset){return null;}
}


/** A Supervisor is a class that helps manage the processes behind UI components that allow the end-user to monitor and adjust values and properties during runtime.
 * For example, the UiNumberSupervisor_TextField type is a specialized UiTextField that contains an additional Supervisor member, 
 * and its purpose is to serve as a visual 'supervisor' for any numeric property, displaying the current value as it changes,
 * and updating the value if the end-user types a new number into the UiTextField. The Supervisor object itself houses callbacks for 
 * setting the target property, getting the target property, and updating the associated visual compoenents (i.e. setting the string in the UiTextField to the target number value).
 * [REQUIREMENT: module - extendedUi]
 */
class Supervisor
{
    /** A Supervisor is a class that helps manage the processes behind UI components that allow the end-user to monitor and adjust values and properties during runtime.
    * For example, the UiNumberSupervisor_TextField type is a specialized UiTextField that contains an additional Supervisor member, 
    * and its purpose is to serve as a visual 'supervisor' for any numeric property, displaying the current value as it changes,
    * and updating the value if the end-user types a new number into the UiTextField. The Supervisor object itself houses callbacks for 
    * setting the target property, getting the target property, and updating the associated visual compoenents (i.e. setting the string in the UiTextField to the target number value).
    * [REQUIREMENT: module - extendedUi]
    * @param {SceneObject} owner The SceneObject owning the visual components associated with this Supervisor.
    */
    constructor(owner)
    {

        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The owner of the callback function that is called whenever this Supervisor needs to retrieve the property being supervised.
         * The provided callback function must return the value being supervised.
         * @type {object}
         */
        this.supervisedPropertyGetterCallbackOwner=null;


        /** The name of the callback function that is called whenever this Supervisor needs to retrieve the property being supervised.
         * The provided callback function must return the value being supervised.
         * @type {string}
         */
        this.supervisedPropertyGetterCallbackName=null;


        /** Arguments for the callback function that is called whenever this Supervisor needs to retrieve the property being supervised.
         * The provided callback function must return the value being supervised.
         * @type {any}
         */
        this.supervisedPropertyGetterCallbackArgs=null;



        /** The owner of the callback function that is called whenever this Supervisor sets the value of the property being supervised.
         * The provided callback function will receive the new value for the property as its first parameter.
         * @type {object}
         */
        this.supervisedPropertySetterCallbackOwner=null;


        /** The name of the callback function that is called whenever this Supervisor sets the value of the property being supervised.
         * The provided callback function will receive the new value for the property as its first parameter.
         * @type {string}
         */
        this.supervisedPropertySetterCallbackName=null;


        /** Arguments for the callback function that is called whenever this Supervisor sets the value of the property being supervised.
         * The provided callback function will receive the new value for the property as its first parameter.
         * @type {any}
         */
        this.supervisedPropertySetterCallbackArgs=null;


        /** The owner of the callback function that is called whenever this Supervisor updates the visuals to reflect changes to the value of the property being supervised.
         * The provided callback function will receive the up-to-date property value as its first parameter.
         * @type {object}
         */
        this.updateVisualsCallbackOwner=null;


        /** The name of the callback function that is called whenever this Supervisor updates the visuals to reflect changes to the value of the property being supervised.
         * The provided callback function will receive the up-to-date property value as its first parameter.
         * @type {string}
         */
        this.updateVisualsCallbackName=null;


        /** Arguments for the callback function that is called whenever this Supervisor updates the visuals to reflect changes to the value of the property being supervised.
         * The provided callback function will receive the up-to-date property value as its first parameter.
         * @type {any}
         */
        this.updateVisualsCallbackArgs=null;
    }


    /** Sets the supervised property's value. This call is invoked upon the end-user manipulation of the associated visual components.
    * @param {any} value The value to set the supervised property to.
    */
    setSupervisedProperty(value){}


    /** Creates and connects to 'standard' setter and getter functions that are simply defined by getting an property (by owner and name), and setting a property (by owner and name);
     * For more custom functionality, such as conditional getting and setting functionality, custom getter and setter functions can be built and linked to directly using 
     * 'supervisedPropertyGetterCallbackOwner', 'supervisedPropertyGetterCallbackName', 'supervisedPropertySetterCallbackOwner', and 'supervisedPropertySetterCallbackName'.
     * @param {object} supervisedPropertyOwner The owner of the propertry being supervised.
     * @param {string} supervisedPropertyName The name of the propertry being supervised.
     * @param {object} [validationFunctionOwner] The owner of an optional validation function. This function receives, sanitizes, and returns the supervised property.
     * @param {string} [validationFunctionName] The name of an optional validation function. This function receives, sanitizes, and returns the supervised property.
     */
    performStandardSetup(supervisedPropertyOwner,supervisedPropertyName,validationFunctionOwner,validationFunctionName){}


    /** Creates and connects to 'standard' setter and getter functions for "multi-supervision" scenarios;
     * For more custom functionality, such as conditional getting and setting functionality, custom getter and setter functions can be built and linked to directly using 
     * 'supervisedPropertyGetterCallbackOwner', 'supervisedPropertyGetterCallbackName', 'supervisedPropertySetterCallbackOwner', and 'supervisedPropertySetterCallbackName'.
     * @param {Array} standardSetupPropertyOwnerArray The array where the objects owning the supervised properties will be referenced.
     * @param {string|Array.<string>} supervisedPropertyName The name of the propertry being supervised. An array can be supplied here if the supervised property not a direct member.
     * @param {object} [validationFunctionOwner] The owner of an optional validation function. This function receives, sanitizes, and returns the supervised property.
     * @param {string} [validationFunctionName] The name of an optional validation function. This function receives, sanitizes, and returns the supervised property.
     */
    performStandardSetupForMultiSupervision(standardSetupPropertyOwnerArray,supervisedPropertyName,validationFunctionOwner,validationFunctionName){}
}


/** Object controlling the 'swooping' (or interpolation) of a given numeric property or properties over a duration (using fixedUpdate). 
 * An object of this type is returned from all 'swoop' calls, providing a means to manage the given swooping process.
 * [NON-INSTANTIABLE]
 */
class Swooper
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Name of the Swooper.
         * @type {string}
         */
        this.name=null;


        /** The number of properties being interpolated by this Swooper.
         * @type {number}
         */
        this.numProperties=null;


        /** The number representing the progress of the interpolation of the value or values on where 0 corresponds to the startValues, and 1 corresponds to the endValues.
         * This value is not meant to be manipulated as it is automatically changed over time via the internal fixedUpdate used by this Swooper.
         * @type {number}
         * @default 0
         */
        this.progress=null;


        /** The TweenType for this Swooper. A TweenType defines a method of interpolation between any two values or sets of values. The default TweenType is 'Linear',
         * which defines a perfectly even interpolation between the startValues and endValues. TweenTypes can vary the timing of interpolation between two sets of values, 
         * as well as the path of the interpolation.
         * @default nc.tweenTypes.Linear
         * @type {TweenType}
         */
        this.tweenType=null;


        /** Dictionary of dictionaries (per TweenType) of values that can be used to control this motion dynamically.
         * @default {}
         * @type {TweenControllers}
         */
        this.controllers=new TweenControllers();


        /** Array containing the starting value or values for the Swooper. The length of this array depends on this Swoop's 'numProperties'.
         * Upon initiating a Swooper for a given numeric property/properties, their current values are stored in this array and used as the initial conditions for the interpolation.
         * @type {Array.<number>}
         */
        this.startValues=null;


        /** Array containing the ending value or values for the Swooper. The length of this array depends on this Swoop's 'numProperties'.
         * These values define the final target values for the swooped properties.
         * @type {Array.<number>}
         */
        this.endValues=null;


        /** Array containing the current value(s) for this Swooper. These are the values that the Tween function manipulates based its 'progress' property to create the desired movement.
         * @type {Array.<number>}
         */
        this.currentValues=null;


        /** An un-specified JS object of 'any' type to enable the user to stash persistant elements of their swooper within the tweenFunction.
         * @type {object}
         */
        this.workspace = {};


        /** The object owning the optional callback function invoked when this Swooper completes.
         * @default undefined
         * @type {object}
         */
        this.completionCallbackOwner = null;


        /** The name of the optional callback function invoked when this Swooper completes.
         * @default undefined
         * @type {string}
         */
        this.completionCallbackName = null;


        /** Arguments for the optional callback function invoked when this Swooper completes.
         * @default undefined
         * @type {any}
         */
        this.completionCallbackArgs = null;


        /** The object owning the optional callback function invoked continuously (every fixedUpdate) during the interpolation process.
         * @default undefined
         * @type {object}
         */
        this.updaterCallbackOwner = null;


        /** The name of the optional callback function invoked continuously (every fixedUpdate) during the interpolation process.
         * @default undefined
         * @type {string}
         */
        this.updaterCallbackName = null;


        /** The PauseEvent or Array of PauseEvents that this Swooper will be immune to. 
         * Set this parameter to [] for this Swooper to have no pause immunity.
         * @default nc.defaultPauseImmunity
         * @type {PauseEvent & Array.<PauseEvent>}
         */
        this.pauseImmunity = null;


        /** The SpeedControl or Array of SpeedControls that this Swooper is affected by.
         * @default nc.defaultSpeedControl
         * @type {SpeedControl & Array.<SpeedControl>}
         */
        this.speedControl = null;
    }

    
    /** Stops the Swooper if it is in progress.
     * @param {boolean} [setToEndValues] Determines if the target properties are set to the endValues. [DEFAULT: false]
     * @param {boolean} [performCompletionCallback] Determines if the pre-determined completionCallback (if defined) is performed. [DEFAULT: false]
     */
    stop(setToEndValues,performCompletionCallback){}
}


/** Object defining a specific type of interpolation.
 */
class TweenType
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type="";


        /** Name of the Motion.
         * @type {string}
         */
        this.name="";


        /** A reference to the function that defines the nature of the TweenType's motion.
         * @type {Function}
         */
        this.tweenFunction = function(){};


        /** A list of optional tween controllers. These can be used to dynamically affect the nature of the TweenType's motion.
         * @type {Array.<string>}
         */
        this.tweenControllerNames = [];


        /** A list of optional tween controller default values.
         * @type {Array.<number>}
         */
        this.tweenControllerDefaultValues = [];


        /** The description of the TweenType - this will appear in the autocomplete documentation.
         * @type {string}
         */
        this.description = "";


        /** The description of the TweenType controllers - these descriptions will appear in the autocomplete documentation.
         * @type {Array.<string>}
         */
        this.controllerDescriptions = [];
    }
}





/** Dictionary of all registered TweenControllers.
 * [NON-INSTANTIABLE]
 */
class TweenControllers
{
    constructor()
    {
        
    }
}


/** Specialized SceneObject that presents a group of GraphicObjects as text.
 * TextAssemblies tend to be less performant that TextBoxes, as they result in more SceneObjects being rendered,
 * But TextAssemblies have the adventage of being able to manipulate indivual characters freely.
 * @extends SceneObject
 */
class TextAssembly extends SceneObject
{
    /** Specialized SceneObject that presents a group of GraphicObjects as text.
     * @param {SceneObject} [parent] The SceneObject that will become the new TextAssembly's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new TextAssembly object. [DEFAULT: 'TextAssembly']
     * @example
     * // Objective: Create a TextAssembly.
     * // Expected Result: You will see the words "Build It Once." on the screen.
     * 
     * // Create a TextAssembly
     * this.textAssembly = new TextAssembly();
     * this.textAssembly.string = "Build It Once.";
     */
    constructor(parent,name)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;
        
    
        /** The string value of the text to be displayed by this TextAssembly.
         * @default ""
         * @type {string}
         */
        this.string = null;



        /** Property to set this TextAssembly's string based on the associated phrase in the ProjectTranscript, 
         * which is updated based on the current language setting of the project.
         * See 'nc.phraseIDs' for a list of available phrases.
         * @default undefined
         * @type {string}
         * @example
         * // Objective: Set the text of a TextAssembly based on a phrase defined in the ProjectTranscript.
         * // Expected Result: You will see "Hello World" on screen if the project language is 'en', or "Hola Mundo" if the language is 'es'.
         * 
         * this.textAssembly = new TextAssembly();
         * this.textAssembly.phraseID = nc.phraseIDs["Hello World"];
         */
        this.phraseID = null;


        /** The maximum width that the laid out text will adhere to if 'wrapToFit' or 'scaleToFit' are true.
         * When greater than 0, this value also determines the positioning of left or right justified text.
         * A value of 0 corresponds to no limits on the width of the text.
         * @default 0
         * @type {number}
         */
        this.boxWidth = null;


        /** The maximum height that the laid out text will adhere to if 'scaleToFit' is true.
         * When greater than 0, this value also determines the positioning of top-justified or bottom-justified text.
         * A value of 0 corresponds to no limits on the height of the text.
         * @default 0
         * @type {number}
         */
        this.boxHeight = null;


        /** Bool determining if text will automatically flow onto new lines in order to fit the text
         * within the designated 'boxWidth' value.
         * @default true
         * @type {boolean}
         */
        this.wrapToFit = null;


        /** Bool determining if the text will automatically be scaled down to fit within the boxWidth and/or boxHeight.
         * @default true
         * @type {boolean}
         */
        this.scaleToFit = null;


        /** The horizontalJustification of this TextAssembly. 
         * For acceptable values, see 'nc.constants.justfications'.
         * Setting this value will change the horizontal justification for all of the text in this TextAssembly, but
         * the value can be set for individual sections of the text using 'TextAssembly.setHorizontalJustification'.
         * @default "left"
         * @type {string}
         */
        this.horizontalJustification = null;


        /** The verticalJustification of this TextAssembly. 
         * For acceptable values, see 'nc.constants.justfications'.
         * Setting this value will change the vertical justification for all of the text in this TextAssembly.
         * @default "top"
         * @type {string}
         */
        this.verticalJustification = null;


        /** The read-only width of the text (once laid out). 
         * This number encapsulates the final width of the laid out text, including all of the TextFormats, 
         * the boxWidth and boxHeight, scaleToFit, wrapToFit etc...
         * @type {number}
         * @readonly
         */
        this.textWidth = null;

    
        /** The read-only height of the text (once laid out). 
         * This number encapsulates the final height of the laid out text, including all of the TextFormats, 
         * the boxWidth and boxHeight, scaleToFit, wrapToFit etc...
         * @type {number}
         * @readonly
         */
        this.textHeight = null;


        /** For Texts or Textboxes with 'scaleToFit' set to true, this number denotes the multiplier that was applied 
         * in order for the given text to fit within the boxWidth, and boxHeight.
         * @type {number}
         * @readonly
         */
        this.scaleToFitFactor = null;


        /** Number representing the vertical placement of the baseline within each line of text in this TextAssembly.
         * A value of 0 corresponds to the baseline of the text being positioned at the very bottom of each line, 
         * and a value of .5 corresponds to the baseline of the text being positioned in the middle of each line. 
         * @default .22
         * @type {number}
         */
        this.baselinePosition = null;


        /** Object housing information about the customization of the characters within this TextAssembly.
         * This includes font, scale, baseline shift, kerning, line height, as well as information about 
         * EffectNodes and EffectController values used on the characters. 
         * Setting or adjusting this value will set the TextFormat for all of the characters in this TextAssembly.
         * See 'TextAssembly.setTextFormat' to set the TextFormat for individual sections of this TextAssembly.
         * @default new TextFormat()
         * @type {TextFormat}
         */
        this.textFormat = null;


        /** The LazyUpdater ultimately responsible for initiating the layout of the text. The setting of 'needsUpdate' and the
         * calling of 'updateIfNeeded' is magaged as much as is possible internally by Incisor®, but if the need to force an update
         * arises, set 'needsUpdate' to true, and call 'updateIfNeeded'.
         * @type {LazyUpdater}
         */
        this.layoutLazyUpdater = null;


        /** Boolean indicating if whitespace characters will be visible in this TextAssembly.
         * @default false
         * @type {boolean}
         */
        this.showWhiteSpace = null;
    }


    /** Method used to swap all instances of the given character with a designated GraphicAsset.
     * A TextFormat can also be supplied to help position and format the substituted GraphicAsset within the text.
     * @param {string} characterToSubstitute The the character that will be replaced with the designated GraphicAsset.
     * @param {GraphicAsset} [graphicAsset] The GraphicAsset that will substitute for the given characters. When this parameter is undefined, any previously defined substitution using the provided character will be disposed. The formats for previously substituted characters will need to be dealt with separately.
     * @param {TextFormat} [textFormat] Optional TextFromat to apply to the substituted GraphicAsset, which can be used to adjust its positioning and formating.
     */
    setSubstitutionCharacter(characterToSubstitute,graphicAsset,textFormat){}


    /** Sets the text format of the designated portion of text within a TextAssembly.
     * @param {TextFormat} textFormat The TextFormat that the specified characters will adopt.
     * @param {number} [startIdx] The index of the first character in the segment affected by this change. If left undefined, the given textFormat will be applied to all characters.
     * @param {number} [numChars] The length of the segment affected by this change. [DEFAULT: infinity]
     */
    setTextFormat(textFormat,startIdx,numChars){}


    /** Sets the horizontal justification of the given range of characters. 
     * It should be noted that when characters are laid out into multiple lines, the horizontal justification for a given line
     * is determined by the horizontal horizontalJustification value associated with the first character on that line.
     * @param {string} justification The horizontal justification that the specified characters will adopt. See 'nc.constants.justifications' for justification values.
     * @param {number} [startIdx] The index of the first character in the segment affected by this change.  If left undefined, the given horizontalJustification will be applied to all characters.
     * @param {number} [numChars] The length of the segment affected by this change. [DEFAULT: infinity]
     */
    setHorizontalJustification(justification,startIdx,numChars){}


    /** Inserts the given string at the given index.
     * @param {number} startIndex The index that the first character of the inserted string.
     * @param {string} stringToInsert The string to insert.
     */
    insert(startIndex,stringToInsert){}


    /** Deletes the given range of characters.
     * @param {number} startIndex The index of the first character to delete.
     * @param {number} count The number of characters to delete.
     */
    delete(startIndex,count){}


    /** Adds a callback that occurs whenever this TextBox string changed.
    * The updated string is sent to the callback as its first parameter.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this TextBox string changed.
    * @param {string} callbackName The name of the callback function that occurs whenever this TextBox string changed.
    * @param {any} [callbackArgs] Args for the callback function that occurs whenever this TextBox string changed.
    */
    addStringUpdateCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given stringUpdate callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeStringUpdateCallback(callbackOwner,callbackName){}


    /** Several object-pooling techniques are used internally within the TextAssembly and TextBox objects.
     * Displaying/rendering text with large numbers of characters can leave a significant memory-footprint in these pools.
     * This memory can be freed by calling this method - though the call itself may result in a one-time performance hit
     * if large strings have been displayed/rendered previously.
     */
    clearPools(){}


    /** Returns a new array containing the list of GraphicObjects that comprise the TextAssembly's current string.
     * @returns {Array.<GraphicObject>}
     */
    getCharacters(){return(null);}
}


/** A specialized Button that renders text to it's texture. 
 * All TextBoxes are connected to an internal text-rendering scene that renders directly to the given TextBox's RenderTarget.
 * TextBoxes have 3 editing modes: none, selectable, and editable.
 * Though TextBoxes inherit from Button, their default value for "buttonActive" value is false when the editing mode is set to 'none'
 * TextBoxes tend to be more performant than TextAssemblies, since the resulting object is singular vs the many character-children of TextAssemblies.
 * @extends Button
 */
class TextBox extends Button
{
    /** A specialized Button that renders text to it's texture. 
     * All TextBoxes are connected to an internal text-rendering scene that renders directly to the given TextBox's RenderTarget.
     * TextBoxes have 3 editing modes: none, selectable, and editable.
     * Though TextBoxes inherit from Button, their default value for "buttonActive" value is false when the editing mode is set to 'none'
     * @param {SceneObject} [parent] The SceneObject that will become the new TextBox's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new TextBox object. [DEFAULT: 'TextBox']
     * @example
     * // Objective: Expand and Contract a TextBox.
     * // Expected Result: When you press the text, the word "Expanding" will expand then the word "Contracting" will contract.
     * 
     * // Create a TextBox
     * this.textBox = new TextBox();
     * this.textBox.string = "Press Me";
     * 
     * // In order to have a TextBox respond to user interaction its editing mode needs to be set.
     * this.textBox.editingMode = nc.constants.textBoxEditingModes.selectable;
     * 
     * // Add a PressCallback. 
     * this.textBox.addPressCallback( this, "myPressCallback"  );
     * // Your first 2 parameters will always be the browser event and the camera.
     * this.myPressCallback = function( event, camera ) {
     *     this.textBox.scale.swoop.all( 3, 1, undefined, this, "myPressCompleteCallback" );
     *     this.textBox.string = "Expanding";
     * }
     * this.myPressCompleteCallback = function( event, camera ) {
     *      this.textBox.scale.swoop.all( 1, 1, undefined, this, "resetCallback" );
     *      this.textBox.string = "Contracting";
     * }
     * this.resetCallback = function( event, camera ) {
     *      this.textBox.string = "Press Me";
     * }
     */
    constructor(parent,name)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;
        
    
        /** The string value of the text to be displayed by this TextBox.
         * Setting this value directly clears the 'phraseID' property of this TextBox (if applicable).
         * @default ""
         * @type {string}
         * @example
         * // Objective: Set the text of a TextBox.
         * // Expected Result: You will see "My Text" on screen.
         * 
         * this.textBox = new TextBox();
         * this.textBox.string = "My Text";
         */
        this.string = null;


        /** Property to set this TextBox's string based on the associated phrase in the ProjectTranscript, 
         * which is updated based on the current language setting of the project.
         * See 'nc.phraseIDs' for a list of available phrases.
         * @default undefined
         * @type {string}
         * @example
         * // Objective: Set the text of a TextBox based on a phrase defined in the ProjectTranscript.
         * // Expected Result: You will see "Hello World" on screen if the project language is 'en', or "Hola Mundo" if the language is 'es'.
         * 
         * this.textBox = new TextBox();
         * this.textBox.phraseID = nc.phraseIDs["Hello World"];
         */
        this.phraseID = null;


        /** The maximum width that the laid out text will adhere to if 'wrapToFit' or 'scaleToFit' are true.
         * When greater than 0, this value also determines the positioning of left or right justified text.
         * A value of 0 corresponds to no limits on the width of the text.
         * @default 0
         * @type {number}
         */
        this.boxWidth = null;


        /** The maximum height that the laid out text will adhere to if 'scaleToFit' is true.
         * When greater than 0, this value also determines the positioning of top-justified or bottom-justified text.
         * A value of 0 corresponds to no limits on the height of the text.
         * @default 0
         * @type {number}
         */
        this.boxHeight = null;


        /** Bool determining if text will automatically flow onto new lines in order to fit the text
         * within the designated 'boxWidth' value.
         * @default true
         * @type {boolean}
         */
        this.wrapToFit = null;


        /** Bool determining if the text will automatically be scaled down to fit within the boxWidth and/or boxHeight.
         * @default true
         * @type {boolean}
         */
        this.scaleToFit = null;


        /** The horizontalJustification of this TextBox. 
         * For acceptable values, see 'nc.constants.justfications'.
         * Setting this value will change the horizontal justification for all of the text in this TextBox, but
         * the value can be set for individual sections of the text using 'TextBox.setHorizontalJustification'.
         * @default 'left'
         * @type {string}
         */
        this.horizontalJustification = null;


        /** The verticalJustification of this TextBox. 
         * For acceptable values, see 'nc.constants.justfications'.
         * Setting this value will change the vertical justification for all of the text in this TextBox.
         * @default 'top'
         * @type {string}
         */
        this.verticalJustification = null;


        /** The read-only width of the text (once laid out). 
         * This number encapsulates the final width of the laid out text, including all of the TextFormats, 
         * the boxWidth and boxHeight, scaleToFit, wrapToFit etc...
         * @type {number}
         * @readonly
         */
        this.textWidth = null;

    
        /** The read-only height of the text (once laid out). 
         * This number encapsulates the final height of the laid out text, including all of the TextFormats, 
         * the boxWidth and boxHeight, scaleToFit, wrapToFit etc...
         * @type {number}
         * @readonly
         */
        this.textHeight = null;


        /** For Texts or Textboxes with 'scaleToFit' set to true, this number denotes the multiplier that was applied 
         * in order for the given text to fit within the boxWidth, and boxHeight.
         * @type {number}
         * @readonly
         */
        this.scaleToFitFactor = null;


        /** Number representing the vertical placement of the baseline within each line of text in this TextBox.
         * A value of 0 corresponds to the baseline of the text being positioned at the very bottom of each line, 
         * and a value of .5 corresponds to the baseline of the text being positioned in the middle of each line. 
         * @default .22
         * @type {number}
         */
        this.baselinePosition = null;


        /** Object housing information about the customization of the characters within this TextBox.
         * This includes font, scale, baseline shift, kerning, line height, as well as information about 
         * EffectNodes and EffectController values used on the characters. 
         * Setting or adjusting this value will set the TextFormat for all of the characters in this TextBox.
         * See 'TextBox.setTextFormat' to set the TextFormat for individual sections of this TextBox.
         * @default TextFormat()
         * @type {TextFormat}
         */
        this.textFormat = null;


        /** The LazyUpdater is ultimately responsible for initiating the layout of the text. The setting of 'needsUpdate' and the
         * calling of 'updateIfNeeded' is magaged as much as is possible internally by Incisor®, but if the need to force an update
         * arises, set 'needsUpdate' to true, and call 'updateIfNeeded'.
         * @type {LazyUpdater}
         */
        this.layoutLazyUpdater = null;


        /** A list of the loading tier requirements for this TextBox. 
         * These requirements tell the TextBox if/when the GraphicAssets used by the characters are loaded,
         * and therefore inform when the text can first be rendered to the TextBox.
         * If left undefined, this value will default to the loadingTierRequirements of the geometry of the first character's GraphicAssets.
         * @type {Array.<number>}
         */
        this.loadingTierRequirements = null;


        /** Flag determining if the Texture and Geometry of this TextBox are trimmed to fit the rendered text.
         * If false, the Texture and Geometry will extend to the full bounds of this TextBox's boxWidth and boxHeight.
         * @default 'false'
         * @type {boolean}
         */
        this.isTrimmed = null;


        /** Value determining the editing mode of this TextBox. 
         * See 'nc.constants.textBoxEditingModes' for a list of available options.
         * When set to 'none' this TextBox is not interactive.
         * When set to 'selectable' this TextBox is interactive via the keyboard and cursor: text in this TextBox can be selected but not edited.
         * When set to 'editable' this TextBox is interactive via the keyboard and cursor: text in this TextBox can be selected and edited.
         * @default 'none'
         * @type {string}
         * @example
         * // Objective: Edit the text of a TextBox.
         * // Expected Result: Click on "My Text" and edit it.
         * 
         * // Create a new TextBox.
         * this.textBox = new TextBox();
         * this.textBox.string = "My Text";
         * // Set the editingMode to editable.
         * this.textBox.editingMode = nc.constants.textBoxEditingModes.editable;
         */
        this.editingMode = null;


        /** The color value for the selection highlighter boxes.
         * @default Vector4(.5,.6,1,.3)
         * @type {Vector4}
         */
        this.highlightColor = null;


        /** The background color for the TextBox.
         * @default Vector4(0,0,0,0)
         * @type {Vector4}
         */
        this.backgroundColor = null;


        /** The pivot point for the TextBox, with [0,0] meaning center pivot, and [.5,.5] meaning right-top pivot.
         * TextBoxes are center-based by default like to most GraphicObjects.
         * It should be noted that pivotPoint and justification are seperate concepts and do not affect each other.
         * Justification affects the alignment of the text within the bounds of the TextBox, and pivotPoint
         * affects where the 'origin' of the TextBox is relative to those bounds.
         * @default Vector2(0,0)
         * @type {Vector2}
         */
        this.pivotPoint = null;


        /** This TextBox's RenderTarget - the RenderTarget that its text gets rendered to. 
         * @type {RenderTarget}
         */
        this.renderTarget = null;


        /** A TextBox is ultimately 'pre-rendered' text that is positioned in the Scene and then rendered again. 
        * Because of this, certain canvas sizes or TextBox positioning can lead to slightly blurrier edges that can be noticable for small text.
        * Calling this function can mitigate such small-text-blurriness, as it sets the downscalingMode and upscalingMode to 'nearest',
        * and sets the 'snapToNearestWorldPosition' to true. These settings help to ensure that the TextBox texture pixels are always 
        * aligned with the canvas pixels, preserving the original crispy edges. The tradeoff with using this mode is that 
        * the position of text will appear to always snap to the nearest pixel, which can lead to jerky-looking 
        * movement at slow speeds, and also rotation and other transformations will tear badly.
        * If these restrictions are un-workable, a "TextAssembly" is a good alternative.
        * @default false
        * @type {boolean}
        */
        this.useNearestPixelRendering = null;


        /** Boolean determining if pressing the 'Tab' key ends the current editing session, relinquishing the focus.
         * If this is true, and the newly focused object is a UiKeybaordNavigator, then the keyboard navigation would also be advanced.
         * If this value is false, then pressing the 'Tab' key inserts 3 spaces.
         * @default true
         * @type {boolean}
         */
        this.tabEndsEditing = null;


        /** Boolean determining if pressing the 'Return' key ends the current editing session, relinquishing the focus.
         * If this value is false, then pressing the 'Return' key inserts a newline.
         * @default true
         * @type {boolean}
         */
        this.returnEndsEditing = null;


        /** The SceneObject that 'nc.singularFocusObject' will be set to when the end-user actively selects or edits this TextBox.
         * The default value is set to this TextBox, but in the case where this TextBox is a descendant of a SceneObject that would
         * be a better choice for singular focus (like when a TextBox is part of a TextField etc...), this option can be used
         * to substitute a singular focus recipient.
         * @type {SceneObject}
         */
        this.singularFocusTarget = null;


        /** Boolean indicating if whitespace characters will be visible in this TextBox.
         * @default false
         * @type {boolean}
         */
        this.showWhiteSpace = null;


        /** The number of horizontal grid segments that will be used in this TextBox's Geometry.
         * @default 1
         * @type {number}
         */
        this.numHorizontalGridSegments = null;


        /** The number of vertical grid segments that will be used in this TextBox's Geometry.
         * @default 1
         * @type {number}
         */
        this.numVerticalGridSegments = null;


        /** A boolean determining if the resolution of this TextBox is affected by the scale of the canvas relative to it's core dimensions. 
         * In other words, if this flag is false, then the TextBox's RenderTarget is a static resolution, and if it is true then the
         * RenderTarget will get bigger when the canvas is displayed bigger, and smaller as the canvas is shrunk.
         * This flag effectively sets the 'canvasSizeResolutionScaling' value of this TextBox's RenderTarget, but in addition,
         * it connects the TextBox to the 'canvasResize' appEvent, informing the TextBox to re-render whenever the canvas is resized. 
         * @type {number}
         */
        this.canvasSizeResolutionScaling = null;


        /** Object that allows this TextBox to be backed by a hidden HTML text input element.
         * This allows mobile virtual keyboards to appear automatically when focusing on an Incisor TextBox.
         * @readonly
         * @type {HtmlBacking}
         */
        this.htmlBacking = null;
    }


    /** Method used to swap all instances of the given character with a designated GraphicAsset.
     * A TextFormat can also be supplied to help position and format the substituted GraphicAsset within the text.
     * @param {string} characterToSubstitute The the character that will be replaced with the designated GraphicAsset.
     * @param {GraphicAsset} graphicAsset The GraphicAsset that will substitute for the given characters.
     * @param {TextFormat} [textFormat] Optional TextFromat to apply to the substituted GraphicAsset, which can be used to adjust its positioning and formating.
     * @example
     * // Objective: Substitute a character in a TextBox.
     * // Expected Result: The letter "A" in the word "PLAY" will be replaced by a white triangle.
     * 
     * // Create a new TextBox.
     * this.textBox = new TextBox();
     * this.textBox.string = "PRESS PLAY";
     * 
     * // Replace the letter A with a white triangle.
     * this.textBox.setSubstitutionCharacter( "A", nc.graphicAssets.WhiteTriangle );
     * 
     * // Create a TextFormat, update some of its properties and set it on the TextBox.
     * let textFormat = new TextFormat();
     * textFormat.kerning = 2;
     * textFormat.characterScaleY = .5;
     * textFormat.characterScaleX = .5;
     * textFormat.verticalShift = .50;
     * this.textBox.setTextFormat( textFormat, 8, 1 );
     */
    setSubstitutionCharacter(characterToSubstitute,graphicAsset,textFormat){}


    /** Sets the text format of the designated portion of text within a TextBox.
     * @param {TextFormat} textFormat The TextFormat that the specified characters will adopt.
     * @param {number} [startIdx] The index of the first character in the segment affected by this change. If left undefined, the given textFormat will be applied to all characters.
     * @param {number} [numChars] The length of the segment affected by this change. [DEFAULT: infinity]
     * @example
     * // Objective: Use a TextFormat to manipulate characters in a TextBox.
     * // Expected Result: You will see the phrase "I Love Incisor". The word "Love" and the letter "I" in Incisor will be stretched and given extra space.
     * 
     * // Create a new TextBox.
     * this.textBox = new TextBox();
     * this.textBox.string = "I Love Incisor";
     * // Create a TextFormat and update some of its properties.
     * let textFormat = new TextFormat();
     * textFormat.kerning = 3;
     * textFormat.characterScaleY = 3;
     * textFormat.characterScaleX = 1.5;
     * // Set the TextFormat and provide the start index and number of characters affected.
     * this.textBox.setTextFormat( textFormat, 2, 6 );
     */
    setTextFormat(textFormat,startIdx,numChars){}


    /** Sets the horizontal justification of the given range of characters. 
     * It should be noted that when characters are laid out into multiple lines, the horizontal justification for a given line
     * is determined by the horizontal horizontalJustification value associated with the first character on that line.
     * @param {string} justification The horizontal justification that the specified characters will adopt. See 'nc.constants.justifications' for justification values.
     * @param {number} [startIdx] The index of the first character in the segment affected by this change.  If left undefined, the given horizontalJustification will be applied to all characters.
     * @param {number} [numChars] The length of the segment affected by this change. [DEFAULT: infinity]
     */
    setHorizontalJustification(justification,startIdx,numChars){}


    /** Inserts the given string at the given index.
     * @param {number} startIndex The index that the first character of the inserted string.
     * @param {string} stringToInsert The string to insert.
     */
    insert(startIndex,stringToInsert){}


    /** Deletes the given range of characters.
     * @param {number} startIndex The index of the first character to delete.
     * @param {number} count The number of characters to delete.
     */
    delete(startIndex,count){}


    /** Several object-pooling techniques are used internally within the TextAssembly and TextBox objects.
     * Displaying/rendering text with large numbers of characters can leave a significant memory-footprint in these pools.
     * This memory can be freed by calling this method - though the call itself may result in a one-time performance hit
     * if large strings have been displayed/rednered previously.
     */
    clearPools(){}


    /** Returns an object containing the start index, end index, and character count of the current selection.
     * If the current selection is empty the values in the returned object will be -1.
     * @returns {RangeInfo}
     */
    getSelectionRange(){return(null);}


    /** Selects the given range of characters.
     * @param {number} [startIndex] The first index of the desired range to select. If left undefined, the entire text will be selected. [DEFAULT: 0]
     * @param {number} [count] The number of characters to be selected. 
     */
    selectRange(startIndex,count){return(null);}


    /** Adds a callback that occurs whenever this TextBox string changed (even during editing).
    * The updated string is sent to the callback as its first parameter.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this TextBox string changed.
    * @param {string} callbackName The name of the callback function that occurs whenever this TextBox string changed.
    * @param {Array|any} [callbackArgs] Args for the callback function that occurs whenever this TextBox string changed.
    */
    addStringUpdateCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given stringUpdate callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeStringUpdateCallback(callbackOwner,callbackName){}


    /** Adds a callback that occurs whenever this TextBox's 'editingMode' is changed from 'constants.textBoxEditingModes.editing' to any other value.
    * The updated string is sent to the callback as its first parameter, and the original string is sent as the second parameter.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this TextBox string changed.
    * @param {string} callbackName The name of the callback function that occurs whenever this TextBox string changed.
    * @param {Array|any} [callbackArgs] Args for the callback function that occurs whenever this TextBox string changed.
    */
    addEditCommitCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given editCommit callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeEditCommitCallback(callbackOwner,callbackName){}
}


/** Object that allows this TextBox to be backed by a hidden HTML text input element.
 * This allows mobile virtual keyboards to appear automatically when focusing on an Incisor TextBox.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class HtmlBacking
{
    constructor()
    {
        /** Boolean determining if HTML backing is enabled. When enabled, an HTML textbox is added to the parent of the canvas element, and text input is routed through this hidden input, which allows support for mobile virtual keyboards.
         * @type {boolean}
         */
        this.enabled = null;


        /** Boolean determining whether the HTML textbox will be automatically places at the same coordinates as the canvas element when Incisor TextBox editing begins.
         * @type {boolean}
         */
        this.autoPosition = null;
    }
}


/** Object describing a range of indices, including a startIndex, endIndex, and count.
* [NON-INSTANTIABLE]
* @hideconstructor
*/
class RangeInfo
{
    /** Object describing a range of indices, including a startIndex, endIndex, and count.
     * [NON-INSTANTIABLE]
     * @hideconstructor
     */
    constructor()
    {
        /** The first index included in the range of indices.
         * @type {number}
         */
        this.startIndex = null;


        /** The lase index included in the range of indices.
         * @type {number}
         */
        this.endIndex = null;

    
        /** The number of indices included in the range.
         * @type {number}
         */
        this.count = null;
    }
}


/** Object containing text formatting information that can be applied the characters within TextAssembly or TextBox objects.
 */
class TextFormat
{
    /** Object containing text formatting information that can be applied the characters within TextAssembly or TextBox objects.
     * @param {string} [fontName] The name of the font that characters with this TextFormat will use. [DEFAULT: "MainFont"]
     * @param {number} [characterScaleX] The x-axis scale multiplier for characters that use this TextFormat. [DEFAULT: 1]
     * @param {number} [characterScaleY] The y-axis scale multiplier for characters that use this TextFormat. [DEFAULT: 1]
     * @param {number} [kerning] Number representing an added or reduced spacing between the characters that use this TextFormat [DEFAULT: 0]
     * @param {number} [verticalShift] Number representing a veritcal offset that will be applied to the characters that use this TextFormat. [DEFAULT: 0]
     * @param {number} [lineHeightMultiplier] Number that multiplies the effective layout height of the characters that use this TextFormat. [DEFAULT: 1]
     */
    constructor(fontName,characterScaleX,characterScaleY,kerning,verticalShift,lineHeightMultiplier)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the font that characters with this TextFormat will use.
         * See 'nc.fontNames' for the names of the fonts available in this project.
         * Please note that changing the fontName will result in the entire 'characterMaterial' object
         * being reset to the materialPresets of the "xxx_Char0" character of the new font.
         * @default "MainFont"
         * @type {string}
         */
        this.fontName=null;


        /** The x-axis scale multiplier for characters that use this TextFormat.
         * @default 1
         * @type {number}
         */
        this.characterScaleX=null;


        /** The y-axis scale multiplier for characters that use this TextFormat.
         * @default 1
         * @type {number}
         */
        this.characterScaleY=null;


        /** Number representing an added or reduced spacing between characters that use this TextFormat.
         * This kerning number denotes the proportion of the 'characterWidth' (see ProjectConfiguration.fontDefitions) 
         * that will be added to or subtracted from the width of each character. The effects of kerning are also 
         * automatically multiplied by the given format's 'characterScaleX' value, UiZoom.totalZoom (if applicable), 
         * and the 'scaleToFitFactor' (if applicable).
         * @default 0
         * @type {number}
         */
        this.kerning=null;


        /** Number representing a veritcal offset that will be applied to the characters that use this TextFormat.
         * This number denotes the proportion of the font's 'lineHeight' (see ProjectConfiguration.fontDefitions) that 
         * will be added to or subtracted from the vertical position of the characters using this TextFormat.
         * The effects of verticalShift are also automatically multiplied by the given format's 'characterScaleY' value, 
         * UiZoom.totalZoom (if applicable), and the 'scaleToFitFactor' (if applicable).
         * @default 0
         * @type {number}
         */
        this.verticalShift=null;


        /** Number that multiplies the effective layout height of characters the that use this TextFormat.
         * As a default, the 'layout height' of any character within a font is the font's 'lineHeight' value
         * (see ProjectConfiguration.fontDefitions). This number acts as a multiplier on that effective
         * character height.
         * @default 1
         * @type {number}
         */
        this.lineHeightMultiplier=null;


        /** Object defining EffectNodes amd EffectController values that will be applied to the characters that used this TextFormat.
         * @type {CharacterMaterial}
         */
        this.characterMaterial=null;
    }

    /** Returns a new TextFormat instance with the same values.
     * @returns {TextFormat}
     */
    clone(){reuturns(null);}
}


/** Object representing the EffectNodes and EffectController values that will be applied to all of the
 * TextBox or TextAssembly characters using the TextFormat that owns this CharacterMaterial.
 * [NON-INSTANTIABLE]
 */
class CharacterMaterial
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The particleSystemParameters EffectController.
 * This is an instance of the dynamically defined EffectController 'particleSystemParameters' (base type: 'Vector4'). 
 * To get a new instance, use "nc.effectControllers['particleSystemParameters'].new()".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {particleSystemParameters}
 */
this.particleSystemParameters = null;
/** The EffectController for the 'FillColor' EffectNode, which entirely fills the associated Geometry with the red, green, blue, and alpha color values provided.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.fillColor = null;
/** The EffectController for the 'SampleMainTexture' EffectNode that tells it which Texture to render.
 * @type {Texture}
 */
this.mainTexture = null;
/** The EffectController for the 'ColorMultiply' EffectNode, which multiplies the red, green, blue, and alpha color values of the Material it is applied to.
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {Color}
 */
this.colorMultiply = null;
/** The EffectController for the 'Shapify' EffectNode. The Shapify EffectNode converts edge data stored in a 'shapified' Texture into a presentable image with edges that stay sharp regardless of the scale of the associated GraphicObject.
 * This is an instance of the dynamically defined EffectController 'shapify' (base type: 'Vector2'). 
 * To get a new instance, use "nc.effectControllers['shapify'].new()".
 * While some EffectNodes and EffectControllers are included in projects automatically, many must first be added to the project as 'codeAsset' files using the 'TemplateLibrary' menu.
 * @type {shapify}
 */
this.shapify = null;

    }


    /** Returns this CharacterMaterial's current EffectNodes.
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of this CharacterMaterial.
     * @returns {Array.<EffectNode>}
     */
    getEffectNodes(){return(null);}


    /** Sets the EffectNodes for this CharacterMaterial, effectively setting them for all of the affected characters. 
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of this CharacterMaterial.
     * @param {Array.<EffectNode>|EffectNode} effectNodes The new list of EffectNodes that will apply this CharacterMaterial, which applies to all affected characters.
     */
    setEffectNodes(effectNodes){}


    /** Adds the given EffectNodes to this CharacterMaterial, effectively adding them to all of the affected characters. 
     * EffectNodes are GPU-driven visual effects assigned to SceneObjects, GraphicObjects, and ultimately Materials.
     * Each EffectNode can be manipulated dynamically by one or more EffectControllers, 
     * which are accessable as direct members of this CharacterMaterial.
     * @param {Array.<EffectNode>|EffectNode} effectNodes The EffectNodes to add to this CharacterMaterial, which applies to all affected characters.
     */
    addEffectNodes(effectNodes){}
}


/** A Texture is a pixel map used for filling the surface of Geometry during rendering.
 * [NON-INSTANTIABLE]
 * @extends AssetComponent
 */
class Texture extends AssetComponent
{
    constructor()
    {
        /** Mode denoting how this Texture will behave beyond its horizontal bounds. The acceptable wrap modes can be found in 'nc.constants.wrapModes'. 
         * @type {string}
         */
        this.wrapModeHorizontal=null;


        /** Mode denoting how this Texture will behave beyond its vertical bounds. The various wrap modes can be found in 'nc.constants.wrapModes'. 
         * @type {string}
         */
        this.wrapModeVertical=null;


        /** Mode denoting how this Texture will be sampled when it is smaller than it's native size. The various downscaling modes can be found in 'nc.constants.textureDownscalingModes'. 
         * @type {string}
         */
        this.downscalingMode=null;


        /** Mode denoting how this Texture will be sampled when it is larger than it's native size. The various upscaling modes can be found in 'nc.constants.textureUpscalingModes'. 
         * @type {string}
         */
        this.upscalingMode=null;


        /** The name of the SpriteSheet that this Texture is a part of (if applicable).
         * @default undefined
         * @type {string}
         * @readonly
         */
        this.spriteSheet=null;
    }


    /** Returns a Vector2 with the pixel dimensions of this Texture.
     * @returns {Vector2}
     */
    getResolution(){return(null);}
}


/** Timelines are specialized PlaybackControllers that control animation of Constructs created in the Incisor® GUI. 
 * [NON-INSTANTIABLE]
 * @extends {TimePlaybackController}
 * @hideconstructor
 */
class Timeline extends TimePlaybackController
{
    constructor()
    {

        /** Type identifier.
         * @type {string}
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the SceneObject.
         * @type {string}
         * @default 'SceneObject'
         */
        this.name=null;


        /** This value determines the degree to which this particular timeline controls its construct.
         * The total influence among all of the timelines always adds up to 1. 
         * When a particular Timeline's influence is actively increased, the influence of all other Timelines
         * is decreased passively and proportionally in order to maintain a total influence of 1. 
         * A Timeline's influence cannot be directly decreased, it must be done passively be increasing 
         * the influence of another Timeline.
         * @type {number}
         */
        this.influence=null;
    }


    /** Swoops (interpolates) the Timeline's influence from its current value to the given end value over the duration.
     * It should be noted, that Timeline.influence cannont be directly decreased, this must be done passively be increasing 
     * the influence of another Timeline.
     * @param {number} endValue The ending value for the influence.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @returns {Swooper}
     */
    swoopInfluence(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs){return(null);}


    /** Plays this Timeline once, swooping influence up at its start and return-swooping influence just before its end for smooth transitions.
     * The 'Ease' TweenType is used for both swoops.
     * [REQUIREMENT: module - waitThens]
     * @param {number} [fadeInTime] The amount of time to fade in this Timeline's influence. If left undefined, the value will default to either .25 seconds, or 10% of this Timeline's duration (whichever is smaller).
     * @param {number} [fadeOutTime] The amount of time to fade out this Timeline's influence before it ends. If left undefined, the value will default to either .25 seconds, or 10% of this Timeline's duration (whichever is smaller).
     * @param {Timeline} [returnToTimeline] The Timeline that will have influence after this 'event' completes. If this value is left undefined, then it will default to the Timeline that had the highest influence when this function was originally invoked.
     * @param {object} [lazyStopCallbackOwner] The object owning the callback function that is called when the timeline is complete. 
     * @param {string} [lazyStopCallbackName] The name of the function that is called when the timeline is complete.
     * @param {Array|any} [lazyStopCallbackArgs] Arguments for the function that is called when the timeline is complete.
     */
    playOnce_swoopInfluence(fadeInTime,fadeOutTime,returnToTimeline,lazyStopCallbackOwner,lazyStopCallbackName,lazyStopCallbackArgs){}
    

    /** Invokes 'play' on the Timeline while swooping it's influence up over the given duration.
     * @param {number} fadeInTime The amount of time to fade in this Timeline's influence. [DEFAULT: 0.25]
     */
    play_swoopInfluence(fadeInTime){}
}


/** Object housing functionality for time stamps, the Incisor® standardized format for date and time.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - timeStamp]
 */
class TimeStamp
{
    /** Produces the current time in the Incisor® standardized time stamp format: YYYY.MM.DD.hh.mm.ss(.mmmm)
     * @param {boolean} includeMilliseconds A boolean indicating if the timestamp will include milliseconds.
     * @returns {string}
     */
    getTimeStamp(includeMilliseconds){return(null);}


    /** Compares two timestamps and returns a string describing their relationship ("lessThan","equal", or "greaterThan").
     * @param {string} firstTimestamp The first timestamp to compare.
     * @param {string} secondTimestamp The second timestamp to compare.
     * @returns {string}
     */
    compareTimestamps(firstTimestamp,secondTimestamp){return(null);}


    /** Compares the names of two Incisor® version sets and returns a string describing their relationship ("lessThan","equal", or "greaterThan").
     * @param {string} firstVersionSetName The first Incisor® version set name to compare.
     * @param {string} secondVersionSetName The second Incisor® version set name to compare.
     * @returns {string}
     */
    compareIncisorVersionSets(firstVersionSetName,secondVersionSetName){return(null);}
}


/** A specialized UiGraphicButton that includes a Supervisor member, enabling it to monitor and adjust a boolean property's value during runtime.
 * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
 * Once configured, the visibility of the 'graphicObject' member will be updated every fixed update to reflect the most current value of the supervised property, 
 * and the value of the supervised property will also be 'adjustable' via cursor interaction.
 * [REQUIREMENT: module - extendedUi]
 * @extends UiGraphicButton
 */
class UiBooleanSupervisor_checkbox extends UiGraphicButton
{
     /** A specialized UiGraphicButton that includes a Supervisor member, enabling it to monitor and adjust a boolean property's value during runtime.
     * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
     * Once configured, the visibility of the 'graphicObject' member will be updated every fixed update to reflect the most current value of the supervised property, 
     * and the value of the supervised property will also be 'adjustable' via cursor interaction.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiBooleanSupervisor_checkbox's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiBooleanSupervisor_checkbox. [DEFAULT: 'UiBooleanSupervisor_checkbox']
     */
    constructor(parent,name)
    {
        /** Supervisor with callbacks that enable this UiBooleanSupervisor_checkbox to monitor and adjust a boolean property's value during runtime.
         * @readonly
         * @type {Supervisor}
         */
        this.supervisor = null;
    }
}


/** A ui-specialized horizontal LayoutStack housing a text-based Button (including a UiPanel background) with various UI functionalities and defaults applied.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends LayoutStack
 */
class UiButton extends LayoutStack
{
     /** A ui-specialized horizontal LayoutStack housing a text-based Button (including a UiPanel background) with various UI functionalities and defaults applied.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • pre-configured with 'UiKeyboardNavigable' functionality.
     *   • uiZoom-enabled.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiButton's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiButton. [DEFAULT: 'UiButton']
     * @example
     * // Objective: Create a UIButton
     * // Expected Result: You will see a button with the button text "Press Me"
     * 
     * let button = new UiButton( nc.mainScene, "MyButton" );
     * button.mainText.string = "Press Me";
     * button.displayLabel = false;
     */
    constructor(parent,name)
    {
        /** Boolean determining if the UiButton is available for end-user-internaction, or if it is unavailable and 'grayed out'.
         * @default true
         * @type {boolean}
         */
        this.isActive = null;


        /** The TextBox with main text for this UiButton. The size of the text informs the button's size and layout.
         * @type {TextBox}
         */
        this.mainText=null;


        /** Boolean determining if a label TextBox is displayed to the left of the UiButton.
         * @default false
         * @type {boolean}
         */
        this.displayLabel=null;


        /** A UiText that acts as a label for the UiButton. Please note that this item is undefined until the 'displayLabel' property is set to true.
         * @default undefined
         * @type {UiText}
         */
        this.label=null;


        /** The main Button for the UiButton, this object is a UiPanel which also implements Button.
         * @type {Button}
         */
        this.mainButton=null;


        /** The outline of the button, which is used to indicate when the end-user outlines this UiButton using keyboard navigation (tab, arrows, etc...).
         * @type {UiOutline}
         */
        this.outline=null;


        /** The Color of the Button background.
         * @default nc.uiStyle.color_buttonPanel
         * @type {Color}
         */
        this.buttonBackgroundColor=null;


        /** The Color of the Button background when it's highlighted.
         * @default nc.uiStyle.color_highlightedButtonPanel
         * @type {Color}
         */
        this.highlightedButtonBackgroundColor=null;
    }


    /** Adds a callback that occurs whenever this UiButton is triggered via the cursor or keyboard navigation.
    * The triggering browser-created event, and the UiButton itself are sent to the callback as its first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this UiButton is triggered via the cursor or keyboard navigation.
    * @param {string} callbackName The name of the callback function that occurs whenever this UiButton is triggered via the cursor or keyboard navigation.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever this UiButton is triggered via the cursor or keyboard navigation.
    * @example
    * // Objective: Add a TriggerCallback to a button
    * // Expected Result: You will see a button with the button text "Press Me". Pressing it will display text that says "You pressed the button."
    *
    * // Add a callback function.
    * this.myCallback = function(args) {
    *     let txt = new UiText( nc.mainScene, "ButtonMessageText" );
    *     txt.position.x = 100;
    *     txt.string = "You pressed the button."
    * }
    *
    * let button = new UiButton( nc.mainScene, "MyButton" );
    * button.mainText.string = "Press Me";
    * button.displayLabel = false;
    * // add the trigger callback
    * button.addTriggerCallback( this, "myCallback" );
    */
    addTriggerCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given trigger callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    * @example
    * // Objective: Remove a TriggerCallback to a button
    * // Expected Result: The "Press Me" button will increment the press count. Upon pressing the "Stop Counting" button, the "Press Me" button will no longer function.
    * 
    * let presses = 0;
    * let txt = new UiText( nc.mainScene, "ButtonMessageText" );
    * txt.position.x = 100;
    * txt.string = "You pressed the button 0 times.";
    * 
    * // Add a callback function ti increment the press count.
    * this.counter = function(args) {
    *    presses++;
    *    txt.string = "You pressed the button " + presses + " times.";
    * }
    * 
    * // Add a callback function to stop the counter callback
    * this.stopper = function(args) {
    *     pressMeButton.removeTriggerCallback( this, "counter" );
    * }
    * 
    * // the button that will increment the press count
    * let pressMeButton = new UiButton( nc.mainScene, "PressMeButton" );
    * pressMeButton.mainText.string = "Press Me";
    * pressMeButton.displayLabel = false;
    * // add the trigger callback
    * pressMeButton.addTriggerCallback( this, "counter" );
    * 
    * // the button that will remove the counter callback
    * let stopCountingButton = new UiButton( nc.mainScene, "StopCountingButton" );
    * stopCountingButton.mainText.string = "Stop Counting";
    * stopCountingButton.displayLabel = false;
    * stopCountingButton.position.x = -150;
    * // add the trigger callback
    * stopCountingButton.addTriggerCallback( this, "stopper" );
    */
    removeTriggerCallback(callbackOwner,callbackName){}
}


/** A ui-specialized vertical LayoutStack with an interactive title header that toggles the visibility of a main LayoutStack.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends LayoutStack
 */
class UiCollapsibleStack extends LayoutStack
{
    /** A ui-specialized vertical LayoutStack with a title header button that toggles the visibility of a LayoutStack member.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • pre-configured with 'UiKeyboardNavigable' functionality.
     *   • uiZoom-enabled.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiCollapsibleStack's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiCollapsibleStack. [DEFAULT: 'UiCollapsibleStack']
     */
    constructor(parent,name)
    {
        /** The LayoutStack containing the main body of this UiCollapsibleStack. 
         * This LayoutStack is what is shown/expanded or hidden/collapsed by toggling the title header button.
         * @type {LayoutStack}
         */
        this.bodyStack=null;


        /** The LayoutStack containing the title header UiCollapsibleStack. 
         * This LayoutStack holds the interactive text/button that collapses and expands the content of this UiCollapsibleStack.
         * @type {LayoutStack}
         */
        this.titleStack=null;


        /** The header title TextBox for this UiCollapsibleStack.
         * @type {TextBox}
         */
        this.titleTextBox=null;


        /** An caret image that indicates if the UiCollapsibleStack is collapsed or expanded.
         * @type {GraphicObject}
         */
        this.caretIcon=null;


        /** A scale multiplier for the caretIcon GraphicObject. Use this property instead of directly scaling the caretIcon GraphicObject to preserve UiZoom and LayoutObject functionality.
         * @type {number}
         */
        this.caretIconScaleFactor=null;


        /** The main Button for the UiCollapsibleStack title heaader button, this object is a UiPanel which also implements Button. This item defaults to 'visible=false'.
         * @type {Button}
         */
        this.mainButton=null;


        /** The outline of the button, which is used to indicate when the end-user outlines this UiCollapsibleStack using keyboard navigation (tab, arrows, etc...).
         * @type {UiOutline}
         */
        this.outline=null;


        /** Boolean determining if the UiCollapsibleStack is collapsed or expanded.
         * @default false
         * @type {boolean}
         */
        this.isExpanded=null;
        

        /** The base Color of the titleTextBox for this UiCollapsibleStack.
         * @default nc.uiStyle.color_interactiveText
         * @type {Color}
         */
        this.buttonTextColor=null;


        /** The highlighted Color of the titleTextBox for this UiCollapsibleStack.
         * @default nc.uiStyle.color_highlightedInteractiveText
         * @type {Color}
         */
        this.highlightedButtonTextColor=null;


        /** Boolean indicating if the mainButton for this UiCollapsibleStack spans over the titleTextBox.
         * When false the mainButton for this UiCollapsibleStack only encapsulates the caretIcon.
         * @default true
         * @type {boolean}
         */
        this.buttonIncludesTitle=null;
    }


    /** Adds a callback that occurs whenever this UiCollapsibleStack is triggered via the cursor or keyboard navigation.
    * In this case, 'triggering' also toggles the collapsed/expanded state of this UiCollapsibleStack, making this
    * callback a good means to update the contents of the LayoutStack.
    * The triggering browser-created event, and the UiCollapsibleStack itself are sent to the callback as its first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this UiCollapsibleStack is triggered via the cursor or keyboard navigation.
    * @param {string} callbackName The name of the callback function that occurs whenever this UiCollapsibleStack is triggered via the cursor or keyboard navigation.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever this UiCollapsibleStack is triggered via the cursor or keyboard navigation.
    */
    addTriggerCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given trigger callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeTriggerCallback(callbackOwner,callbackName){}
}


/** A specialized UiButton that displays a UiMenu.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends UiButton
 */
class UiDropDownMenu extends UiButton
{
     /** A specialized UiButton that displays a UiMenu.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • pre-configured with 'UiKeyboardNavigable' functionality.
     *   • uiZoom-enabled.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiDropDownMenu's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiDropDownMenu. [DEFAULT: 'UiDropDownMenu']
     */
    constructor(parent,name)
    {
        /** The UiMenu that is displayed when the this button is triggered.
         * @type {UiMenu}
         */
        this.uiMenu=null;
    }
}


/** A ui-specialized horizontal LayoutStack housing an image-based Button (including a UiPanel background) with various UI functionalities and defaults applied.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends LayoutStack
 */
class UiGraphicButton extends LayoutStack
{
    /** A ui-specialized horizontal LayoutStack housing an image-based Button (including a UiPanel background) with various UI functionalities and defaults applied.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • pre-configured with 'UiKeyboardNavigable' functionality.
     *   • uiZoom-enabled.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiGraphicButton's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiGraphicButton. [DEFAULT: 'UiGraphicButton']
     */
    constructor(parent,name)
    {
        /** Boolean determining if the UiGraphicButton is available for end-user-internaction, or if it is unavailable and 'grayed out'.
         * @default true
         * @type {boolean}
         */
        this.isActive = null;


        /** The GraphicObject for this UiGraphicButton.
         * @type {GraphicObject}
         */
        this.graphicObject=null;


        /** A scale multiplier for the graphic object. 
         * Use this property instead of directly scaling the GraphicObject to preserve UiZoom and LayoutObject functionality.
         * Please note that this facter does not affect the size of the Button, just the GraphicObject displayed on it.
         * @type {number}
         */
        this.graphicScaleFactor=null;


        /** The core width of the UiGraphicButton.
         * @type {number}
         */
        this.width=null;


        /** The core height of the UiGraphicButton.
         * @type {number}
         */
        this.height=null;


        /** Boolean determining if a label TextBox is displayed to the left of the UiGraphicButton.
         * @default false
         * @type {boolean}
         */
        this.displayLabel=null;


        /** A UiText that acts as a label for the UiGraphicButton. Please note that this item is undefined until the 'displayLabel' property is set to true.
         * @default undefined
         * @type {UiText}
         */
        this.label=null;


        /** The main Button for the UiGraphicButton, this object is a UiPanel which also implements Button.
         * @type {Button}
         */
        this.mainButton=null;


        /** The outline of the button, which is used to indicate when the end-user outlines this UiGraphicButton using keyboard navigation (tab, arrows, etc...).
         * @type {UiOutline}
         */
        this.outline=null;


        /** The Color of the Button background.
         * @default nc.uiStyle.color_buttonPanel
         * @type {Color}
         */
        this.buttonBackgroundColor=null;


        /** The Color of the Button background when it's highlighted.
         * @default nc.uiStyle.color_highlightedButtonPanel
         * @type {Color}
         */
        this.highlightedButtonBackgroundColor=null;
    }


    /** Adds a callback that occurs whenever this UiGraphicButton is triggered via the cursor or keyboard navigation.
    * The triggering browser-created event, and the UiGraphicButton itself are sent to the callback as its first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this UiGraphicButton is triggered via the cursor or keyboard navigation.
    * @param {string} callbackName The name of the callback function that occurs whenever this UiGraphicButton is triggered via the cursor or keyboard navigation.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever this UiGraphicButton is triggered via the cursor or keyboard navigation.
    */
    addTriggerCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given trigger callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeTriggerCallback(callbackOwner,callbackName){}
}


/** Object housing functionality that enables for keyboard navigation of this SceneObject's ui-related descendants.
 * Keyboard navigation enables the end-user to press the tab, space, and enter keys to outline and trigger
 * any 'uiKeyboardNavigable' descendants of the SceneObject owning this UiKeyboardNavigator when it is 'in focus' 
 * according to 'nc.singularFocusObject'. SceneObjects have a member named "uiKeyboardNavigator",
 * which defaults to undefined, but can be enabled, by calling 'SceneObject.configureUiKeyboardNavigator()'.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - extendedUi]
 */
class UiKeyboardNavigator
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** If defined, this SceneObject will automatically be outlined when the SceneObject owning this UiKeyboardNavigator is the 'singularFocusObject'.
         * @type {SceneObject}
         */
        this.defaultOutlined=null;
    }


    /** Instructs to the UiKeyboardNavigator to outline the next, current, or previous UiKeyboardNavigable descendant, based
     * on the 'direction' paramter supplied.
     * @param {number} [direction] Value supplied determining the direction of the navigation. 1 goes to next item, 0 outlines the current item, and -1 outlines the previous item. [DEFAULT: 0]
     */
    gotoNext(direction){}


    /** Disposes this UiKeyboardNavigator, disabling keyboard navigation for the SceneObject owning it, and freeing object for garbage collection.
     */
    dispose(){}
}


/** Object housing functionality that enables for this SceneObject to be accessible via keyboard navigation.
 * Keyboard navigation enables the end-user to press the arrow keys, tab, space, and enter keys to outline and trigger
 * any 'uiKeyboardNavigable' SceneObjects within a UiKeyboardNavigator-enabled parent that is currently 'in focus'
 * according to 'nc.singularFocusObject'. SceneObjects have a member named "uiKeyboardNavigable",
 * which defaults to undefined, but can be enabled, by calling 'SceneObject.configureUiKeyboardNavigable()'.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - extendedUi]
 */
class UiKeyboardNavigable
{
    constructor()
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** Flag determining if any key triggers the currently outlined UiKeyboardNavigable item. 
         * Standard UiKeyboardNavigable items are triggered by the "Enter" key and "Spacebar" key,
         * when this flag is true, any key will trigger. Since the triggering keyboard event is 
         * sent through to the UiKeyboardNavigable item's 'trigger' callback, further costumizations can be
         * added to the triggering key within the item itself (for example certain keys can be ignored etc...).
         * @default false
         * @type {boolean}
         */
        this.anyKeyTriggers=null;


        /** Optional SceneObject that will automatically be outlined the first time the owner of this UiKeyboardNavigation
         * becomes the 'singularFocusObject'.
         * @type {SceneObject}
         */
        this.defaultOutlined=null;


        /** Boolean determining if this UiKeyboardNavigable is currently active.
         * @default true
         * @type {boolean}
         */
        this.isActive=null;
    }


    /** Adds a callback that occurs whenever this UiKeyboardNavigable item is in need of outlining or unoutlining.
     * A boolean indicating the outline status is sent to the callback as its first parameter.
     * @param {object} callbackOwner The object owning the callback function that occurs whenever this UiKeyboardNavigable item is in need of outlining or unoutlining.
     * @param {string} callbackName The name of the callback function that occurs whenever this UiKeyboardNavigable item is in need of outlining or unoutlining.
     */
    addSetOutlineCallback(callbackOwner,callbackName){}


    /** Removes the given setOutline callback.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed.
     */
    removeSetOutlineCallback(callbackOwner,callbackName){}


    /** Adds a callback that occurs whenever this UiKeyboardNavigable item triggered via the enter key or the space bar.
     * The triggering browser-generated event is sent to the callback as its first parameter.
     * @param {object} callbackOwner The object owning the callback function that occurs whenever this UiKeyboardNavigable item triggered via the enter key or the space bar.
     * @param {string} callbackName The name of the callback function that occurs whenever this UiKeyboardNavigable item triggered via the enter key or the space bar.
     */
    addTriggerCallback(callbackOwner,callbackName){}


    /** Removes the given trigger callback.
     * @param {object} callbackOwner The object owning the callback to be removed.
     * @param {string} callbackName The name of the callback to be removed.
     */
    removeTriggerCallback(callbackOwner,callbackName){}


    /** Disposes this UiKeyboardNavigable, disabling keyboard navigation for the SceneObject owning it, and freeing object for garbage collection.
     */
    dispose(){}
}


/** A ui-specialized horizontal LayoutStack housing a text-based Button with various UI functionalities and defaults applied.
 * The UiLinkButton is similar to the UiButton, but has no visible background, and instead the text itself is the interactive component.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends LayoutStack
 */
class UiLinkButton extends LayoutStack
{
    /** A ui-specialized horizontal LayoutStack housing a text-based Button with various UI functionalities and defaults applied.
     * The UiLinkButton is similar to the UiButton, but has no visible background, and instead the text itself is the interactive component.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • pre-configured with 'UiKeyboardNavigable' functionality.
     *   • uiZoom-enabled.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiLinkButton's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiLinkButton. [DEFAULT: 'UiLinkButton']
     */
    constructor(parent,name)
    {
        /** Boolean determining if the UiLinkButton is available for end-user-internaction, or if it is unavailable and 'grayed out'.
         * @default true
         * @type {boolean}
         */
        this.isActive = null;


        /** The TextBox with main text for this UiLinkButton. The size of the text informs the button's size and layout.
         * @type {TextBox}
         */
        this.mainText=null;


        /** Boolean determining if a label TextBox is displayed to the left of the UiLinkButton.
         * @default false
         * @type {boolean}
         */
        this.displayLabel=null;


        /** A UiText that acts as a label for the UiLinkButton. Please note that this item is undefined until the 'displayLabel' property is set to true.
         * @default undefined
         * @type {UiText}
         */
        this.label=null;


        /** The main Button for the UiLinkButton, this object is a UiPanel which also implements Button. This item defaults to 'visible=false'.
         * @type {Button}
         */
        this.mainButton=null;


        /** The outline of the button, which is used to indicate when the end-user outlines this UiLinkButton using keyboard navigation (tab, arrows, etc...).
         * @type {UiOutline}
         */
        this.outline=null;


        /** The base Color of the TextBox for this UiLinkButton.
         * @default nc.uiStyle.color_interactiveText
         * @type {Color}
         */
        this.buttonTextColor=null;


        /** The highlighted Color of the TextBox for this UiLinkButton.
         * @default nc.uiStyle.color_highlightedInteractiveText
         * @type {Color}
         */
        this.highlightedButtonTextColor=null;
    }


    /** Adds a callback that occurs whenever this UiLinkButton is triggered via the cursor or keyboard navigation.
    * The triggering browser-created event, and the UiLinkButton itself are sent to the callback as its first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this UiLinkButton is triggered via the cursor or keyboard navigation.
    * @param {string} callbackName The name of the callback function that occurs whenever this UiLinkButton is triggered via the cursor or keyboard navigation.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever this UiLinkButton is triggered via the cursor or keyboard navigation.
    */
    addTriggerCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given trigger callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeTriggerCallback(callbackOwner,callbackName){}
}


/** A ui-specialized SceneObject that functions as a menu with menuItem options that can be selected with the cursor or with keyboard navigation.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • pre-configured with 'UiVisualFocus' functionality.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends SceneObject
 */
class UiMenu extends SceneObject
{
     /** A ui-specialized SceneObject that functions as a menu with menuItem options that can be selected with the cursor or with keyboard navigation.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • pre-configured with 'UiKeyboardNavigable' functionality.
     *   • uiZoom-enabled.
     *   • pre-configured with 'UiVisualFocus' functionality.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiMenu's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiMenu. [DEFAULT: 'UiMenu']
     */
    constructor(parent,name)
    {
        /** Boolean determining if the menu is open or closed.
         * @default false
         * @type {boolean}
         */
        this.isOpen = null;


        /** The UiPanel shown behind the UiMenuItem options in this UiMenu.
         * @type {UiPanel}
         */
        this.menuBackground=null;


        /** Boolean determining if a search UiTextField appears at the top of the menu.
         * When true, end-users can type in the field to filter the options shown in the UiMenu.
         * @type {boolean}
         */
        this.searchable=null;


        /** The search bar UiMenuItem.
         * @type {UiMenuItem}
         */
        this.searchBarMenuItem=null;


        /** Scale multiplier for the search icon graphic.
         * @type {number}
         */
        this.searchIconScaleFactor=null;


        /** The minimum width of the UiMenu.
         * @type {number}
         */
        this.minWidth=null;


        /** The default TextFormat for the text within the UiMenu.
         * @type {TextFormat}
         */
        this.textFormat=null;


        /** The default Color for the UiMenuItem backgrounds.
         * @type {Color}
         */
        this.menuItemBackgroundColor=null;


        /** The default Color for the active text within the UiMenu.
         * @type {Color}
         */
        this.textColor=null;


        /** The default Color for the inactive text within the UiMenu.
         * @type {Color}
         */
        this.inactiveTextColor=null;


        /** The size of the buffer spacer around and between text.
         * @type {number}
         */
        this.textBuffer=null;


        /** If this UiMenu is a subMenu, then this property will be populated with the parent UiMenu, otherwise it will be undefined.
         * @readonly
         * @type {UiMenu}
         */
        this.parentMenu=null;


        /** The SceneObject that 'nc.singularFocusObject' will be set to when this UiMenu opens.
         * The default value is set to this UiMenu, but in the case where this UiMenu is a descendant of a SceneObject that would
         * be a better choice for singular focus (like when a UiMenu is part of a UiDropDownMenu etc...), this option can be used
         * to substitute a singular focus recipient.
         * @type {SceneObject}
         */
        this.singularFocusTarget = null;
    }


    /** Adds a new UiMenuItem to the UiMenu.
    * @param {string} name The string that will appear in the UiMenu.
    * @param {GraphicAsset} [leftIconGraphicAsset] Optional GraphicAsset to include on the left side of the UiMenuItem.
    * @param {string} [secondaryString] Optional secondary string to display on the right side of the UiMenuItem
    * @param {GraphicAsset} [rightIconGraphicAsset] Optional GraphicAsset to include on the right side of the UiMenuItem.
    * @param {number} [index] Index array location to insert the new UiMenuItem.
    * @returns {UiMenuItem}
    */
    addMenuItem(name,leftIconGraphicAsset,secondaryString,rightIconGraphicAsset,index){return(null);}


    /** Removes a UiMenuItem.
    * @param {UiMenuItem} uiMenuItem The UiMenuItem to remove.
    */
    removeMenuItem(uiMenuItem){}


    /** Removes the UiMenuItem with the given name.
    * @param {string} name The name of the UiMenuItem to remove.
    */
    removeMenuItemByName(name){}


    /** Adds a callback that occurs whenever one of the UiMenuItems is selected via the cursor or keyboard navigation.
    * The triggering UiMenuItem, and the UiMenu itself are sent to the callback as its first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever one of the UiMenuItems is selected via the cursor or keyboard navigation.
    * @param {string} callbackName The name of the callback function that occurs whenever one of the UiMenuItems is selected via the cursor or keyboard navigation.
    * @param {Array|any} [callbackArgs] Args for the callback function that occurs whenever one of the UiMenuItems is selected via the cursor or keyboard navigation.
    */
    addMenuItemTriggerCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given trigger callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeMenuItemTriggerCallback(callbackOwner,callbackName){}


    /** Adds a callback that occurs whenever the UiMenu is opened or closed via triggering or direct manipulation of the 'isOpen' flag.
    * The UiMenu itself is sent to the callback as its first parameter.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever the UiMenu is opened or closed.
    * @param {string} callbackName The name of the callback function that occurs whenever the UiMenu is opened or closed.
    * @param {Array|any} [callbackArgs] Args for the callback function that occurs whenever the UiMenu is opened or closed.
    */
    addOpenCloseCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given trigger callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeOpenCloseCallback(callbackOwner,callbackName){}


    /** Retuns an array of the current UiMenuItems in this UiMenu.
     * @returns {Array.<UiMenuItem>}
     */
    getMenuItems(){}


    /** Clears all UiMenuItems.
     */
    clearMenuItems(){}
}


/** A ui-specialized object with the components that comprise a menu item option within a UiMenu.
* UI functionality includes:
*   • pre-configured with LayoutObject functionality.
*   • uiStyle TextFormats and Colors applied.
*   • pre-configured with 'UiKeyboardNavigable' functionality.
*   • uiZoom-enabled.
* [REQUIREMENT: module - extendedUi]
* [NON-INSTANTIABLE]
*/
class UiMenuItem
{
    constructor()
    {
        /** The main item showing in the UiMenu for each UiMenuItem. For all UiMenuItems except the searchBarMenuItem, this object is of type TextBox.
         * @type {TextBox&UiTextField}
         */
        this.mainMenuItem=null;


        /** The main Button for the UiMenu for each UiMenuItem.
         * @type {UiPanel}
         */
        this.mainButton=null;


        /** The GraphicAsset for an optional icon to show on the left side of the UiMenuItem.
         * @type {GraphicAsset}
         */
        this.leftIconGraphicAsset=null;


        /** The scale factor for the optional icon to show on the left side of the UiMenuItem. Use this property instead of directly scaling the GraphicObject to preserve UiZoom and LayoutObject functionality.
         * @type {number}
         */
        this.leftIconScaleFactor=null;


        /** The read-only GraphicObject for the optional icon to show on the left side of the UiMenuItem.
         * @type {GraphicObject}
         */
        this.leftIconGraphicObject=null;


        /** The GraphicAsset for an optional icon to show on the right side of the UiMenuItem.
         * @type {GraphicAsset}
         */
        this.rightIconGraphicAsset=null;


        /** The scale factor for the optional icon to show on the right side of the UiMenuItem. Use this property instead of directly scaling the GraphicObject to preserve UiZoom and LayoutObject functionality.
         * @type {number}
         */
        this.rightIconScaleFactor=null;


        /** The read-only GraphicObject for the optional icon to show on the right side of the UiMenuItem.
         * @readonly
         * @type {GraphicObject}
         */
        this.rightIconGraphicObject=null;


        /** The main string shown in the UiMenu for this UiMenuItem.
         * @type {string}
         */
        this.name=null;


        /** The secondary string shown in the UiMenu on the right side of this UiMenuItem.
         * @type {string}
         */
        this.secondaryString=null;


        /** The read-only TextBox for the optional secondary text to show on the right side of the UiMenuItem.
         * @readonly
         * @type {TextBox}
         */
        this.secondaryTextBox=null;


        /** Boolean determining if triggering this UiMenuItem automatically closes the menu.
         * @default true
         * @type {boolean}
         */
        this.triggeringClosesMenu=null;


        /** If this UiMenuItem opens a sub-menu, then this property will be populated a reference to thed associated UiMenu, otherwise it will be undefined.
         * @readOnly
         * @type {UiMenu}
         */
        this.subMenu=null;
    }


    /** Disposes the UiMenuItem and all of its components
    */
    dispose(){}
}


/** A specialized UiTextField that includes a Supervisor member, enabling it to monitor and adjust a number property's value during runtime.
 * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
 * Once configured, the 'mainText' TextBox will be updated every fixed update to reflect the most current value of the supervised property, 
 * and the value of the supervised property will also be 'adjustable' via keyboard and cursor interaction.
 * [REQUIREMENT: module - extendedUi]
 * @extends UiButton
 */
class UiNumberSupervisor_textField extends UiButton
{
     /** A specialized UiTextField that includes a Supervisor member, enabling it to monitor and adjust a number property's value during runtime.
     * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
     * Once configured, the 'mainText' TextBox will be updated every fixed update to reflect the most current value of the supervised property, 
     * and the value of the supervised property will also be 'adjustable' via keyboard and cursor interaction.
     * @param {SceneObject} [parent] The SceneObject that will become the new UiNumberSupervisor_textField's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiNumberSupervisor_textField. [DEFAULT: 'UiNumberSupervisor_textField']
     */
    constructor(parent,name)
    {
        /** Supervisor with callbacks that enable this UiNumberSupervisor_textField to monitor and adjust a number property's value during runtime.
         * @readonly
         * @type {Supervisor}
         */
        this.supervisor = null;


        /** Number that multiplies the affect of dragging with this UiNumberSupervisor_textField. For reference, a value of 1 is fitting for a numeric property whose range is roughly 500;
         * @default 1
         * @type {number}
         */
        this.dragMultiplier=null;


        /** GraphicObject on the leftmost side of this UiNumberSupervisor_textField indicating that it can be dragged and scrolled.
         * @type {GraphicObject}
         */
        this.sliderArrowsIcon=null;


        /** Number multiplying the scale of the 'sliderArrowsIcon' GraphicObject. Use this property instead of directly scaling the sliderArrowsIcon GraphicObject to preserve UiZoom and LayoutObject functionality.
         * @type {number}
         */
        this.sliderArrowsIconScaleFactor=null;


        /** The number of digits shown to the right of the decimal within the UiTextField for this UiNumberSupervisor_textField.
         * @type {number}
         * @default 3
         */
        this.displayPrecision = null;
    }
}


/** A ui-specialized vertical LayoutStack that functions as a pop-up window.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • pre-configured with 'UiVisualFocus' functionality.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends LayoutStack
 */
class UiPopupWindow extends LayoutStack
{
    /** A ui-specialized vertical LayoutStack that functions as a pop-up window.
    * UI functionality includes:
    *   • pre-configured with LayoutObject functionality.
    *   • uiStyle TextFormats and Colors applied.
    *   • pre-configured with 'UiKeyboardNavigable' functionality.
    *   • uiZoom-enabled.
    *   • pre-configured with 'UiVisualFocus' functionality.
    *   • nearestPixelRendering-enabled.
    * [REQUIREMENT: module - extendedUi]
    * @param {SceneObject} [parent] The SceneObject that will become the new UiButton's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
    * @param {string} [name] The name of the new UiButton. [DEFAULT: 'UiButton']
    */
    constructor(parent,name)
    {
        /** Boolean determining if this UiPopupWindow is displayed/enabled. 
         * When this property is set to true, this UiPopupWindow becomes the 'singularFocusObject' and also assumes 'visual focus'.
         * @type {boolean} 
         */
         this.isOpen = null;


        /** A UiPanel that serves as the background to the UiPopupWindow.
         * @type {UiPanel}
         */
        this.backgroundPanel=null;


        /** The horizontal LayoutStack containing top bar, which includes the 'ex' button and the title TextBox.
         * @type {LayoutStack}
         */
        this.topBarLeftStack=null;

    
        /** A UiPanel that serves as the background to the top bar in the UiPopupWindow.
         * @type {UiPanel}
         */
        this.topBarBackground=null;


        /** A UiGraphicButton that serves the 'ex' button in the top-left corner of the UiPopupWindow.
         * @type {UiGraphicButton}
         */
        this.exButton=null;


        /** The TextBox serving as the top bar title for the UiPopUpWindow.
         * @type {TextBox}
         */
        this.titleText=null;


        /** The LayoutStack containing the main body displayed by this UiPopupWindow.
         * @type {LayoutStack}
         */
        this.bodyStack=null;


        /** The horizontal LayoutStack containing decision buttons (UiButtons) displayed in the lower-right corner of this UiPopupWindow.
         * @type {LayoutStack}
         */
        this.decisionButtonStack=null;


        /** Flag determining if the UiPopupWindow can be moved via dragging.
         * @default true
         * @type {boolean}
         */
        this.isMovable=null;


        /** Boolean determining if the end-user can press the 'Escape' key, click the 'ex' button, 
         * or click outside of the visual focus dimmer background to exit the UiPopupWindow.
         * Setting this value to false would effectively require that the end-user click one
         * of the decision buttons to exit the UiPopupWindow.
         * @default false
         * @type {boolean} 
         */
         this.allowEscape = null;
    }


    /** A convienience function to bulk-add decision buttons, which are just a series of standardized UiButtons at the bottom of the UiPopupWindow.
    * Once the decision buttons have been added, 'addDecisionButtonTriggerCallback' can be used to add a callback which receives the button's text string, 
    * the triggering UiButton itself, and the containing UiPopupWindow as its first three parameters.
    * @param {Array.<string>} decisionNames An array of strings, where each string will become a UiButton at the bottom of the UiPopupWindow.
    * @param {string} [rightmostUiButtonIsAutoOutlined] Boolean determining if the rightmost decision button is automatically outlined whenever the UiPopupWindow is opened.
    */
    setDecisionButtons(decisionNames,rightmostUiButtonIsAutoOutlined){}


    /** Adds a callback that occurs whenever a decision button is triggered via the cursor or keyboard navigation.
    * The decision string, the triggering UiButton, and the containing UiPopupWindow itself are sent to the callback as its first three parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever a decision button is triggered via the cursor or keyboard navigation.
    * @param {string} callbackName The name of the callback function that occurs whenever a decision button is triggered via the cursor or keyboard navigation.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever a decision button is triggered via the cursor or keyboard navigation.
    */
    addDecisionButtonTriggerCallback(callbackOwner,callbackName,callbackArgs){}


    /** Adds a callback that occurs whenever a UiPopupWindow is opened or closed.
    * A boolean indicating if the UiPopupWindow is open, and the UiPopupWindow itself will be sent to the callback as the first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever a this UiPopupWindow is opened or closed.
    * @param {string} callbackName The name of the callback function that occurs whenever a this UiPopupWindow is opened or closed.
    * @param {Array|any} [callbackArgs] Args for the callback function that occurs whenever a this UiPopupWindow is opened or closed.
    */
    addOpenCloseCallback(callbackOwner,callbackName,callbackArgs){}


    /** Asynchronously awaits the closing of the UiPopupWindow.
     */
    async awaitClose(){}
}


/** A specialized UiDropDownMenu that includes a Superivor member, enabling it to monitor and adjust a string property's value during runtime.
 * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
 * Once configured, the 'mainText' member will be updated every fixed update to reflect the most current value of the supervised string property, 
 * and the value of the supervised property will also be 'adjustable' via cursor interaction with the UiMenu.
 * [REQUIREMENT: module - extendedUi]
 * @extends UiDropDownMenu
 */
class UiStringSupervisor_menu extends UiDropDownMenu
{
     /** A specialized UiDropDownMenu that includes a Superivor member, enabling it to monitor and adjust a string property's value during runtime.
     * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
     * Once configured, the 'mainText' member will be updated every fixed update to reflect the most current value of the supervised string property, 
     * and the value of the supervised property will also be 'adjustable' via cursor interaction with the UiMenu.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiStringSupervisor_menu's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiStringSupervisor_menu. [DEFAULT: 'UiStringSupervisor_menu']
     */
    constructor(parent,name)
    {
        /** Supervisor with callbacks that enable this UiStringSupervisor_menu to monitor and adjust a boolean property's value during runtime.
         * @readonly
         * @type {Supervisor}
         */
        this.supervisor = null;


        /** The owner of the optional callback function that will be called whenever the UiMenu is opened in order to update the list of options.
         * The provided callback function should return an Array of strings meant to be the options presented by this UiStringSupervisor_menu.
         * @type {object}
         */
        this.updateStringOptionsCallbackOwner = null;


        /** The name of the optional callback function that will be called whenever the UiMenu is opened in order to update the list of options.
         * The provided callback function should return an Array of strings meant to be the options presented by this UiStringSupervisor_menu.
         * @type {string}
         */
        this.updateStringOptionsCallbackName = null;


        /** Parameters for the optional callback function that will be called whenever the UiMenu is opened in order to update the list of options.
         * The provided callback function should return an Array of strings meant to be the options presented by this UiStringSupervisor_menu.
         * @type {any}
         */
        this.updateStringOptionsCallbackArgs = null;
    }


    /** Method to update the list of string options available within the UiMenu. 
     * This method can be used once during setup in situations where the list of options is static. 
     * In such a case, the 'updateStringOptionsCallback' callback could be left undefined.
     * @param {Array.<string>} stringOptions The list of strings that will appear as options in the drop down menu.
     */
    setStringOptions(stringOptions){}
}


/** A specialized UiTextField that includes a Superivor member, enabling it to monitor and adjust a string property's value during runtime.
 * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
 * Once configured, the 'mainText' TextBox will be updated every fixed update to reflect the most current value of the supervised property, 
 * and the value of the supervised property will also be 'adjustable' via direct editing of the 'mainText' TextBox.
 * [REQUIREMENT: module - extendedUi]
 * @extends UiTextField
 */
class UiStringSupervisor_textField extends UiTextField
{
     /** A specialized UiTextField that includes a Superivor member, enabling it to monitor and adjust a string property's value during runtime.
     * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
     * Once configured, the 'mainText' TextBox will be updated every fixed update to reflect the most current value of the supervised property, 
     * and the value of the supervised property will also be 'adjustable' via direct editing of the 'mainText' TextBox.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiStringSupervisor_textField's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiStringSupervisor_textField. [DEFAULT: 'UiStringSupervisor_textField']
     */
    constructor(parent,name)
    {
        /** Supervisor with callbacks that enable this UiStringSupervisor_textField to monitor and adjust a string property's value during runtime.
         * @readonly
         * @type {Supervisor}
         */
        this.supervisor = null;
    }
}


/** Object housing default TextFormats, and Colors for various Gui objects such as 'UiButton', 'DropDownMenu' and 'PopUpWindow'.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - pixelsObjects]
 */
class UiStyle
{
    constructor()
    {
        /** Type identifier.
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;

        
        /** The default TextFormat for heading text in the Gui.
         * @type {TextFormat}
         */
        this.textFormat_heading=null;


        /** The default TextFormat for sub-heading text in the Gui.
         * @type {TextFormat}
         */
        this.textFormat_subHeading=null;


        /** The default TextFormat for body text in the Gui.
         * @type {TextFormat}
         */
        this.textFormat_body=null;


        /** The default TextFormat for technical text in the Gui.
         * @type {TextFormat}
         */
        this.textFormat_technical=null;


        /** The default TextFormat for tiny text in the Gui.
         * @type {TextFormat}
         */
        this.textFormat_tiny=null;


        /** The default color for the application header.
         * @type {Color}
         */
        this.color_appHeader=null;


        /** The default color for the title in the header.
         * @type {Color}
         */
        this.color_headerTitle=null;


        /** The default color for text.
         * @type {Color}
         */
        this.color_mainText=null;


        /** The default color for text that is not active.
         * @type {Color}
         */
        this.color_inactiveText=null;


        /** The default color for interactive text.
         * @type {Color}
         */
        this.color_interactiveText=null;


        /** The default color for semi-interactive text.
         * @type {Color}
         */
        this.color_semiInteractiveText=null;


        /** The default color for the dark parts of editor backgrounds.
         * @type {Color}
         */
        this.color_editorBackgroundDark=null;


        /** The default color for the light parts of editor backgrounds.
         * @type {Color}
         */
        this.color_editorBackgroundLight=null;


        /** The default color for highlighted interactive text.
         * @type {Color}
         */
        this.color_highlightedInteractiveText=null;


        /** The default color for background panels.
         * @type {Color}
         */
        this.color_mainPanelBackground=null;


        /** The default color for light background panels.
         * @type {Color}
         */
        this.color_lightPanelBackground=null;


        /** The default color for dark background panels.
         * @type {Color}
         */
        this.color_darkPanelBackground=null;


        /** The default color for panel headers.
         * @type {Color}
         */
        this.color_panelHeader=null;


        /** The default color for panel borders.
         * @type {Color}
         */
        this.color_panelBorder=null;


        /** The default color for highlighted header panels.
         * @type {Color}
         */
        this.color_panelHeaderHighlight=null;


        /** The default color for button panels.
         * @type {Color}
         */
        this.color_buttonPanel=null;


        /** The default color for highlighted button panels.
         * @type {Color}
         */
        this.color_highlightedButtonPanel=null;


        /** The default color for the built in header menus.
         * @type {Color}
         */
        this.color_builtInHeaderMenu=null;


        /** The default color for popup window headers.
         * @type {Color}
         */
        this.color_popupWindowHeader=null;


        /** The default color for bright highlighted button panels.
         * @type {Color}
         */
        this.color_brightHighlightedButtonPanel=null;


        /** The default color for navigation outlining and highlighting.
         * @type {Color}
         */
        this.color_navigationOutline=null;


        /** The default color for selected UI objects.
         * @type {Color}
         */
        this.color_selection=null;


        /** A deeper, more saturated version of 'color_selection'.
         * @type {Color}
         */
        this.color_selectionOutlineBase=null;


        /** The name of the GraphicAsset to use wherever a caret icon (basically an arrow) is needed in UI components.
         * @type {string}
         */
        this.graphicAssetName_caret=null;


        /** The name of the GraphicAsset to use wherever a magnifying glass icon (like next to a search bar) is needed in UI components.
         * @type {string}
         */
        this.graphicAssetName_magnifyingglass=null;


        /** The name of the GraphicAsset to use wherever a checkmark icon is needed in UI components.
         * @type {string}
         */
        this.graphicAssetName_checkmark=null;


        /** The name of the GraphicAsset to use wherever an 'X' icon is needed in UI components.
         * @type {string}
         */
        this.graphicAssetName_ex=null;


        /** The name of the GraphicAsset to use wherever an '-' icon is needed in UI components.
         * @type {string}
         */
        this.graphicAssetName_minus=null;


        /** The standard 'tiny' spacer for the gui.
         * @type {number}
         */
        this.spacer_tiny=null;


        /** The standard 'small' spacer for the gui.
         * @type {number}
         */
        this.spacer_small=null;


        /** The standard 'medium' spacer for the gui.
         * @type {number}
         */
        this.spacer_medium=null;


        /** The standard 'large' spacer for the gui.
         * @type {number}
         */
        this.spacer_large=null;


        /** The owner of the callback function responsible for returning a UiPanel, which is a customizable rectangle of color.
         * UiPanels are used throughout the various gui objects, like UiButton, UiTextField, DropdownMenu, PopupMenu etc., and 
         * generally contribute to the look of the gui. The provided callback must return an instance of this UiPanel, which is 
         * a SceneObject that has 2 additional properties (probably built with getter/setters) 'width' and 'height'. 
         * Also, the object produced from this callback will need to have EffectNodes that respond to the 'colorMultiply' EffectController, 
         * as that EffectController is used to set the color for the UiPanel for its different uses throughout the ui. 
         * This callback is defaults to an internal function that returns a UiPanel that is essentially a WhiteBox, 
         * but can be changed to customize the look of the gui.
         * @type {object}
         */
        this.addUiPanelCallbackOwner=null;


        /** The name of the callback function responsible for returning a UiPanel, which is a customizable rectangle of color.
         * UiPanels are used throughout the various gui objects, like UiButton, UiTextField, DropdownMenu, PopupMenu etc., and 
         * generally contribute to the look of the gui. The provided callback must return an instance of this UiPanel, which is 
         * a SceneObject that has 2 additional properties (probably built with getter/setters) 'width' and 'height'. 
         * Also, the object produced from this callback will need to have EffectNodes that respond to the 'colorMultiply' EffectController, 
         * as that EffectController is used to set the color for the UiPanel for its different uses throughout the ui. 
         * This callback is defaults to an internal function that returns a UiPanel that is essentially a WhiteBox, 
         * but can be changed to customize the look of the gui.
         * @type {string}
         */
        this.addUiPanelCallbackName=null;


        /** The owner of the callback function responsible for returning a UiOutline, which is a customizable rectangular outline.
         * UiOutlines are used throughout the various gui objects, like UiButton, UiTextField, DropdownMenu, PopupMenu etc., and 
         * generally contribute to the look of the gui. The provided callback must return an instance of this UiOutline, which is 
         * a SceneObject that has 2 additional properties (probably built with getter/setters) 'width' and 'height'. 
         * Also, the object produced from this callback will need to have EffectNodes that respond to the 'colorMultiply' EffectController, 
         * as that EffectController is used to set the color for the UiPanel for its different uses throughout the ui. 
         * This callback is defaults to an internal function that returns a UiOutline that is essentially a rectangle made of 4 WhiteBoxes, 
         * but can be changed to customize the look of the gui.
         * @type {object}
         */
        this.addUiOutlineCallbackOwner=null;


        /** The name of the callback function responsible for returning a UiOutline, which is a customizable rectangular outline.
         * UiOutlines are used throughout the various gui objects, like UiButton, UiTextField, DropdownMenu, PopupMenu etc., and 
         * generally contribute to the look of the gui. The provided callback must return an instance of this UiOutline, which is 
         * a SceneObject that has 2 additional properties (probably built with getter/setters) 'width' and 'height'. 
         * Also, the object produced from this callback will need to have EffectNodes that respond to the 'colorMultiply' EffectController, 
         * as that EffectController is used to set the color for the UiPanel for its different uses throughout the ui. 
         * This callback is defaults to an internal function that returns a UiOutline that is essentially a rectangle made of 4 WhiteBoxes, 
         * but can be changed to customize the look of the gui.
         * @type {string}
         */
        this.addUiOutlineCallbackName=null;        
    }


    /** Adds a new UiPanel to the given parent SceneObject.
     * @param {SceneObject} [parent] The parent SceneObject that the new UiPanel will become a child of. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiPanel. [DEFAULT: 'UiPanel']
     * @returns {UiPanel}
     */
    addUiPanel(parent,name){return(null);}


    /** Adds a new UiOutline to the given parent SceneObject.
     * @param {SceneObject} [parent] The parent SceneObject that the new UiOutline will become a child of. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiOutline. [DEFAULT: 'UiOutline']
     * @returns {UiOutline}
     */
    addUiOutline(parent,name){return(null);}


    /** Provides a standardized visual feeback consiting of a fast burst of brightness.
     * This feedback is used for most standardized trigger events such as Button presses and keynavigation triggers.
     * @param {SceneObject} sceneObject The SceneObject that the visual feeback will be applied to.
     */
    standardVisualFeedback(sceneObject){}
}


/** This is a customizable panel of color used throughout the various gui objects such as UiButton, UiTextField, DropdownMenu, PopupMenu etc.,
 * which generally contributes to the look of the gui. The nature of this object can be customized by supplying a new callback function to 
 * 'nc.uiStyle.addUiPanelCallbackOwner' and 'nc.uiStyle.addUiPanelCallbackName'.
 * @extends SceneObject
 * [NON-INSTANTIABLE]
 */
class UiPanel extends SceneObject
{
    constructor()
    {
        /** Number controlling the width of the UiPanel.
         * @type {number}
         */
        this.width=null;


        /** Number controlling the height of the UiPanel.
         * @type {number}
         */
        this.height=null;


        /** Color controlling the coloring of the UiPanel.
         * @type {Color}
         */
        this.colorMultiply=null;
    }
}


/** This is a customizable rectangular outline used throughout the various gui objects such as UiButton, UiTextField, DropdownMenu, PopupMenu etc.,
 * which generally contributes to the look of the gui. The nature of this object can be customized by supplying a new callback function to 
 * 'nc.uiStyle.addUiOutlineCallbackOwner' and 'nc.uiStyle.addUiOutlineCallbackName'.
 * [NON-INSTANTIABLE]
 * @extends SceneObject
 */
class UiOutline extends SceneObject
{
    constructor()
    {
        /** Number controlling the width of the UiOutline.
         * @type {number}
         */
        this.width=null;


        /** Number controlling the height of the UiOutline.
         * @type {number}
         */
        this.height=null;


        /** Color controlling the coloring of the UiOutline.
         * @type {Color}
         */
        this.colorMultiply=null;
    }
}


/** A ui-specialized horizontal LayoutStack housing an editable TextBox with various UI functionalities and defaults applied.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • pre-configured with 'UiKeyboardNavigable' functionality.
 *   • uiZoom-enabled.
 *   • pre-configured with 'UiVisualFocus' functionality.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends LayoutStack
 */
class UiTextField extends LayoutStack
{
     /** A ui-specialized horizontal LayoutStack housing an editable TextBox with various UI functionalities and defaults applied.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • pre-configured with 'UiKeyboardNavigable' functionality.
     *   • uiZoom-enabled.
     *   • pre-configured with 'UiVisualFocus' functionality.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiTextField's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiTextField. [DEFAULT: 'UiTextField']
     */
    constructor(parent,name)
    {
        /** Boolean determining if the UiTextField is available for end-user-internaction, or if it is unavailable and 'grayed out'.
         * @default true
         * @type {boolean}
         */
        this.isActive = null;


        /** The main editable TextBox for this UiTextField.
         * @type {TextBox}
         */
        this.mainText=null;


        /** Boolean determining if a label TextBox is displayed to the left of the UiTextField.
         * @default false
         * @type {boolean}
         */
        this.displayLabel=null;


        /** A UiText that acts as a label for the UiTextField. Please note that this item is undefined until the 'displayLabel' property is set to true.
         * @default undefined
         * @type {UiText}
         */
        this.label=null;


        /** The main Button for the UiTextField, this object is a UiPanel which also implements Button.
         * @type {Button}
         */
        this.mainButton=null;


        /** The outline of the button, which is used to indicate when the end-user outlines this UiTextField using keyboard navigation (tab, arrows, etc...).
         * @type {UiOutline}
         */
        this.outline=null;


        /** The Color of the Button background.
         * @default nc.uiStyle.color_buttonPanel
         * @type {Color}
         */
        this.buttonBackgroundColor=null;


        /** The Color of the Button background when it's highlighted.
         * @default nc.uiStyle.color_highlightedButtonPanel
         * @type {Color}
         */
        this.highlightedButtonBackgroundColor=null;
    }


    /** Adds a callback that occurs whenever this UiTextField is triggered via the cursor or keyboard navigation.
    * The triggering browser-created event, and the UiTextField itself are sent to the callback as its first two parameters.
    * @param {object} callbackOwner The object owning the callback function that occurs whenever this UiTextField is triggered via the cursor or keyboard navigation.
    * @param {string} callbackName The name of the callback function that occurs whenever this UiTextField is triggered via the cursor or keyboard navigation.
    * @param {Array|any} [callbackArgs] Args for the callback function that is triggered whenever this UiTextField is triggered via the cursor or keyboard navigation.
    */
    addTriggerCallback(callbackOwner,callbackName,callbackArgs){}


    /** Removes the given trigger callback.
    * @param {object} callbackOwner The object owning the callback to be removed.
    * @param {string} callbackName The name of the callback to be removed.
    */
    removeTriggerCallback(callbackOwner,callbackName){}
}


/** A ui-specialized TextBox with various UI functionalities and defaults applied.
 * UI functionality includes:
 *   • pre-configured with LayoutObject functionality.
 *   • uiStyle TextFormats and Colors applied.
 *   • uiZoom-enabled.
 *   • nearestPixelRendering-enabled.
 * [REQUIREMENT: module - extendedUi]
 * @extends TextBox
 */
class UiText extends TextBox
{
     /** A ui-specialized TextBox with various UI functionalities and defaults applied.
     * UI functionality includes:
     *   • pre-configured with LayoutObject functionality.
     *   • uiStyle TextFormats and Colors applied.
     *   • uiZoom-enabled.
     *   • nearestPixelRendering-enabled.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiText's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiText. [DEFAULT: 'UiText']
     */
    constructor(parent,name)
    {
    }
}


/** A specialized UiCollapsibleStack that includes a group of UiTextFields and a Superivor member, enabling it to monitor and adjust a Vector property's value during runtime.
 * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
 * Once configured, the included UiTextFields will be updated every fixed update to reflect the most current values of the supervised Vector components, 
 * and the component values will also be 'adjustable' via direct editing of the UiTextFields, as well as through cursor interaction.
 * [REQUIREMENT: module - extendedUi]
 * @extends UiCollapsibleStack
 */
class UiVectorSupervisor_textField extends UiCollapsibleStack
{
     /** A specialized UiCollapsibleStack that includes a group of UiTextFields and a Superivor member, enabling it to monitor and adjust a Vector property's value during runtime.
     * To use this class, configure the 'supervisedPropertyGetter' and 'supervisedPropertySetter' callbacks on the Supervisor.
     * Once configured, the included UiTextFields will be updated every fixed update to reflect the most current values of the supervised Vector components, 
     * and the component values will also be 'adjustable' via direct editing of the UiTextFields, as well as through cursor interaction.
     * [REQUIREMENT: module - extendedUi]
     * @param {SceneObject} [parent] The SceneObject that will become the new UiStringSupervisor_textField's parent in the Scene hierarchy. [DEFAULT: nc.mainScene]
     * @param {string} [name] The name of the new UiStringSupervisor_textField. [DEFAULT: 'UiVectorSupervisor_textField']
     */
    constructor(parent,name)
    {
        /** Supervisor with callbacks that enable this UiStringSupervisor_textField to monitor and adjust a Vector's component values during runtime.
         * @readonly
         * @type {Supervisor}
         */
        this.supervisor = null;


        /** The number of components shown by default - i.e. this is the number of components that will be shown when the supervisedPropertyGetter returns undefined.
         * @default 3
         * @type {number}
         */
        this.defaultDimension = null;


        /** The number of digits shown to the right of the decimal within the component UiTextFields of this UiVectorSupervisor_textField.
         * @type {number}
         * @default 3
         */
        this.displayPrecision = null;
    }


    /** Returns an array of the UiTextFields in this UiVectorSupervisor_textField.
     * @returns {Array.<UiTextField>}
     */
    getComponentTextFields(){return(null);}


    /** Sets a value that multiplies the affect of dragging the component label. For reference, a value of 1 is fitting for a component whose range is roughly 500;
     * @param {number} componentIndex The index of the component that the given multiplier will be applied to (0=x,1=y,2=z,3=w).
     * @param {number} multiplierValue The value that will multiply the affect of dragging the label associated with the given component.
     */
    setDragMultiplier(componentIndex,multiplierValue){}
}


/** Object housing functionality that enables for the SceneObject owning it to be 'visually focused', which focuses the end-user's 
 * attention the given SceneObject by placing it in front of a dimmer layer whenever the object is the the current 'singularFocusObject'.
 * Calling 'configureUiVisualFocus' populates the 'uiVisualFocus' member for the owning SceneObject.
 * It should be noted that the dimmer layer that the newly focused item is placed in front of is actually a button which, 
 * when pressed, calls the 'attemptExitUiVisualFocus' member of the current singularFocusObject if that member is defined.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - extendedUi]
 */
class UiVisualFocus
{
    constructor()
    {
    }


    /** Disposes this UiVisualFocus, disabling the visual focus functionality for the SceneObject owning it, and freeing the object for garbage collection.
     */
    dispose(){}
}


/** Object housing functionality associated with the user interface zoom, which enables end-users to increase or decrease 
 * the overall size of text and other user interface items (when those items have uiZoom functionality enabled).
 * [NON-INSTANTIABLE]
 */
class UiZoom
{
    constructor()
    {
        /**
         * The number associated with the zoom level of user interface items.
         * @default 1
         * @type {number}
         */
        this.zoomValue = null;


        /**
         * The read-only value associated with the overall zoom level of user interface items, including the 'devicePixelRatio', which is set by the browser.
         * For UI items to accurately adjust to both the zoomValue and the browser's devicePixelRatio, use this value.
         * @default 1
         * @type {number}
         * @readOnly
         */ 
        this.totalZoom = null;


        /** Flag determining if certain uiZoom-capable objects will have the 'standard' uiZoom functionality automatically 
         * enabled upon their instantiation. Objects affected by this include TextBox, TextAssembly, LayoutStack, SrollingPanel, 
         * UiButton, UiTextField, UiCollapsibleStack, DropDownMenu, DropSideMenu, and PopupWindow.
         * This flag works on a 'state-machine' basis; newly instantiated objects will automatically have the standard uiZoom 
         * functionality enabled while this flag is true. Otherwise, uiZoom functionality will not be automatically enabled on any objects, 
         * and would instead need to be manually enabled either using 'nc.uiZoom.enableStandardUiZoomFunctionality' or by implementing custom
         * uiZoom functionality using 'nc.appEvents.uiZoomChange.addCallback'.
         * @default false
         * @type {boolean}
         */
        this.autoEnableStandardUiZoomFunctionality = null;
    }


    /** Certain built-in Incisor® objects have standard uiZoom functionality that can be enabled. For example, TextBox objects
     * have a standard uiZoom implementation that can be enabled, which consists of applying the 'nc.uiZoom.totalZoom' multiplier
     * to the individual characters' scale, as well as the maxWidth, and maxHeight. The list of objects that have standard uiZoom
     * implementations include SceneObject, GraphcObject, TextBox, TextAssembly, LayoutStack, SrollingPanel, UiButton, UiTextField, 
     * UiCollapsibleStack, DropDownMenu, DropSideMenu, and PopupWindow. Provide any of these objects as a parameter to this function,
     * and their uiZoom functionality will be enabled. You can also set the 'autoEnableStandardUiZoomFunctionality' flag to true,
     * which tells Incisor® to automatically enable the standard uiZoom functionality upon instantiation for some objects. 
     * If you want to create custom uiZoom functionality, just add a callback using 'nc.appEvents.uiZoomChange.addCallback', and perform 
     * the desired custom operations in that function.
     * @param {object} obj The object to enable the standard UiZoom functionality on.
     */
    enableStandardUiZoomFunctionality(obj){}
}


/** Object housing testing functionality that enables a project to refresh itself repeatedly with different url parameters.
 * Such functionality can help with batch testing of a project's configurations or settings.
 * To use this functionality, first call the 'UrlParameterIteration.setup' method, passing it an array of objects where each object
 * represents the url parameters you would like the browser to refresh with. When ready to start the iteration, call
 * 'UrlParameterIteration.start'. Then add the desired functionality per url parameter - be sure to implement what you want 
 * conditionally based on the url params (otherwise everything will happen on every refresh). 
 * When the desired tasks (testing, screen shots, etc...) have completed for each set of url parameters, call 'UrlParameterIteration.next',
 * this will proceed to refresh with the next set of url parameters.
 * [NON-INSTANTIABLE]
 * [REQUIREMENT: module - urlParameterIterator]
 * [REQUIREMENT: license - advancedTools]
 */
class UrlParameterIterator
{
    /** Function that informs the UrlParameterIterator of the set of url parameters that it will iterate over. This function must
     * be called un-conditionally upon every refresh in order for the UrlPerameterIterator to function properly.
     * @param {Array.<object>} urlParametersList Array of objects where each object represents the active url parameters for a particular iteration.
     * @param {object} postIterationCallbackOwner The object owning the callback function to be called when the iteration completes.
     * @param {string} postIterationCallackName The name of the callback function to be called when the iteration completes.
     */
    setup(urlParametersList,postIterationCallbackOwner,postIterationCallackName){return(null);}


    /** Starts the process of refreshing the browser, iterating through the list of url parameters provided in 'UrlParameterIterator.setup'.
     * @param {number} [startingIndex] Optional starting index, enabling iteration to start at a non-zero value. [DEFAULT: 0]
     */
    start(startingIndex){return(null);}


    /** Proceeds to the next item in the list of url parameters, refreshing the browser with the coorespoinging url.
     */
    next(){return(null);}
}


/** Object housing the swoopers for this Vector's components
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class Vector1Swoop
{
    /** Swoops (interpolates) each of the Vector components from their current values to the given end values over the duration.
     * @param {Array.<number>} endValues The ending values for the numeric properties being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     */
    each(endValues,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Swoops (interpolates) all of the Vector components from their current values to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric properties being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     */
    all(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     */
    x(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the swoopers for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector1Swoop
 * @hideconstructor
 */
class Vector2Swoop extends Vector1Swoop
{
    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     */
    y(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}

/** Object housing the swoopers for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector2Swoop
 * @hideconstructor
 */
class Vector3Swoop extends Vector2Swoop
{
    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     */
    z(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the swoopers for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector3Swoop
 * @hideconstructor
 */
class Vector4Swoop extends Vector3Swoop
{
    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     */
    w(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the swoopers for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector4Swoop
 * @hideconstructor
 */
class ColorSwoop extends Vector4Swoop
{
    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     * @example
     * // Objective: Swoop the red Color of a GraphicObject.
     * // Expected Result: You will see a red box fade to black over a period of 10 seconds, then fade back to red over a period of 5 seconds.
     * 
     * // Create a Color using the Color constructor. Initially, make it red.
     * let color = new Color( 1, 0, 0, 1 );
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "RedBox" );
     * // Set the GraphicObject's fillColor property to the new Color (initially red).
     * myGraphicObject.fillColor = color;
     * // Swoop the red color down to zero over 10 seconds then swoop it back to 1 over 5 seconds.
     * color.swoop.red( 0, 10, undefined, color.swoop, "red", [1,5] );
     */
    red(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     * @example
     * // Objective: Swoop the green Color of a GraphicObject.
     * // Expected Result: You will see a green box fade to black over a period of 10 seconds, then fade back to green over a period of 5 seconds.
     * 
     * // Create a Color using the Color constructor. Initially, make it green.
     * let color = new Color( 0, 1, 0, 1 );
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "GreenBox" );
     * // Set the GraphicObject's fillColor property to the new Color (initially green).
     * myGraphicObject.fillColor = color;
     * // Swoop the green color down to zero over 10 seconds then swoop it back to 1 over 5 seconds.
     * color.swoop.green( 0, 10, undefined, color.swoop, "green", [1,5] );
     */
    green(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     * @example
     * // Objective: Swoop the blue Color of a GraphicObject.
     * // Expected Result: You will see a blue box fade to black over a period of 10 seconds, then fade back to blue over a period of 5 seconds.
     * 
     * // Create a Color using the Color constructor. Initially, make it blue.
     * let color = new Color( 0, 0, 1, 1 );
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "BlueBox" );
     * // Set the GraphicObject's fillColor property to the new Color (initially blue).
     * myGraphicObject.fillColor = color;
     * // Swoop the blue color down to zero over 10 seconds then swoop it back to 1 over 5 seconds.
     * color.swoop.blue( 0, 10, undefined, color.swoop, "blue", [1,5] );
     */
    blue(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Swoops (interpolates) given component from its current value to the given end value over the duration.
     * @param {number} endValue The ending value for the numeric property being swooped.
     * @param {number} [duration] The duration for the interpolation. [DEFAULT: 0]
     * @param {TweenType} [tweenType] The TweenType, determining the method of interpolation. [DEFAULT: nc.tweenTypes.Linear]
     * @param {object} [completionCallbackOwner] The object owning the callback function that is called when the Swooper completes. 
     * @param {string} [completionCallbackName] The name of the function that is called when the Swooper completes. 
     * @param {Array|any} [completionCallbackArgs] Arguments for the function that is called when the Swooper completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Swooper will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Swooper is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the swooping process. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the swooping process. 
     * @returns {Swooper}
     * @example
     * // Objective: Swoop the alpha (transparency) of a GraphicObject.
     * // Expected Result: You will see a white box gradually disappear over a period of 10 seconds, then reappear back to white over a period of 5 seconds.
     * 
     * // Create a Color using the Color constructor. By default, it will be white.
     * let color = new Color();
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject(nc.graphicAssets.whiteBox, nc.mainScene, "WhiteBox");
     * // Set the GraphicObject's fillColor property to the new Color (initially white).
     * myGraphicObject.fillColor = color;
     * // Swoop the alpha value down to zero over 10 seconds then swoop it back to 1 over 5 seconds.
     * color.swoop.alpha(0, 10, undefined, color.swoop, "alpha", [1, 5]);
     */
    alpha(endValue,duration,tweenType,completionCallbackOwner,completionCallbackName,completionCallbackArgs,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the 'addMotion' functions for this Vector's components
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class Vector1AddMotion
{
    /** Adds a motion to each of the components of this Vector (bounds to be supplied individually), and returns a Motion object, which can be used to control the motion dynamically.
     * @param {Array.<number>} lowerBounds The lower bound(s) for the motion being added.
     * @param {Array.<number>} upperBounds The upper bound(s) for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Use the each() function to add motion to the color of the box.
     * // Expected Result: You will see a box continuously fading in and out from bright white to a dark, semi-transparent blue.
     * 
     * // create a GraphicObject using the WhiteBox asset
     * let box = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
     * // set the lower and upper color bounds as arrays and slow the motion speed to .2
     * box.colorMultiply.addMotion.each( [0, .1, .6, .4], [.7, 1, .8, 2], .2 );
     */
    each(lowerBounds,upperBounds,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Adds the a motion to all of the components of this Vector (using the same set of bounds), and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Use the all() function to add motion to the scale of a box.
     * // Expected Result: You will see a white box continuously expanding and contracting.
     * 
     * // create a GraphicObject using the WhiteBox asset
     * let box = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
     * // set the upper and lower bounds of the scale of the box and slow the motion speed to .2
     * box.scale.addMotion.all(  0, 3, .2 );
     */
    all(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Use the x() function to add motion along the x axis.
     * // Expected Result: You will see a white box continuously moving back and forth along the x axis.
     * 
     * // create a GraphicObject using the WhiteBox asset
     * let box = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
     * // set the upper and lower bounds of the x position of the box and slow the motion speed to .2
     * box.position.addMotion.x(  -500, 500, .2 );
     */
    x(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the 'addMotion' functions for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector1AddMotion
 * @hideconstructor
 */
class Vector2AddMotion extends Vector1AddMotion
{
    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Use the y() function to add motion along the y axis.
     * // Expected Result: You will see a white box continuously moving back and forth along the y axis.
     * 
     * // create a GraphicObject using the WhiteBox asset
     * let box = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
     * // set the upper and lower bounds of the y position of the box and slow the motion speed to .2
     * box.position.addMotion.y(  -500, 500, .2 );
     */
    y(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the 'addMotion' functions for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector2AddMotion
 * @hideconstructor
 */
class Vector3AddMotion extends Vector2AddMotion
{
    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     */
    z(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the 'addMotion' functions for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector3AddMotion
 * @hideconstructor
 */
class Vector4AddMotion extends Vector3AddMotion
{
    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     */
    w(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** Object housing the 'addMotion' functions for this Vector's components
 * [NON-INSTANTIABLE]
 * @extends Vector4AddMotion
 * @hideconstructor
 */
class ColorAddMotion extends Vector4AddMotion
{
    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Create a blinking red box.
     * // Expected Result: You will see a box continuously blinking between red and black.
     * 
     * // Create a Color using the Color constructor. Initially, make it red.
     * let color = new Color( 1, 0, 0, 1 );
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "RedBox" );
     * // Set the GraphicObject's fillColor property to the new Color.
     * myGraphicObject.fillColor = color;
     * // Add a blinking motion by setting the lower bound to black and the upper bound to red at a speed of 2.
     * color.addMotion.red( 0, 1, 2 );
     */
    red(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Create a blinking green box.
     * // Expected Result: You will see a box continuously blinking between green and black.
     * 
     * // Create a Color using the Color constructor. Initially, make it green.
     * let color = new Color( 0, 1, 0, 1 );
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "GreenBox" );
     * // Set the GraphicObject's fillColor property to the new Color.
     * myGraphicObject.fillColor = color;
     * // Add a blinking motion by setting the lower bound to black and the upper bound to green at a speed of 2.
     * color.addMotion.green( 0, 1, 2 );
     */
    green(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Create a blinking blue box.
     * // Expected Result: You will see a box continuously blinking between blue and black.
     * 
     * // Create a Color using the Color constructor. Initially, make it blue.
     * let color = new Color( 0, 0, 1, 1 );
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "BlueBox" );
     * // Set the GraphicObject's fillColor property to the new Color.
     * myGraphicObject.fillColor = color;
     * // Add a blinking motion by setting the lower bound to black and the upper bound to blue at a speed of 2.
     * color.addMotion.blue( 0, 1, 2 );
     */
    blue(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}


    /** Adds a motion to the given component and returns a Motion object, which can be used to control the motion dynamically.
     * @param {number} lowerBound The lower bound for the motion being added.
     * @param {number} upperBound The upper bound for the motion being added.
     * @param {number} [motionSpeed] The speed factor for the added motion. [DEFAULT: 1]
     * @param {MotionType} [motionType] The MotionType, determining the nature of the motion being added. [DEFAULT: nc.motionTypes.Pendulum]
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this Motion will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this Motion is affected by. [DEFAULT: nc.defaultSpeedControl]
     * @param {object} [eventCallbackOwner] The object owning the callback function that is called with each fixedUpdate during the motion. 
     * @param {string} [eventCallbackName] The name of the function that is called with each fixedUpdate during the motion. 
     * @returns {Motion}
     * @example
     * // Objective: Create a blinking box.
     * // Expected Result: You will see a box continuously blinking. It will gradually disappear and reappear back to white.
     * 
     * // Create a Color using the Color constructor. Initially, it will be white.
     * let color = new Color();
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "WhiteBox" );
     * // Set the GraphicObject's fillColor property to the new Color.
     * myGraphicObject.fillColor = color;
     * // Add a blinking motion by setting the lower bound to transparent(0) and the upper bound to opaque(1) at a speed of 2.
     * color.addMotion.alpha( 0, 1, 2 );
     */
    alpha(lowerBound,upperBound,motionSpeed,motionType,pauseImmunity,speedControl,eventCallbackOwner,eventCallbackName){return(null);}
}


/** The 'base' object for the Vector4 type. This is not for general use - use Vector4 instead.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class Vector4Base
{
    constructor(x, y, z, w)
    {
        /** Type identifier.
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The first component of this Vector.
         * @type {number}
         */
        this.x=null;


        /** The second component of this Vector.
         * @type {number}
         */
        this.y=null;


        /** The third component of this Vector.
         * @type {number}
         */
        this.z=null;


        /** The fourth component of this Vector.
         * @type {number}
         */
        this.w=null;
    }


    /** Multiplies all Vector components by the given factor.
     * @param {number} factor The value to multiply the Vector components by.
     * @example
     * // Objective: Use the scaleByFactor to change the color of the white box.
     * // Expected Result: You will see a half transparent gray box.
     * 
     * // create a GraphicObject using the WhiteBox asset
     * let box = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
     * // multiplying with the box's default color (1,1,1,1) results in a final color of (.5, .5, .5, .5) 
     * box.fillColor.scaleByFactor( .5 );
     */
    scaleByFactor(factor){}


    /** Multiplies all components of this Vector by the given Vector.
     * @param {Vector4} vector The Vector to multiply this Vector by.
     * @example
     * // Objective: Use the multiply function to change the color of the white box.
     * // Expected Result: You will see a denim blue box.
     * 
     * // create a GraphicObject using the WhiteBox asset
     * let box = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
     * // create a color to multiply with the box's default color (1,1,1,1)
     * let colorMultiplier = new Color( 0, .5, 1, .8 );
     * // multiplying results in a final color of (0, .5, 1, .8) 
     * box.fillColor.multiply( colorMultiplier );
     */
    multiply(vector){}


    /** Multiplies the components of this Vector by the values provided.
     * @param {number} [x] The value to multiply the first component by. [DEFAULT: 1]
     * @param {number} [y] The value to multiply the second component by. [DEFAULT: 1]
     * @param {number} [z] The value to multiply the third component by. [DEFAULT: 1]
     * @param {number} [w] The value to multiply the fourth component by. [DEFAULT: 1]
     * @example
     * // Objective: Use the multiplyByValues function to change the color of the white box.
     * // Expected Result: You will see a denim blue box.
     * 
     * // create a GraphicObject using the WhiteBox asset
     * let box = new GraphicObject( nc.graphicAssets.WhiteBox, nc.mainScene, "Box" );
     * // multiplying with the box's default color (1,1,1,1) results in a final color of (0, .5, 1, .8) 
     * box.fillColor.multiplyByValues( 0, .5, 1, .8  );
     */
    multiplyByValues(x,y,z,w){}


    /** Sets all of this Vector's component values to the component values of the given Vector.
     * @param {Vector4} vector The Vector to copy component values from.
     */
    copy(vector){}


    /** Determines if all of the components of this Vector are equal to their counterparts in the given Vector.
     * @param {Vector4} vector The Vector to compare against.
     * @returns {boolean}
     */
    isEqual(vector){}


    /** Returns a new Vector4 with the same component values as this Vector.
     * @returns {Vector4}
     */
    clone(){}
}


/** An object with 4 numeric properties (x, y, z, w).
 * @extends Vector4Base
 */
class Vector4 extends Vector4Base
{
    /** An object with 4 numeric properties (x, y, z, w).
     * @param {number} [x] The value for the first component. [DEFAULT: 0]
     * @param {number} [y] The value for the second component. [DEFAULT: 0]
     * @param {number} [z] The value for the third component. [DEFAULT: 0]
     * @param {number} [w] The value for the fourth component. [DEFAULT: 0]
     */
    constructor(x, y, z, w)
    {
        /** Object housing the built-in swoopers for this Vector's components.
         * @type {Vector4Swoop}
         */
        this.swoop=null;


        /** Object housing the built-in 'addMotion' functions for this Vector's components.
         * @type {Vector4AddMotion}
         */
        this.addMotion=null;
    }
}


/** An object with 4 numeric properties (red, green, blue, alpha) representing a color with transparency.
 * @extends Vector4Base
 */
class Color extends Vector4Base
{
    /** An object with 4 numeric properties (red, green, blue, alpha) representing a color with transparency.
     * @param {number} [red] The value for the first component. [DEFAULT: 0]
     * @param {number} [green] The value for the second component. [DEFAULT: 0]
     * @param {number} [blue] The value for the third component. [DEFAULT: 0]
     * @param {number} [alpha] The value for the fourth component. [DEFAULT: 0]
     * @example
     * // Objective: Instantiate a Color and add a red box.
     * // Expected Result: You should see a red box.
     * 
     * // Create a Color using the Color constructor. Set the red value to 1 and green and blue to zero.
     * let red = new Color( 1, 0, 0, 1 );
     * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
     * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "RedBox" );
     * // Set the GraphicObject's fillColor property to the new red Color.
     * myGraphicObject.fillColor = red;
     */
    constructor(red, green, blue, alpha)
    {
        /** Object housing the built-in swoopers for this Vector's components.
         * @type {ColorSwoop}
         * @example
         * // Objective: Swoop the Color of a GraphicObject.
         * // Expected Result: You will see a red box fade to black over a period of 10 seconds, then fade back to red over a period of 5 seconds.
         * 
         * // Create a Color using the Color constructor. Initially, make it red.
         * let color = new Color( 1, 0, 0, 1 );
         * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "RedBox" );
         * // Set the GraphicObject's fillColor property to the new Color (initially red).
         * myGraphicObject.fillColor = color;
         * // Swoop the red color down to zero over 10 seconds then swoop it back to 1 over 5 seconds.
         * color.swoop.red( 0, 10, undefined, color.swoop, "red", [1,5] );
         */
        this.swoop=null;


        /** Object housing the built-in 'addMotion' functions for this Vector's components.
         * @type {ColorAddMotion}
         * @example
         * // Objective: Add motion to the changing Colors of a box.
         * // Expected Result: You will see a box continuously changing colors as the red, green and blue values adjust up and down over different time intervals.
         * 
         * // Create a Color using the Color constructor. Initially, it will default to white.
         * let color = new Color();
         * // Create a GraphicObject using the GraphicObject constructor. Use the white box GraphicAsset and add it to the main Scene.
         * let myGraphicObject = new GraphicObject( nc.graphicAssets.whiteBox, nc.mainScene, "RedBox" );
         * // Set the GraphicObject's fillColor property to the new Color.
         * myGraphicObject.fillColor = color;
         * // Add motion to the red, green and blue values over different time intervals.
         * color.addMotion.red( 0, 1, .04 );
         * color.addMotion.green( 0, 1, .09 );
         * color.addMotion.blue( 0, 1, 1.5 );
         */
        this.addMotion=null;


        /** The red value of this Color.
         * @type {number} 
         * @example
         * // Objective: Get the red value of a Color.
         * // Expected Result: The console should read "The red value is 0.5".
         * 
         * // Create a color using the Color constructor. Set the red value to 0.5.
         * let color = new Color( 0.5, 0, 0, 1 );
         * console.log("The red value is", color.red);
         */
        this.red = null;


        /** The green value of this Color.
         * @type {number} 
         * @example
         * // Objective: Get the green value of a Color.
         * // Expected Result: The console should read "The green value is 0.5".
         * 
         * // Create a color using the Color constructor. Set the green value to 0.5.
         * let color = new Color( 0, 0.5, 0, 1 );
         * console.log("The green value is", color.green);
         */
        this.green = null;


        /** The blue value of this Color.
         * @type {number} 
         * @example
         * // Objective: Get the blue value of a Color.
         * // Expected Result: The console should read "The blue value is 0.5".
         * 
         * // Create a color using the Color constructor. Set the blue value to 0.5.
         * let color = new Color( 0, 0, 0.5, 1 );
         * console.log("The blue value is", color.blue);
         */
        this.blue = null;


        /** The alpha value of this Color.
         * @type {number} 
         * @example
         * // Objective: Get the alpha value of a Color.
         * // Expected Result: The console should read "The alpha value is 0.5".
         * 
         * // Create a color using the Color constructor. Set the alpha value to 0.5.
         * let color = new Color( 0, 0, 0, 0.5 );
         * console.log("The alpha value is", color.alpha);
         */
        this.alpha = null;
    }
}


/** The 'base' object for the Vector3 type. This is not for general use - use Vector3 instead.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class Vector3Base
{
    /** Vector3 constructor
     * @param {number} [x] The value for the first component. [DEFAULT: 0]
     * @param {number} [y] The value for the second component. [DEFAULT: 0]
     * @param {number} [z] The value for the third component. [DEFAULT: 0]
     */
    constructor(x, y, z)
    {
        /** Type identifier.
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The first component of this Vector.
         * @type {number}
         */
        this.x=null;


        /** The second component of this Vector.
         * @type {number}
         */
        this.y=null;


        /** The third component of this Vector.
         * @type {number}
         */
        this.z=null;
    }


    /** Multiplies all Vector components by the given factor.
     * @param {number} factor The value to multiply the Vector components by.
     */
    scaleByFactor(factor){}


    /** Multiplies all components of this Vector by the given Vector.
     * @param {Vector3} vector The Vector to multiply this Vector by.
     */
    multiply(vector){}


    /** Multiplies the components of this Vector by the values provided.
     * @param {number} [x] The value to multiply the first component by. [DEFAULT: 1]
     * @param {number} [y] The value to multiply the second component by. [DEFAULT: 1]
     * @param {number} [z] The value to multiply the third component by. [DEFAULT: 1]
     */
    multiplyByValues(x,y,z){}


    /** Sets all of this Vector's component values to the component values of the given Vector.
     * @param {Vector3} vector The Vector to copy component values from.
     */
    copy(vector){}


    /** Determines if all of the components of this Vector are equal to their counterparts in the given Vector.
     * @param {Vector3} vector The Vector to compare against.
     * @returns {boolean}
     */
    isEqual(vector){}


    /** Returns a new Vector3 with the same component values as this Vector.
     * @returns {Vector3}
     */
    clone(){}
}


/** An object with 3 numeric properties (x, y, z).
 * @extends Vector3Base
 */
class Vector3 extends Vector3Base
{
    /** An object with 3 numeric properties (x, y, z).
     * @param {number} [x] The value for the first component. [DEFAULT: 0]
     * @param {number} [y] The value for the second component. [DEFAULT: 0]
     * @param {number} [z] The value for the third component. [DEFAULT: 0]
     */
    constructor(x, y, z)
    {
        /** Object housing the built-in swoopers for this Vector's components.
         * @type {Vector3Swoop}
         */
        this.swoop=null;


        /** Object housing the built-in 'addMotion' functions for this Vector's components.
         * @type {Vector3AddMotion}
         */
        this.addMotion=null;
    }
}


/** The 'base' object for the Vector2 type. This is not for general use - use Vector2 instead.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class Vector2Base
{
    /** Vector2 constructor
     * @param {number} [x] The value for the first component. [DEFAULT: 0]
     * @param {number} [y] The value for the second component. [DEFAULT: 0]
     */
    constructor(x, y)
    {
        /** Type identifier.
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The first component of this Vector.
         * @type {number}
         */
        this.x=null;


        /** The second component of this Vector.
         * @type {number}
         */
        this.y=null;
    }


    /** Multiplies all Vector components by the given factor.
     * @param {number} factor The value to multiply the Vector components by.
     */
    scaleByFactor(factor){}


    /** Multiplies all components of this Vector by the given Vector.
     * @param {Vector2} vector The Vector to multiply this Vector by.
     */
    multiply(vector){}


    /** Multiplies the components of this Vector by the values provided.
     * @param {number} [x] The value to multiply the first component by. [DEFAULT: 1]
     * @param {number} [y] The value to multiply the second component by. [DEFAULT: 1]
     */
    multiplyByValues(x,y){}


    /** Sets all of this Vector's component values to the component values of the given Vector.
     * @param {Vector2} vector The Vector to copy component values from.
     */
    copy(vector){}


    /** Determines if all of the components of this Vector are equal to their counterparts in the given Vector.
     * @param {Vector2} vector The Vector to compare against.
     * @returns {boolean}
     */
    isEqual(vector){}


    /** Returns a new Vector2 with the same component values as this Vector.
     * @returns {Vector2}
     */
    clone(){}
}


/** An object with 2 numeric properties (x, y).
 * @extends Vector2Base
 */
class Vector2 extends Vector2Base
{
    /** An object with 2 numeric properties (x, y).
     * @param {number} [x] The value for the first component. [DEFAULT: 0]
     * @param {number} [y] The value for the second component. [DEFAULT: 0]
     */
    constructor(x, y)
    {
        /** Object housing the built-in swoopers for this Vector's components.
         * @type {Vector2Swoop}
         */
        this.swoop=null;


        /** Object housing the built-in 'addMotion' functions for this Vector's components.
         * @type {Vector2AddMotion}
         */
        this.addMotion=null;
    }
}


/** The 'base' object for the Vector1 type. This is not for general use - use Vector1 instead.
 * [NON-INSTANTIABLE]
 * @hideconstructor
 */
class VectorBase
{
    /** Vector1 constructor
     * @param {number} [x] The value for the first component. [DEFAULT: 0]
     */
    constructor(x)
    {
        /** Type identifier.
         * @type {string}
         * @readonly
         */
        this.type=null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The number of components this Vector has
         * @type {number}
         */
        this.dimension=null;


        /** The first component of this Vector.
         * @type {number}
         */
        this.x=null;
    }


    /** Multiplies all Vector components by the given factor.
     * @param {number} factor The value to multiply the Vector components by.
     */
    scaleByFactor(factor){}


    /** Multiplies all components of this Vector by the given Vector.
     * @param {Vector1} vector The Vector to multiply this Vector by.
     */
    multiply(vector){}


    /** Multiplies the components of this Vector by the values provided.
     * @param {number} [x] The value to multiply the first component by. [DEFAULT: 1]
     */
    multiplyByValues(x){}


    /** Sets all of this Vector's component values to the component values of the given Vector.
     * @param {Vector1} vector The Vector to copy component values from.
     */
    copy(vector){}


    /** Determines if all of the components of this Vector are equal to their counterparts in the given Vector.
     * @param {Vector1} vector The Vector to compare against.
     * @returns {boolean}
     */
    isEqual(vector){}


    /** Returns a new Vector1 with the same component values as this Vector.
     * @returns {Vector1}
     */
    clone(){}
}


/** An object with 1 numeric property (x).
 * @extends VectorBase
 */
class Vector1 extends VectorBase
{
    /** An object with 1 numeric property (x).
     * @param {number} [x] The value for the first component. [DEFAULT: 0]
     */
    constructor(x)
    {
        /** Object housing the built-in swoopers for this Vector's components.
         * @type {Vector1Swoop}
         */
        this.swoop=null;


        /** Object housing the built-in 'addMotion' functions for this Vector's components.
         * @type {Vector1AddMotion}
         */
        this.addMotion=null;
    }
}


/** A specialized PlaybackController that manages the playback of video assets.
 * When compressed video assets (mp4 or webm) are included in a project a Texture, Geometry, GraphicAsset, and Video with that same name are created in Incisor.
 * Once included, any GraphicObject can be set to the corresponding GraphicAsset, and the associated Video object can control the video's playback.
 * It should be noted that the visual content of any instance or use of the GraphicAsset will be same everywhere - as video's content is pushed to the
 * associated texture, all objects using that Texture will see the same content.
 * Videos in Incisor rely entirely on the browser's decoding and playback capabilities, which typically don't support rapid/repeated changes to video properties. 
 * In practice, videos perform well when playing once normally or free-running, but do not do well with a lot of rapid time jumps or scrubbing.
 * Video formats are not uniformly supported for use within all browsers, and their use is not advised within projects meant to be universally accessible.
 * Acceptable extensions for video files include ".mp4" and ".webm", and while webm (VP8 or VP9) typically supports transparency, there are currently
 * no video formats that support transparency on any Apple mobile or desktop products.
 * [REQUIREMENT: module - videos]
 * [NON-INSTANTIABLE]
 * @extends TimePlaybackController
 */
class Video extends TimePlaybackController
{
    constructor()
    {
        /** The Sounds's name. This must be unique among Videos, GraphicAssets, Textures, and Geometries.
         * @type {string}
         * @readonly
         */
        this.name=null;


        /** Boolean indicating if this Video is currently loaded. 
         * @type {boolean}
         * @readonly
         */
        this.isLoaded=null;


        /** The LoadingTier that this Sound belongs too.
         * LoadingTiers are a means to organize AssetComponents into separately downloadable groups. 
         * @type {Array.<number>}
         * @readonly
         */
        this.loadingTierRequirements=null;


        /** String indicating the source of this Video if it is a duplicate.
         * Incisor® automatically detects when two or more AssetComponents are identical, ensuring that only one 
         * copy of the associated data is loaded to reduce the loaded size of the project.
         * Those AssetComponents that are duplicates are marked by indicating the name of the source of their data.
         * This member is undefined for AssetComponents that are not duplicates.
         * @default undefined
         * @type {string}
         * @readonly
         */
        this.duplicateSource=null;


        /** Videos in Incisor are backed by actual video HTML elements in the DOM, and this property provides direct access to the associated element.
         * It should be noted that this property will remain null until the video is loaded.
         * @type {HTMLVideoElement}
         */
        this.videoElement = null;
    }
}


/** A WaitThen is an object that provides a means to schedule a delayed callback. 
 * This differs from standard javascript 'setTimeout' in that it is compatable with Incisor®'s pausing system, 
 * as well its SpeedControls, and 'nc.softwareSpeed'.
 * WaitThen instances can be constructed normally using 'new', or you can just call 'nc.waitThen' which makes use
 * of an internally pooled group of WaitThens. It is recommended that 'nc.waitThen' be used where possible
 * to avoid needlessly instantiating new objects, and also avoid the potential for memory leaks.
 * [REQUIREMENT: module - waitThens]
 */
class WaitThen
{
    /** A WaitThen is an object that provides a means to schedule a delayed callback. 
     * This differs from standard javascript 'setTimeout' in that it is compatable with Incisor®'s pausing system, 
     * as well its SpeedControls, and 'nc.softwareSpeed'.
     * WaitThen instances can be constructed normally using 'new', or you can just call 'nc.waitThen' which makes use
     * of an internally pooled group of WaitThens. It is recommended that 'nc.waitThen' be used where possible
     * to avoid needlessly instantiating new objects, and also avoid the potential for memory leaks.
     * @param {string} name The name of the WaitThen
     */
    constructor(name)
    {
        /** Type identifier.
         * @readonly
         * @type {string}
         */
        this.type = null;


        /** Dictionary object listing all of the types this object is compatible with.
         * @type {object}
         */
        this.inheritedTypes=null;


        /** The name of the WaitThen.
         * @default "WaitThen"
         * @type {string}
         */
        this.name=null;


        /** The progress of the WaitThen on the scale from [0,1].
         * @default 0
         * @type {number}
         */
        this.progress=null;


        /** Boolean reporting if this WaitThen is currently 'counting down'. 
         * Pausing is not factored into this property; a WaitThen that is activated
         * and then subjected to a PauseEvent would still report 'true'.
         * @default false
         * @type {boolean}
         */
        this.isActive=null;


        /** The object owning the callback function invoked when this WaitThen completes.
         * @type {object}
         */
        this.callbackOwner = null;


        /** The name of the callback function invoked when this WaitThen completes.
         * @type {string}
         */
        this.callbackName = null;


        /** Arguments for the callback function invoked when this WaitThen completes.
         * @type {any}
         */
        this.callbackArgs = null;


        /** The PauseEvent or Array of PauseEvents that this WaitThen will be immune to. 
         * Set this parameter to [] for this WaitThen to have no pause immunity.
         * @default nc.defaultPauseImmunity
         * @type {PauseEvent & Array.<PauseEvent>}
         */
        this.pauseImmunity = null;


        /** The SpeedControl or Array of SpeedControls that this WaitThen is affected by.
         * @default nc.defaultSpeedControl
         * @type {SpeedControl & Array.<SpeedControl>}
         */
        this.speedControl = null;


        /** Read-only property indicating the current duration of the WaitThen.
         * @readonly
         * @type {number}
         */
        this.duration = null;
    }


    /** Activates this WaitThen, starting the 'count-down' to this WaitThen's callback.
     * @param {number} duration Seconds before the callback will occur.
     * @param {object} callbackOwner The object owning the callback function that is called when the WaitThen completes. 
     * @param {string} callbackName The name of the function that is called when the WaitThen completes. 
     * @param {Array|any} [callbackArgs] Arguments for the function that is called when the WaitThen completes. 
     * @param {PauseEvent|Array.<PauseEvent>} [pauseImmunity] The PauseEvent or Array of PauseEvents that this WaitThen will be immune to. Set this parameter to [] to create callbacks with no immunity. If this parameter is left undefined, the current value of 'nc.defaultPauseImmunity' will be used. The value for 'nc.defaultPauseImmunity' defaults to [], but can be changed at any time. [DEFAULT: nc.defaultPauseImmunity]
     * @param {SpeedControl|Array.<SpeedControl>} [speedControl] The SpeedControl or Array of SpeedControls that this WaitThen is affected by. [DEFAULT: nc.defaultSpeedControl]
     */
    activate(duration,callbackOwner,callbackName,callbackArgs,pauseImmunity,speedControl){}


    /** Stops this WaitThen.
     * @param {boolean} [performCallback] Boolean determining if the callback function will be called immediately, or if it will be skipped entirely. [DEFAULT: false]
     */
    stop(performCallback){}
}


