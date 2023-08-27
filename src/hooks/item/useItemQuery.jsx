import {useQuery} from '@tanstack/react-query';
import Item from '../../supabase/models/item.js';
import SortUtil from '../../utils/SortUtil.js';

const useItemQuery = (listId) => {
    const getItems = () => {
        return Item.select(listId).then((res) => {
            return SortUtil.sortItemsForList(res.data);
        });
    };

    return useQuery({
        queryKey: ['items', listId],
        queryFn: getItems
    });
};

export default useItemQuery;
