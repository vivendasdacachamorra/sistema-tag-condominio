# 📚 Exemplos de Uso - Sistema de Retirada de TAGs

Este arquivo contém exemplos práticos de como usar e personalizar o sistema.

## 🎯 Casos de Uso Comuns

### 1. Morador Contribuinte Cadastrado

**Fluxo:**
1. Acessa o formulário
2. Seleciona "✅ Sim" para contribuinte
3. Seleciona "✅ Sim, já sou cadastrado"
4. Preenche nome: "João Silva"
5. Preenche telefone: "(11) 99999-9999"
6. Clica em "Solicitar TAG"
7. Recebe confirmação de sucesso

**Resultado na planilha:**
```
Data/Hora: 13/08/2025 10:30:15
É Contribuinte: sim
Já Cadastrado: sim
Nome: João Silva
Telefone: (11) 99999-9999
Status: Aguardando Retirada
```

### 2. Morador Não Cadastrado

**Fluxo:**
1. Acessa o formulário
2. Seleciona "✅ Sim" para contribuinte
3. Seleciona "❌ Não, ainda não me cadastrei"
4. Vê aviso sobre cadastro necessário
5. Opcionalmente preenche dados básicos
6. Clica no link para Google Forms
7. Completa cadastro completo

**Resultado:**
- Direcionado para cadastro completo
- Dados básicos salvos para controle (opcional)

### 3. Não Contribuinte

**Fluxo:**
1. Acessa o formulário
2. Seleciona "❌ Não" para contribuinte
3. Seleciona status de cadastro
4. É informado sobre limitações
5. Direcionado para cadastro se necessário

## 🔧 Personalizações Comuns

### Alterar Cores do Sistema

**No arquivo `index.html`, linha ~30:**
```css
.header {
    background: linear-gradient(135deg, #28a745, #20c997); /* Verde */
}
```

**Para azul:**
```css
.header {
    background: linear-gradient(135deg, #007bff, #0056b3); /* Azul */
}
```

### Adicionar Campo Novo

**1. No HTML (após linha 150):**
```html
<div class="form-group">
    <label for="apartamento">Apartamento <span class="required">*</span></label>
    <input type="text" id="apartamento" name="apartamento" required>
</div>
```

**2. No Apps Script (linha ~75):**
```javascript
const linha = [
    Utilities.formatDate(agora, 'GMT-3', 'dd/MM/yyyy HH:mm:ss'),
    data.contribuinte || '',
    data.cadastrado || '',
    data.nome || '',
    data.telefone || '',
    data.apartamento || '',  // Novo campo
    // ... outros campos
];
```

**3. Adicionar cabeçalho (linha ~60):**
```javascript
const headers = [
    'Data/Hora',
    'É Contribuinte',
    'Já Cadastrado',
    'Nome',
    'Telefone',
    'Apartamento',  // Novo cabeçalho
    // ... outros cabeçalhos
];
```

### Mudar Texto do Formulário

**No arquivo `index.html`, linha ~35:**
```html
<div class="intro-text">
    <strong>Bem-vindo ao cadastro de Retirada de TAG.</strong><br>
    Antes de prosseguir, informe se você é contribuinte do condomínio.
</div>
```

**Personalizado:**
```html
<div class="intro-text">
    <strong>Solicitação de TAG - Residencial Vila Verde.</strong><br>
    Para retirar sua TAG de acesso, confirme primeiro sua situação no condomínio.
</div>
```

## 📊 Integrações Avançadas

### Notificação por Email

**No Google Apps Script, adicione:**
```javascript
function enviarNotificacao(dados) {
    const destinatario = 'admin@condominio.com';
    const assunto = `Nova TAG: ${dados.nome}`;
    const corpo = `
        Nova solicitação recebida:
        
        Nome: ${dados.nome}
        Telefone: ${dados.telefone}
        Contribuinte: ${dados.contribuinte}
        
        Acesse: https://docs.google.com/spreadsheets/d/...
    `;
    
    GmailApp.sendEmail(destinatario, assunto, corpo);
}

// Chame na função doPost:
enviarNotificacao(data);
```

### Webhook para Slack

**Adicione no Apps Script:**
```javascript
function notificarSlack(dados) {
    const webhookUrl = 'https://hooks.slack.com/services/...';
    
    const payload = {
        text: `🏠 Nova TAG solicitada`,
        attachments: [{
            color: 'good',
            fields: [
                { title: 'Nome', value: dados.nome, short: true },
                { title: 'Telefone', value: dados.telefone, short: true },
                { title: 'Contribuinte', value: dados.contribuinte, short: true }
            ]
        }]
    };
    
    UrlFetchApp.fetch(webhookUrl, {
        method: 'POST',
        contentType: 'application/json',
        payload: JSON.stringify(payload)
    });
}
```

### Validação de CPF

**No arquivo `index.html`, adicione:**
```javascript
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    // Algoritmo de validação do CPF
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
}
```

## 📈 Analytics e Métricas

### Google Analytics

**Adicione no `<head>` do index.html:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
</script>
```

**Rastrear eventos:**
```javascript
// No envio do formulário
gtag('event', 'tag_solicitada', {
    'event_category': 'formulario',
    'event_label': dados.contribuinte,
    'value': 1
});
```

### Métricas Personalizadas

**No Apps Script:**
```javascript
function gerarEstatisticas() {
    const sheet = SpreadsheetApp.openById(PLANILHA_ID).getActiveSheet();
    const dados = sheet.getDataRange().getValues();
    
    const stats = {
        total: dados.length - 1, // Excluir cabeçalho
        contribuintes: 0,
        naoContribuintes: 0,
        porMes: {},
        porDia: {}
    };
    
    dados.slice(1).forEach(linha => {
        const contribuinte = linha[1];
        const data = linha[0];
        
        if (contribuinte === 'sim') stats.contribuintes++;
        if (contribuinte === 'nao') stats.naoContribuintes++;
        
        // Agrupar por mês
        if (data) {
            const mes = data.toString().substring(3, 10); // MM/yyyy
            stats.porMes[mes] = (stats.porMes[mes] || 0) + 1;
        }
    });
    
    console.log('📊 Estatísticas:', stats);
    return stats;
}
```

## 🔒 Segurança e Validações

### Validação de Dados

**No formulário:**
```javascript
function validarFormulario(dados) {
    const erros = [];
    
    if (!dados.nome || dados.nome.length < 2) {
        erros.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!dados.telefone || !/\(\d{2}\)\s\d{4,5}-\d{4}/.test(dados.telefone)) {
        erros.push('Telefone deve estar no formato (00) 00000-0000');
    }
    
    if (!dados.contribuinte) {
        erros.push('Informe se é contribuinte');
    }
    
    return erros;
}
```

### Rate Limiting

**No Apps Script:**
```javascript
function verificarRateLimit(ip) {
    const cache = CacheService.getScriptCache();
    const chave = `rate_limit_${ip}`;
    
    const tentativas = cache.get(chave) || 0;
    
    if (tentativas > 5) {
        throw new Error('Muitas tentativas. Tente novamente em 1 hora.');
    }
    
    cache.put(chave, parseInt(tentativas) + 1, 3600); // 1 hora
}
```

## 📱 Adaptações Mobile

### PWA (Progressive Web App)

**Adicione no `<head>`:**
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#28a745">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
```

**Arquivo `manifest.json`:**
```json
{
    "name": "TAG Condomínio",
    "short_name": "TAG",
    "description": "Sistema de retirada de TAGs",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#28a745",
    "icons": [
        {
            "src": "icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
```

## 🧪 Testes Automatizados

### Teste no Apps Script

```javascript
function executarTestes() {
    console.log('🧪 Iniciando testes...');
    
    const testes = [
        () => testarInsercaoDados(),
        () => testarValidacao(),
        () => testarBackup()
    ];
    
    let passou = 0;
    let falhou = 0;
    
    testes.forEach((teste, index) => {
        try {
            teste();
            console.log(`✅ Teste ${index + 1} passou`);
            passou++;
        } catch (error) {
            console.log(`❌ Teste ${index + 1} falhou:`, error);
            falhou++;
        }
    });
    
    console.log(`\n📊 Resultado: ${passou} passou, ${falhou} falhou`);
}

function testarInsercaoDados() {
    const dadosTeste = {
        nome: 'Teste Automatizado',
        telefone: '(11) 99999-9999',
        contribuinte: 'sim',
        cadastrado: 'sim'
    };
    
    // Simular inserção
    const resultado = doPost({
        postData: {
            contents: JSON.stringify(dadosTeste)
        }
    });
    
    const resposta = JSON.parse(resultado.getContent());
    if (!resposta.success) {
        throw new Error('Falha na inserção de dados');
    }
}
```

## 💡 Dicas de Performance

### Otimização do Apps Script

```javascript
// Use batch operations
function inserirDadosLote(dadosArray) {
    const sheet = SpreadsheetApp.openById(PLANILHA_ID).getActiveSheet();
    const valores = dadosArray.map(dados => [
        new Date().toLocaleString('pt-BR'),
        dados.contribuinte,
        dados.nome,
        dados.telefone
    ]);
    
    // Inserir todos de uma vez (mais eficiente)
    sheet.getRange(sheet.getLastRow() + 1, 1, valores.length, valores[0].length)
         .setValues(valores);
}
```

### Cache no Frontend

```javascript
// Cache de configurações
const configCache = {
    get: (key) => JSON.parse(localStorage.getItem(`config_${key}`)),
    set: (key, value) => localStorage.setItem(`config_${key}`, JSON.stringify(value)),
    clear: () => Object.keys(localStorage)
                       .filter(k => k.startsWith('config_'))
                       .forEach(k => localStorage.removeItem(k))
};
```

---

**Estes exemplos cobrem os casos de uso mais comuns. Adapte conforme necessário para seu condomínio específico.** 🏠✨