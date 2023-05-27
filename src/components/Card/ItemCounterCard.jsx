import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import styles from './ItemCounterCard.module.scss';
import CounterInput from '../Input/CounterInput';
import Flex from "../Flex/Flex.jsx";

const ItemCounterCard = ({id, title, total, onChange}) => {
    return (
        <Card
            key={id}
        >
            <Flex justifyContent="space-between" alignItems="center">
                <span>{title}</span>
                <CounterInput
                    className={styles.input}
                    value={total}
                    onChange={(val) => onChange(id, 'total', val)}
                />
            </Flex>
        </Card>
    );
};

ItemCounterCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    total: PropTypes.number,
    onChange: PropTypes.func,
};

ItemCounterCard.defaultProps = {
    id: '',
    title: '',
    total: 1,
    onChange: () => {},
};

export default ItemCounterCard;
