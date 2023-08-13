import ApiCall from '../apiCall';
import PropTypes from "prop-types";

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
        return ApiCall.selectByColumn(
            'items',
            ITEM_SELECT_COLUMNS,
            'list_id',
            listId,
            'created_at');
    }

    static insert(insert) {
        return ApiCall.insert('items', insert, ITEM_SELECT_COLUMNS);
    }

    static updateById(id, update) {
        return ApiCall.updateById('items', update, id, ITEM_SELECT_COLUMNS);
    }

    static deleteById(id) {
        return ApiCall.deleteById('items', id);
    }

    static insertOrUpdateById(id, data) {
        if (id) {
            return this.updateById(id, {
                title: data.title,
                total: data.total,
                description: data.description
            });
        }
        return this.insert({
            list_id: data.list_id,
            title: data.title,
            total: data.total,
            status: data.status,
            description: data.description
        });
    }
};

