import {v4 as uuidv4} from 'uuid';
import isEmpty from 'is-empty';

export default class DataUtil {
    static isEmpty(val) {
        return isEmpty(val);
    }

    static uuid() {
        return uuidv4();
    }
}
