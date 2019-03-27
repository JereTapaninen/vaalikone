import {createStore} from "redux";
// @ts-ignore
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default store;
