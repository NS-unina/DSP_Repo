import { useEffect, useCallback } from '@wordpress/element'
import { General as GeneralApi } from '@extendify/api/General'
import MainWindow from '@extendify/pages/MainWindow'
import { useGlobalStore } from '@extendify/state/GlobalState'
import { useTemplatesStore } from '@extendify/state/Templates'
import { useUserStore } from '@extendify/state/User'
import '@extendify/utility-control'
import { useTaxonomyStore } from './state/Taxonomies'

export default function ExtendifyLibrary({ show = false }) {
    const open = useGlobalStore((state) => state.open)
    const setReady = useGlobalStore((state) => state.setReady)
    const setOpen = useGlobalStore((state) => state.setOpen)
    const showLibrary = useCallback(() => setOpen(true), [setOpen])
    const hideLibrary = useCallback(() => setOpen(false), [setOpen])
    const initTemplateData = useTemplatesStore(
        (state) => state.initTemplateData,
    )
    const fetchTaxonomies = useTaxonomyStore((state) => state.fetchTaxonomies)

    // When the uuid of the user comes back from the database, we can
    // assume that the state object is ready. This is important to check
    // as the library may be "open" when loaded, but not ready.
    const userHasHydrated = useUserStore((state) => state._hasHydrated)
    const taxonomiesReady = useTemplatesStore(
        (state) => Object.keys(state.taxonomyDefaultState).length > 0,
    )

    useEffect(() => {
        if (!open) return
        fetchTaxonomies().then(() => {
            useTemplatesStore.getState().setupDefaultTaxonomies()
        })
    }, [open, fetchTaxonomies])

    useEffect(() => {
        if (userHasHydrated && taxonomiesReady) {
            initTemplateData()
            setReady(true)
        }
    }, [userHasHydrated, taxonomiesReady, initTemplateData, setReady])

    useEffect(() => {
        const search = new URLSearchParams(window.location.search)
        if (show || search.has('ext-open')) {
            setOpen(true)
        }
    }, [show, setOpen])

    useEffect(() => {
        GeneralApi.metaData().then((data) => {
            useGlobalStore.setState({
                metaData: data,
            })
        })
    }, [])

    // Let the visibility to be controlled from outside the application
    useEffect(() => {
        window.addEventListener('extendify::open-library', showLibrary)
        window.addEventListener('extendify::close-library', hideLibrary)
        return () => {
            window.removeEventListener('extendify::open-library', showLibrary)
            window.removeEventListener('extendify::close-library', hideLibrary)
        }
    }, [hideLibrary, showLibrary])

    return <MainWindow />
}
