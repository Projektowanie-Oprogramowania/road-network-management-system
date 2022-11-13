import React, { createContext, useState } from 'react';

const initialState = {
    message: '',
    visible: false,
};

const AlertContext = createContext({
    ...initialState,
    closeAlert: () => {},
    setAlert: (s: string | undefined) => {},
});

export const AlertProvider: React.FunctionComponent<
    React.PropsWithChildren
> = ({ children }) => {
    const [visible, setVisibility] = useState(false);
    const [message, setMessage] = useState('');

    const setAlert = (m?: string) => {
        if (m) {
            setMessage(m);
            setVisibility(true);
        }
    };

    const closeAlert = () => {
        setMessage('');
        setVisibility(false);
    };

    return (
        <AlertContext.Provider
            value={{
                visible,
                message,
                setAlert,
                closeAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
