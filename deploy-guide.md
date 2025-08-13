# 🚀 Guia de Deploy - Sistema de Retirada de TAGs

Este guia te ajudará a publicar o sistema completo no GitHub Pages em poucos passos.

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Google Apps Script configurado
- ✅ Planilha Google Sheets acessível
- ✅ Todos os arquivos do sistema

## 🔧 Passo a Passo - Deploy Completo

### 1. Criar Repositório no GitHub

1. **Acesse:** [github.com](https://github.com)
2. **Clique em:** "New repository" (botão verde)
3. **Configure:**
   - Repository name: `sistema-tag-condominio`
   - Description: `Sistema de retirada de TAGs - Vivendas do Cachamorra`
   - ✅ Public
   - ✅ Add a README file
4. **Clique em:** "Create repository"

### 2. Upload dos Arquivos

**Opção A - Via Interface Web:**
1. **No repositório criado**, clique em "uploading an existing file"
2. **Arraste os arquivos:**
   - `index.html`
   - `config.js`
   - `README.md`
   - `deploy.md`
3. **Add commit message:** "Sistema completo de retirada de TAGs"
4. **Clique em:** "Commit changes"

**Opção B - Via Git Command Line:**
```bash
git clone https://github.com/seuusuario/sistema-tag-condominio.git
cd sistema-tag-condominio
# Copie os arquivos para esta pasta
git add .
git commit -m "Sistema completo de retirada de TAGs"
git push origin main
```

### 3. Ativar GitHub Pages

1. **No repositório**, vá em **Settings** (aba superior)
2. **Role até "Pages"** (menu lateral esquerdo)
3. **Configure:**
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
4. **Clique em:** "Save"
5. **Aguarde alguns minutos** - GitHub processará o deploy

### 4. Verificar Deploy

1. **GitHub mostrará a URL:** `https://seuusuario.github.io/sistema-tag-condominio`
2. **Acesse a URL** para testar o formulário
3. **Verifique se tudo funciona:**
   - ✅ Formulário carrega
   - ✅ Botões funcionam
   - ✅ Envio para planilha funciona

## 🔧 Configurações Finais

### Atualizar URLs no Sistema

**No arquivo `index.html`, linha ~350:**
```javascript
const SCRIPT_URL = 'SUA_URL_DO_APPS_SCRIPT_AQUI';
```

**Substitua por:**
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwsT_Ayrws1Yy35i6btXFBCWGL8W-D3M9oQkqkAn1P6Pvy9JdrrFJKdj5N1fl6tP-KoyQ/exec';
```

### Testar Integração

1. **Acesse o formulário** via GitHub Pages
2. **Preencha os dados** de teste
3. **Envie o formulário**
4. **Verifique na planilha** se os dados chegaram

## 📱 URLs Finais do Sistema

Após o deploy, você terá:

- **🌐 Formulário:** `https://seuusuario.github.io/sistema-tag-condominio`
- **📊 Planilha:** `https://docs.google.com/spreadsheets/d/12RrI7hj6crhZhKyxAdK8Y9c5yraZEn6I5oZk-JqMBIg/edit`
- **⚙️ Apps Script:** `https://script.google.com/home/projects/seu-projeto`

## 🔄 Atualizações Futuras

### Para fazer mudanças no sistema:

**Opção A - Via GitHub Web:**
1. **Clique no arquivo** que quer editar
2. **Clique no ícone de lápis** (Edit)
3. **Faça as alterações**
4. **Commit changes**

**Opção B - Via Git:**
```bash
git pull origin main
# Edite os arquivos localmente
git add .
git commit -m "Atualização do sistema"
git push origin main
```

### Tipos de atualizações comuns:

**Mudança de design:**
- Edite o CSS no `index.html`

**Novos campos:**
- Atualize `index.html` e `apps-script.js`

**Configurações:**
- Modifique `config.js`

## 🛡️ Segurança e Backup

### Backup dos dados:

1. **Planilha:** Faça download regularmente
2. **Apps Script:** Copie o código para arquivo local
3. **Repositório:** GitHub já serve como backup

### Controle de acesso:

1. **Planilha:** Apenas editores autorizados
2. **Apps Script:** Propriedade da conta administrativa
3. **GitHub:** Repositório público (código aberto)

## 🆘 Problemas Comuns

### GitHub Pages não carrega

**Soluções:**
1. Aguardar até 10 minutos
2. Verificar se o arquivo se chama `index.html`
3. Checar se está na branch "main"

### Formulário não envia

**Soluções:**
1. Verificar URL do Apps Script
2. Testar Apps Script separadamente
3. Verificar console do navegador (F12)

### Dados não chegam na planilha

**Soluções:**
1. Verificar permissões da planilha
2. Testar função `testarSistema` no Apps Script
3. Verificar ID da planilha no código

## 📞 Suporte

### Para dúvidas técnicas:

1. **Verificar logs** do Apps Script
2. **Usar console** do navegador (F12)
3. **Testar cada parte** separadamente

### Documentação oficial:

- [GitHub Pages](https://pages.github.com/)
- [Google Apps Script](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)

## ✅ Checklist Final

Antes de considertar o deploy completo:

- [ ] Repositório criado no GitHub
- [ ] Todos os arquivos enviados
- [ ] GitHub Pages ativado
- [ ] URL do formulário funcionando
- [ ] Apps Script configurado
- [ ] Planilha recebendo dados
- [ ] Teste completo realizado
- [ ] URLs documentadas para equipe

## 🎉 Deploy Concluído!

Parabéns! Seu sistema está agora online e funcional. 

**Próximos passos:**
1. Compartilhar URL com moradores
2. Treinar equipe administrativa
3. Monitorar primeiras solicitações
4. Ajustar conforme necessário

---

**Sistema desenvolvido para facilitar a gestão de TAGs do condomínio.** 🏠✨