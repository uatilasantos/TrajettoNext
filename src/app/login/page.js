import styles from './login.module.css';

export default function LoginPage() {
  return (
  
    <div className={styles.loginContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Fazer Login</h1>

        <form>
          <input
            type="email"
            placeholder="Seu E-mail"
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Sua Senha"
            className={styles.inputField}
          />
          
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

