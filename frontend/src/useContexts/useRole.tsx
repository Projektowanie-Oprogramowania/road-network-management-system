import React, { createContext, useContext, useState } from 'react';

const initialState = {
    role: 'user',
    userId: 'user',
};

const RoleContext = createContext({
    ...initialState,
    changeRole: (s: string) => {},
    changeUser: (s: string) => {},
});

export const RoleProvider: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
}) => {
    const [role, setRole] = useState('user');
    const [userId, setUserId] = useState('user');

    const changeRole = (m?: string) => {
        if (m) {
            setRole(m);
        }
    };

    const changeUser = (m?: string) => {
        if (m) {
            setUserId(m);
        }
    };

    return (
        <RoleContext.Provider
            value={{
                role,
                userId,
                changeRole,
                changeUser,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};

export default RoleContext;

const useRole = () => useContext(RoleContext);

export { useRole };
