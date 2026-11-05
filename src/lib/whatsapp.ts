export const WHATSAPP_NUMBER = "5547996915026";
export const WHATSAPP_DISPLAY = "(47) 99691-5026";

export const wa = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const MSG = {
  geral: "Olá, Fronteira Refrigeração! Gostaria de solicitar um orçamento.",
  instalacao: "Olá! Gostaria de solicitar um orçamento para instalação de ar-condicionado.",
  manutencao: "Olá! Preciso de manutenção no meu ar-condicionado.",
  higienizacao: "Olá! Gostaria de solicitar uma higienização de ar-condicionado.",
  conserto: "Olá! Meu ar-condicionado está com problema e gostaria de um orçamento para conserto.",
  geladeira: "Olá! Preciso de assistência técnica para uma geladeira.",
  freezer: "Olá! Preciso de assistência técnica para um freezer.",
  lavar: "Olá! Gostaria de solicitar um orçamento para conserto de máquina de lavar.",
  expositor: "Olá! Preciso de manutenção em um expositor ou balcão refrigerado.",
  linhaBranca:
    "Olá! Gostaria de um orçamento de assistência técnica para um equipamento de refrigeração/linha branca.",
} as const;
