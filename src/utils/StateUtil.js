import produce from 'immer';

export default class StateUtil {
    static produceObject(object, key, value) {
        return produce(object, (draft) => {
            draft[key] = value;
        });
    }

    static addToArrayByIndex(array, value, index = 0) {
        return produce(array, (draft) => {
            draft.splice(index, 0, value);
        });
    }

    static removeFromArrayById(id, array) {
        const index = array.findIndex((item) => item.id === id);
        return produce(array, (draft) => {
            draft.splice(index, 1);
        });
    }

    static updateArrayItemById(id, array, value) {
        const index = array.findIndex((item) => item.id === id);
        return produce(array, (draft) => {
            draft[index] = value;
        });
    }
}
