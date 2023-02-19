// import { __ } from '@wordpress/i18n' FULL OF BUGS!
import { xssEscape } from 'xss-escape'

export default function MediaLibrary() {
    return {
        manager: {},
        init() {
            this.manager = wp.media.frames.file_frame = wp.media({
                title: __('Select Images', 'metagallery'),
                multiple: true,
                library: { type: 'image' },
            })
            const viewsToRemove = this.manager.states.models.filter((view) => !['library'].includes(view.id))
            this.manager.states.remove(viewsToRemove)
            this.manager.on('select', () => {
                const selection = this.manager.state().get('selection').toJSON()
                const images = selection
                    .filter((image) => image.type === 'image')
                    .map((image) => {
                        return {
                            _uid: parseInt(Date.now() + Math.floor(Math.random() * 1000000), 10),
                            height: image.height,
                            width: image.width,
                            title: image.title,
                            alt: xssEscape(image.alt),
                            caption: image.caption,
                            src: {
                                main: image.sizes.full,
                                thumbnail: image.sizes.thumbnail,
                            },
                            WP: {
                                id: image.id,
                            },
                        }
                    })
                this.$component('current').addImages(images)
            })
        },
    }
}
