import { isString, toLower } from 'lodash'
import { useUserStore } from '@extendify/state/User'

/**
 * Will check if the given string contains the search string
 *
 * @param {string} string
 * @param {string} searchString
 */

export function search(string, searchString) {
    // type validation
    if (!isString(string) || !isString(searchString)) {
        return false
    }

    // changing case
    string = toLower(string)
    searchString = toLower(searchString)

    // comparing
    return -1 !== searchString.indexOf(string) ? true : false
}

export const openModal = (source) => setModalVisibility(source, 'open')
// export const closeModal = () => setModalVisibility('', 'close')
export function setModalVisibility(source = 'broken-event', state = 'open') {
    useUserStore.setState({
        entryPoint: source,
    })
    window.dispatchEvent(
        new CustomEvent(`extendify::${state}-library`, {
            detail: source,
            bubbles: true,
        }),
    )
}

export function getPluginDescription(plugin) {
    switch (plugin) {
        case 'editorplus':
            return 'Editor Plus'
        case 'ml-slider':
            return 'MetaSlider'
    }
    return plugin
}

export function getTaxonomyName(key) {
    switch (key) {
        case 'siteType':
            return 'Site Type'
        case 'patternType':
            return 'Content'
        case 'layoutType':
            return 'Page Types'
    }
    return key
}
