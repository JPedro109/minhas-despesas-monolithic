# Minhas Despesas - Back-end - Api

# Descrição da Aplicação
<p>🚀  Aplicação voltada para administração de despesas</p>

# Status da Aplicação
<p>🔥 Aplicação Finalizada</p>

# Features
- Cadastro de Usuário
- Atualização de Email
- Atualização de Senha
- Recuperação de Senha
- Exclusão de Usuário
- Leitura de Plano
- Criação de Despesas
- Atualização de Despesas
- Leitura de Despesas
- Exclusão de Despesas
- Pagamento de Despesas
- Desfazimento de Pagamento de Despesa
- Atualização de Despesas Pagas
- Criação de Histórico de Despesa
- Exclusão de Histórico de Despesa
- Criação do Método de Pagamento
- Leitura de Método de Pagamento
- Atualização do Cartão do Método de Pagamento
- Atualização do Nome do Método de Pagamento
- Exclusão do Método de Pagamento
- Criação de Assinatura
- Leitura de Assinatura
- Cancelamento de Assinatura
- Notificação de Falha da Renovação da Assinatura
- Criação de Extrato
- Leitura de Extrato
- Exclusão de Extratos Vencidos  

# Tecnologias
- Node
- Typescript
- SQS
- S3
- Postgres
- Jest

# Padrões Utilizados
- Clean Architecture
- SOLID
- Adapter
- Decorator

# Execução

Para executar a aplicação, instale as dependências com o comando abaixo:
```sh
  yarn install
```

Depois crie um arquivo .env com essas variáveis de ambiente:

```sh
NODE_ENV="development" # Ambiente de execução da aplicação

APP_URL="https://despesas.com" # URL que o cors irá utlizar para fazer sua validação, se o NODE_ENV for igual a development ela não é necessária

AWS_REGION="us-east-1" # Região da AWS
AWS_ACCESS_KEY_ID="test" # Access key da AWS
AWS_SECRET_ACCESS_KEY="test" # Secret key da AWS
AWS_BUCKET_NAME="test" # Nome do bucket onde ficarão armazenados os extratos
LOCALSTACK_ENDPOINT="http://localstack-minhas-despesas:4566" # Endpoint para utilização do Localstack

DATABASE_URL="postgresql://postgres:postgres@postgres-minhas-despesas:5432/expense?schema=public" # URL de conexão com o banco de dados

STRIPE_SECRET_KEY="" # Chave secreta para utilizar a Stripe
STRIPE_WEBHOOK_SECRET="" # Chave secreta para validar dados vindos do Webhook da stripe

PORT="3000" # Porta onde a aplicação será executada
 
JWT_KEY="secret-key"

EMAIL_PROVIDER_EMAIL="" # Email do provedor que irá enviar os e-mails
PASSWORD_PROVIDER_EMAIL="" # Senha do provedor que irá enviar os e-mails
HOST_PROVIDER_EMAIL="" # Host do servidor que irá enviar os e-mails
PORT_PROVIDER_EMAIL= # Porta do servidor que irá enviar os e-mails
SENDER_EMAIL="" # Nome do remetente do e-mail

BASIC_AUTHENTICATION_USER="user" # Usuário da autenticação básica
BASIC_AUTHENTICATION_PASSWORD="pass" # Senha da autenticação básica
```

Por último execute o comando para iniciar a aplicação:

```sh
  docker-compose up -d
```
