import React from 'react';
import {Label} from "tyylisivu-components";
import languages from "../../constants/languages.js";
import useSettingsQuery from "../../hooks/useSettingsQuery.jsx";
import useSettingsMutation from "../../hooks/useSettingsMutation.jsx";
import useTranslation from "../../hooks/useTranslation.jsx";
import Setting from "../../supabase/models/setting.js";

const LanguageSelect = () => {
    const t = useTranslation();
    const {isLoading, isError, data} = useSettingsQuery();
    const mutateSettings = useSettingsMutation();

    const onChangeLanguage = (newLang) => {
        if (Object.values(languages).includes(newLang)) {
            let newSettings = Setting.getEmptySetting();
            if (data) {
                newSettings = data;
            }
            newSettings = {...newSettings, ...{lang: newLang}}
            mutateSettings.mutate(newSettings);
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
