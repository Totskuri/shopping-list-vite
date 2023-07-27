import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import routes from './constants/routes';
import Index from './views/Index';
import SignOut from './views/SignOut';
import ListEdit from './views/list/edit/ListEdit';

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
                    exact path={routes.LIST_EDIT}
                    element={<ListEdit />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
