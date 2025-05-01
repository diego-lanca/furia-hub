import { login, signUp } from "./actions";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-gray-950 to-gray-800">
            <form className="flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-4">
                <label htmlFor="email" className="">Email:</label>
                <input id="email" name="email" type="email" required className="border-black border-2 rounded-2xl p-1" />
                <label htmlFor="password" className="">Senha:</label>
                <input id="password" name="password" type="password" required className="border-black border-2 rounded-2xl p-1" />
                <button formAction={login} className="cursor-pointer ">Entrar</button>
                <button formAction={signUp} className="cursor-pointer ">Cadastrar-se</button>
            </form>
        </div>
    );
}