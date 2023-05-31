import { createContext, useContext, useState } from "react";

const PagamentoContext = createContext();
PagamentoContext.displayName = 'Pagamento';

export function PagamentoProvider({ children }) {
  const tipoPagamento = [
    {
      nome: "Dinheiro",
      juros: 1,
      id: 1,
    },
    {
      nome: "Cartão de crédito",
      juros: 1.3,
      id: 2,
    },
    {
      nome: "PIX",
      juros: 1,
      id: 3,
    },
    {
      nome: "Boleto",
      juros: 1.5,
      id: 4,
    },
  ];

  const [formaPagamento, setFormaPagamento] = useState(tipoPagamento[0]);

  return (
    <PagamentoContext.Provider
      value={{
        formaPagamento,
        setFormaPagamento,
        tipoPagamento,
      }}
    >
      {children}
    </PagamentoContext.Provider>
  );
}

export function usePagamento() {
  const { formaPagamento, setFormaPagamento, tipoPagamento } =
    useContext(PagamentoContext);

  function mudarFormaPagamento(id) {
    const formaNova = tipoPagamento.find((pagamento) => pagamento.id === id);
    setFormaPagamento(formaNova);
  }

  return {
    formaPagamento,
    mudarFormaPagamento,
    tipoPagamento,
  };
}
