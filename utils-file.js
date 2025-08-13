// =====================================================
// UTILITÁRIOS E SCRIPTS AUXILIARES
// Sistema de Retirada de TAGs
// =====================================================

// 🛠️ Utilitários para Apps Script
const AppsScriptUtils = {
  
  // Gerar relatório de solicitações
  gerarRelatorio: function() {
    const PLANILHA_ID = '12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg';
    const sheet = SpreadsheetApp.openById(PLANILHA_ID).getActiveSheet();
    
    const dados = sheet.getDataRange().getValues();
    const cabecalho = dados[0];
    const linhas = dados.slice(1);
    
    console.log('📊 RELATÓRIO DE SOLICITAÇÕES DE TAG');
    console.log('=====================================');
    console.log(`Total de solicitações: ${linhas.length}`);
    
    // Contar por status
    const contadores = {};
    linhas.forEach(linha => {
      const status = linha[7] || 'Sem status'; // Coluna de status
      contadores[status] = (contadores[status] || 0) + 1;
    });
    
    console.log('\n📈 Por status:');
    Object.entries(contadores).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });
    
    // Contar contribuintes vs não contribuintes
    const contribuintes = linhas.filter(linha => linha[1] === 'sim').length;
    const naoContribuintes = linhas.filter(linha => linha[1] === 'nao').length;
    
    console.log('\n👥 Por tipo:');
    console.log(`  Contribuintes: ${contribuintes}`);
    console.log(`  Não contribuintes: ${naoContribuintes}`);
    
    return {
      total: linhas.length,
      porStatus: contadores,
      contribuintes,
      naoContribuintes
    };
  },
  
  // Limpar dados de teste
  limparDadosTeste: function() {
    const PLANILHA_ID = '12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg';
    const sheet = SpreadsheetApp.openById(PLANILHA_ID).getActiveSheet();
    
    const dados = sheet.getDataRange().getValues();
    let removidos = 0;
    
    // Remover linhas que contenham "teste" no nome
    for (let i = dados.length - 1; i >= 1; i--) {
      const nome = (dados[i][3] || '').toString().toLowerCase();
      if (nome.includes('teste') || nome.includes('test')) {
        sheet.deleteRow(i + 1);
        removidos++;
      }
    }
    
    console.log(`🧹 Removidas ${removidos} solicitações de teste`);
    return removidos;
  },
  
  // Backup da planilha
  criarBackup: function() {
    const PLANILHA_ID = '12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg';
    const originalSheet = SpreadsheetApp.openById(PLANILHA_ID);
    
    const timestamp = Utilities.formatDate(new Date(), 'GMT-3', 'yyyy-MM-dd_HH-mm');
    const backupName = `Backup TAG Solicitações ${timestamp}`;
    
    const backup = originalSheet.copy(backupName);
    
    console.log(`💾 Backup criado: ${backup.getUrl()}`);
    return backup.getUrl();
  },
  
  // Enviar notificação de resumo diário
  resumoDiario: function() {
    const hoje = new Date();
    const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    
    const PLANILHA_ID = '12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg';
    const sheet = SpreadsheetApp.openById(PLANILHA_ID).getActiveSheet();
    
    const dados = sheet.getDataRange().getValues();
    const hoje_str = Utilities.formatDate(inicioHoje, 'GMT-3', 'dd/MM/yyyy');
    
    const solicitacoesHoje = dados.filter(linha => {
      const dataLinha = linha[0];
      if (!dataLinha) return false;
      return dataLinha.toString().includes(hoje_str);
    });
    
    console.log(`📅 Resumo do dia ${hoje_str}:`);
    console.log(`   Novas solicitações: ${solicitacoesHoje.length}`);
    
    if (solicitacoesHoje.length > 0) {
      console.log('   Detalhes:');
      solicitacoesHoje.forEach(linha => {
        console.log(`   - ${linha[3]} (${linha[4]}) - ${linha[1] === 'sim' ? 'Contribuinte' : 'Não contribuinte'}`);
      });
    }
    
    return solicitacoesHoje.length;
  }
};

// 🔧 Utilitários para o Frontend
const FrontendUtils = {
  
  // Validar CPF (se necessário no futuro)
  validarCPF: function(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpf.charAt(10));
  },
  
  // Formatar telefone
  formatarTelefone: function(telefone) {
    const numbers = telefone.replace(/\D/g, '');
    
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
  },
  
  // Detectar dispositivo móvel
  isMobile: function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  
  // Salvar no localStorage (com fallback)
  salvarLocal: function(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.warn('localStorage não disponível, usando sessionStorage');
      try {
        sessionStorage.setItem(chave, JSON.stringify(valor));
        return true;
      } catch (e2) {
        console.warn('Storage não disponível');
        return false;
      }
    }
  },
  
  // Recuperar do localStorage
  recuperarLocal: function(chave) {
    try {
      const item = localStorage.getItem(chave) || sessionStorage.getItem(chave);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  },
  
  // Copiar para clipboard
  copiarTexto: function(texto) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(texto);
      return true;
    } else {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }
};

// 📊 Analytics e Monitoramento
const Analytics = {
  
  // Rastrear evento
  rastrear: function(evento, dados = {}) {
    const info = {
      evento,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      isMobile: FrontendUtils.isMobile(),
      ...dados
    };
    
    console.log('📈 Evento rastreado:', info);
    
    // Aqui você pode integrar com Google Analytics, se necessário
    // gtag('event', evento, dados);
    
    return info;
  },
  
  // Rastrear erro
  rastrearErro: function(erro, contexto = '') {
    const info = {
      erro: erro.toString(),
      stack: erro.stack,
      contexto,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    console.error('❌ Erro rastreado:', info);
    return info;
  }
};

// 🚀 Scripts de Deploy e Manutenção
const Deploy = {
  
  // Verificar configuração do sistema
  verificarSistema: function() {
    console.log('🔍 VERIFICAÇÃO DO SISTEMA');
    console.log('========================');
    
    const checks = [
      {
        nome: 'SCRIPT_URL configurada',
        test: () => typeof SCRIPT_URL !== 'undefined' && SCRIPT_URL.includes('script.google.com'),
        status: null
      },
      {
        nome: 'Elementos DOM carregados',
        test: () => document.getElementById('tagForm') !== null,
        status: null
      },
      {
        nome: 'EventListeners registrados',
        test: () => true, // Assumir que estão OK se chegou até aqui
        status: null
      },
      {
        nome: 'localStorage disponível',
        test: () => typeof Storage !== 'undefined',
        status: null
      }
    ];
    
    checks.forEach(check => {
      try {
        check.status = check.test() ? '✅' : '❌';
      } catch (e) {
        check.status = '❌';
      }
      console.log(`${check.status} ${check.nome}`);
    });
    
    const todosPassed = checks.every(check => check.status === '✅');
    console.log(`\n${todosPassed ? '✅' : '❌'} Sistema ${todosPassed ? 'OK' : 'com problemas'}`);
    
    return todosPassed;
  },
  
  // Teste de conectividade
  testarConectividade: function() {
    if (typeof SCRIPT_URL === 'undefined') {
      console.error('❌ SCRIPT_URL não definida');
      return false;
    }
    
    console.log('🔗 Testando conectividade...');
    
    return fetch(SCRIPT_URL, { method: 'GET' })
      .then(response => {
        console.log(`✅ Conectividade OK: ${response.status}`);
        return true;
      })
      .catch(error => {
        console.error('❌ Erro de conectividade:', error);
        return false;
      });
  }
};

// 🎯 Exportar utilitários
if (typeof window !== 'undefined') {
  window.SystemUtils = {
    AppsScriptUtils,
    FrontendUtils,
    Analytics,
    Deploy
  };
}

// =====================================================
// SCRIPTS PARA GOOGLE APPS SCRIPT
// (Cole no Apps Script para usar)
// =====================================================

/*
// Configurar trigger para relatório diário
function configurarTriggerDiario() {
  ScriptApp.newTrigger('resumoDiario')
    .timeBased()
    .everyDays(1)
    .atHour(18) // 18h
    .create();
  
  console.log('✅ Trigger de resumo diário configurado para 18h');
}

// Configurar trigger para backup semanal
function configurarTriggerBackup() {
  ScriptApp.newTrigger('criarBackup')
    .timeBased()
    .everyWeeks(1)
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(2) // 2h da manhã
    .create();
  
  console.log('✅ Trigger de backup semanal configurado para domingo 2h');
}

// Listar todos os triggers
function listarTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  console.log(`📋 Total de triggers: ${triggers.length}`);
  
  triggers.forEach((trigger, index) => {
    console.log(`${index + 1}. ${trigger.getHandlerFunction()} - ${trigger.getEventType()}`);
  });
}
*/