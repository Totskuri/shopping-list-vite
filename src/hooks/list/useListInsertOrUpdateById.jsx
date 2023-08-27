import {useMutation, useQueryClient} from '@tanstack/react-query';
import ToastUtil from '../../utils/ToastUtil.jsx';
import List from '../../supabase/models/list.js';

const useListInsertOrUpdateById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return List.insertOrUpdateById(data);
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

export default useListInsertOrUpdateById;
