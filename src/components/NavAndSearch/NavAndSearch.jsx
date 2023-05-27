import React, {useState} from 'react';
import styles from './NavAndSearch.module.scss';
import IconButton from '../Button/IconButton';
import {Menu} from 'react-feather';
import {Link} from 'react-router-dom';
import Routes from '../../constants/routes';
import PropTypes from 'prop-types';
import {TextInput, Drawer} from 'tyylisivu-components';
import Padding from '../Padding/Padding';

const NavAndSearch = ({searchValue, searchOnChange}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    return (
        <div className={styles.navbar}>
            <IconButton
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
                <Menu />
            </IconButton>
            <TextInput
                placeholder="Search..."
                className={styles.search}
                value={searchValue}
                onChange={searchOnChange}
            />
            <Drawer
                isOpen={menuIsOpen}
                handleClose={() => setMenuIsOpen(false)}
            >
                <Padding>
                    <Link
                        className={styles.drawerLink}
                        to={Routes.SIGN_OUT}
                    >
                        Sign out
                    </Link>
                </Padding>
            </Drawer>
        </div>
    );
};

NavAndSearch.propTypes = {
    searchValue: PropTypes.string,
    searchOnChange: PropTypes.func.isRequired,
};

NavAndSearch.defaultProps = {
    searchValue: '',
};

export default NavAndSearch;
