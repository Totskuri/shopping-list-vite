import {useQuery} from "@tanstack/react-query";
import Setting from "../supabase/models/setting.js";

const useSettingsQuery = () => {
    const getSettings = async () => {
        return Setting.select().then(({data}) => {
            return data;
        });
    };

    return useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    });
};

export default useSettingsQuery;