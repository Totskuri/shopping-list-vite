import {useMutation, useQueryClient} from "@tanstack/react-query";
import Setting from "../supabase/models/setting.js";

const useSettingsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return Setting.insertOrUpdateById(data);
        },
        onSuccess: ({data}) => {
            queryClient.setQueryData(['settings'], data);
        }
    })
};

export default useSettingsMutation;
