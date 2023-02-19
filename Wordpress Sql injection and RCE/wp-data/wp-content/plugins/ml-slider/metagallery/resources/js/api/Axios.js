import axios from 'axios'

const Axios = axios.create({
    baseURL: window.metagalleryData.root,
    headers: {
        'X-WP-Nonce': window.metagalleryData.nonce,
        'X-Requested-With': 'XMLHttpRequest',
    },
})

export default Axios
