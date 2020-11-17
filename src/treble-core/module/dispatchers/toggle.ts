import {TrebleGSM} from '../../../interfaces';
import {trebleError} from '../../../globals';
interface IToggle{
    (
        dispatch: (payload: TrebleGSM.DispatchPayload) => void,
        action: string,
        dispatchValue?: boolean,
        options?:{
            disableMiddleware?: boolean
        }
    ): void
}
const toggle:IToggle = (dispatch, action, dispatchValue, options) => {

    try{
        if(typeof action !== 'string'){
            throw TypeError('action prop must be a string');
        }
        if(dispatchValue !== undefined || typeof dispatchValue !== 'boolean'){
            throw TypeError('dispatchValue must be a boolean');
        }

        dispatch({
            type: action,
            [action]: dispatchValue,
            reducerAction: 'toggleState',
            options: {
                disableMiddleware: true
            }
        })

    }catch(error){
        console.error(`${trebleError} ${error}`);
    }
}

export default toggle;