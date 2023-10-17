"use client"

import { signOut } from "next-auth/react"

const UsersPage = () => {
    const handleSignOut = () => {
        signOut()
    }
    return (
        <div>
            <h3>Users Page</h3>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default UsersPage
