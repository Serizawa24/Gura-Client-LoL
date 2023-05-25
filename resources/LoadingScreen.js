import utils from './_utilsGura'
import data from '../configs/guraConfig.json'

let LoadingScr = data["Animate-Loading"]

function Applyloadingscreen() {
    if (LoadingScr) {
        utils.addCss("//plugins/guraClient/assets/Css/Addon-Css/Animate-Loading-Screen.css")
    }

    else {
        utils.addCss("//plugins/guraClient/assets/Css/Addon-Css/Static-Loading-Screen.css")
    }
}

window.addEventListener('load', () => {
    Applyloadingscreen()
})