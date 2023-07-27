import React, {useEffect, useState} from 'react';
import DefaultLayout from '../../../layouts/DefaultLayout';
import {useParams} from 'react-router-dom';
import Item, {ITEM_STATUS_CHECKED, ITEM_STATUS_UNCHECKED} from '../../../supabase/models/item';
import List from '../../../supabase/models/list';
import ListEditTitleBar from './ListEditTitleBar';
import CreateButton from '../../../components/Button/CreateButton';
import Position from '../../../components/Position/Position';
import NotFound from '../../../layouts/NotFound';
import ItemCard from '../../../components/Card/ItemCard/ItemCard.jsx';
import CardList from '../../../components/Card/CardList';
import DataUtil from '../../../utils/DataUtil';
import Placeholder from "../../../layouts/Placeholder.jsx";
import StateUtil from "../../../utils/StateUtil.js";
import SortUtil from "../../../utils/SortUtil.js";
import ItemEditDrawer from "../../../components/Drawer/ItemEditDrawer.jsx";

const ListEdit = () => {
    const {id} = useParams();
    const [isInitializing, setIsInitializing] = useState(true);
    const [list, setList] = useState({});
    const [items, setItems] = useState(null);
    const [editItem, setEditItem] = useState(null);

    const initialize = () => {
        Promise.all([
            List.selectById(id),
            Item.select(id),
        ]).then(([newList, newItems]) => {
            setList(newList);
            setItems(SortUtil.sortItemsForList(newItems));
        }).finally(() => setIsInitializing(false));
    };

    const updateStateWithItemId = (itemId, data) => {
        const newItems = StateUtil.updateArrayItemById(itemId, items, data);
        setItems(SortUtil.sortItemsForList(newItems));
    };

    const updateItemStatus = (itemId, val) => {
        const status = val ? ITEM_STATUS_CHECKED : ITEM_STATUS_UNCHECKED;
        Item.updateById(itemId, {status}).then((data) => {
            if (data.length === 1) {
                updateStateWithItemId(itemId, data[0]);
            }
        });
    };

    const deleteItem = (itemId) => {
        Item.deleteById(itemId).then((success) => {
            if (success) {
                setItems(StateUtil.removeFromArrayById(itemId, items));
            }
        });
    };

    useEffect(() => {
        initialize();
    }, [id]);

    if (!isInitializing && DataUtil.isEmpty(list)) {
        return <NotFound text="List not found" />;
    }

    return (
        <DefaultLayout>
            <ListEditTitleBar
                title={list.title}
            />
            {isInitializing && <Placeholder />}
            {!isInitializing && (
                <CardList>
                    {items.map((item) => {
                        return (
                            <ItemCard
                                key={item.id}
                                item={item}
                                isEditMode={item.id === editItem?.id}
                                toggleEditMode={() => setEditItem(item)}
                                onDelete={() => deleteItem(item.id)}
                                onChangeStatus={(val) => updateItemStatus(item.id, val)}
                            />
                        );
                    })}
                </CardList>
            )}
            <Position
                right={40}
                bottom={30}
            >
                <CreateButton
                    text="Add items"
                    onClick={() => setEditItem(Item.getEmptyItem(list.id))}
                />
            </Position>
            <ItemEditDrawer
                item={editItem}
                onChange={(data) => {
                    const found = items.find((item) => item.id === data?.id);
                    if (found) {
                        updateStateWithItemId(data?.id, data);
                    } else {
                        const newItems = StateUtil.addToArrayByIndex(items, data);
                        setItems(SortUtil.sortItemsForList(newItems));
                    }
                }}
                handleClose={() => setEditItem(null)}
            />
        </DefaultLayout>
    );
};

export default ListEdit;
