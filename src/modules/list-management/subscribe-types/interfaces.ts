export interface ISubscribeTypeMethod {
    (
        dispatchValue: any,
        keys: boolean | null,
        state: {
            [key: string]: any
        },
        objectProp: string
    ): any[] | null
}