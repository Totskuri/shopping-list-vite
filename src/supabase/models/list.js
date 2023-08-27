import ApiCall from '../apiCall';
import PropTypes from 'prop-types';

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
        return ApiCall.generateSelect(
            'lists',
            LIST_SELECT_COLUMNS,
            'created_at');
    }

    static selectById(id) {
        return ApiCall.generateSelectById(
            'lists',
            id,
            LIST_SELECT_COLUMNS);
    }

    static insert(insert) {
        return ApiCall.generateInsert('lists', insert);
    }

    static deleteById(id) {
        return ApiCall.generateDeleteById('lists', id);
    }

    static updateById(id, update) {
        return ApiCall.generateUpdateById('lists', update, id);
    }

    static insertOrUpdateById({...data}) {
        const {id} = data;
        delete data.id;
        if (id) {
            return this.updateById(id, data);
        }
        return this.insert(data);
    }
};

