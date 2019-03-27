import {
    ActionType,
    StartedState
} from "./constants";
import {
    Action
} from "./actions";

const initialState = {
    startedState: StartedState.No,
    city: ""
};

function rootReducer(state = initialState, action: Action) {
    const actionToStateMap = {
        [ActionType.SetStartedState]: () => ({
            ...state,
            startedState: action.payload
        }),
        [ActionType.SetCity]: () => ({
            ...state,
            city: action.payload
        })
    };

    return actionToStateMap[action.type] ?
        actionToStateMap[action.type]() :
        state;
};

export default rootReducer;
