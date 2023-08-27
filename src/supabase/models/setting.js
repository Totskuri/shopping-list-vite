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
        return ApiCall.generateInsert('settings', insert);
    }

    static updateById(id, update) {
        return ApiCall.generateUpdateById('settings', update, id);
    }

    static insertOrUpdateById(data) {
        if (data?.id) {
            return this.updateById(data.id, data);
        }
        return this.insert(data);
    }
};

