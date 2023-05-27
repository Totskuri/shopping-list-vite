import ApiCall from '../apiCall';

export const ITEM_STATUS_UNCHECKED = 'UNCHECKED';
export const ITEM_STATUS_CHECKED = 'CHECKED';
export const ITEM_SELECT_COLUMNS = 'id, title, status, total';

export default class Item {
    static select(listId) {
        return ApiCall.selectByColumn(
            'items',
            ITEM_SELECT_COLUMNS,
            'list_id',
            listId,
            'created_at');
    }

    static bulkInsert(items) {
        return ApiCall.insert('items', items, ITEM_SELECT_COLUMNS);
    }

    static updateById(id, update) {
        return ApiCall.updateById('items', update, id, ITEM_SELECT_COLUMNS);
    }

    static deleteById(id) {
        return ApiCall.deleteById('items', id);
    }
};

