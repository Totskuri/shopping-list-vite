import {ITEM_STATUS_CHECKED, ITEM_STATUS_UNCHECKED} from '../supabase/models/item.js';

export default class SortUtil {
    static sortItemsForList(items) {
        let sortedItems = [];
        const checked = items.filter((item) => item.status === ITEM_STATUS_CHECKED);
        const unchecked = items.filter((item) => item.status === ITEM_STATUS_UNCHECKED);
        sortedItems = sortedItems.concat(SortUtil.sortByFieldAsc(unchecked, 'title'));
        sortedItems = sortedItems.concat(SortUtil.sortByFieldAsc(checked, 'title'));
        return sortedItems;
    }

    static sortByFieldAsc(items, field) {
        return items.sort((a, b) => {
            if ( a[field] < b[field] ){
                return -1;
            }
            if ( a[field] > b[field] ){
                return 1;
            }
            return 0;
        });
    }
}
