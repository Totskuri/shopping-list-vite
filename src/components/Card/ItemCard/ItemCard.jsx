import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card.jsx';
import {Checkbox} from 'tyylisivu-components';
import {ITEM_PROPS, ITEM_STATUS_CHECKED} from '../../../supabase/models/item.js';
import styles from './ItemCard.module.scss';
import Flex from '../../Flex/Flex.jsx';
import useTranslation from '../../../hooks/useTranslation.jsx';
import MenuWrapper from '../../MenuWrapper/MenuWrapper.jsx';

const ItemCard = ({item, toggleEditMode, onChangeStatus, onDelete}) => {
    const t = useTranslation();
    const [isChecked, setIsChecked] = useState(item.status === ITEM_STATUS_CHECKED);

    const getMenuActions = () => {
        return [
            {
                text: t('Edit'),
                onClick: () => toggleEditMode(true)
            },
            {
                text: t('Delete'),
                onClick: () => {
                    if (window.confirm(`${t('Delete')} ${item.title}?`)) {
                        onDelete();
                    }
                }
            }
        ];
    };

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
                        <MenuWrapper
                            actions={getMenuActions()}
                        />
                    </Flex>
                </div>
            </Flex>
        </Card>
    );
};

ItemCard.propTypes = {
    item: ITEM_PROPS,
    toggleEditMode: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ItemCard.defaultProps = {
    item: {},
};

export default ItemCard;
