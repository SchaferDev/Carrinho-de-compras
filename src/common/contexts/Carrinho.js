import { createContext, useContext, useEffect, useState } from 'react';
import { UsuarioContext } from './Usuario';
import { usePagamento } from './Pagamento';

const CarrinhoContext = createContext();

function CarrinhoProvider({ children }) {
  const { saldo, setSaldo } = useContext(UsuarioContext);
  const [carrinho, setCarrinho] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const novoValorTotal = carrinho.reduce((total, item) => {
      return total + item.valor * item.quantidade;
    }, 0);

    setValorTotal(novoValorTotal);
  }, [carrinho]);

  const quantidadeCarrinho = carrinho.reduce((total, item) => total + item.quantidade, 0);

  const adicionarProduto = (produto) => {
    const itemNoCarrinho = carrinho.find((item) => item.id === produto.id);

    if (itemNoCarrinho) {
      const novoCarrinho = carrinho.map((item) => {
        if (item.id === produto.id) {
          return { ...item, quantidade: item.quantidade + 1 };
        } else {
          return item;
        }
      });
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerProduto = (produtoId) => {
    const itemNoCarrinho = carrinho.find((item) => item.id === produtoId);

    if (itemNoCarrinho && itemNoCarrinho.quantidade > 1) {
      const novoCarrinho = carrinho.map((item) => {
        if (item.id === produtoId) {
          return { ...item, quantidade: item.quantidade - 1 };
        } else {
          return item;
        }
      });
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho(carrinho.filter((item) => item.id !== produtoId));
    }
  };

  const comprar = () => {
    setSaldo(saldo - valorTotal);
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        valorTotal,
        adicionarProduto,
        removerProduto,
        comprar,
        quantidadeCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

function useCarrinhoContext() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinhoContext must be used within a CarrinhoProvider');
  }
  return context;
}

export { CarrinhoProvider, useCarrinhoContext };
