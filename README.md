<img src="./static/omnistack.png" align="center"></img>

<h1 align="center">Semana Omnistack 10.0</h1>
<p align="center">Projeto <strong>Dev Map (DevRadar)</strong> desenvolvido durante a Omnistack da Rocketseat</p>

## Requirementos

NodeJS, Yarn, MySQL, Expo

## Instalação do YARN

Windows: Aconselho a instalar o Yarn através do Chocolatey (Package Manager do Windows), pois será executar apenas o comando `choco install yarn`.
Se tens dúvidas de como instalar o Chocolatey, clica [Aqui](https://chocolatey.org/install)
Mac OS: Clica [Aqui](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
Debian: Clica [Aqui](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
CentOS: Clica [Aqui](https://yarnpkg.com/lang/en/docs/install/#centos-stable)

## Instalação do Projeto em Ambiente Local

Configuração do MySQL, eu pessoalmente utilizo WAMP, tendo o WAMP "verde" na Task bar abra o PHPMyAdmin e crie uma base de dados chamada "devmap" pode editar o ficheiro de configuração do MySQL em `/backend/app/config/db.config.js`
Para instalar as dependências e executar o **Servidor Backend** , clone o projeto e executa os comandos através da linha de comandos ou do Git Bash.

```bash
cd backend
yarn
yarn dev
```

Para instalar as dependências do **Frontend** executa os comandos:

```bash
cd frontend
yarn
yarn start
```

O projeto será aberto no seu Browser e a Consola do Backend estará aberta. Caso não abra sempre poderás introduzir o endereço local na barra de pesquisa seguido da porta `localhost:3000`.

Para testar o **Mobile** feito com React Native executa os comandos:

```bash
# NÃO é necessário executar a linha de baixo caso ja tenha o Expo (CLI) instalado!
yarn global add install expo-cli
cd mobile
yarn
yarn start
```

Assim que o processo terminar, automaticamente será aberta no seu navegador a página `localhost:19002`. Conecte seu emulador, ou teste o aplicativo por `LAN`: baixe o aplicativo _Expo_ da Play Store ou App Store e em seguida escaneie o código QR.

## Insomnia

Para testar a API do Dev Maps, baixe e instala o [Insomnia](https://insomnia.rest/download/) e faz import do meu arquivo em `./OmniStack Insomnia Requests` podes ver como fazer import através da Aba Import/Export quando clicas na Workspace.

<img align="center" src="./static/insomnia.png"></img>

## TODO

- Fix Update and Delete on Backend
- Make Buttons to Edit Dev / Delete

## Licença

[MIT](./LICENSE) &copy; [Rocketseat](https://rocketseat.com.br/)
