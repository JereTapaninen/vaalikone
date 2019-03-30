export interface MainProps {
    navigate: (arg: string, arg2: object) => void
}

export interface VaalikoneDispatchProps {
    navigate: (arg: string, arg2: object) => void
}

export type VaalikoneProps = VaalikoneDispatchProps & {
    location: {
        state: object
    }
};

export interface ResultsDispatchProps {
    navigate: (arg: string, arg2: object) => void
}

export type ResultsProps = ResultsDispatchProps & {
    location: {
        state: object
    }
};

export interface SelectionButtonProps {
    optionId: number,
    selectOption: (arg: number) => void,
    defaultSelected: boolean
}
