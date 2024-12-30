export = Batch;
declare function Batch($client: any, config: any): void;
declare class Batch {
    constructor($client: any, config: any);
    events: any;
    describeTables: any;
    return_explain: any;
    local_events: {};
    client: any;
    current_table: any;
    err: {
        code: string;
        message: string;
    } | {
        code: string;
        message: string;
    } | {
        code: string;
        message: string;
    } | {
        code: string;
        message: string;
    } | {
        code: string;
        message: string;
    } | {
        code: string;
        message: string;
    } | {
        code: string;
        message: string;
    };
    payload: {
        RequestItems: {};
    };
    routeCall(method: any, params: any, reset: any, callback: any): void;
    resume(): void;
    table(tbl_name: any): this;
    item(): void;
    count(): any;
    put(item: any): this;
    delete(item: any): this;
    del: any;
    get(item: any): this;
    consistent_read($value: any): this;
    read(cb: any): any;
    write(cb: any): any;
}
//# sourceMappingURL=batch.d.ts.map