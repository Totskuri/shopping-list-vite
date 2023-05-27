import React from 'react';
import PropTypes from 'prop-types';
import {Menu, MenuItem} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import styles from './MenuWrapper.module.scss';
import Spinner from "../Spinner/Spinner.jsx";
import {MoreVertical} from "react-feather";

const MenuWrapper = ({isActionInProgress, actions}) => {
    const menuClassName = ({ state }) =>
        state === "opening"
            ? styles.menuOpening
            : state === "closing"
                ? styles.menuClosing
                : styles.menu;

    const menuItemClassName = ({ hover, disabled }) =>
        disabled
            ? styles.menuItemDisabled
            : hover
                ? styles.menuItemHover
                : styles.menuItem;

    const renderActions = () => {
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
            )
        })
        return render;
    };

    return (
        <Menu
            transition
            menuClassName={menuClassName}
            menuButton={
                <button type="button" className={styles.menuButton}>
                    {isActionInProgress ? <Spinner isDark /> : <MoreVertical />}
                </button>
            }
        >
            {renderActions()}
        </Menu>
    );
};

MenuWrapper.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        onClick: PropTypes.func,
    })),
    isActionInProgress: PropTypes.bool,
};

MenuWrapper.defaultProps = {
    actions: [],
    isActionInProgress: false,
};

export default MenuWrapper;
