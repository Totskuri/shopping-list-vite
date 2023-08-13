import {supabase} from './client';
import ToastUtil from '../utils/ToastUtil';
import DataUtil from '../utils/DataUtil';

export default class ApiCall {
    static async select(from, columns, order, ascending = false) {
        const {data, error} = await supabase
            .from(from)
            .select(columns)
            .order(order, {ascending});

        this.handleError(error);

        return data;
    }

    static async generateSelectSingle(from, columns) {
        return supabase
            .from(from)
            .select(columns)
            .maybeSingle();
    }

    static generateInsertSingle(from, insert, columns) {
        return supabase
            .from(from)
            .insert(insert)
            .select(columns)
            .throwOnError()
            .maybeSingle();
    }

    static generateUpdateByIdSingle(from, update, id, columns) {
        return supabase
            .from(from)
            .update(update)
            .eq('id', id)
            .select(columns)
            .throwOnError()
            .maybeSingle();
    }

    static async selectById(from, id, columns) {
        const {data, error} = await supabase
            .from(from)
            .select(columns)
            .eq('id', id)
            .limit(1);

        this.handleError(error);

        if (data.length > 0) {
            return data[0];
        }

        return [];
    }

    static async selectByColumn(from, columns, column, value, order, ascending = false) {
        const {data, error} = await supabase
            .from(from)
            .select(columns)
            .eq(column, value)
            .order(order, {ascending});

        this.handleError(error);

        return data;
    }

    static async insert(from, insert, columns) {
        const {data, error} = await supabase
            .from(from)
            .insert(insert)
            .select(columns);

        this.handleError(error);

        return data;
    }

    static async updateById(from, update, id, columns) {
        const {data, error} = await supabase
            .from(from)
            .update(update)
            .eq('id', id)
            .select(columns);

        this.handleError(error);

        return data;
    }

    static async deleteById(from, id) {
        const {error} = await supabase
            .from(from)
            .delete()
            .eq('id', id);

        this.handleError(error);

        return DataUtil.isEmpty(error);
    }

    static handleError = (error) => {
        if (!DataUtil.isEmpty(error)) {
            console.error(error);
            if (!DataUtil.isEmpty(error.message)) {
                ToastUtil.error(error.message);
            }
        }
    };
};

