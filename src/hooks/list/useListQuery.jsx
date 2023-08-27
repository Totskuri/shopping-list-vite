import {useQuery} from '@tanstack/react-query';
import List from '../../supabase/models/list.js';

const useListQuery = (id = null) => {
    const getLists = () => {
        if (id) {
            return List.selectById(id).then((res) => {
                return res.data;
            });
        }
        return List.select().then((res) => {
            return res.data;
        });
    };

    const getQueryKey = () => {
        if (id) {
            return ['lists', id];
        }
        return ['lists'];
    };

    return useQuery({
        queryKey: getQueryKey(),
        queryFn: getLists
    });
};

export default useListQuery;
