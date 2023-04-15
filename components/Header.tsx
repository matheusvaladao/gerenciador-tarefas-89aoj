import type { NextPage } from "next";

type HeaderProps = {
    setAccessToken(s: string) : void
}

export const Header : NextPage<HeaderProps> = ({setAccessToken}) => {

    const mobile = window.innerWidth < 954;

    const userName = localStorage.getItem('name');
    const firstName = userName?.split(' ')[0] || '';

    const sair = () => {
        localStorage.clear();
        setAccessToken('');
    }

    return (
        <div className="container-header">
            <img src="logo.svg" alt="Logo Fiap" className='logo' />
            <button><strong>+</strong> Adicionar tarefa</button>
            <div>
                <span>Olá, {firstName}</span>
                <img onClick={sair} src={mobile ? 'exit-mobile.svg' : 'exit-desktop.svg'} alt="Sair"/>
            </div>
        </div>
    )
}