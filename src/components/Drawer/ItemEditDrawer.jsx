import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Label} from 'tyylisivu-components';
import EditDrawer from './EditDrawer.jsx';
import DataUtil from '../../utils/DataUtil.js';
import StateUtil from '../../utils/StateUtil.js';
import TextInputWrapper from '../Input/TextInputWrapper.jsx';
import ToastUtil from '../../utils/ToastUtil.jsx';
import {ITEM_PROPS} from '../../supabase/models/item.js';
import NumberInputWrapper from '../Input/NumberInputWrapper.jsx';
import TextareaWrapper from '../Input/TextareaWrapper.jsx';
import useTranslation from '../../hooks/useTranslation.jsx';
import useItemInsertOrUpdateById from '../../hooks/item/useInsertOrUpdateById.jsx';
import Padding from '../Padding/Padding.jsx';
import EditDrawerActionBar from './EditDrawerActionBar.jsx';

const ItemEditDrawer = ({item, handleClose}) => {
    const t = useTranslation();
    const actionBarRef = useRef(null);
    const {mutate, isLoading, isSuccess} = useItemInsertOrUpdateById();
    const [localItem, setLocalItem] = useState(item);

    const validate = () => {
        if (!localItem?.title) {
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
        if (DataUtil.equal(item, localItem)) {
            handleClose();
            return;
        }
        mutate(localItem);
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
            isOpen={localItem !== null}
            handleClose={handleClose}
        >
            <Padding>
                <Label
                    text={t('Title')}
                >
                    {localItem && ( // autofocus fix
                        <TextInputWrapper
                            placeholder={t('Enter title')}
                            value={localItem?.title || ''}
                            onChange={(val) => setLocalItem(StateUtil.produceObject(localItem, 'title', val))}
                            onSubmit={onSave}
                            autoFocus
                        />
                    )}
                </Label>
                <Label
                    text={t('Amount')}
                >
                    <NumberInputWrapper
                        value={localItem?.total || 0}
                        onChange={(val) => setLocalItem(StateUtil.produceObject(localItem, 'total', val))}
                        onSubmit={onSave}
                    />
                </Label>
                <Label
                    text={t('Description')}
                >
                    <TextareaWrapper
                        placeholder={t('Enter description')}
                        value={localItem?.description || ''}
                        onChange={(val) => setLocalItem(StateUtil.produceObject(localItem, 'description', val))}
                        onFocus={lastInputFocused}
                    />
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

ItemEditDrawer.propTypes = {
    item: ITEM_PROPS,
    handleClose: PropTypes.func.isRequired,
};

ItemEditDrawer.defaultProps = {
    item: undefined,
    isOpen: false,
};

export default ItemEditDrawer;
