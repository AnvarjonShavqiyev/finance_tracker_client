import { SaveSettings, Settings } from "@customTypes";
import { api } from "./api";

const settingsApi = api.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getSettings: query<Settings['Response'], Settings['Request']>({
            query: () => ({
                url: '/settings'
            })
        }),
        saveSettings: mutation<SaveSettings['Response'], SaveSettings['Request']>({
            query: (body) => ({
                url: '/settings',
                method: 'PUT',
                body
            })
        })
    })
})

export const {
    useGetSettingsQuery,
    useSaveSettingsMutation
} = settingsApi;