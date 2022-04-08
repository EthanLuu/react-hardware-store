import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { User } from "../pages/api/user/login";

const AccountContext = createContext(null);

export const AccountContextWrapper = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        setIsAdmin(user?.roleNumber === 9);
    }, [user]);

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem("dx-token", user.token);
        api.defaults.headers.common["Authorization"] = user.token;
    };

    return (
        <AccountContext.Provider value={{ user, login, isAdmin }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccountContext = () => {
    return useContext(AccountContext);
};
