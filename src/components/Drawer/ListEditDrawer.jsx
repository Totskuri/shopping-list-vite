import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Label} from 'tyylisivu-components';
import EditDrawer from './EditDrawer.jsx';
import StateUtil from '../../utils/StateUtil.js';
import {LIST_PROPS} from '../../supabase/models/list.js';
import TextInputWrapper from '../Input/TextInputWrapper.jsx';
import ToastUtil from '../../utils/ToastUtil.jsx';
import useTranslation from '../../hooks/useTranslation.jsx';
import useListInsertOrUpdateById from '../../hooks/list/useListInsertOrUpdateById.jsx';
import Padding from '../Padding/Padding.jsx';
import EditDrawerActionBar from './EditDrawerActionBar.jsx';

const ListEditDrawer = ({list, handleClose}) => {
    const t = useTranslation();
    const actionBarRef = useRef(null);
    const {mutate, isLoading, isSuccess} = useListInsertOrUpdateById();
    const [localList, setLocalList] = useState(list);

    const validate = () => {
        if (!localList?.title) {
            ToastUtil.error(t('Title is required'));
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
        if (list?.title === localList.title) {
            handleClose();
            return;
        }
        mutate(localList);
    };

    const lastInputFocused = () => {
        if (actionBarRef.current) {
            actionBarRef.current.scrollIntoView();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleClose();
        }
    }, [isSuccess]);

    return (
        <EditDrawer
            isOpen={localList !== null}
            handleClose={handleClose}
        >
            <Padding>
                <Label
                    text={t('Title')}
                >
                    {localList && ( // autofocus fix
                        <TextInputWrapper
                            placeholder={t('Enter title')}
                            value={localList?.title || ''}
                            onChange={(val) => setLocalList(StateUtil.produceObject(localList, 'title', val))}
                            onSubmit={onSave}
                            onFocus={lastInputFocused}
                            autoFocus
                        />
                    )}
                </Label>
            </Padding>
            <EditDrawerActionBar
                innerRef={actionBarRef}
                handleSave={onSave}
                handleClose={handleClose}
                isLoading={isLoading}
            />
        </EditDrawer>
    );
};

ListEditDrawer.propTypes = {
    list: LIST_PROPS,
    handleClose: PropTypes.func.isRequired,
};

ListEditDrawer.defaultProps = {
    list: undefined,
    isOpen: false,
};

export default ListEditDrawer;
