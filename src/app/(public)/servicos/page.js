// export default function SustentabilidadePage() {
//   return (
//     <section style={{ padding: "2rem" }}>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <h1>Trajetto Serviços</h1>
//       <p>Veja aqui todos os recursos que disponibilizamos em nossa plataforma.</p>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//     </section>
//   );
// }




// app/servicos/page.js
import styles from "./servicos.module.css";
import Image from "next/image";

export default function Servicos() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Nossos Serviços</h1>
      <h2 className={styles.descricao}>O sistema TRAJETTO é totalemente pensado e projetado para ganho de produtividade e eficianecia, 
                                        desenvolvido para auxiliar você a escalar sua operação. Nosso sistema oferece diversos recursos
                                        totalmente alinhados as mais rigidas normas de logisticas, fiscais e processuais.</h2>

      {/*bloco 1*/}
      <section className={styles.card}>
        <div className={styles.image}>
          <Image
            src="/carga.png"
            alt="Serviço 1"
            width={220}
            height={220}
          />
        </div>

        <div className={styles.text}>
          <h2>Gerenciamento de Cargas</h2>
          <p>
            Através do módulo de manifesto de carga, vocẽ terá total controle e
            gerenciamento das cargas cadastradas, o módulo faz calculo automatico 
            de frete já disponibilizando uma tabela de calculo de frete baseada
            nas melhores praticas de pricing do mercado. Crie, edite e exclua uma
            carga quando quiser, total controle da carga no momento que quiser.
          </p>
        </div>
      </section>

      {/*bloco 2*/}
      <section className={`${styles.card} ${styles.reverse}`}>
        <div className={styles.image}>
          <Image
            src="/driver.png"
            alt="Serviço 2"
            width={220}
            height={220}
          />
        </div>

        <div className={styles.text}>
          <h2>Gerenciamento de Motoristas</h2>
          <p>
            Nesse módulo você é capaz de gerenciar todo seu quadro de motoristas,
            tendo controle e acesso aos dados dos seus colaboradores sempre que
            precisar de forma rápida e simplficada.
          </p>
        </div>
      </section>

      {/*bloco 3*/}
      <section className={styles.card}>
        <div className={styles.image}>
          <Image
            src="/trucks.png"
            alt="Serviço 3"
            width={370}
            height={220}
          />
        </div>

        <div className={styles.text}>
          <h2>Gerenciamento de Frota</h2>
          <p>
            Nesse módulo você gerencia toda sua frota de veículos, tem o controle
            cadastral do veículo junto aos orgãos de trânsito, mantendo sua frota 
            em dia e regular com os mais altos padrões de segurança daa legislação
            de trânsito.
          </p>
        </div>
      </section>
      {/* bloco 4 */}
      <section className={`${styles.card} ${styles.reverse}`}>
        <div className={styles.image}>
          <Image
            src="/cliente.png"
            alt="Serviço 2"
            width={220}
            height={220}
          />
        </div>

        <div className={styles.text}>
          <h2>Carteira de Clientes</h2>
          <p>
            Nesse módulo você é capaz de gerenciar toda a sua carteira de clientes,
            tendo todos os dados disponíveis a qualquer momento. Esse módulo é
            totalmente integrado aos demais módulos do sistema, dessa forma você
            consegue selecionar um cliente para determinado serviço dentro do respectivo
            módulo que você estiver usando no momento.
          </p>
        </div>
      </section>
      
    </main>
  );
}
