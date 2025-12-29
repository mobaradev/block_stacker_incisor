// The 'preloadConfiguration' function below will be called before the target software is loaded and 
// can be used to customize asset loading. For example, you can custimize the code in this function
// to perform device detection, and use that information to update the
// 'projectConfiguration.assetConfiguration.assetPackageScale' value, which would result in a 
// change to which set of assets are loaded in the target software. Without customization, the 
// value of each asset configuration will be set to the values listed in the 0th element of the 
// 'supportedAssetConfigurations' of the current configuration defined in the ProjectSettings.
//
// The loading of the main Incisor resources (such as the main "..._habitat.js" file and the 
// "assetData...js" files) can be customized by manipulating the 'resourceLoadingOverride' function below.
// 
// The 'canvasPositionOverride' function below can also be changed to customize the positioning of the 
// canvas within the page. If defined, it will be called whenever the browser window is resized.
// 
// For reference, the code below will be executed within, and called by the main projectConfiguration object.




/** This function is called before the target software is loaded.
 * Customize this function to configure the project at the beginning of runtime.
 * @param {ProjectConfiguration} projectConfiguration 
 */
function preloadConfiguration(projectConfiguration)
{
    CODE.includeIf___published;
        // Preserving the drawing buffer enables several useful development features, 
        // but may cause performance issues in published software on some devices.
        projectConfiguration.preserveDrawingBuffer = false;
    CODE.includeEnd___published;
    projectConfiguration.canvasParent = document.body;
// define resource loading override function (this is optional)
    this.resourceLoadingOverride=function(filename)
    {
        if(filename.endsWith("_assetList.js")===true || filename.endsWith("_assetData.js")===true){filename = projectConfiguration.projectName+String.fromCharCode(95)+projectConfiguration.publishTimestamp+"_loadedAssets/" + filename;}
        var s=document.createElement('script'); 
        s.setAttribute('src',filename); 
        document.body.appendChild(s);
    };
// define canvas positioning function (this is optional)
    this.canvasPositionOverride=function(canvas,left,top,width,height)
    {
        canvas.style.width = width+'px';
        canvas.style.height = height+'px';
        canvas.style.left = left+'px';
        canvas.style.top = top+'px';
    };
};