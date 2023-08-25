import languages from '../constants/languages.js';
import translations from '../constants/translations.js';
import DataUtil from '../utils/DataUtil.js';
import useSettingsQuery from './useSettingsQuery.jsx';

const useTranslation = () => {
    const {isLoading, isError, data} = useSettingsQuery();

    return (text) => {
        if (isLoading || isError) {
            return text;
        }
        if (!data) {
            return text;
        }
        const {lang} = data;
        if (lang === languages.ENG) {
            return text;
        }
        if (languages[lang] === 'undefined') {
            return text;
        }
        if (DataUtil.isEmpty(translations[lang][text])) {
            return text;
        }
        return translations[lang][text];
    };
};

export default useTranslation;
