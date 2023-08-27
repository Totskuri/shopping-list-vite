import {useMutation, useQueryClient} from '@tanstack/react-query';
import ToastUtil from '../../utils/ToastUtil.jsx';
import Item from '../../supabase/models/item.js';

const useItemInsertOrUpdateById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return Item.insertOrUpdateById(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items']
            });
        },
        onError: (error) => {
            ToastUtil.error(error.message);
        }
    });
};

export default useItemInsertOrUpdateById;
