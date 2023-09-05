import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Menu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import styles from './MenuWrapper.module.scss';
import {MoreVertical} from 'react-feather';

const MenuWrapper = ({actions}) => {
    const menuClassName = ({ state }) =>
        state === 'opening'
            ? styles.menuOpening
            : state === 'closing'
                ? styles.menuClosing
                : styles.menu;

    const menuItemClassName = ({ hover, disabled }) =>
        disabled
            ? styles.menuItemDisabled
            : hover
                ? styles.menuItemHover
                : styles.menuItem;

    const menuActions = useMemo(() => {
        const render = [];
        actions.forEach((action) => {
            const {text, onClick} = action;
            render.push(
                <MenuItem
                    key={text}
                    className={menuItemClassName}
                    value={text}
                    onClick={onClick}
                >
                    {text}
                </MenuItem>
            );
        });
        return render;
    }, [actions]);

    return (
        <Menu
            transition
            menuClassName={menuClassName}
            boundingBoxPadding="15"
            menuButton={
                <button
                    type="button"
                    className={styles.menuButton}
                >
                    <MoreVertical />
                </button>
            }
        >
            {menuActions}
        </Menu>
    );
};

MenuWrapper.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        onClick: PropTypes.func,
    })),
};

MenuWrapper.defaultProps = {
    actions: [],
};

export default MenuWrapper;
