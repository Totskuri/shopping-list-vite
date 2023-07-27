import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Label} from "tyylisivu-components";
import EditDrawer from "./EditDrawer.jsx";
import DataUtil from "../../utils/DataUtil.js";
import StateUtil from "../../utils/StateUtil.js";
import TextInputWrapper from "../Input/TextInputWrapper.jsx";
import ToastUtil from "../../utils/ToastUtil.jsx";
import Item, {ITEM_PROPS} from "../../supabase/models/item.js";
import NumberInputWrapper from "../Input/NumberInputWrapper.jsx";

const ItemEditDrawer = ({item, handleClose, onChange}) => {
    const [localItem, setLocalItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        if (DataUtil.isEmpty(localItem.title)) {
            ToastUtil.error('Title is required');
            return false;
        }
        return true;
    };

    const onSave = () => {
        // Check data is valid before save
        if (!validate()) {
            return;
        }
        // Only update if data changed and user wants to save
        if (DataUtil.equal(item, localItem)) {
            handleClose();
            return;
        }
        setIsLoading(true);
        Item.insertOrUpdateById(localItem.id, localItem).then((data) => {
            if (data.length === 1) {
                onChange(data[0]);
                handleClose();
            }
        }).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        setLocalItem(item)
    }, [item]);

    return (
        <EditDrawer
            isOpen={!DataUtil.isEmpty(item)}
            handleClose={handleClose}
            handleSave={onSave}
            isLoading={isLoading}
        >
            {!DataUtil.isEmpty(localItem) && ( // autofocus fix
                <>
                    <Label
                        text="Title"
                    >
                        <TextInputWrapper
                            placeholder="Enter title"
                            value={localItem?.title || ''}
                            onChange={(val) => setLocalItem(StateUtil.produceObject(localItem, 'title', val))}
                            autoFocus
                        />
                    </Label>
                    <Label
                        text="Amount"
                    >
                        <NumberInputWrapper
                            value={localItem?.total || 0}
                            onChange={(val) => setLocalItem(StateUtil.produceObject(localItem, 'total', val))}
                        />
                    </Label>
                </>
            )}
        </EditDrawer>
    );
};

ItemEditDrawer.propTypes = {
    item: ITEM_PROPS,
    handleClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

ItemEditDrawer.defaultProps = {
    item: undefined,
    isOpen: false,
};

export default ItemEditDrawer;
