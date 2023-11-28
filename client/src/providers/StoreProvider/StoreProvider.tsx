import { ReactNode } from 'react';
import { createReduxStore } from "./config/store.ts";
import { Provider } from "react-redux";

interface StoreProviderProps {
    children?: ReactNode;
}

export const StoreProvider = ({children}: StoreProviderProps) => {
    const store = createReduxStore();

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}