# Sistema de Agendamento de Consultas

## 📌 Sobre o Projeto

Este projeto é um **sistema de agendamento de consultas** desenvolvido para um médico. O sistema permite que pacientes se cadastrem, façam login e, futuramente, realizem agendamentos de consultas.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Vue.js + Vite
- **Backend e Banco de Dados:** Firebase (Authentication + Firestore)
- **Gerenciamento de Estado:** VueUse

## 🏗️ Funcionalidades Desenvolvidas

### ✅ Cadastro e Login

- Autenticação de usuários usando Firebase Authentication.
- Persistência da sessão no navegador até o usuário sair ou após 1 hora.
- Coleta de informações adicionais no cadastro, incluindo:
  - Nome
  - CPF
  - Data de nascimento
  - Telefones de contato
  - CEP (com preenchimento automático via API)
  - Número e complemento do endereço (opcionais)
- Salvamento dos dados dos usuários na coleção `users` do Firestore.

## 🔜 Próximas Entregas

### 📌 2ª Sprint - Painel de Gestão

- Criar um painel onde a secretária pode:
  - **Visualizar, filtrar e gerenciar agendamentos**.
  - **Cadastrar agendamentos manualmente** para pacientes que ligam ou comparecem presencialmente.
  - **Definir e ajustar dias/horários disponíveis** para o médico.

### 📌 3ª Sprint - Agendamento e Consulta de Agendamentos

- Implementar a funcionalidade de **agendamento de consultas** para pacientes cadastrados.
- Criar uma tela para **visualização de agendamentos passados e futuros**.

### 📌 4ª Sprint - Reagendamento e Cancelamento

- Permitir que pacientes possam **alterar ou cancelar suas consultas** diretamente pelo sistema.