import React from 'react';
import toast, {Toaster} from 'react-hot-toast';

export default class ToastUtil {
    static getToaster() {
        return (
            <Toaster
                toastOptions={{
                    style: {
                        margin: '50px',
                    },
                }}
            />
        );
    }

    static success(message) {
        toast.success(message);
    };

    static error(message) {
        toast.error(message);
    };
}
