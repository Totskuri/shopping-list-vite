import React, {useState} from 'react';
import Padding from '../../../components/Padding/Padding';
import Grid from '../../../components/Grid/Grid';
import CancelButton from '../../../components/Button/CancelButton';
import ConfirmButton from '../../../components/Button/ConfirmButton';
import Routes from '../../../constants/routes';
import List from '../../../supabase/models/list';
import DefaultLayout from '../../layouts/DefaultLayout';
import ToastUtil from '../../../utils/ToastUtil';
import {useNavigate} from 'react-router-dom';
import DataUtil from '../../../utils/DataUtil';
import {Label} from 'tyylisivu-components';
import TitleInput from "../../../components/Input/TitleInput.jsx";

const ListCreate = () => {
    const navigate = useNavigate();
    const [actionInProgress, setActionInProgress] = useState(false);
    const [title, setTitle] = useState('');

    const validate = (newTitle) => {
        if (DataUtil.isEmpty(newTitle)) {
            ToastUtil.error('Title is required');
            return false;
        }
        return true;
    };

    const createList = () => {
        const newTitle = title.trim();
        if (validate(newTitle)) {
            setActionInProgress(true);
            List.insert(newTitle).then((data) => {
                if (!DataUtil.isEmpty(data) && Array.isArray(data) && data.length === 1 && !DataUtil.isEmpty(data[0]['id'])) {
                    navigate(Routes.INDEX);
                }
            }).finally(() => {
                setActionInProgress(false);
            });
        }
    };

    return (
        <DefaultLayout
            center
        >
            <Padding>
                <Label text='Title'>
                    <TitleInput
                        value={title}
                        onChange={(val) => setTitle(val)}
                        autoFocus
                    />
                </Label>
                <Grid
                    gridTemplateColumns="repeat(2, 1fr)"
                    columnGap="20px"
                    padding="20px 0"
                >
                    <CancelButton
                        onClick={() => navigate(Routes.INDEX)}
                        disabled={actionInProgress}
                    />
                    <ConfirmButton
                        onClick={createList}
                        disabled={actionInProgress}
                        isLoading={actionInProgress}
                    />
                </Grid>
            </Padding>
        </DefaultLayout>
    );
};

export default ListCreate;
