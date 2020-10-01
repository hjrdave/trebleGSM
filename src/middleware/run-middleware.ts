/*
    Runs Middleware 
    Note: Middleware functions run before state gets to Reducer.
*/
import checkDispatchValue from './check-dispatch-value';
import runSideEffect from './run-side-effect';
import { IMiddleware } from '../interfaces';

const runMiddleware: IMiddleware = (dispatchValue, storeItem, state, action) => {

    //store features middleware
    let callMiddleware = storeItem?.features?.call || null;
    let checkMiddleware = storeItem?.features?.check || null;
    let processMiddleware = storeItem?.features?.process || null;
    let callbackMiddleware = storeItem?.features?.callback || null;

    //data that will be consumed by modules
    let moduleData = {
        dispatchValue: dispatchValue,
        storeItem: storeItem,
        dispatchActions: action
    }

    //checks state agianst criteria then returns boolean
    let doesDispatchValuePass = checkDispatchValue(dispatchValue, checkMiddleware)

    //calls a non-blocking function as soon as a value is dispatched to Store
    runSideEffect(dispatchValue, callMiddleware);

    //Makes sure state passes check and then will continue middleware pipeline and then return a value
    if (doesDispatchValuePass) {

        //returns a processed dispatchValue
        if (processMiddleware !== null) {

            //[need to run modules here]

            const processedDispatchValue = processMiddleware(dispatchValue);

            //runs callback if it exists with processedValue
            runSideEffect(processedDispatchValue, callbackMiddleware);

            return processedDispatchValue;
        }

        //[need to run modules here]

        //runs a non-blocking callback function as soon as other middleware runs
        runSideEffect(dispatchValue, callbackMiddleware);

        return dispatchValue
    }

    return null
}

export default runMiddleware;