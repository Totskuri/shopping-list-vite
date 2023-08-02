import React, {useEffect, useMemo, useState} from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import CreateButton from '../components/Button/CreateButton';
import Position from '../components/Position/Position';
import NavAndSearch from '../components/NavAndSearch/NavAndSearch';
import List from '../supabase/models/list';
import Placeholder from '../layouts/Placeholder';
import CardList from '../components/Card/CardList';
import ListCard from "../components/Card/ListCard/ListCard.jsx";
import StateUtil from "../utils/StateUtil.js";
import ListEditDrawer from "../components/Drawer/ListEditDrawer.jsx";

const Index = () => {
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
                <CardList flipKey={JSON.stringify(filteredLists)}>
                    {filteredLists.map((list) => {
                        return (
                            <ListCard
                                key={list.id}
                                isEditMode={list.id === editList?.id}
                                list={list}
                                toggleEditMode={() => setEditList(list)}
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
                    onClick={() => setEditList(List.getEmptyList())}
                />
            </Position>
            <ListEditDrawer
                list={editList}
                onChange={(data) => {
                    const found = lists.find((list) => list.id === data?.id);
                    if (found) {
                        setLists(StateUtil.updateArrayItemById(data?.id, lists, data));
                    } else {
                        setLists(StateUtil.addToArrayByIndex(lists, data));
                    }
                }}
                handleClose={() => setEditList(null)}
            />
        </DefaultLayout>
    );
};

export default Index;
