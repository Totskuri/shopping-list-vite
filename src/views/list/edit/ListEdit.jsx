import React, {useState} from 'react';
import DefaultLayout from '../../../layouts/DefaultLayout';
import {useParams} from 'react-router-dom';
import Item, {ITEM_STATUS_CHECKED, ITEM_STATUS_UNCHECKED} from '../../../supabase/models/item';
import CreateButton from '../../../components/Button/CreateButton';
import Position from '../../../components/Position/Position';
import NotFound from '../../../layouts/NotFound';
import ItemCard from '../../../components/Card/ItemCard/ItemCard.jsx';
import CardList from '../../../components/Card/CardList';
import Placeholder from '../../../layouts/Placeholder.jsx';
import ItemEditDrawer from '../../../components/Drawer/ItemEditDrawer.jsx';
import useTranslation from '../../../hooks/useTranslation.jsx';
import useListQuery from '../../../hooks/list/useListQuery.jsx';
import useItemQuery from '../../../hooks/item/useItemQuery.jsx';
import InternalError from '../../../layouts/InternalError.jsx';
import useItemDeleteById from '../../../hooks/item/useItemDeleteById.jsx';
import useItemInsertOrUpdateById from '../../../hooks/item/useInsertOrUpdateById.jsx';
import Routes from '../../../constants/routes.js';
import TitleBar from '../../../components/TitleBar/TitleBar.jsx';
import styles from './ListEdit.module.scss';

const ListEdit = () => {
    const t = useTranslation();
    const {id} = useParams();
    const {isLoading: isLoadingLists, isError: isErrorLists, data: list} = useListQuery(id);
    const {isLoading: isLoadingItems, isError: isErrorItems, data: items} = useItemQuery(id);
    const {mutate: deleteItem} = useItemDeleteById();
    const {mutate: updateItem} = useItemInsertOrUpdateById();
    const [editItem, setEditItem] = useState(null);

    const updateItemStatus = (itemId, val) => {
        const status = val ? ITEM_STATUS_CHECKED : ITEM_STATUS_UNCHECKED;
        updateItem({id: itemId, status});
    };

    if (isLoadingLists || isLoadingItems) {
        return <Placeholder />;
    }

    if (isErrorLists || isErrorItems) {
        return <InternalError />;
    }

    if (!list) {
        return <NotFound text="List not found" />;
    }

    return (
        <DefaultLayout>
            <TitleBar
                backUrl={Routes.INDEX}
            >
                <h1 className={styles.title}>
                    {list?.title}
                </h1>
            </TitleBar>
            <CardList flipKey={JSON.stringify(items)}>
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
            <Position
                right={40}
                bottom={30}
            >
                <CreateButton
                    text={t('Add item')}
                    onClick={() => setEditItem(Item.getEmptyItem(list.id))}
                />
            </Position>
            {editItem && (
                <ItemEditDrawer
                    item={editItem}
                    handleClose={() => setEditItem(null)}
                />
            )}
        </DefaultLayout>
    );
};

export default ListEdit;
