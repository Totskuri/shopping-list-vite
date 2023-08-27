import {useMutation, useQueryClient} from '@tanstack/react-query';
import ToastUtil from '../../utils/ToastUtil.jsx';
import Item from '../../supabase/models/item.js';

const useItemDeleteById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            return Item.deleteById(id);
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

export default useItemDeleteById;
