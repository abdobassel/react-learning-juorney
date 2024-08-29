import React, { useContext } from "react";
import { User } from "../context/AuthProvider";

function UserProfile() {
    const { userModel } = useContext(User);

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {userModel.name}</p>
            <p>Email: {userModel.email}</p>
            <p>Phone: {userModel.phone}</p>
            {/* عرض المزيد من البيانات حسب الحاجة */}
        </div>
    );
}

export default UserProfile;
