import languages from '../constants/languages.js';
import translations from '../constants/translations.js';
import useSettingQuery from './setting/useSettingQuery.jsx';

const useTranslation = () => {
    const {isLoading, isError, data} = useSettingQuery();

    return (text) => {
        if (isLoading || isError || !data) {
            return text;
        }
        const {lang} = data;
        if (lang === languages.ENG) {
            return text;
        }
        if (!Object.values(languages).includes(lang)) {
            return text;
        }
        if (!Object.keys(translations[lang]).includes(text)) {
            return text;
        }
        return translations[lang][text];
    };
};

export default useTranslation;
