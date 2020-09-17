/*
    appends dispatched state to state array
*/
import { generateStaticKeys } from '../../../middleware';

interface IAppendStateItem {
    (
        dispatchValue: any,
        keys: boolean | null,
        state: {
            [key: string]: any
        },
        objectProp: string
    ): any[] | null
}

const appendStateItem: IAppendStateItem = (dispatchValue, keys, state, objectProp) => {
    //creates new array with prepended state. If features.keys is set to true will create a static key for each
    let appendedStateArray = (keys) ? generateStaticKeys([...state[objectProp], dispatchValue], keys) : [dispatchValue, ...state[objectProp]];

    return appendedStateArray;
}

export default appendStateItem;