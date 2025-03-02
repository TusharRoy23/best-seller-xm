import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
    state: () => ({
        selectedLanguage: 'dk'
    }),
    actions: {
        setLanguage(language: string) {
            this.selectedLanguage = language;
        }
    }
});