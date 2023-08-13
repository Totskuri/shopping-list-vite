import isEmpty from 'is-empty';

export default class DataUtil {
    static isEmpty(val) {
        return isEmpty(val);
    }

    static equal(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
}
