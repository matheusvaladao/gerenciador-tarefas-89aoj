export const Login = () => {
  return (
    <div>
      <img src="/logo.svg" alt="Logo Fiap"/>
      <div className="form">
        <button className="input" />
        <img src="/mail.svg" alt="Login"/>
        <input placeholder="Login" />
      </div>
      <div className="form">
        <button className="input" />
        <img src="/lock.svg" alt="Senha"/>
        <input placeholder="Senha" />
      </div>
      <button>Enviar</button>
    </div>
  );
};
