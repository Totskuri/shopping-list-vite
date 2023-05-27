import React, {useEffect, useState} from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import {useNavigate, useParams} from 'react-router-dom';
import Item, {ITEM_STATUS_CHECKED, ITEM_STATUS_UNCHECKED} from '../../../supabase/models/item';
import List from '../../../supabase/models/list';
import ListEditTitleBar from './ListEditTitleBar';
import CreateButton from '../../../components/Button/CreateButton';
import Routes from '../../../constants/routes';
import Position from '../../../components/Position/Position';
import NotFound from '../../layouts/NotFound';
import ItemCard from '../../../components/Card/ItemCard/ItemCard.jsx';
import CardList from '../../../components/Card/CardList';
import DataUtil from '../../../utils/DataUtil';
import Placeholder from "../../layouts/Placeholder.jsx";
import StateUtil from "../../../utils/StateUtil.js";
import SortUtil from "../../../utils/SortUtil.js";

const ListEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
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

    const updateStateWithNewItem = (itemId, data) => {
        const newItems = StateUtil.updateArrayItemById(itemId, items, data[0]);
        setItems(SortUtil.sortItemsForList(newItems));
    };

    const updateItemStatus = (itemId, status) => {
        Item.updateById(itemId, {status}).then((data) => {
            if (data.length === 1) {
                updateStateWithNewItem(itemId, data);
            }
        });
    };

    const cancelEditMode = () => {
        setEditItem(null);
    };

    const handleItemAfterEdit = (item, update) => {
        const {id, title, total} = editItem;
        // Only update if data changed and user wants to save
        if (!update || item.title === title && item.total === total) {
            cancelEditMode();
            return;
        }
        Item.updateById(id, {title, total}).then((data) => {
            if (data.length === 1) {
                updateStateWithNewItem(id, data);
                cancelEditMode();
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

    const onChangeValue = (itemId, key, value) => {
        switch (key) {
            case 'status':
                updateItemStatus(
                    itemId,
                    value ? ITEM_STATUS_CHECKED : ITEM_STATUS_UNCHECKED
                )
                break;
            default:
                setEditItem(StateUtil.produceObject(editItem, key, value));
                break;
        }
    };

    const itemBeingEdited = (itemId) => {
        return editItem?.id === itemId;
    };

    const toggleEditMode = (item, update) => {
        if (itemBeingEdited(item.id)) {
            handleItemAfterEdit(item, update);
        } else {
            setEditItem(item);
        }
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
                        const isEditMode = itemBeingEdited(item.id);
                        const itemToEdit = isEditMode ? editItem : item;
                        return (
                            <ItemCard
                                key={item.id}
                                item={itemToEdit}
                                isEditMode={isEditMode}
                                toggleEditMode={(update) => toggleEditMode(item, update)}
                                onChangeValue={(key, value) => onChangeValue(item.id, key, value)}
                                onDelete={() => deleteItem(item.id)}
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
                    onClick={() => navigate(Routes.ITEM_ADD.replace(':listId', id))}
                />
            </Position>
        </DefaultLayout>
    );
};

export default ListEdit;
