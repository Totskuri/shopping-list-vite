import {useMutation, useQueryClient} from '@tanstack/react-query';
import ToastUtil from '../../utils/ToastUtil.jsx';
import List from '../../supabase/models/list.js';

const useListDeleteById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            return List.deleteById(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['lists']
            });
        },
        onError: (error) => {
            ToastUtil.error(error.message);
        }
    });
};

export default useListDeleteById;
