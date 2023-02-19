import { Button } from '@wordpress/components'
import { useState, useEffect, useRef } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { Icon } from '@wordpress/icons'
import { General } from '@extendify/api/General'
import { useTestGroup } from '@extendify/hooks/useTestGroup'
import { useGlobalStore } from '@extendify/state/GlobalState'
import { useUserStore } from '@extendify/state/User'
import { openModal } from '@extendify/util/general'
import { brandMark } from './icons'
import { NewImportsPopover } from './popovers/NewImportsPopover'

export const MainButtonWrapper = () => {
    const [showTooltip, setShowTooltip] = useState(false)
    const once = useRef(false)
    const buttonRef = useRef()
    const loggedIn = useUserStore((state) => state.apiKey.length)
    const hasImported = useUserStore((state) => state.imports > 0)
    const open = useGlobalStore((state) => state.open)
    const hasPendingNewImports = useUserStore(
        (state) => state.allowedImports === 0,
    )
    const uuid = useUserStore((state) => state.uuid)
    const buttonText = useTestGroup('main-button-text2', ['A', 'B'], true)
    const [libraryButtonText, setLibraryButtonText] = useState()

    const handleTooltipClose = async () => {
        await General.ping('mb-tooltip-closed')
        setShowTooltip(false)
        // If they close the tooltip, we can set the allowed imports
        // to -1 and when it opens it will fetch and update. Meanwhile,
        // -1 will be ignored by the this component.
        useUserStore.setState({
            allowedImports: -1,
        })
    }
    useEffect(() => {
        if (!uuid) return
        const text = () => {
            switch (buttonText) {
                case 'A':
                    return __('Add template', 'extendify')
                case 'B':
                    return __('Design Library', 'extendify')
            }
        }
        setLibraryButtonText(text())
    }, [buttonText, uuid])

    useEffect(() => {
        if (open) {
            setShowTooltip(false)
            once.current = true
        }
        if (!loggedIn && hasPendingNewImports && hasImported) {
            once.current || setShowTooltip(true)
            once.current = true
        }
    }, [loggedIn, hasPendingNewImports, hasImported, open])

    return (
        <>
            <MainButton buttonRef={buttonRef} text={libraryButtonText} />
            {showTooltip && (
                <NewImportsPopover
                    anchorRef={buttonRef}
                    onClick={async () => {
                        await General.ping('mb-tooltip-pressed')
                        openModal('main-button-tooltip')
                    }}
                    onPressX={handleTooltipClose}
                />
            )}
        </>
    )
}
const MainButton = ({ buttonRef, text }) => {
    return (
        <div className="extendify">
            <Button
                isPrimary
                ref={buttonRef}
                className="h-8 xs:h-9 px-1 min-w-0 xs:pl-2 xs:pr-3 sm:ml-2"
                onClick={() => openModal('main-button')}
                id="extendify-templates-inserter-btn"
                icon={
                    <Icon
                        icon={brandMark}
                        size={24}
                        style={{ marginRight: 0 }}
                    />
                }>
                <span className="hidden xs:inline ml-1">{text}</span>
            </Button>
        </div>
    )
}
export const CtaButton = () => {
    return (
        <Button
            id="extendify-cta-button"
            style={{
                margin: '1rem 1rem 0',
                width: 'calc(100% - 2rem)',
                justifyContent: ' center',
            }}
            onClick={() => openModal('patterns-cta')}
            isSecondary>
            {__('Discover patterns in Extendify Library', 'extendify')}
        </Button>
    )
}
