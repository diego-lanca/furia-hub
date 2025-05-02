'use client'

import { goToChat, goToHome, logout } from "./actions";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-2 bg-gray-800 text-white">
            <h1>Furia Hub</h1>
            <div className="flex gap-4">
                <button onClick={ goToHome } className="cursor-pointer"><p>Início</p></button>
                <button onClick={ goToChat } className="cursor-pointer"><p>Chat</p></button>
                <button className="cursor-pointer"><p>Forum</p></button>
            </div>
            <div>
                <button onClick={ logout } className="cursor-pointer"><p>Sair</p></button>
            </div>
        </nav>
    );
}