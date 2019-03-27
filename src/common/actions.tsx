import {
    ActionType
} from "./constants";

export interface Action {
    type: string,
    payload: any
}

export const actionSetStartedState = (payload: string): Action => ({
    type: ActionType.SetStartedState,
    payload
});

export const actionSetCity = (payload: string): Action => ({
    type: ActionType.SetCity,
    payload
});

const actions = {
    [ActionType.SetStartedState]: actionSetStartedState,
    [ActionType.SetCity]: actionSetCity
};

export default actions;
