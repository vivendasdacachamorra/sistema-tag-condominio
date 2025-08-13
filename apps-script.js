// =====================================================
// WEBHOOK PARA FORMULÁRIO DE RETIRADA DE TAG
// Associação Vivendas do Cachamorra
// Integrado com planilha específica do condomínio
// =====================================================

function doGet() {
  const output = HtmlService.createHtmlOutput(`
    <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
      <h2>🏠 Webhook TAG - Sistema Ativo</h2>
      <p>✅ Apps Script funcionando corretamente!</p>
      <p>📅 ${new Date().toLocaleString('pt-BR')}</p>
      <p>🔧 Conectado à planilha do condomínio</p>
      <p><strong>Status:</strong> Pronto para receber solicitações</p>
    </div>
  `);
  
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

function doPost(e) {
  try {
    console.log('📨 Nova solicitação de TAG recebida:', new Date().toISOString());
    
    // Verificar se há dados
    if (!e.postData || !e.postData.contents) {
      throw new Error('Nenhum dado recebido na requisição');
    }
    
    console.log('📄 Dados recebidos:', e.postData.contents);
    
    // Parse dos dados do formulário
    const data = JSON.parse(e.postData.contents);
    console.log('✅ Dados parseados:', JSON.stringify(data, null, 2));
    
    // ID da planilha específica do condomínio
    const PLANILHA_ID = '12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg';
    
    console.log('📊 Abrindo planilha específica...');
    
    // Abrir a planilha específica
    const spreadsheet = SpreadsheetApp.openById(PLANILHA_ID);
    
    // Tentar pegar a aba "Solicitações TAG" ou usar a primeira aba
    let sheet;
    try {
      sheet = spreadsheet.getSheetByName('Solicitações TAG');
      if (!sheet) {
        sheet = spreadsheet.getActiveSheet();
        // Renomear a aba se for a primeira vez
        if (sheet.getName() === 'Planilha1' || sheet.getName() === 'Sheet1') {
          sheet.setName('Solicitações TAG');
        }
      }
    } catch (error) {
      sheet = spreadsheet.getActiveSheet();
    }
    
    console.log('📋 Usando aba:', sheet.getName());
    
    // Verificar se precisa adicionar cabeçalhos
    const lastRow = sheet.getLastRow();
    if (lastRow === 0 || sheet.getRange(1, 1).getValue() === '') {
      console.log('📝 Adicionando cabeçalhos...');
      const headers = [
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
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Formatação do cabeçalho
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#28a745');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }
    
    // Preparar dados para inserir
    const agora = new Date();
    const linha = [
      Utilities.formatDate(agora, 'GMT-3', 'dd/MM/yyyy HH:mm:ss'),
      data.contribuinte || '',
      data.cadastrado || '',
      data.nome || '',
      data.telefone || '',
      data.nomeRapido || '',
      data.telefoneRapido || '',
      'Aguardando Retirada',
      data.tipoSolicitacao || 'Solicitação TAG',
      data.timestamp || '',
      `${e.postData.remoteAddress || 'N/A'} | ${data.userAgent || 'N/A'}`
    ];
    
    console.log('📝 Inserindo dados na linha:', sheet.getLastRow() + 1);
    
    // Inserir dados na próxima linha disponível
    const proximaLinha = sheet.getLastRow() + 1;
    sheet.getRange(proximaLinha, 1, 1, linha.length).setValues([linha]);
    
    // Formatação condicional da nova linha
    const novaLinhaRange = sheet.getRange(proximaLinha, 1, 1, linha.length);
    if (proximaLinha % 2 === 0) {
      novaLinhaRange.setBackground('#f8f9fa');
    }
    
    console.log('✅ Dados inseridos com sucesso na planilha');
    
    // Resposta de sucesso
    const resposta = {
      success: true,
      message: 'Solicitação de TAG registrada com sucesso!',
      numeroSolicitacao: `TAG-${agora.getTime()}`,
      linha: proximaLinha,
      planilha: spreadsheet.getUrl(),
      timestamp: agora.toISOString(),
      dadosRecebidos: {
        nome: data.nome,
        telefone: data.telefone,
        contribuinte: data.contribuinte,
        cadastrado: data.cadastrado
      }
    };
    
    console.log('📤 Enviando resposta de sucesso');
    
    return ContentService
      .createTextOutput(JSON.stringify(resposta))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Erro ao processar solicitação:', error);
    console.error('❌ Stack trace:', error.stack);
    
    // Resposta de erro
    const respostaErro = {
      success: false,
      error: 'Erro interno do servidor',
      detalhes: error.toString(),
      timestamp: new Date().toISOString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(respostaErro))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar o sistema
function testarSistema() {
  console.log('🧪 Iniciando teste do sistema...');
  
  const dadosTeste = {
    postData: {
      contents: JSON.stringify({
        contribuinte: 'sim',
        cadastrado: 'sim',
        nome: 'João Silva Teste',
        telefone: '(11) 99999-9999',
        tipoSolicitacao: 'Teste do Sistema',
        timestamp: new Date().toISOString()
      }),
      remoteAddress: '192.168.1.1'
    }
  };
  
  const resultado = doPost(dadosTeste);
  const conteudo = resultado.getContent();
  
  console.log('📊 Resultado do teste:');
  console.log(conteudo);
  
  try {
    const json = JSON.parse(conteudo);
    if (json.success) {
      console.log('✅ TESTE PASSOU! Dados inseridos na linha:', json.linha);
      console.log('📋 Planilha:', json.planilha);
    } else {
      console.log('❌ TESTE FALHOU:', json.error);
    }
  } catch (e) {
    console.log('❌ Erro ao fazer parse da resposta:', e);
  }
  
  return conteudo;
}

// Função para limpar logs
function limparLogs() {
  console.clear();
  console.log('🧹 Logs limpos - Sistema pronto para produção!');
}

// Função para criar notificação por email (opcional)
function notificarNovaTag(dados) {
  try {
    const assunto = `Nova Solicitação de TAG - ${dados.nome}`;
    const corpo = `
      Nova solicitação de TAG recebida:
      
      📋 Dados do solicitante:
      • Nome: ${dados.nome}
      • Telefone: ${dados.telefone}
      • É contribuinte: ${dados.contribuinte}
      • Data/Hora: ${new Date().toLocaleString('pt-BR')}
      
      🔗 Acesse a planilha: https://docs.google.com/spreadsheets/d/12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg/edit
      
      --
      Sistema Automático - Vivendas do Cachamorra
    `;
    
    // Descomente a linha abaixo e substitua pelo email da administração
    // GmailApp.sendEmail('admin@condominio.com', assunto, corpo);
    
    console.log('📧 Notificação preparada (desabilitada)');
    
  } catch (error) {
    console.log('⚠️ Erro ao enviar notificação:', error);
  }
}