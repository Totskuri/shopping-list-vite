import {useMutation, useQueryClient} from '@tanstack/react-query';
import Setting from '../../supabase/models/setting.js';
import ToastUtil from '../../utils/ToastUtil.jsx';

const useSettingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return Setting.insertOrUpdateById(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['settings']
            });
        },
        onError: (error) => {
            ToastUtil.error(error.message);
        }
    });
};

export default useSettingMutation;
