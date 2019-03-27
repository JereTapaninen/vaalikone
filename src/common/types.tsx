export interface AppStateProps {
    startedState: string
    city: string
}

export interface AppDispatchProps {
    setStartedState: (arg: string) => void,
    setCity: (city: string) => void
}

export type AppProps = AppStateProps & AppDispatchProps;

export interface MainProps {
    setStartedState: (arg: string) => void
}

export interface VaalikoneProps {
    setStartedState: (arg: string) => void
}
