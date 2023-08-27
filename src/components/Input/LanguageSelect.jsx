import React from 'react';
import {Label} from 'tyylisivu-components';
import languages from '../../constants/languages.js';
import useSettingQuery from '../../hooks/setting/useSettingQuery.jsx';
import useSettingMutation from '../../hooks/setting/useSettingMutation.jsx';
import useTranslation from '../../hooks/useTranslation.jsx';
import Setting from '../../supabase/models/setting.js';

const LanguageSelect = () => {
    const t = useTranslation();
    const {isLoading, isError, data} = useSettingQuery();
    const {mutate} = useSettingMutation();

    const onChangeLanguage = (newLang) => {
        if (Object.values(languages).includes(newLang)) {
            let newSettings = Setting.getEmptySetting();
            if (data) {
                newSettings = data;
            }
            newSettings = {...newSettings, ...{lang: newLang}};
            mutate(newSettings);
        }
    };

    if (isLoading || isError) {
        return null;
    }

    return (
        <Label
            text={t('Language')}
        >
            <select
                value={data?.lang}
                onChange={(e) => onChangeLanguage(e.target.value)}
            >
                {Object.values(languages).map((lang) => <option key={lang}>{lang}</option>)}
            </select>
        </Label>
    );
};

export default LanguageSelect;
