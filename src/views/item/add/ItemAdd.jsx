import React, {useState} from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import {useNavigate, useParams} from 'react-router-dom';
import Item, {ITEM_STATUS_UNCHECKED} from '../../../supabase/models/item';
import StateUtil from '../../../utils/StateUtil';
import ItemCounterCard from '../../../components/Card/ItemCounterCard';
import Padding from '../../../components/Padding/Padding';
import CancelButton from '../../../components/Button/CancelButton';
import Routes from '../../../constants/routes';
import ConfirmButton from '../../../components/Button/ConfirmButton';
import Grid from '../../../components/Grid/Grid';
import Position from '../../../components/Position/Position';
import DataUtil from '../../../utils/DataUtil';
import CreateButton from '../../../components/Button/CreateButton';
import {TextInput, Label, Columns, Column} from 'tyylisivu-components';

const ItemAdd = () => {
    const {listId} = useParams();
    const navigate = useNavigate();
    const [actionInProgress, setActionInProgress] = useState(false);
    const [newItems, setNewItems] = useState([]);
    const [itemName, setItemName] = useState('');

    const getListEditUrl = () => {
        return Routes.LIST_EDIT.replace(':id', listId);
    };

    const updateItemValue = (itemId, key, value) => {
        // If item total is > 0 => update item. Otherwise delete.
        if (value > 0) {
            setNewItems(StateUtil.updateArrayItemByIdAndKey(itemId, newItems, value, key));
        } else {
            setNewItems(StateUtil.removeFromArrayById(itemId, newItems));
        }
    };

    const submitInput = () => {
        if (!DataUtil.isEmpty(itemName)) {
            setNewItems(StateUtil.addToArrayByIndex(
                newItems,
                {
                    id: DataUtil.uuid(),
                    title: itemName,
                    list_id: listId,
                    status: ITEM_STATUS_UNCHECKED,
                    total: 1,
                },
                0));
            setItemName('');
        }
    };

    const saveItems = () => {
        setActionInProgress(true);
        Item.bulkInsert(newItems).then((data) => {
            if (!DataUtil.isEmpty(data) && Array.isArray(data)) {
                navigate(getListEditUrl());
            }
        }).finally(() => {
            setActionInProgress(false);
        });
    };

    return (
        <DefaultLayout>
            <Padding>
                <Grid
                    gridTemplateColumns="repeat(2, 1fr)"
                    columnGap="20px"
                >
                    <TextInput
                        value={itemName}
                        onChange={(val) => setItemName(val)}
                        onSubmit={submitInput}
                        readOnly={actionInProgress}
                        placeholder="Enter title"
                        autoFocus
                    />
                    <CreateButton
                        text="Add"
                        onClick={submitInput}
                    />
                </Grid>
            </Padding>
            {newItems.length > 0 && (
                <Padding>
                    {newItems.map((item) => {
                        return (
                            <ItemCounterCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                total={item.total}
                                onChange={updateItemValue}
                            />
                        );
                    })}
                </Padding>
            )}
            <Position
                position="sticky"
                bottom={0}
            >
                <Padding>
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        columnGap="20px"
                    >
                        <CancelButton
                            onClick={() => navigate(getListEditUrl())}
                            disabled={actionInProgress}
                        />
                        <ConfirmButton
                            onClick={saveItems}
                            disabled={actionInProgress || newItems.length === 0}
                            isLoading={actionInProgress}
                        />
                    </Grid>
                </Padding>
            </Position>
        </DefaultLayout>
    );
};

export default ItemAdd;
