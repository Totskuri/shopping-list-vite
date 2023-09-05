import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card.jsx';
import Flex from '../../Flex/Flex.jsx';
import {Link} from 'react-router-dom';
import Routes from '../../../constants/routes.js';
import styles from './ListCard.module.scss';
import {LIST_PROPS} from '../../../supabase/models/list.js';
import useTranslation from '../../../hooks/useTranslation.jsx';
import MenuWrapper from '../../MenuWrapper/MenuWrapper.jsx';

const ListCard = ({list, toggleEditMode, onDelete}) => {
    const t = useTranslation();

    const getMenuActions = () => {
        return [
            {
                text: t('Edit'),
                onClick: () => toggleEditMode(true)
            },
            {
                text: t('Delete'),
                onClick: () => {
                    if (window.confirm(`${t('Delete')} ${list.title}?`)) {
                        onDelete();
                    }
                }
            }
        ];
    };

    return (
        <Card flipId={list.id}>
            <Flex justifyContent="space-between" alignItems="center">
                <Link
                    to={Routes.LIST_EDIT.replace(':id', list.id)}
                    className={styles.link}
                >
                    {list.title}
                </Link>
                <MenuWrapper
                    actions={getMenuActions()}
                />
            </Flex>
        </Card>
    );
};

ListCard.propTypes = {
    list: LIST_PROPS,
    toggleEditMode: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ListCard.defaultProps = {
    item: {},
};

export default ListCard;
