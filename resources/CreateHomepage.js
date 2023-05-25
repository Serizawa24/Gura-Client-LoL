import data from '../configs/guraConfig.json'
let default_settings = data



//___________________________________________________________________________//
function create_element(tagName, className, content) {
	const el = document.createElement(tagName);
	el.className = className;
	if (content) {
		el.innerHTML = content;
	}
	return el;
};

function go_to_default_home_page() {
	if (default_settings["default_home_page"]) {
		document.querySelector(`lol-uikit-navigation-item[item-id='${default_settings["default_home_page"]}']`).click()
	}
}

function add_gura_home_page() {
	let lol_home = document.querySelector(".rcp-fe-lol-home > lol-uikit-section-controller")

	if (lol_home) {
		if (!lol_home.querySelector("[section-id='gura-home']")) {
			let gura_home = create_element("lol-uikit-section", "")
			let div = create_element("div", "wrapper")

			div.id = "gura-home"
			gura_home.setAttribute("section-id", "gura-home")
			gura_home.append(div)
			lol_home.prepend(gura_home)
		}
	}
}

function add_gura_home_navbar() {
	let navbar = document.querySelector(".rcp-fe-lol-home > lol-uikit-navigation-bar")

	if (navbar) {
		if (!navbar.querySelector("[item-id='gura-home']")) {
			let gura_home_navbar_item = create_element("lol-uikit-navigation-item", "")

			gura_home_navbar_item.setAttribute("item-id", "gura-home")
			gura_home_navbar_item.setAttribute("priority", 1)


//___________________________________________________________________________//
			if (document.querySelector("html").lang == "vi-VN") {
				gura_home_navbar_item.textContent = "Trang chủ"
			}
			else if (document.querySelector("html").lang == "ja-JP") {
				gura_home_navbar_item.textContent = "ホームページ"
			}
			else {
				gura_home_navbar_item.textContent = "Home"
			}
//___________________________________________________________________________//


			navbar.prepend(gura_home_navbar_item)
		}
	}
}

function patch_default_home_page(){
	let loop = 0
	let intervalId = window.setInterval(() => {
		if (loop >= 5) {
			window.clearInterval(intervalId)
		}
		go_to_default_home_page()
		loop += 1
	}, 300)
}
//___________________________________________________________________________//



//___________________________________________________________________________//
let homepage = {
    add_gura_home_navbar: add_gura_home_navbar,
    add_gura_home_page: add_gura_home_page,
    patch_default_home_page: patch_default_home_page,
    go_to_default_home_page: go_to_default_home_page
}
//___________________________________________________________________________//

export default homepage