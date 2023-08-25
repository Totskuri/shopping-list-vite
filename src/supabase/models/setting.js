import ApiCall from '../apiCall';
import languages from '../../constants/languages.js';

export const SETTING_SELECT_COLUMNS = 'id, lang';

export default class Setting {
    static getEmptySetting() {
        return {
            lang: languages.ENG
        };
    }

    static select() {
        return ApiCall.generateSelectSingle(
            'settings',
            SETTING_SELECT_COLUMNS
        );
    }

    static insert(insert) {
        console.log(insert);
        return ApiCall.generateInsertSingle('settings', insert, SETTING_SELECT_COLUMNS);
    }

    static updateById(id, update) {
        return ApiCall.generateUpdateByIdSingle('settings', update, id, SETTING_SELECT_COLUMNS);
    }

    static insertOrUpdateById(data) {
        if (data?.id) {
            return this.updateById(data.id, data);
        }
        return this.insert(data);
    }
};

