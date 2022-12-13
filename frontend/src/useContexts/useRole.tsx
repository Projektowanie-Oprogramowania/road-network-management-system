import React, { createContext, useContext, useState } from 'react';

const initialState = {
    role: 'user',
};

const RoleContext = createContext({
    ...initialState,
    changeRole: (s: string) => {},
});

export const RoleProvider: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
}) => {
    const [role, setRole] = useState('user');

    const changeRole = (m?: string) => {
        if (m) {
            setRole(m);
        }
    };

    return (
        <RoleContext.Provider
            value={{
                role,
                changeRole,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};

export default RoleContext;

const useRole = () => useContext(RoleContext);

export { useRole };
