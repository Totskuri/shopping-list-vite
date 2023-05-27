import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import routes from './constants/routes';
import Index from './views/Index';
import SignOut from './views/SignOut';
import ListCreate from './views/list/create/ListCreate';
import ListEdit from './views/list/edit/ListEdit';
import ItemAdd from './views/item/add/ItemAdd';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact path={routes.INDEX}
                    element={<Index />}
                />
                <Route
                    exact path={routes.SIGN_OUT}
                    element={<SignOut />}
                />
                <Route
                    exact path={routes.LIST_CREATE}
                    element={<ListCreate />}
                />
                <Route
                    exact path={routes.LIST_EDIT}
                    element={<ListEdit />}
                />
                <Route
                    exact path={routes.ITEM_ADD}
                    element={<ItemAdd />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
