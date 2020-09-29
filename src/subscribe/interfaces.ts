
export interface ISubscribeAPI {

    update: (
        action: string,
        dispatchValue: any,
        options?: {
            disableMiddleware?: boolean
        }
    ) => void,

    toggle: (
        action: string,
        toggleValue: boolean,
        options?: {
            disableMiddleware?: boolean
        }
    ) => void,

    reset: (
        action: string,
        dispatch?: any
    ) => void,

    getActions: (store: any) => string[],

    getStateKeys: (store: any) => string[],

    dispatch: any
}

export interface ICreateSubscribeAPI {
    (
        dispatch: any,
        store: any
    ): ISubscribeAPI
}