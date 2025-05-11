/// <reference types="vite/client" />
interface IUserInfo {
  name: "",
  cpf: "",
  birth: "",
  phone1: "",
  phone2?: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  email: "",
  }

  interface Agendamento {
    id: number
    paciente: string
    doutor: string
    especialidade: string
    data: string
    horario: string
    tipo: string
    observacoes?: string
    status?: string
  }