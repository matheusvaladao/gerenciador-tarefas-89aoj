export const Header = () => {

    const mobile = window.innerWidth < 954;
    const userName = localStorage.getItem('name');
    const firstName = userName?.split(' ')[0] || '';

    return (
        <div className="containner-header">
            <img src="logo.svg" alt="Logo Fiap" className='logo' />
            <button><strong>+</strong> Adicionar tarefa</button>
            <div>
                <span>Olá, {firstName}</span>
                <img src={mobile ? 'exit-mobile.svg' : 'exit-desktop.svg'} alt="Sair"/>
            </div>
        </div>
    )
}