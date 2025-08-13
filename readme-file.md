# 🏠 Sistema de Retirada de TAGs - Condomínio

Sistema web completo para gerenciar solicitações de TAGs de acesso do condomínio, integrado com Google Sheets para controle administrativo.

## 📋 Funcionalidades

- ✅ **Formulário inteligente** que diferencia contribuintes de não-contribuintes
- ✅ **Integração automática** com Google Sheets para armazenamento de dados
- ✅ **Interface responsiva** que funciona em computadores e celulares
- ✅ **Validação de dados** com máscaras e campos obrigatórios
- ✅ **Controle de fluxo** direcionando não-cadastrados para formulário completo
- ✅ **Design profissional** e fácil de usar

## 🚀 Como Instalar

### 1. Configurar o Google Apps Script

1. **Acesse:** [script.google.com](https://script.google.com)
2. **Clique em:** "+ Novo projeto"
3. **Apague o código padrão** e cole o conteúdo do arquivo `apps-script.js`
4. **Salve o projeto** (Ctrl+S) e renomeie para "Webhook TAG Sistema"
5. **Clique em "Implantar"** > "Nova implantação"
6. **Selecione tipo:** "Aplicativo da web"
7. **Configure:**
   - Executar como: "Eu"
   - Quem tem acesso: "Qualquer pessoa"
8. **Clique em "Implantar"** e autorize as permissões
9. **Copie a URL** gerada (ex: `https://script.google.com/macros/s/AKfycb.../exec`)

### 2. Configurar a Planilha Google Sheets

1. **Acesse:** [sheets.google.com](https://sheets.google.com)
2. **Abra a planilha:** [Planilha do Condomínio](https://docs.google.com/spreadsheets/d/12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg/edit)
3. **Verifique se você tem acesso** de edição à planilha
4. **O sistema criará automaticamente** a aba "Solicitações TAG" se necessário

### 3. Configurar o Formulário

1. **Abra o arquivo** `index.html`
2. **Localize a linha 350:** `const SCRIPT_URL = '...'`
3. **Substitua pela URL** que você copiou do Apps Script
4. **Salve o arquivo**

### 4. Publicar no GitHub Pages

1. **Crie um repositório** no GitHub
2. **Faça upload** dos arquivos:
   - `index.html`
   - `README.md`
3. **Vá em Settings** > Pages
4. **Selecione:** Source "Deploy from a branch"
5. **Branch:** main
6. **Pasta:** / (root)
7. **Save**

Seu formulário estará disponível em: `https://seuusuario.github.io/nome-do-repositorio`

## 📊 Como Funciona

### Fluxo do Usuário

1. **Acessa o formulário** via navegador
2. **Informa se é contribuinte** do condomínio
3. **Verifica se já está cadastrado** no sistema
4. **Se cadastrado:** Confirma dados (nome + telefone) e solicita TAG
5. **Se não cadastrado:** É direcionado para o formulário completo do Google Forms
6. **Recebe confirmação** de que a solicitação foi registrada

### Fluxo da Administração

1. **Recebe os dados** automaticamente na planilha Google Sheets
2. **Visualiza informações:** Data, nome, telefone, status de contribuinte
3. **Contata o morador** para agendar retirada da TAG
4. **Atualiza o status** na planilha conforme necessário

## 🔧 Configurações Avançadas

### Personalizar o Formulário

**Alterar dados do condomínio:**
- Linha 23: Título do cabeçalho
- Linha 24: Nome da associação
- Linha 245: Link do Google Forms para cadastro completo

**Modificar campos:**
- Edite as seções HTML entre as linhas 50-200
- Ajuste a validação JavaScript nas linhas 350-450

### Personalizar o Apps Script

**Alterar planilha de destino:**
- Linha 35: Substitua o `PLANILHA_ID` pelo ID da sua planilha

**Adicionar notificações por email:**
- Descomente a linha 131 e configure o email da administração
- A função `notificarNovaTag()` enviará emails automáticos

**Customizar campos da planilha:**
- Linhas 55-67: Modifique os cabeçalhos
- Linhas 70-82: Ajuste os dados inseridos

## 🛠️ Estrutura dos Arquivos

```
projeto/
├── index.html          # Formulário principal
├── apps-script.js      # Código do Google Apps Script
└── README.md          # Esta documentação
```

## 📱 URLs Importantes

- **Formulário:** https://seuusuario.github.io/repositorio
- **Planilha:** https://docs.google.com/spreadsheets/d/12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg/edit
- **Apps Script:** https://script.google.com/home/projects/seu-projeto
- **Google Forms:** https://forms.gle/YtRhUQSupNXgK7NQA

## 🐛 Solução de Problemas

### Formulário não envia dados

1. **Verifique se a URL do Apps Script** está correta no `index.html`
2. **Teste o Apps Script** executando a função `testarSistema`
3. **Verifique permissões** da planilha Google Sheets

### Erro "Failed to fetch"

1. **Reimplante o Apps Script** com "Nova versão"
2. **Verifique se está marcado** "Qualquer pessoa" no acesso
3. **Teste a URL do Apps Script** diretamente no navegador

### Dados não aparecem na planilha

1. **Verifique se o ID da planilha** está correto no Apps Script
2. **Confira se você tem permissão** de edição na planilha
3. **Veja os logs do Apps Script** para identificar erros

## 📞 Suporte Técnico

Para dúvidas técnicas:
1. **Verifique os logs** do Google Apps Script
2. **Teste cada componente** separadamente
3. **Consulte a documentação** do Google Apps Script

## 📄 Licença

Este projeto foi desenvolvido para uso específico da **Associação Vivendas do Cachamorra**. 

---

**Desenvolvido para facilitar o controle de TAGs e melhorar a gestão do condomínio.** 🏠✨