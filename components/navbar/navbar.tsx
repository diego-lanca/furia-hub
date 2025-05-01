'use client'

import { logout } from "./actions";

export default function Navbar() {
    return (
        <nav>
            <button onClick={ logout } className="cursor-pointer"><p>Sair</p></button>
        </nav>
    );
}