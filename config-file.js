// =====================================================
// CONFIGURAÇÕES DO SISTEMA DE RETIRADA DE TAGs
// Associação Vivendas do Cachamorra
// =====================================================

const CONFIG = {
  // 🔗 URLs do Sistema
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwsT_Ayrws1Yy35i6btXFBCWGL8W-D3M9oQkqkAn1P6Pvy9JdrrFJKdj5N1fl6tP-KoyQ/exec',
  PLANILHA_URL: 'https://docs.google.com/spreadsheets/d/12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg/edit',
  GOOGLE_FORMS_URL: 'https://forms.gle/YtRhUQSupNXgK7NQA',
  
  // 🏠 Dados do Condomínio
  CONDOMINIO: {
    NOME: 'Associação Vivendas do Cachamorra',
    TITULO_SISTEMA: 'Retirada de TAG',
    DESCRICAO: 'Sistema de Acesso - Associação Vivendas do Cachamorra'
  },
  
  // 📊 Configurações da Planilha
  PLANILHA: {
    ID: '12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg',
    ABA_NOME: 'Solicitações TAG',
    COLUNAS: [
      'Data/Hora',
      'É Contribuinte',
      'Já Cadastrado',
      'Nome',
      'Telefone',
      'Nome Rápido',
      'Telefone Rápido',
      'Status',
      'Tipo Solicitação',
      'Timestamp',
      'IP/UserAgent'
    ]
  },
  
  // ⚙️ Configurações do Formulário
  FORMULARIO: {
    TIMEOUT_SEGUNDOS: 30,
    MOSTRAR_DEBUG: false,
    VALIDAR_TELEFONE: true,
    CAMPOS_OBRIGATORIOS: ['nome', 'telefone', 'contribuinte', 'cadastrado']
  },
  
  // 📧 Configurações de Notificação (opcional)
  NOTIFICACOES: {
    ENVIAR_EMAIL: false,
    EMAIL_ADMIN: 'admin@condominio.com',
    ASSUNTO_EMAIL: 'Nova Solicitação de TAG'
  },
  
  // 🎨 Cores e Tema
  TEMA: {
    COR_PRIMARIA: '#28a745',
    COR_SECUNDARIA: '#20c997',
    COR_ERRO: '#dc3545',
    COR_AVISO: '#ffc107',
    COR_INFO: '#17a2b8'
  },
  
  // 📱 Textos da Interface
  TEXTOS: {
    INTRO: 'Bem-vindo ao cadastro de Retirada de TAG. Antes de prosseguir, informe se você é contribuinte do condomínio.',
    SUCESSO: 'Solicitação Registrada com Sucesso!',
    ERRO_GENERICO: 'Erro ao enviar solicitação. Tente novamente.',
    ERRO_TIMEOUT: 'A solicitação demorou muito para responder.',
    ERRO_CONEXAO: 'Problema de conexão. Verifique sua internet.',
    CADASTRO_NECESSARIO: 'Para liberar a retirada da sua tag, finalize primeiro o Cadastro de Moradores.',
    PROXIMOS_PASSOS: [
      'Você receberá contato da administração',
      'Aguarde instruções para retirada da TAG',
      'Mantenha seu telefone disponível'
    ]
  }
};

// 🔧 Funções de Configuração
const ConfigHelper = {
  
  // Aplicar configurações no formulário
  aplicarConfiguracoes: function() {
    // Atualizar título
    document.title = `${CONFIG.CONDOMINIO.TITULO_SISTEMA} - ${CONFIG.CONDOMINIO.NOME}`;
    
    // Atualizar cabeçalho
    const header = document.querySelector('.header h1');
    if (header) header.textContent = `🏠 ${CONFIG.CONDOMINIO.TITULO_SISTEMA}`;
    
    const headerDesc = document.querySelector('.header p');
    if (headerDesc) headerDesc.textContent = CONFIG.CONDOMINIO.DESCRICAO;
    
    // Atualizar link do Google Forms
    const googleFormsLink = document.querySelector('a[href*="forms.gle"]');
    if (googleFormsLink) googleFormsLink.href = CONFIG.GOOGLE_FORMS_URL;
    
    // Aplicar tema de cores
    this.aplicarTema();
  },
  
  // Aplicar tema de cores
  aplicarTema: function() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --cor-primaria: ${CONFIG.TEMA.COR_PRIMARIA};
        --cor-secundaria: ${CONFIG.TEMA.COR_SECUNDARIA};
        --cor-erro: ${CONFIG.TEMA.COR_ERRO};
        --cor-aviso: ${CONFIG.TEMA.COR_AVISO};
        --cor-info: ${CONFIG.TEMA.COR_INFO};
      }
    `;
    document.head.appendChild(style);
  },
  
  // Validar configurações
  validarConfig: function() {
    const erros = [];
    
    if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes('AKfycb') === false) {
      erros.push('URL do Apps Script não configurada corretamente');
    }
    
    if (!CONFIG.PLANILHA.ID || CONFIG.PLANILHA.ID.length < 40) {
      erros.push('ID da planilha não configurado corretamente');
    }
    
    if (!CONFIG.GOOGLE_FORMS_URL || !CONFIG.GOOGLE_FORMS_URL.includes('forms.gle')) {
      erros.push('URL do Google Forms não configurada');
    }
    
    if (erros.length > 0) {
      console.warn('⚠️ Problemas de configuração encontrados:', erros);
      return false;
    }
    
    console.log('✅ Configurações validadas com sucesso');
    return true;
  },
  
  // Log de debug
  debug: function(mensagem, dados = null) {
    if (CONFIG.FORMULARIO.MOSTRAR_DEBUG) {
      console.log(`🔧 DEBUG: ${mensagem}`, dados || '');
    }
  }
};

// 📊 Status de Configuração
const StatusConfig = {
  CONFIGURADO: '✅ Configurado',
  NAO_CONFIGURADO: '❌ Não configurado',
  PENDENTE: '⏳ Pendente'
};

// 🚀 Inicialização
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    ConfigHelper.aplicarConfiguracoes();
    ConfigHelper.validarConfig();
    ConfigHelper.debug('Sistema inicializado', CONFIG);
  });
}

// Exportar configurações (para uso em outros arquivos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

// =====================================================
// INSTRUÇÕES DE USO
// =====================================================

/*
1. CONFIGURAÇÃO BÁSICA:
   - Altere APPS_SCRIPT_URL com a URL do seu Google Apps Script
   - Verifique se PLANILHA.ID está correto
   - Configure GOOGLE_FORMS_URL se necessário

2. PERSONALIZAÇÃO:
   - Modifique CONDOMINIO.NOME para o nome do seu condomínio
   - Ajuste TEMA.COR_PRIMARIA para mudar as cores
   - Edite TEXTOS para personalizar mensagens

3. FUNCIONALIDADES AVANÇADAS:
   - NOTIFICACOES.ENVIAR_EMAIL: true para receber emails
   - FORMULARIO.MOSTRAR_DEBUG: true para logs detalhados
   - FORMULARIO.TIMEOUT_SEGUNDOS: ajustar timeout das requisições

4. VALIDAÇÃO:
   - A função validarConfig() verifica se tudo está correto
   - Execute ConfigHelper.validarConfig() no console para testar

5. APLICAÇÃO:
   - Include este arquivo ANTES do código principal do formulário
   - As configurações serão aplicadas automaticamente
*/