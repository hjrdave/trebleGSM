/*
    Treble Hook
    Gives child components that call it access to store.
*/

import {useContext} from 'react';
import defaultContext from '../context';
import {IUseTreble, IUseTrebleSubscribe} from '../interfaces';

const useTrebleHook: IUseTreble = (context) => {

    try{
        if(context){
            if(typeof context !== 'object'){
                throw new TypeError('useTreble hook must only accept React.Context.')
            }
        }
    }catch(error){
        throw error
    }

    let trebleContext = (context !== undefined) ? context : defaultContext;

    return useContext(trebleContext);
};

const useTreble: IUseTrebleSubscribe<IUseTreble> = (context) => (useTrebleHook(context as any));

export default useTreble;


