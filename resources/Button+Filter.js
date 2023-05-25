import homepage from './CreateHomepage'
import homepagebutton from './Homepagebuttons'

import utils from './_utilsGura'
import data from '../configs/guraConfig.json'
let default_settings = data

//___________________________________________________________________________//
var nodeRemovedEvent = function (event) {
	if (event.target.classList && event.target.classList.contains("lol-loading-screen-container")) {
		let guraBg = document.getElementById("gura-bg");
		let viewportRoot = document.getElementById("rcp-fe-viewport-root")

		if (!guraBg || !viewportRoot) {
			return;
		}
		viewportRoot.style.filter = "none"
		guraBg.style.filter = "brightness(0.7) saturate(0.8)"

		document.removeEventListener("DOMNodeRemoved", nodeRemovedEvent);
	}
};
document.addEventListener("DOMNodeRemoved", nodeRemovedEvent);
//___________________________________________________________________________//



//___________________________________________________________________________//
homepagebutton.apply_default_background()

let previous_page;
let patcher_go_to_default_home_page = true;
let wallpapers = default_settings["wallpaper_list"];

let pageChangeMutation = (node) => {
	let pagename;
	let gura_bg_elem = document.getElementById("gura-bg")
	let brightness_modifiers = ["rcp-fe-lol-champ-select", "rcp-fe-lol-store", "rcp-fe-lol-collections", "rcp-fe-lol-profiles-main",
		"rcp-fe-lol-parties", "rcp-fe-lol-loot", "rcp-fe-lol-clash-full"]
	pagename = node.getAttribute("data-screen-name")
	console.log(pagename)


	if (pagename == "rcp-fe-lol-home-main") {
		if (!document.getElementsByClassName("webm-bottom-buttons-container").length) {
			homepagebutton.create_webm_buttons()
		}
		homepage.add_gura_home_page()
		homepage.add_gura_home_navbar()
		homepage.go_to_default_home_page()
		if (previous_page == "rcp-fe-lol-parties" ){
			homepage.patch_default_home_page()
		}
	}
	else if (pagename != "rcp-fe-lol-navigation-screen" && pagename != "window-controls" && pagename != "rcp-fe-lol-home" && pagename != "social") {
		if (document.getElementsByClassName("webm-bottom-buttons-container").length) {
			homepagebutton.Delbuttons()
		}
	}
	if (pagename == "social") {
		if (patcher_go_to_default_home_page){
			homepage.go_to_default_home_page()
			patcher_go_to_default_home_page = false
		}
	}
	if (pagename == "rcp-fe-lol-uikit-full-page-modal-controller") {
		return;
	}
	else if (pagename == "rcp-fe-lol-yourshop") {
		gura_bg_elem.style.filter = 'blur(3px) brightness(0.4) saturate(1.5)';
	}
	if (pagename == "rcp-fe-lol-champ-select") {
		gura_bg_elem.style.filter = 'blur(3px) brightness(0.4) saturate(1.5)';
	}
	else if (previous_page == "rcp-fe-lol-champ-select" && brightness_modifiers.indexOf(pagename) == -1) {
		gura_bg_elem.style.filter = 'brightness(0.7) saturate(0.8)';
	}
	if (pagename == "rcp-fe-lol-clash-full") {
		gura_bg_elem.style.filter = 'blur(10px) brightness(0.2)';
	}
	else if (previous_page == "rcp-fe-lol-clash-full" && brightness_modifiers.indexOf(pagename) == -1) {
		gura_bg_elem.style.filter = 'brightness(0.7) saturate(0.8)';
	}
	if (pagename == "rcp-fe-lol-loot") {
		gura_bg_elem.style.filter = 'brightness(0.3)';
	}
	else if (previous_page == "rcp-fe-lol-loot" && brightness_modifiers.indexOf(pagename) == -1) {
		gura_bg_elem.style.filter = 'brightness(0.7) saturate(0.8)';
	}
	if (pagename == "rcp-fe-lol-store") {
		gura_bg_elem.style.filter = 'brightness(0.2)';
	}
	else if (previous_page == "rcp-fe-lol-store" && brightness_modifiers.indexOf(pagename) == -1) {
		gura_bg_elem.style.filter = 'brightness(0.7) saturate(0.8)';
	}
	if (pagename == "rcp-fe-lol-collections") {
		gura_bg_elem.style.filter = 'brightness(0.2)';
	}
	else if (previous_page == "rcp-fe-lol-collections" && brightness_modifiers.indexOf(pagename) == -1) {
		gura_bg_elem.style.filter = 'brightness(0.7) saturate(0.8)';
	}
	if (pagename == "rcp-fe-lol-profiles-main") {		
		gura_bg_elem.style.filter = 'brightness(0.3)'[wallpapers[0]];		
	}
	else if (previous_page == "rcp-fe-lol-profiles-main") {
		if (brightness_modifiers.indexOf(pagename) == -1)
			gura_bg_elem.style.filter = 'brightness(0.7) saturate(0.8)';
	}
	if (pagename == "rcp-fe-lol-parties") {
		gura_bg_elem.style.filter = 'brightness(0.4) blur(6px)'[wallpapers[0]];
	}
	else if (previous_page == "rcp-fe-lol-parties" && brightness_modifiers.indexOf(pagename) == -1) {
		gura_bg_elem.style.filter = 'brightness(0.7) saturate(0.8)'[wallpapers[0]];
	}
	if (previous_page != pagename)
		previous_page = pagename
}

window.addEventListener('load', () => {
	utils.mutationObserverAddCallback(pageChangeMutation, ["screen-root"])
})
//___________________________________________________________________________//



//___________________________________________________________________________//
window.addEventListener('load', () => {	
	const video = document.createElement('video');
		video.id = 'gura-bg';
		video.autoplay = true;
		video.loop = true;
		video.src = default_settings["default_wallpaper_src"];
		video.volume = default_settings["video_sound_volume"];

	const audio = document.createElement("audio");
    	audio.autoplay = true;
    	audio.loop = true;
    	audio.src = default_settings["audio_src"];
    	audio.id = 'bg-audio';
    	audio.load();
    	audio.addEventListener("load", function() { 
			audio.play()
		}, true);

	document.querySelector("body").prepend(video)
    document.querySelector("body").prepend(audio)

	homepagebutton.gura_play_pause()

	utils.subscribe_endpoint('/lol-gameflow/v1/gameflow-phase', (message) => {
		let phase = JSON.parse(message["data"])[2]["data"]

		if (phase == "GameStart" || phase == "InProgress") {
			document.getElementById("gura-bg").style.filter = 'blur(10px) brightness(0.4) saturate(1.5)';
			document.getElementById("gura-bg").pause()
			document.getElementById("bg-audio").pause()
		}
		else {
			homepagebutton.gura_play_pause()
			homepagebutton.audio_play_pause()
		} 
	})
})
//___________________________________________________________________________//