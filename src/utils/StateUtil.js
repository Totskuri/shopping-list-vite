import produce from 'immer';

export default class StateUtil {
    static produceObject(object, key, value) {
        return produce(object, (draft) => {
            draft[key] = value;
        });
    }
}
