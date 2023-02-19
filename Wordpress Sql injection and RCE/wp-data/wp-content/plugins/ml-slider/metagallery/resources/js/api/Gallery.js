import { Axios as api } from '../api'

// Note, this is a slow refactor so might appear incomplete
const Gallery = {
    all() {
        return api.get('gallery', {
            params: {},
        })
    },
    create() {
        return api.post('gallery', {
            params: {},
        })
    },
    save(id, title, images, settings) {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('images', JSON.stringify(images))
        formData.append('settings', JSON.stringify(settings))
        return api.post(`gallery/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}

export default Gallery
