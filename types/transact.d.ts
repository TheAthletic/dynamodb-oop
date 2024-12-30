export = Transact;
declare function Transact($client: any, config: any): void;
declare class Transact {
    constructor($client: any, config: any);
    err: {
        errorMessage: string;
    } | {
        errorMessage: string;
    } | {
        errorMessage: string;
    };
    TransactItems: any[];
    events: any;
    describeTables: any;
    return_explain: any;
    local_events: {};
    client: any;
    reset(): void;
    pending: {
        if: any;
        ExpressionAttributeNames: {};
        ExpressionAttributeValues: {};
        ConditionExpression: any[];
    };
    table($tableName: any): this;
    debug(): this;
    where(key: any): this;
    eq(value: any): this;
    _namefy(name: any, prefix: any): any;
    _valuefy(name: any, prefix: any, value: any): any;
    if(attr: any): this;
    not(): this;
    exists(value: any): this;
    ne(value: any): this;
    ge(value: any): this;
    gt(value: any): this;
    le(value: any): this;
    lt(value: any): this;
    between(v1: any, v2: any): this;
    in(value: any): this;
    contains(value: any): this;
    begins_with(value: any): this;
    insert(item: any): this;
    insert_or_replace(item: any): this;
    replace(item: any): this;
    insert_or_update(item: any): this;
    update(item: any): this;
    delete(callback: any): this;
    write(callback: any): any;
    routeCall(method: any, params: any, reset: any, callback: any): void;
}
//# sourceMappingURL=transact.d.ts.map