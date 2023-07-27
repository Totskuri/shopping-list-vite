import ApiCall from '../apiCall';
import PropTypes from "prop-types";

export const LIST_SELECT_COLUMNS = 'id, title';
export const LIST_PROPS = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
});

export default class List {
    static getEmptyList() {
        return {
            id: null,
            title: ''
        };
    }

    static select() {
        return ApiCall.select(
            'lists',
            LIST_SELECT_COLUMNS,
            'created_at');
    }

    static selectById(id) {
        return ApiCall.selectById(
            'lists',
            id,
            LIST_SELECT_COLUMNS);
    }

    static insert(insert) {
        return ApiCall.insert('lists', insert, LIST_SELECT_COLUMNS);
    }

    static deleteById(id) {
        return ApiCall.deleteById('lists', id);
    }

    static updateById(id, update) {
        return ApiCall.updateById('lists', update, id, LIST_SELECT_COLUMNS);
    }

    static insertOrUpdateById(id, data) {
        if (id) {
            return this.updateById(id, data);
        }
        return this.insert(data);
    }
};

