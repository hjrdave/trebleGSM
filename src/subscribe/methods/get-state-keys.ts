
interface IGetStateKeys{
    (
        store?: any
    ): string[]
}

const getStateKeys: IGetStateKeys = (store) => {
    let stateKeyArray = store?.map((storeItem: {state: string}) => {
        return Object.keys(storeItem.state)[0]
    });
   return stateKeyArray;
   
}

export default getStateKeys;