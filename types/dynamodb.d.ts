export = DynamodbFactory;
declare function DynamodbFactory(dynamoDbClient: any): DynamoDB;
declare namespace DynamodbFactory {
    export { util, config, createDynamoOopClient, DynamoDB as DynamoOopClient, Request, DynamoDB, TableSchema };
}
declare function DynamoDB($client: any): void;
declare class DynamoDB {
    constructor($client: any);
    events: {
        error: () => void;
        beforeRequest: () => void;
    };
    describeTables: {};
    return_explain: boolean;
    client: any;
    SS(data: any): any;
    stringSet: any;
    BS(data: any): any;
    binarySet: any;
    N(data: any): any;
    number: any;
    S(data: any): any;
    string: any;
    NS(data: any): any;
    numberSet: any;
    L(data: any): any;
    list: any;
    add(data: any, datatype: any): any;
    /**
     * @param {unknown} [data]
     * @param {unknown} [datatype]
     * @returns
     */
    del(data?: unknown, datatype?: unknown, ...args: any[]): any;
    addTableSchema($schema: any): void;
    /**
     * @typedef {{
     *   TableName: string,
     *   KeySchema: {
     *     AttributeName: string,
     *     KeyType: string,
     *   }[]
     * }} TableSchema
     *
     * @param {TableSchema | TableSchema[]} $schemas
     * @returns {DynamoDB} this
     */
    schema($schemas: TableSchema | TableSchema[]): DynamoDB;
    explain(): this;
    table($tableName: any): Request;
    query(...args: any[]): any;
    batch(): Batch;
    transact(): Transact;
    getClient(): any;
    on(event: any, handler: any): void;
    ALL: number;
    ALL_ATTRIBUTES: number;
    PROJECTED: number;
    ALL_PROJECTED_ATTRIBUTES: number;
    COUNT: number;
    NONE: string;
    ALL_OLD: string;
    UPDATED_OLD: string;
    ALL_NEW: string;
    UPDATED_NEW: string;
    TOTAL: string;
    INDEXES: string;
}
declare namespace DynamoDB {
    class Raw {
        private constructor();
        getRawData(): any;
    }
}
declare var util: any;
declare function config(o: any): void;
declare function createDynamoOopClient(dynamoDbClient: any): DynamoDB;
declare function Request($client: any, config: any): void;
declare class Request {
    constructor($client: any, config: any);
    events: any;
    describeTables: any;
    return_explain: any;
    local_events: {};
    client: any;
    reset(): void;
    Select: string;
    AttributesToGet: any[];
    ProjectionExpression: any;
    ExpressionAttributeNames: any;
    ExpressionAttributeValues: any;
    FilterExpression: any;
    pendingKey: string;
    pendingFilter: any;
    pendingIf: any;
    whereKey: {};
    KeyConditionExpression: any;
    whereOther: {};
    whereFilter: {};
    whereFilterExpression: any[];
    ifFilter: {};
    ifConditionExpression: any[];
    ConditionExpression: any;
    limit_value: any;
    IndexName: any;
    ScanIndexForward: any;
    LastEvaluatedKey: any;
    ExclusiveStartKey: any;
    ConsistentRead: any;
    ReturnConsumedCapacity: any;
    ReturnValues: any;
    routeCall(method: any, params: any, reset: any, callback: any): void;
    describeTable(table: any, callback: any): any;
    describe(callback: any): void;
    table($tableName: any): this;
    tableName: any;
    on(eventName: any, callback: any): this;
    select(...args: any[]): this;
    return(rv: any): this;
    addSelect($field: any): this;
    consistentRead($value: any): this;
    consistent_read: any;
    return_consumed_capacity($value: any): this;
    descending(): this;
    desc: any;
    index($IndexName: any): this;
    order_by: any;
    /**
     * @param {string} $key
     * @param {unknown} [$value1] value or operator
     * @param {unknown} [$value2] value
     * @returns {Request} this
     */
    where($key: string, $value1?: unknown, $value2?: unknown): Request;
    /**
     * @param {object} item
     * @param {unknown} [callback]
     * @returns {Promise}
     */
    insert(item: object, callback?: unknown): Promise<any>;
    /**
     * remember that replace should fail if item does not exist
     * @param {object} item
     * @param {unknown} [callback]
     * @returns {Promise}
     */
    replace(item: object, callback?: unknown): Promise<any>;
    /**
     * @param {object} $attrz
     * @param {unknown} [callback]
     * @param {unknown} [$action]
     * @returns {Promise}
     */
    update($attrz: object, callback?: unknown, $action?: unknown): Promise<any>;
    /**
     * @param {object} params
     * @param {unknown} [callback]
     * @param {unknown} [$action]
     * @returns {Promise}
     */
    insert_or_update(params: object, callback?: unknown, $action?: unknown): Promise<any>;
    /**
     * @param {object} item
     * @param {unknown} [callback]
     * @returns {Promise}
     */
    insert_or_replace(item: object, callback?: unknown): Promise<any>;
    /**
     * @param {unknown} [$attrz]
     * @param {unknown} [callback]
     * @returns {Promise}
     */
    delete($attrz?: unknown, callback?: unknown, ...args: any[]): Promise<any>;
    /**
     * @param {unknown} [callback]
     * @returns {Promise}
     */
    get(callback?: unknown): Promise<any>;
    /**
     * @param {unknown} [callback]
     * @returns {Promise}
     */
    query(callback?: unknown): Promise<any>;
    /**
     * @param {unknown} [callback]
     * @returns {Promise}
     */
    scan(callback?: unknown): Promise<any>;
    sql(sql: any, callback: any): any;
    resume(from: any): this;
    compare($comparison: any, $value: any, $value2: any): this;
    filter($key: any): this;
    having: any;
    if($key: any): this;
    limit($limit: any): this;
    /**
     * comparison functions
     *
     * @param {unknown} $value
     * @returns {Request} this
     */
    eq($value: unknown): Request;
    le($value: any): this;
    lt($value: any): this;
    ge($value: any): this;
    gt($value: any): this;
    begins_with($value: any): this;
    between($value1: any, $value2: any): this;
    ne($value: any): this;
    not_null(): this;
    defined: any;
    null($value: any): this;
    undefined: any;
    contains($value: any): this;
    not_contains($value: any): this;
    in($value: any): this;
    exists(): this;
    not_exists(): this;
    registerExpressionAttributeName(item: any, ALLOW_DOT: any): any;
    registerExpressionAttributeValue(original_attName: any, value: any): string;
    buildProjectionExpression(): void;
    buildKeyConditionExpression(idx: any): void;
    buildFilterExpression(idx: any): void;
    RawIndexName(value: any): this;
    RawScanIndexForward(value: any): this;
    RawLimit(value: any): this;
    RawConsistentRead(value: any): this;
    RawKeyConditionExpression(value: any): this;
    RawExpressionAttributeNames(value: any): this;
    RawExpressionAttributeValues(value: any): this;
    RawProjectionExpression(value: any): this;
    RawFilterExpression(value: any): this;
}
type TableSchema = {
    TableName: string;
    KeySchema: {
        AttributeName: string;
        KeyType: string;
    }[];
};
import Batch = require("./batch");
import Transact = require("./transact");
//# sourceMappingURL=dynamodb.d.ts.map