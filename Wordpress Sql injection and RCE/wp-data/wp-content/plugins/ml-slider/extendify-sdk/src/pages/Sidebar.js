import { Panel } from '@wordpress/components'
import { Button } from '@wordpress/components'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { Icon, close } from '@wordpress/icons'
import classNames from 'classnames'
import { ImportCounter } from '@extendify/components/ImportCounter'
import { SiteTypeSelector } from '@extendify/components/SiteTypeSelector'
import { TaxonomySection } from '@extendify/components/TaxonomySection'
import { TypeSelect } from '@extendify/components/TypeSelect'
import { featured } from '@extendify/components/icons'
import { brandMark } from '@extendify/components/icons/'
import { useGlobalStore } from '@extendify/state/GlobalState'
import { useTaxonomyStore } from '@extendify/state/Taxonomies'
import { useTemplatesStore } from '@extendify/state/Templates'
import { useUserStore } from '@extendify/state/User'

export const Sidebar = memo(function Sidebar() {
    const taxonomies = useTaxonomyStore((state) => state.taxonomies)
    const searchParams = useTemplatesStore((state) => state.searchParams)
    const updatePreferredSiteType = useUserStore(
        (state) => state.updatePreferredSiteType,
    )
    const updateTaxonomies = useTemplatesStore(
        (state) => state.updateTaxonomies,
    )
    const apiKey = useUserStore((state) => state.apiKey)
    const taxonomyType =
        searchParams.type === 'pattern' ? 'patternType' : 'layoutType'
    const isFeatured = !searchParams?.taxonomies[taxonomyType]?.slug?.length
    const setOpen = useGlobalStore((state) => state.setOpen)

    return (
        <>
            <div className="-ml-1.5 hidden px-5 text-extendify-black sm:flex">
                <Icon icon={brandMark} size={40} />
            </div>
            <div className="flex md:hidden items-center justify-end -mt-5 mx-1">
                <Button
                    onClick={() => setOpen(false)}
                    icon={<Icon icon={close} size={24} />}
                    label={__('Close library', 'extendify')}
                />
            </div>
            <div className="px-5 hidden md:block">
                <button
                    onClick={() =>
                        updateTaxonomies({
                            [taxonomyType]: { slug: '', title: 'Featured' },
                        })
                    }
                    className={classNames(
                        'm-0 flex w-full cursor-pointer items-center space-x-1 bg-transparent px-0 py-2 text-left text-sm leading-none transition duration-200 hover:text-wp-theme-500',
                        { 'text-wp-theme-500': isFeatured },
                    )}>
                    <Icon icon={featured} size={24} />
                    <span className="text-sm">
                        {__('Featured', 'extendify')}
                    </span>
                </button>
            </div>
            <div className="mx-6 px-5 pt-0.5 sm:mx-0 sm:mb-8 sm:mt-0">
                {Object.keys(taxonomies?.siteType ?? {}).length > 0 && (
                    <SiteTypeSelector
                        value={searchParams?.taxonomies?.siteType ?? ''}
                        setValue={(termData) => {
                            updatePreferredSiteType(termData)
                            updateTaxonomies({ siteType: termData })
                        }}
                        terms={taxonomies.siteType}
                    />
                )}
            </div>
            <TypeSelect className="mx-6 px-5 pt-0.5 sm:mx-0 sm:mb-8 sm:mt-0" />
            <div className="mt-px hidden flex-grow overflow-y-auto overflow-x-hidden pb-36 pt-px sm:block space-y-6">
                <Panel className="bg-transparent">
                    <TaxonomySection
                        taxType={taxonomyType}
                        taxonomies={taxonomies[taxonomyType]?.filter(
                            (term) => !term?.designType,
                        )}
                    />
                </Panel>
                <Panel className="bg-transparent">
                    <TaxonomySection
                        taxLabel={__('Design', 'extendify')}
                        taxType={taxonomyType}
                        taxonomies={taxonomies[taxonomyType]?.filter((term) =>
                            Boolean(term?.designType),
                        )}
                    />
                </Panel>
            </div>
            {!apiKey.length && (
                <div className="px-5">
                    <ImportCounter />
                </div>
            )}
        </>
    )
})
