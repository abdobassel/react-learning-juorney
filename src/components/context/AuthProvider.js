import React, { createContext, useState } from "react";

export const User = createContext({});

// مزود السياق
export default function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(null); // استخدم null بدلاً من {}
    const [userModel, setUserModel] = useState({});

    return (
        <User.Provider value={{ authToken, setAuthToken, userModel, setUserModel }}>
            {children}
        </User.Provider>
    );
}

/*
نستدعي الفانكشن او الكمبوننت فوق المثلا App> 
لانها هنا الفانكششن بتريترن ال User.provider 
فمش محتاج اكررها تاني عتاك 
بعدين في المكان اللي عاوز استخدمه فيه اعمل useContext(User);
وهكذا

*/