# SuperApp

## Visão Geral
O **SuperApp** é uma aplicação mobile desenvolvida em **React Native** utilizando o **Expo** para facilitar o acesso a diversos serviços públicos brasileiros. O aplicativo permite login único via **Gov.br**, possibilitando a navegação entre serviços como **Meu INSS, Cadastro Único e Carteira de Trabalho Digital** sem necessidade de múltiplas autenticações.

Mapa de funcionalidades: https://hammerconsult.github.io/dataprev-superapp/

Arquitetura de Solução Proposta:
!([https://i.ibb.co/d0rYkSY2/Ideacao-Arquitetural-Super-App-drawio-1.png](https://i.ibb.co/d0rYkSY2/Ideacao-Arquitetural-Super-App-drawio-1.png))

---

## 📌 Tecnologias Utilizadas

- **Linguagem**: JavaScript (ES6+)
- **Framework**: React Native
- **Gerenciador de Pacotes**: NPM/Yarn
- **Bibliotecas Principais**:
  - `react-native-webview` (para exibição de serviços Gov.br)
  - `react-navigation` (para navegação entre telas e menu lateral tipo Drawer)
  - `@react-native-async-storage/async-storage` (para persistência de sessão do usuário)
  - `expo` (para gerenciamento do ambiente de desenvolvimento)

---

## 📂 Estrutura do Projeto Proposta Para a V1:

```plaintext
📁 MeuWebViewApp/
 ┣ 📁 assets/                # Imagens e ícones
 ┣ 📁 src/                   # Código-fonte principal
 ┃ ┣ 📜 App.js               # Arquivo principal da aplicação
 ┃ ┣ 📜 TelaInicial.js       # Tela de entrada do app
 ┃ ┣ 📜 TelaLogin.js         # Tela de login via Gov.br
 ┃ ┣ 📜 TelaHome.js          # Tela principal com serviços disponíveis
 ┃ ┣ 📜 WebViewScreen.js     # Componente para abrir os serviços Gov.br
 ┃ ┣ 📜 DrawerNavigator.js   # Configuração do menu lateral
 ┃ ┣ 📜 styles.js            # Estilos centralizados
 ┣ 📜 package.json           # Dependências do projeto
 ┣ 📜 README.md              # Documentação
 ┗ 📜 app.json               # Configuração do Expo
```

---

## 🛠️ Configuração do Ambiente Local

### **Pré-requisitos**

1. **Node.js** instalado (versão 18+ recomendada)
2. **Expo CLI** instalado globalmente:
   ```sh
   npm install -g expo-cli
   ```
3. **Android Studio** (se quiser rodar em um emulador Android)
4. **Scrcpy** (se quiser espelhar um dispositivo Android real no PC)

---

### **Passo a Passo para Rodar Localmente**

1. Clone o repositório:
   ```sh
   git clone https://github.com/hammerconsult/dataprev-superapp/superapp.git
   cd superapp
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Inicie o Expo:
   ```sh
   npx expo start
   ```

4. Escolha onde rodar o app:
   - **Emulador Android**:
     ```sh
     npm run android
     ```
   - **iOS (Xcode necessário)**:
     ```sh
     npm run ios
     ```
   - **Navegador Web**:
     ```sh
     npm run web
     ```

---

### **Rodando no Celular via Scrcpy**

Se deseja espelhar seu celular no PC enquanto testa o app:

1. Instale o **Scrcpy**:
   ```sh
   sudo apt install scrcpy  # Linux
   choco install scrcpy     # Windows (via Chocolatey)
   ```
2. Conecte o celular via USB e habilite a **Depuração USB**.
3. Rode o comando:
   ```sh
   scrcpy
   ```
4. Agora o dispositivo aparecerá na tela do PC e você poderá interagir com o app!

---

## 🆕 Release Notes

### **Versão 1.0.0 - Lançamento Inicial**

🔹 **Autenticação Unificada:** Implementação do login via Gov.br, garantindo acesso único.
🔹 **Integração Completa:** Acesso direto aos serviços **Meu INSS, CadÚnico e CTPS Digital** via WebView.
🔹 **Menu Lateral Intuitivo:** Drawer Navigator para fácil navegação entre funcionalidades.
🔹 **Persistência de Sessão:** Mantém o usuário autenticado após login.
🔹 **Múltiplos Idiomas:** Suporte à troca de idioma na interface.
🔹 **Notificações e Ajustes Personalizados:** Configuração de alertas e preferências do usuário.

---

## 📌 Planejamento Futuro
✅ Melhorar a experiência do usuário com animações e transições mais fluidas.
✅ Implementar APIs oficiais para otimização e automação de processos.
✅ Suporte a **notificações push** para avisos de serviços e benefícios.
✅ Melhorar acessibilidade para leitores de tela e modo de alto contraste.

---

🚀 Desenvolvido com ❤️ pela equipe  **hammer**!

