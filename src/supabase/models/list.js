import ApiCall from '../apiCall';

export const LIST_SELECT_COLUMNS = 'id, title';

export default class List {
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

    static insert(title) {
        return ApiCall.insert('lists', {title}, LIST_SELECT_COLUMNS);
    }

    static deleteById(id) {
        return ApiCall.deleteById('lists', id);
    }

    static updateById(id, update) {
        return ApiCall.updateById('lists', update, id, LIST_SELECT_COLUMNS);
    }
};

