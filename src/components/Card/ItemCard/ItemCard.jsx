import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card.jsx';
import {Checkbox} from 'tyylisivu-components';
import {ITEM_PROPS, ITEM_STATUS_CHECKED} from '../../../supabase/models/item.js';
import styles from './ItemCard.module.scss';
import IconButton from '../../Button/IconButton.jsx';
import {Edit, Trash2} from 'react-feather';
import Flex from '../../Flex/Flex.jsx';
import useTranslation from '../../../hooks/useTranslation.jsx';

const ItemCard = ({item, isEditMode, toggleEditMode, onChangeStatus, onDelete}) => {
    const t = useTranslation();
    const [isChecked, setIsChecked] = useState(item.status === ITEM_STATUS_CHECKED);

    const updateIsChecked = (val) => {
        if (val !== isChecked) {
            setIsChecked(val);
        }
    };

    useEffect(() => {
        const val = item.status === ITEM_STATUS_CHECKED;
        updateIsChecked(val);
    }, [item.status]);

    return (
        <Card flipId={item.id}>
            <Flex alignItems="center">
                <label>
                    <div className={styles.checkboxContainer}>
                        <Checkbox
                            className={styles.checkbox}
                            checked={isChecked}
                            onChange={(val) => {
                                updateIsChecked(val);
                                onChangeStatus(val);
                            }}
                        />
                    </div>
                </label>
                <div className={styles.content}>
                    <span className={styles.title}>{item.title}</span>
                    <Flex alignItems="center">
                        <span className={styles.title}>
                            {item.total}
                        </span>
                        <IconButton
                            onClick={() => toggleEditMode(true)}
                            disabled={isEditMode}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                if (window.confirm(`${t('Delete')} ${item.title}?`)) {
                                    onDelete();
                                }
                            }}
                            disabled={isEditMode}
                        >
                            <Trash2 />
                        </IconButton>
                    </Flex>
                </div>
            </Flex>
        </Card>
    );
};

ItemCard.propTypes = {
    item: ITEM_PROPS,
    isEditMode: PropTypes.bool,
    toggleEditMode: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ItemCard.defaultProps = {
    item: {},
    isEditMode: false,
};

export default ItemCard;
