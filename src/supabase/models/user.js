import {supabase} from '../client';
import ToastUtil from '../../utils/ToastUtil.jsx';

export default class User {
    static async signOut() {
        const {error} = await supabase.auth.signOut();
        if (error) {
            ToastUtil.error(error);
        }
    }
};

