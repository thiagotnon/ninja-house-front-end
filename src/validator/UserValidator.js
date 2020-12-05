import mensagens from "./mensagens";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  username: {
    required: mensagens.required,
    minLength: {
      value: 2,
      message: mensagens.minLength + " (mínimo de 2 caracteres)",
    },
    maxLength: {
      value: 50,
      message: mensagens.maxLength + " (máximo de 50 caracteres)",
    },
  },
  phone: {
    required: mensagens.required,
  },
  rg: {
    required: mensagens.required,
  },
  cpf: {
    required: mensagens.required,
  },
  email: {
    required: mensagens.required,

    maxLength: {
      value: 100,
      message: mensagens.maxLength + " (máximo de 100 caracteres)",
    },
  },
  telefone: {
    minLength: {
      value: 15,
      message: mensagens.minLength + " (mínimo de 15 caracteres)",
    },
    maxLength: {
      value: 16,
      message: mensagens.maxLength + " (máximo de 16 caracteres)",
    },
  },
  password: {
    required: mensagens.required,
  },
};
