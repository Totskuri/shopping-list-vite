import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card.jsx';
import IconButton from "../../Button/IconButton.jsx";
import {Check, Edit, Trash2, X} from "react-feather";
import TitleInput from "../../Input/TitleInput.jsx";
import Flex from "../../Flex/Flex.jsx";
import Routes from "../../../constants/routes.js";

const ListCard = ({list, isEditMode, toggleEditMode, onChangeValue, onDelete}) => {
    return (
        <Card>
            <Flex justifyContent="space-between" alignItems="center">
                <TitleInput
                    value={list.title}
                    isEditMode={isEditMode}
                    onChange={onChangeValue}
                    to={Routes.LIST_EDIT.replace(':id', list.id)}
                    autoFocus
                />
                <Flex>
                    <IconButton
                        onClick={() => toggleEditMode(true)}
                    >
                        {!isEditMode ? <Edit /> : <Check color="#28a745" />}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            if (isEditMode) {
                                toggleEditMode();
                            } else if (window.confirm(`Delete item ${list.title}?`)) {
                                onDelete();
                            }
                        }}
                    >
                        {!isEditMode ? <Trash2 /> : <X color="#dc3545" />}
                    </IconButton>
                </Flex>
            </Flex>
        </Card>
    );
};

ListCard.propTypes = {
    list: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    }),
    isEditMode: PropTypes.bool,
    toggleEditMode: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ListCard.defaultProps = {
    item: {},
    isEditMode: false,
};

export default ListCard;
