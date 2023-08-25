import {supabase} from '../client';
import DataUtil from '../../utils/DataUtil';

export default class User {
    static async signOut() {
        const {error} = await supabase.auth.signOut();
        if (!DataUtil.isEmpty(error)) {
            console.error(error);
        }
    }
};

