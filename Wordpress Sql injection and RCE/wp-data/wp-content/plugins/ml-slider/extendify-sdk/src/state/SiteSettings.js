import create from 'zustand'
import { persist } from 'zustand/middleware'
import { SiteSettings } from '@extendify/api/SiteSettings'

const storage = {
    getItem: async () => await SiteSettings.getData(),
    setItem: async (_name, value) => await SiteSettings.setData(value),
    removeItem: () => {},
}

export const useSiteSettingsStore = create(
    persist(
        () => ({
            enabled: true,
        }),
        {
            name: 'extendify-sitesettings',
            getStorage: () => storage,
        },
    ),
)
