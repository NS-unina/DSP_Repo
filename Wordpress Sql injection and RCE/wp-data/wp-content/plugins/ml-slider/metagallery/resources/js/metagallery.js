import 'alpine-magic-helpers/dist/component'
import '@ryangjchandler/alpine-clipboard'
import 'alpinejs'
// import { Gallery as GalleryAPI } from './api'
import { MediaLibrary } from './sources'
import { Gallery as GalleryModel, GalleryImage } from './models'
import { Current } from './state'
import Muuri from 'muuri'
import 'web-animations-js'

// Hide nags - Doing this here instead of with CSS keeps users from thinking they have a blank screen
// when another plugin has JS code running and breaking things.
Array.from(document.querySelectorAll('#wpbody-content > *:not(.metagallery-allowed)')).forEach((element) =>
    element.style.setProperty('display', 'none', 'important'),
)

// Since the @wordpress/i18n plugin is buggy as usual,
// for now just mock the translation plugin until they fix it
window.__ = (string, _textDomain) => string

// Load in any state controllers
window.CurrentGallery = Current

// Load in models
window.Gallery = GalleryModel
window.GalleryImage = GalleryImage

// Register image sources
window.MediaLibrary = MediaLibrary

// Start Alpine and pause the global observer
window.Alpine.pauseMutationObserver = true
window.Muuri = Muuri

// GalleryAPI.all().then(({ data }) => {
//     console.log(data)
// })
