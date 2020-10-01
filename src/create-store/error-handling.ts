/*
    error handling for createStore function
*/
import { IErrorHandling } from './interfaces';

const errorHandling: IErrorHandling = (storeData) => {

    //features prop list so error handling can make sure features prop exists
    const featuresList = ['call', 'check', 'process', 'callback'];

    //Iterates through each Store object and checks for errors
    storeData.forEach((storeItem, index) => {

        try {
            /* action prop */

            //check type
            if (typeof storeItem.action !== 'string' && storeItem.action !== undefined) {
                throw new TypeError(`Store[${index}].action must be a string.`)
            };

            //check if prop exists
            if (!storeItem.action) {
                throw new Error(`Store[${index}].action does not exist.`)
            };

            /* state prop */

            //make sure state is an object
            if (typeof storeItem.state !== 'object' && storeItem.state !== undefined) {
                throw new TypeError(`Store[${index}].state must be an object.`)
            };

            //check if prop exists
            if (!storeItem.state) {
                throw new Error(`Store[${index}].state does not exist.`)
            };

            //check if state has multiple props
            if (Object.keys(storeItem.state).length > 1 && typeof storeItem.state === 'object') {
                throw new Error(`Store[${index}].state can only have one property.`);
            }

            //sees if state object is empty
            if (!(Object.keys(storeItem.state).length > 0) && typeof storeItem.state === 'object') {
                throw new Error(`Store[${index}].state must have one property.`);
            }

            /* features prop */
            if (storeItem.features !== undefined) {

                //check type
                if (typeof storeItem.features !== 'object') {
                    throw new TypeError(`Store[${index}].features must be an object. `);
                }

                //makes sure props are legitimate
                Object.keys(storeItem.features).forEach((feature) => {
                    if (featuresList.includes(feature) !== true) {
                        throw new Error(`Store[${index}].features property ${feature} is not a valid property.`);
                    }
                });

                //checks property call type
                if (typeof storeItem.features.call !== 'function' && storeItem.features.call !== undefined) {
                    throw new TypeError(`Store[${index}].call must be a function.`);
                }

                //checks property check
                if (typeof storeItem.features.check !== 'function' && storeItem.features.check !== undefined) {
                    throw new TypeError(`Store[${index}].features.check must be a function.`);
                }

                //checks property process
                if (typeof storeItem.features.process !== 'function' && storeItem.features.process !== undefined) {
                    throw new TypeError(`Store[${index}].features.process must be a function.`);
                }
            }

        } catch (error) {
            throw error;
        }
    });


}

export default errorHandling;