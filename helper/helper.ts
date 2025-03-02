export function useLocalizedName(item: Record<string, any> | undefined, key: string = 'name') {
    const languageStore = useLanguageStore();

    return computed(() => item?.[key]?.[languageStore.selectedLanguage] || '');
}

export function useApiFetch<T>(url: string | (() => string), options: any = {}) {
    return useFetch<T>(url, {
        ...options,
        onRequest({ request, options }) {
        },
        onResponse({ response }) {
            return response;
        },
        onRequestError({ error }) {
            showError({
                statusCode: 500,
                statusMessage: 'Network Error',
                data: { message: 'Failed to connect to the server' },
            });
        },
        onResponseError({ response }) {
            const error = {
                statusCode: response.status,
                statusMessage: response.statusText,
                data: response._data || { message: 'An unknown error occurred' }
            };
            if (import.meta.client) {
                showError(error);
            }
            // Throw for SSR
            throw createError(error);
        },
    });
}
