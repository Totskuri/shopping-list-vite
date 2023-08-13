import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card.jsx';
import IconButton from "../../Button/IconButton.jsx";
import {Edit, Trash2} from "react-feather";
import Flex from "../../Flex/Flex.jsx";
import {Link} from "react-router-dom";
import Routes from "../../../constants/routes.js";
import styles from './ListCard.module.scss';
import {Gap} from "tyylisivu-components";
import {LIST_PROPS} from "../../../supabase/models/list.js";
import useTranslation from "../../../hooks/useTranslation.jsx";

const ListCard = ({list, isEditMode, toggleEditMode, onDelete}) => {
    const t = useTranslation();
    return (
        <Card flipId={list.id}>
            <Flex justifyContent="space-between" alignItems="center">
                <Link
                    to={Routes.LIST_EDIT.replace(':id', list.id)}
                    className={styles.link}
                >
                    {list.title}
                </Link>
                <Flex alignItems="center">
                    <IconButton
                        onClick={() => toggleEditMode(true)}
                        disabled={isEditMode}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            if (window.confirm(`${t('Delete')} ${list.title}?`)) {
                                onDelete();
                            }
                        }}
                        disabled={isEditMode}
                    >
                        <Trash2 />
                    </IconButton>
                    <Gap />
                </Flex>
            </Flex>
        </Card>
    );
};

ListCard.propTypes = {
    list: LIST_PROPS,
    isEditMode: PropTypes.bool,
    toggleEditMode: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ListCard.defaultProps = {
    item: {},
    isEditMode: false,
};

export default ListCard;
