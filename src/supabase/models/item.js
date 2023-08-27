import ApiCall from '../apiCall';
import PropTypes from 'prop-types';

export const ITEM_STATUS_UNCHECKED = 'UNCHECKED';
export const ITEM_STATUS_CHECKED = 'CHECKED';
export const ITEM_SELECT_COLUMNS = 'id, list_id, title, status, total, description';
export const ITEM_PROPS = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    total: PropTypes.number,
    status: PropTypes.string,
    description: PropTypes.string,
});

export default class Item {
    static getEmptyItem(listId) {
        return {
            id: null,
            list_id: listId,
            title: '',
            total: 1,
            status: ITEM_STATUS_UNCHECKED,
            description: '',
        };
    }

    static select(listId) {
        return ApiCall.generateSelectByColumn(
            'items',
            ITEM_SELECT_COLUMNS,
            'list_id',
            listId,
            'created_at');
    }

    static insert(insert) {
        return ApiCall.generateInsert('items', insert);
    }

    static updateById(id, update) {
        return ApiCall.generateUpdateById('items', update, id);
    }

    static deleteById(id) {
        return ApiCall.generateDeleteById('items', id);
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

