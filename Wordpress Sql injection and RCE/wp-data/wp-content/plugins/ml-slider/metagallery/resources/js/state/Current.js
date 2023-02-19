import { Gallery } from '../api'
import { xssEscape } from 'xss-escape'

// TODO: The "dirty" is just set on each update method but could also be more dynamic
export default function Current(data) {
    return {
        data: data,
        title: '',
        dirty: false,
        saving: false,
        images: [
            {
                _uid: 0,
                height: 0,
                width: 0,
                title: '',
                alt: '',
                caption: '',
            },
        ],
        settings: {
            maxImageWidth: '600',
            minImageWidth: '315',
            percentImageWidth: '25',
            imageSpacing: '15',
        },
        init() {
            this.title = this.data.meta.title
            this.images = this.data.meta.images
            this.settings = Object.assign(this.settings, this.data.meta.settings)
        },
        async save() {
            console.log('MetaGallery: Saving...')
            await new Promise((resolve) => setTimeout(resolve, 250))

            // Setup image order
            if (window.metagalleryGrid) {
                this.updateImageOrder(window.metagalleryGrid.getItems())
            }

            // Reset state
            this.saving = true
            this.dirty = false
            await Gallery.save(this.data.ID, this.title, this.images, this.settings)
            await new Promise((resolve) => setTimeout(resolve, 1500))
            this.saving = false
        },
        updateTitle(title) {
            console.log(`MetaGallery: Updating title to:`, title)
            this.dirty = true
            this.title = title
        },
        updateSetting(setting, value) {
            console.log(`MetaGallery: Updating ${setting} to:`, value)
            this.dirty = true
            // Currently, no settings can be less than 0
            this.settings[setting] = parseInt(value, 10) < 0 ? 0 : value
            this.updateLayout()
        },
        updateImageSetting(imageId, setting, value) {
            console.log(`MetaGallery: Updating image ${imageId} ${setting} to:`, value)
            this.dirty = true
            let image = this.images.find((i) => i._uid == imageId)
            image.alt = value
            this.updateLayout()
        },
        // getImageSetting(imageId, setting) {
        //     if (!imageId) return ''
        //     let image = this.images.find((i) => i._uid == imageId)
        //     return image[setting]
        // },
        addImages(images) {
            console.log(`MetaGallery: Adding ${images.length} ${images.length > 1 ? 'images' : 'image'}`)
            this.dirty = true
            this.images.push(...images)
            window.dispatchEvent(
                new CustomEvent('metagallery-images-added', {
                    detail: { images: images },
                    bubbles: true,
                }),
            )
        },
        updateImageOrder(items) {
            items = items.map((item) => item.getElement().querySelector('[x-data]').__x.getUnobservedData()._uid)
            this.images = items.reduce((newitems, item, index) => {
                newitems[index] = this.images.find((i) => i._uid == item)
                return newitems
            }, [])
        },
        updateLayout() {
            setTimeout(() => {
                window.dispatchEvent(
                    new CustomEvent('reset-layout', {
                        detail: {},
                        bubbles: true,
                    }),
                )
            }, 0)
        },
    }
}
