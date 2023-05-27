import React, {useEffect, useMemo, useState} from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import CreateButton from '../components/Button/CreateButton';
import Position from '../components/Position/Position';
import NavAndSearch from '../components/NavAndSearch/NavAndSearch';
import Routes from '../constants/routes';
import List from '../supabase/models/list';
import Placeholder from './layouts/Placeholder';
import CardList from '../components/Card/CardList';
import {useNavigate} from 'react-router-dom';
import ListCard from "../components/Card/ListCard/ListCard.jsx";
import StateUtil from "../utils/StateUtil.js";
import Item from "../supabase/models/item.js";
import SortUtil from "../utils/SortUtil.js";

const Index = () => {
    const navigate = useNavigate();
    const [isInitializing, setIsInitializing] = useState(true);
    const [lists, setLists] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [editList, setEditList] = useState(null);

    const fetchLists = () => {
        List.select().then((lists) => {
            setLists(lists);
        }).finally(() => setIsInitializing(false));
    };

    const deleteList = (listId) => {
        List.deleteById(listId).then((success) => {
            if (success) {
                setLists(StateUtil.removeFromArrayById(listId, lists));
            }
        });
    };

    const cancelEditMode = () => {
        setEditList(null);
    };

    const handleListAfterEdit = (list, update) => {
        const {id, title} = editList;
        // Only update if data changed and user wants to save
        if (!update || list.title === title) {
            cancelEditMode();
            return;
        }
        List.updateById(id, {title}).then((data) => {
            if (data.length === 1) {
                setLists(StateUtil.updateArrayItemById(id, lists, data[0]));
                cancelEditMode();
            }
        });
    };

    const listBeingEdited = (listId) => {
        return editList?.id === listId;
    };

    const toggleEditMode = (list, update) => {
        if (listBeingEdited(list.id)) {
            handleListAfterEdit(list, update);
        } else {
            setEditList(list);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    const filteredLists = useMemo(() => {
        return lists.filter((list) => list.title.includes(searchInput));
    }, [lists, searchInput]);

    return (
        <DefaultLayout>
            <NavAndSearch
                searchValue={searchInput}
                searchOnChange={(val) => setSearchInput(val)}
            />
            {isInitializing && <Placeholder />}
            {!isInitializing && (
                <CardList>
                    {filteredLists.map((list) => {
                        const isEditMode = listBeingEdited(list.id);
                        const listToEdit = isEditMode ? editList : list;
                        return (
                            <ListCard
                                key={list.id}
                                list={listToEdit}
                                isEditMode={isEditMode}
                                toggleEditMode={(update) => toggleEditMode(list, update)}
                                onChangeValue={
                                    (val) => setEditList(StateUtil.produceObject(editList, 'title', val))
                                }
                                onDelete={() => deleteList(list.id)}
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
                    text="New list"
                    onClick={() => navigate(Routes.LIST_CREATE)}
                />
            </Position>
        </DefaultLayout>
    );
};

export default Index;
