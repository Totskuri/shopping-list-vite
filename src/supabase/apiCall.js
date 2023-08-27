import {supabase} from './client';

export default class ApiCall {
    static async generateSelect(from, columns, order, ascending = false) {
        return supabase
            .from(from)
            .select(columns)
            .order(order, {ascending})
            .throwOnError();
    }

    static async generateSelectSingle(from, columns) {
        return supabase
            .from(from)
            .select(columns)
            .maybeSingle();
    }

    static generateInsert(from, insert) {
        return supabase
            .from(from)
            .insert(insert)
            .throwOnError();
    }

    static generateUpdateById(from, update, id) {
        return supabase
            .from(from)
            .update(update)
            .eq('id', id)
            .throwOnError();
    }

    static generateDeleteById(from, id)
    {
        return supabase
            .from(from)
            .delete()
            .eq('id', id)
            .throwOnError();
    }

    static async generateSelectById(from, id, columns) {
        return supabase
            .from(from)
            .select(columns)
            .eq('id', id)
            .single();
    }

    static async generateSelectByColumn(from, columns, column, value, order, ascending = false) {
        return supabase
            .from(from)
            .select(columns)
            .eq(column, value)
            .order(order, {ascending})
            .throwOnError();
    }
};

