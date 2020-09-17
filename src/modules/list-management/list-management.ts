/*
   Middleware module for handling lists
*/

import { prependStateItem, appendStateItem } from './subscribe-types';
interface IListManagement {
    (
        dispatchValue: any,
        storeItem: {
            state: {
                [key: string]: any;
            },
            features?: {
                keys?: boolean
            }
        },
        state: {
            [key: string]: any
        },
        action: {
            options?: {
                limit?: number
            },
            orderType?: 'asc' | 'desc',
            subscribeType: 'append' | 'prepend' | 'remove' | 'orderBy' | 'edit' | 'removeBatch' | 'update'
        }
    ): any
}

const listManagement: IListManagement = (dispatchValue, storeItem, state, action) => {
    let objectProp = Object.keys(storeItem.state)[0];
    let orderType = action?.orderType;
    let subscribeType = action.subscribeType;
    let keys = storeItem?.features?.keys || null;
    let subcribeTypeMethods = {
        prepend: () => prependStateItem(dispatchValue, keys, state, objectProp),
        append: () => appendStateItem(dispatchValue, keys, state, objectProp),
        remove: () => null,
        removeBatch: () => null,
        orderBy: () => null,
        edit: () => null
    }

    if (subscribeType !== 'update') {
        return subcribeTypeMethods[subscribeType];
    }
    return dispatchValue;


    //append state to list array
    // if (subscribeType === 'append') {

    //     //creates new array with prepended state. If features.keys is set to true will create a static key for each
    //     let appendedStateArray = (keys) ? generateStaticKeys([...state[objectProp], dispatchValue], keys) : [dispatchValue, ...state[objectProp]];

    //     return appendedStateArray;
    // }
    //remove item from array and return new array
    // if (subscribeType === 'remove') {
    //     let filteredStateArray = state[objectProp].filter((item: any) => { return item !== dispatchValue });
    //     return filteredStateArray;
    // }

    //remove batch items from array and return new array
    // if (subscribeType === 'removeBatch') {
    //     let filteredStateArray = state[objectProp].filter((item: any) => {
    //         if (!(dispatchValue.includes(item))) {
    //             return item
    //         }
    //     });
    //     return filteredStateArray;
    // }

    //order items from array and return new array
    // - for some reason orderBy change will not trigger useEffect, need to look into this...
    // if (subscribeType === 'orderBy') {
    //     let currentState = [...state[objectProp]];
    //     if (orderType === 'asc') {
    //         //if dispatch value is null it will evaluate as a string array
    //         let orderedStateArray = (dispatchValue !== null) ? currentState.sort(
    //             (a: any, b: any) => a[dispatchValue].toString().localeCompare(b[dispatchValue].toString(), undefined, { numeric: true })
    //         ) : currentState.sort((a: any, b: any) => a.toString().localeCompare(b.toString(), undefined, { numeric: true }));
    //         return orderedStateArray;
    //     }
    //     else if (orderType === 'desc') {
    //         //if dispatch value is null it will evaluate as a string array
    //         let orderedStateArray = (dispatchValue !== null) ? currentState.sort(
    //             (a: any, b: any) => b[dispatchValue].toString().localeCompare(a[dispatchValue].toString(), undefined, { numeric: true })
    //         ) : currentState.sort((a: any, b: any) => b.toString().localeCompare(a.toString(), undefined, { numeric: true }));
    //         return orderedStateArray;
    //     }
    // }

    //targets Store item property and allows for property value to be changed and then returns edited Store List
    // if (subscribeType === 'edit') {
    //     let currentState = [...state[objectProp]];
    //     let editedState = currentState?.map((item) => {
    //         if (dispatchValue.trebleKey === item.trebleKey) {
    //             return dispatchValue;
    //         }
    //         return item;
    //     })
    //     return editedState;
    // }

    // return dispatchValue;
}
export default listManagement;