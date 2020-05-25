# Recuperação de Senha

**RF (Requisitos Funcionais)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar a sua senha;

**RNF (Requisitos não Funcionais)**

- Utilizar o mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES (Amazon Simple Email Service) para envios em produção;
- O envio de e-mails devem acontecer em segundo plano (background job);
Enquanto a nossa aplicação roda, teremos outro serviço em segundo plano rodando
o envio de email em uma fila paralela, assim não deixando o resto devagar.

**RN (Regras de negócio)**

- O link enviado por e-mail para resetar senha deve expirar em duas horas;
- O usuário precisa confirmar a nova senha ao trocar;

# Atualização do Perfil

**RF**

- O usuário deve poder atualizar o seu nome, email e senha;

**RNF**

**RN**

- O usuário não pode alterar o seu e-mail para um e-mail já utilizado;
- Para atualizar a sua senha, o usuário deve informar a senha antiga;
- Para atualizar a sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RFN**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;


**RFN**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar exatamente 1 hora;
- Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro horário as 8 e último as 17);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços com ele mesmo;
