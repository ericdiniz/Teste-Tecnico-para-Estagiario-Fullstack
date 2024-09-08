# Teste Técnico para Estagiário Fullstack

## DECISÕES TOMADAS DURANTE O DESENVOLVIMENTO

1. Escolha das Tecnologias

- Frontend: React foi escolhido para construir a interface de usuário pela sua eficiência no gerenciamento de estados e renderização dinâmica de componentes. Também foi utilizada a Context API para gerenciar estados globais.
- Axios foi a biblioteca escolhida para realizar as requisições HTTP ao backend devido à sua simplicidade e suporte a promessas.
- Backend: Node.js com Express.js foi selecionado para construir a API REST. O Express foi escolhido pela sua flexibilidade e eficiência no desenvolvimento de aplicações backend em JavaScript.
- JWT (JSON Web Token) foi implementado para garantir a segurança na autenticação dos usuários, permitindo a criação de uma aplicação baseada em sessões seguras.
Banco de Dados:
- Inicialmente, MariaDB foi escolhido como banco de dados relacional. No entanto, devido a problemas de autenticação e compatibilidade, a decisão foi revertida para MySQL.
MySQL foi finalmente escolhido por sua popularidade, suporte robusto e ampla documentação.

2. Configuração do Ambiente

- Dotenv: Para garantir a segurança das credenciais e dados sensíveis, optou-se pelo uso de variáveis de ambiente através da biblioteca dotenv, permitindo a configuração de informações como a conexão com o banco de dados (usuário, senha, etc.) e chave secreta do JWT.

- Scripts de Inicialização: O backend foi configurado para ser executado com Nodemon, facilitando o desenvolvimento ao permitir a reinicialização automática da aplicação sempre que houver alterações nos arquivos.

3. Gestão de Erros

- Autenticação no MySQL: Ao migrar de MariaDB para MySQL, houve problemas relacionados à compatibilidade de autenticação (erro ER_NOT_SUPPORTED_AUTH_MODE). Foi decidido utilizar o método mysql_native_password para resolver esse problema de autenticação.
- Public Key Retrieval: No caso de conexão com MySQL, também foi necessário habilitar a opção allowPublicKeyRetrieval para permitir a recuperação da chave pública do banco de dados, necessária para realizar a autenticação.

4. Decisões de Arquitetura

- Divisão de Rotas e Controle: A aplicação foi desenvolvida de forma modular, separando as rotas de usuários e tarefas em diferentes arquivos de controle, seguindo boas práticas de separação de responsabilidades. Isso facilita a manutenção e expansão futura da aplicação.

- Validação de Dados: No backend, foi implementada a validação básica de dados para o cadastro de usuários e login, garantindo que as requisições ao banco fossem feitas de forma segura e que os dados estivessem completos.

5. Problemas Enfrentados e Soluções

- Migração de MariaDB para MySQL: Durante o desenvolvimento, enfrentou-se problemas de compatibilidade e autenticação com MariaDB, resultando na migração para MySQL.

- Problemas com Autenticação no MySQL: Durante a migração, enfrentou-se o erro ER_NOT_SUPPORTED_AUTH_MODE ao tentar conectar o MySQL com o Node.js. A solução foi a troca do método de autenticação para mysql_native_password com as permissões adequadas para o usuário root.

6. Segurança

- Uso do JWT: A segurança das rotas foi implementada através do JWT, garantindo que apenas usuários autenticados possam acessar e modificar tarefas.
Hashing de Senhas: Para aumentar a segurança dos usuários, as senhas foram armazenadas de forma segura utilizando o bcrypt.

7. Configuração do Banco de Dados

- Importação do Banco de Dados: Um arquivo SQL foi preparado para ser importado diretamente no MySQL. O comando foi documentado no README, explicando como importar o banco de dados usando mysql -u root -p gerenciadorTarefas < /caminho_para_arquivo/converted_for_mysql.sql.

8. Interface de Usuário

- Design Responsivo: O frontend foi desenvolvido para ser responsivo, garantindo que a interface funcione em diferentes tamanhos de tela. O foco foi em uma interface limpa e funcional para facilitar o gerenciamento de tarefas.

## Objetivo

Avaliar as habilidades técnicas básicas em desenvolvimento Fullstack utilizando React no frontend e Node.js no backend.

## Instruções Gerais

- **Entrega:** Enviar o código completo via repositório Git (GitHub, GitLab, etc.).
- **Documentação:** Incluir um README explicando como rodar o projeto e as decisões tomadas durante o desenvolvimento.

## Desafio: Criar uma Aplicação de Gerenciamento de Tarefas

Você deverá criar uma aplicação web simples que permita aos usuários gerenciar suas tarefas. A aplicação deve ter funcionalidades de criação, leitura, atualização e exclusão (CRUD) de tarefas.

## Requisitos Funcionais

- **Cadastro de Usuário:** O usuário deve ser capaz de se cadastrar com e-mail e senha. Implementar validação básica para e-mail e senha.
- **Autenticação:** Implementar login e logout de usuários utilizando JWT (JSON Web Token). Apenas usuários autenticados devem ter acesso às funcionalidades de gerenciamento de tarefas.
- **Gerenciamento de Tarefas:** Listar todas as tarefas do usuário autenticado. Adicionar novas tarefas com um título e uma descrição. Marcar tarefas como concluídas. Editar o título e a descrição de uma tarefa. Excluir uma tarefa.
- **Interface de Usuário:** A interface deve ser intuitiva e responsiva. Implementar a interface utilizando React. Utilizar hooks do React para gerenciar estado e efeitos colaterais.

## Requisitos Técnicos

- **Backend com Node.js:** Utilizar Express.js ou NestJS para criar uma API RESTful. Conectar o backend a um banco de dados (Mysql ou SQLite). Implementar autenticação e autorização utilizando JWT.
- **Frontend com React:** O frontend deve consumir a API criada no backend. Implementar gerenciamento de estado utilizando React (ou Context API). Implementar rotas com React Router (opcional, mas recomendado).
- **Testes (Opcional):** Implementar testes básicos para o backend (unitários e/ou de integração) e frontend.
- **Deploy (Opcional):** Fazer o deploy da aplicação em uma plataforma de sua escolha (Heroku, Vercel, etc.).

## Critérios de Avaliação

- **Funcionalidade:** O quanto da aplicação foi implementado e quão bem ela funciona.
- **Qualidade do Código:** Organização, legibilidade, e boas práticas de programação.
- **Documentação:** Clareza das instruções no README e qualidade dos comentários no código.
- **UX/UI:** Quão amigável e intuitiva é a interface do usuário. Lembre-se que menos é mais.
- **Testes:** Implementação de testes básicos e cobertura de casos de uso.
- **Extra:** Qualquer funcionalidade extra ou diferencial que você tenha implementado.
