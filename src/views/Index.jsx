import React, {useMemo, useState} from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import CreateButton from '../components/Button/CreateButton';
import Position from '../components/Position/Position';
import NavAndSearch from '../components/NavAndSearch/NavAndSearch';
import List from '../supabase/models/list';
import Placeholder from '../layouts/Placeholder';
import CardList from '../components/Card/CardList';
import ListCard from '../components/Card/ListCard/ListCard.jsx';
import ListEditDrawer from '../components/Drawer/ListEditDrawer.jsx';
import useTranslation from '../hooks/useTranslation.jsx';
import useListQuery from '../hooks/list/useListQuery.jsx';
import InternalError from '../layouts/InternalError.jsx';
import useListDeleteById from '../hooks/list/useListDeleteById.jsx';

const Index = () => {
    const t = useTranslation();
    const {isLoading, isError, data: lists} = useListQuery();
    const {mutate: deleteList} = useListDeleteById();
    const [searchInput, setSearchInput] = useState('');
    const [editList, setEditList] = useState(null);

    const filteredLists = useMemo(() => {
        if (!lists) {
            return [];
        }
        return lists.filter((list) => list.title.includes(searchInput));
    }, [lists, searchInput]);

    if (isLoading) {
        return <Placeholder />;
    }

    if (isError) {
        return <InternalError />;
    }

    return (
        <DefaultLayout>
            <NavAndSearch
                searchValue={searchInput}
                searchOnChange={(val) => setSearchInput(val)}
            />
            <CardList flipKey={JSON.stringify(filteredLists)}>
                {filteredLists.map((list) => {
                    return (
                        <ListCard
                            key={list.id}
                            list={list}
                            toggleEditMode={() => setEditList(list)}
                            onDelete={() => deleteList(list.id)}
                        />
                    );
                })}
            </CardList>
            <Position
                right={40}
                bottom={30}
            >
                <CreateButton
                    text={t('New list')}
                    onClick={() => setEditList(List.getEmptyList())}
                />
            </Position>
            {editList && (
                <ListEditDrawer
                    list={editList}
                    handleClose={() => setEditList(null)}
                />
            )}
        </DefaultLayout>
    );
};

export default Index;
