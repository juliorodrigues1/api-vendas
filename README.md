# API Vendas

Este é um projeto de API para vendas desenvolvido em Node.js. O projeto utiliza o framework Express.js e o banco de dados PostgreSQL. O objetivo é fornecer uma API para gerenciamento de vendas e produtos.

## Pré-requisitos
- Node.js instalado em seu sistema. Você pode obtê-lo em https://nodejs.org/en/download/
- PostgreSQL instalado em seu sistema. Você pode obtê-lo em https://www.postgresql.org/download/

## Instalação

1. Faça o download ou clone o repositório do projeto do GitHub.
2. Navegue até a pasta raiz do projeto.
3. Abra o terminal ou prompt de comando na pasta raiz do projeto.
4. Execute o seguinte comando para instalar as dependências do projeto:

npm install



Isso instalará todas as dependências listadas no arquivo `package.json` do projeto.

5. Configure o arquivo `typeormconfig.json`:

- Crie um arquivo `typeormconfig.json` na pasta raiz do projeto.
- Adicione as seguintes informações ao arquivo:


  {
    "type": "",
    "host": "localhost",
    "port": 1234,
    "username": "",
    "password": "",
    "database": "",
    "entities": [
        "./src/modules/**/typeorm/entities/*.ts"
    ],
    "migrations": [
        "./src/shared/typeorm/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/shared/typeorm/migrations"
    }
}


  Substitua `<host>`, `<porta>`, `<usuário>`, `<senha>` e `<nome_do_banco>` pelas informações de conexão do seu banco de dados PostgreSQL.

6. Crie as tabelas no banco de dados:

- Execute o seguinte comando para criar as tabelas no banco de dados:


  npm run typeorm migration:run


## Executando o projeto

Depois que todas as dependências forem instaladas e as tabelas forem criadas no banco de dados, você poderá executar o projeto com o seguinte comando:

npm run dev
