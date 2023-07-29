import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Label} from "tyylisivu-components";
import EditDrawer from "./EditDrawer.jsx";
import DataUtil from "../../utils/DataUtil.js";
import StateUtil from "../../utils/StateUtil.js";
import List, {LIST_PROPS} from "../../supabase/models/list.js";
import TextInputWrapper from "../Input/TextInputWrapper.jsx";
import ToastUtil from "../../utils/ToastUtil.jsx";

const ListEditDrawer = ({list, handleClose, onChange}) => {
    const [localList, setLocalList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        if (DataUtil.isEmpty(localList.title)) {
            ToastUtil.error('Title is required');
            return false;
        }
        return true;
    };

    const onSave = () => {
        const {id, title} = localList;
        // Check data is valid before save
        if (!validate()) {
            return;
        }
        // Only update if data changed and user wants to save
        if (list?.title === title) {
            handleClose();
            return;
        }
        setIsLoading(true);
        List.insertOrUpdateById(id, {title}).then((data) => {
            if (data.length === 1) {
                onChange(data[0]);
                handleClose();
            }
        }).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        setLocalList(list)
    }, [list]);

    return (
        <EditDrawer
            isOpen={!DataUtil.isEmpty(list)}
            handleClose={handleClose}
            handleSave={onSave}
            isLoading={isLoading}
        >
            {!DataUtil.isEmpty(localList) && ( // autofocus fix
                <Label
                    text="Title"
                >
                    <TextInputWrapper
                        placeholder="Enter title"
                        value={localList?.title || ''}
                        onChange={(val) => setLocalList(StateUtil.produceObject(localList, 'title', val))}
                        onSubmit={onSave}
                        autoFocus
                    />
                </Label>
            )}
        </EditDrawer>
    );
};

ListEditDrawer.propTypes = {
    list: LIST_PROPS,
    handleClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

ListEditDrawer.defaultProps = {
    list: undefined,
    isOpen: false,
};

export default ListEditDrawer;
