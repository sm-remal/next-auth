"use client"

import { useSession } from "next-auth/react";

const UserCard = () => {
    const session = useSession();
    console.log(session)
    return (
        <div>
            <h2>User Client</h2>
            <div className="border-2 rounded-xl px-4 py-2 text-center">{JSON.stringify(session)}</div>
        </div>
    );
};

export default UserCard;