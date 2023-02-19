import { GalleryImageMarkup } from './GalleryImage'
export default function Gallery() {
    return {
        muuri: null,
        images: [],
        init() {
            this.images = JSON.parse(JSON.stringify(this.$component('current').images))
            if (!this.images.length) return
            window.metagalleryGrid = new window.Muuri(`[id=metagallery-grid-${this.$component('current').data.ID}]`, {
                items: this.images.map((i) => this.buildImage(i)),
                dragSortPredicate: {
                    action: 'move',
                },
                dragEnabled: true,
                layout: {
                    fillGaps: true,
                    // horizontal: true,
                },
            })
            window.metagalleryGrid.on('move', (_data) => {
                this.$component('current').dirty = true
            })
        },
        get containerStyles() {
            return `
                margin: 0 -${this.$component('current').settings.imageSpacing}px;
            `
        },
        addImages(images) {
            if (!window.metagalleryGrid) {
                return this.init()
            }
            window.metagalleryGrid.add(
                images.map((i) => this.buildImage(i)),
                { index: 0 },
            )
        },
        removeImages(images) {
            // Not the most efficient filter, but there's no mechanism
            // currently to remove multiple images, so it's fine
            this.$component('current').dirty = true
            const gridItems = window.metagalleryGrid.getItems()
            window.metagalleryGrid.remove(
                images.map((i) =>
                    gridItems.find(
                        (img) => img.getElement().querySelector('[x-data]').__x.getUnobservedData()._uid == i,
                    ),
                ),
                { removeElements: true },
            )
        },
        buildImage(image) {
            var itemElem = document.createElement('div')
            var itemTemplate = GalleryImageMarkup(image)
            itemElem.innerHTML = itemTemplate
            return itemElem.firstChild
        },
    }
}
