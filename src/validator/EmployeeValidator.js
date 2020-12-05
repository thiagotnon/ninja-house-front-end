import mensagens from "./mensagens";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  user_id: {
    required: mensagens.required,
  },
  period: {
    required: mensagens.required,
  },
  entry_time: {
    required: mensagens.required,
  },
  departure_time: {
    required: mensagens.required,
  },
};
