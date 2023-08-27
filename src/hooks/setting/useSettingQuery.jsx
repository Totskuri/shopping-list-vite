import {useQuery} from '@tanstack/react-query';
import Setting from '../../supabase/models/setting.js';

const useSettingQuery = () => {
    const getSettings = () => {
        return Setting.select().then((res) => {
            return res.data;
        });
    };

    return useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    });
};

export default useSettingQuery;
