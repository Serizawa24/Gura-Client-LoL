import utils from './_utilsGura'
import data from '../configs/guraConfig.json'

let HideChampsArt = data["Hide-Champions-Splash-Art"]

if (HideChampsArt) {
    window.addEventListener('load', () => {
        utils.addCss("//plugins/guraClient/assets/Css/Addon-Css/Hide-Champs-Splash-Art.css")
    })
}