import { createStore } from "redux";
import TestReducer from "./reducers";
import { TestFunction } from "./actions";

const store = createStore(TestReducer);

export default store;
