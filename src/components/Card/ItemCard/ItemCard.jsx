import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card.jsx';
import {Checkbox} from 'tyylisivu-components';
import {ITEM_PROPS, ITEM_STATUS_CHECKED} from "../../../supabase/models/item.js";
import styles from './ItemCard.module.scss';
import IconButton from "../../Button/IconButton.jsx";
import {Edit, Trash2} from "react-feather";
import Flex from "../../Flex/Flex.jsx";

const ItemCard = ({item, isEditMode, toggleEditMode, onChangeStatus, onDelete}) => {
    return (
        <Card>
            <Flex alignItems="center">
                <label>
                    <div className={styles.checkboxContainer}>
                        <Checkbox
                            className={styles.checkbox}
                            checked={item.status === ITEM_STATUS_CHECKED}
                            onChange={(val) => onChangeStatus(val)}
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
                                if (window.confirm(`Delete item ${item.title}?`)) {
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
