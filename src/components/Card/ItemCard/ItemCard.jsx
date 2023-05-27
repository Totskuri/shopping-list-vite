import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card.jsx';
import {Checkbox} from 'tyylisivu-components';
import {ITEM_STATUS_CHECKED} from "../../../supabase/models/item.js";
import styles from './ItemCard.module.scss';
import IconButton from "../../Button/IconButton.jsx";
import {Check, Edit, Trash2, X} from "react-feather";
import TitleInput from "../../Input/TitleInput.jsx";
import CounterInput from "../../Input/CounterInput.jsx";
import Flex from "../../Flex/Flex.jsx";

const ItemCard = ({item, isEditMode, toggleEditMode, onChangeValue, onDelete}) => {
    return (
        <Card>
            <Flex>
                <label className={styles.checkboxContainer}>
                    <Checkbox
                        className={styles.checkbox}
                        checked={item.status === ITEM_STATUS_CHECKED}
                        onChange={(val) => onChangeValue('status', val)}
                    />
                </label>
                <div className={styles.content}>
                    <TitleInput
                        value={item.title}
                        isEditMode={isEditMode}
                        onChange={(val) => onChangeValue('title', val)}
                        autoFocus
                    />
                    <Flex alignItems="center">
                        <CounterInput
                            value={item.total}
                            isEditMode={isEditMode}
                            onChange={(val) => onChangeValue('total', val)}
                        />
                        <IconButton
                            onClick={() => toggleEditMode(true)}
                        >
                            {!isEditMode ? <Edit /> : <Check color="#28a745" />}
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                if (isEditMode) {
                                    toggleEditMode();
                                } else if (window.confirm(`Delete item ${item.title}?`)) {
                                    onDelete();
                                }
                            }}
                        >
                            {!isEditMode ? <Trash2 /> : <X color="#dc3545" />}
                        </IconButton>
                    </Flex>
                </div>
            </Flex>
        </Card>
    );
};

ItemCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        total: PropTypes.number,
        status: PropTypes.string,
    }),
    isEditMode: PropTypes.bool,
    toggleEditMode: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ItemCard.defaultProps = {
    item: {},
    isEditMode: false,
};

export default ItemCard;
