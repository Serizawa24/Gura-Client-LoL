import utils from './_utilsGura'
import data from '../configs/guraConfig.json'

let SidebarTransparent = data["Sidebar-Transparent"]

window.addEventListener('load', () => {
    utils.addCss(data["css_file"]);	
	if (SidebarTransparent) {
		utils.addCss("//plugins/guraClient/assets/Css/Addon-Css/Sidebar-Transparent.css");
	}
	else {
		utils.addCss("//plugins/guraClient/assets/Css/Addon-Css/Sidebar-Color.css");
	}
})