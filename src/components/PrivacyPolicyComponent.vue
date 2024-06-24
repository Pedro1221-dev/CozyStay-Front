<template>
  <div v-if="showModal" class="PrivacyPolicyModal">
    <div class="PrivacyPolicyModal-content">
        <h1>Política de Privacidade do Cozy Stay</h1>
        <div class="text">
          <p><b>Compromisso com a Privacidade e Transparência</b></p>
          <p>No Cozy Stay, estamos comprometidos a tratar os dados dos nossos hóspedes de maneira ética, transparente e em conformidade com as leis e regulamentos de proteção de dados aplicáveis. Garantimos que nossos hóspedes estejam plenamente informados sobre como seus dados são utilizados e protegidos.</p>
          <p><b>Limitação da Finalidade</b></p> 
          <p>Os dados dos nossos hóspedes são recolhidos exclusivamente para finalidades específicas e legítimas. Essas finalidades incluem facilitar reservas, aprimorar a experiência do cliente e garantir a segurança das nossas instalações. Não utilizamos dados para qualquer outra finalidade não relacionada sem o consentimento explícito dos hóspedes.          </p>
          <p><b>Minimização dos Dados</b></p>
          <p>Coletamos apenas os dados estritamente necessários para fornecer nossos serviços de hospedagem. Limitamos a quantidade de dados pessoais coletados ao mínimo necessário para cumprir as finalidades específicas de cada processo, evitando a coleta excessiva ou irrelevante.</p>
          <p><b>Precisão e Atualização dos Dados</b></p>
          <p>Asseguramos que os dados dos nossos hóspedes estejam sempre corretos e atualizados. Mantemos procedimentos rigorosos para corrigir ou atualizar quaisquer informações imprecisas, garantindo a precisão dos dados utilizados em nossos sistemas.</p>
          <p><b>Limitação do Armazenamento</b></p>
          <p>Os dados dos nossos hóspedes são armazenados somente pelo período necessário para cumprir as finalidades para as quais foram recolhidos. Após o término desse período, os dados são anonimizados ou eliminados de maneira segura, conforme exigido pelas leis de proteção de dados aplicáveis. </p>
          <p><b>Segurança dos Dados</b></p>
          <p>Implementamos medidas de segurança robustas para proteger os dados dos nossos hóspedes contra acesso não autorizado, divulgação, alteração ou destruição. Utilizamos tecnologias de segurança avançadas, como criptografia, e garantimos que apenas pessoal autorizado, incluindo desenvolvedores e professores, tenha acesso aos dados.</p>
          <p>Esta política de privacidade foi criada para assegurar que nossos hóspedes sintam-se seguros e informados sobre o tratamento dos seus dados pessoais no Cozy Stay. Continuamos a revisar e aprimorar nossas práticas de proteção de dados para manter um alto padrão de privacidade e segurança.</p>
        </div>
        <div class="close" @click="closePrivacyPolicyModal">
          <span class="material-symbols-outlined close-icon">close</span>
        </div>      
    </div>
  </div>
  
</template>
  
<script>
  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      closePrivacyPolicyModal() {
        this.$emit('update:showModal', false);
        document.body.style.overflow = '';
        document.body.classList.remove('no-scroll');
      }
    },
    watch: {
      showModal(newVal) {
        if (newVal) {
          document.body.style.overflow = 'hidden';
          document.body.classList.add('no-scroll');
        } else {
          document.body.style.overflow = '';
          document.body.classList.remove('no-scroll');
        }
      }
    }
  };
</script>

<style>

  /* Modal */

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }

  .PrivacyPolicyModal{
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 18%; 
    left: 22%;
    
    
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 40px;
    border: 1px solid #193D4E;
    margin-left: 20%;
    margin-right: 20%;
    padding: 2%;
    width: 60%;
    height: 80%;
    
    overflow: auto;
    h1{          
      display: flex;
      flex-direction: row;
      justify-content: center;
      color: #193D4E;
      margin-top: 2%;
      margin-bottom: 2%;
    }
    p{
      display: flex;
      flex: row;
      justify-content: center;
      color: #193D4E;
      font-weight: 200;
      margin-bottom: 2%;
    }
    b{
      margin-top: 1%;
      margin-bottom: 1%;
    }
  }

  .PrivacyPolicyModal-content{
    display: flex;    
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding-left: 10%;
    padding-right: 10%;
  }

  .close-icon{
    font-size: 30px;
    position: absolute;
    right: 50px;
    top: 40px;
    cursor: pointer;
    color: #193D4E;
  }

</style>