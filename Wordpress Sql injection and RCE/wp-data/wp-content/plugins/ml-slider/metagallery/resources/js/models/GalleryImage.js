import { xssEscape } from 'xss-escape'

export function GalleryImageMarkup(image) {
    return `<div
        x-title="Image Wrapper"
        x-data="{
            get itemWrapper() {
                return $el.style.cssText +
                'width:' + this.$component('current').settings.percentImageWidth + '%;' +
                'min-width:' + this.$component('current').settings.minImageWidth + 'px;' +
                'max-width:' + this.$component('current').settings.maxImageWidth + 'px;'
            },

        }"
        class="item absolute overflow-hidden"
        :style="itemWrapper">
        <div class="item-content relative h-full w-full">
            <div
                x-title="Gallery Image"
                x-data="GalleryImage(${image._uid})"
                x-init="init()"
                class="group cursor-move">
                <button
                    x-cloak
                    class="transition p-2 rounded-full duration-200 bg-nord0 text-nord13 absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus:outline-none ring-2 ring-nord2 focus:ring-nord9 ring-opacity-70 focus:ring-opacity-100 focus:text-nord9"
                    :class="{ 'opacity-100 ring-4': open }"
                    :style="buttonStyles"
                    @click="$dispatch('open-image-settings', { image: ${image._uid} })">
                    <svg class="w-6 h-6 block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span class="sr-only">${window.__('edit', 'metagallery')}</span>
                </button>
                <img
                    class="border-0"
                    :style="imageStyles"
                    width="${image.width}"
                    height="${image.height}"
                    src="${image.src.main.url}"
                    alt="${xssEscape(image.alt)}"/>
            </div>
        </div>
    </div>`
}
export function GalleryImage(id) {
    return {
        _uid: id,
        get open() {
            return this.$component('image-settings').imageId == this._uid
        },
        get imageStyles() {
            return `
                padding:${this.$component('current').settings.imageSpacing}px;
            `
        },
        get buttonStyles() {
            return `
                margin-top: ${this.$component('current').settings.imageSpacing}px;
                margin-right: ${this.$component('current').settings.imageSpacing}px;
            `
        },
        init() {
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
