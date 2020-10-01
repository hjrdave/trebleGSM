/*
    Treble Provider Container
    Provider component that wraps around components that will consume global state.
*/

import React, { useMemo } from "react";
import Provider from "./provider";
import buildState from "./state";
import buildReducer from "./reducer";
import Context from "./context";
import { ITreble } from "./interfaces";

function Treble({ children, store }: ITreble) {
  //error handling
  try {
    if (typeof store !== "object") {
      throw new TypeError("TrebleGSM: Treble store prop must be an array.");
    }
  } catch (error) {
    throw error;
  }

  const //passed store
    Store = useMemo(() => store.data, [store.data]),
    //builds state from treble store
    State = buildState(Store),
    //builds reducer from treble store
    Reducer = buildReducer(Store),
    //the main context used by TrebleGSM
    defaultContext = Context,
    //optional passed scoped context (substitutes default context. Used for scoped Treble Providers)
    scopedContext = store?.scope;

  //TrebleGSM modules for extending
  //modules = store?.modules;

  return (
    <>
      {/**Treble Provider */}
      <Provider
        data={State}
        reducer={Reducer}
        store={Store}
        scope={scopedContext !== undefined ? scopedContext : defaultContext}
      >
        {children}
      </Provider>
    </>
  );
}

export default Treble;
