import Carrinho from "./pages/Carrinho";
import Feira from "./pages/Feira";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsuarioProvider from "./common/contexts/Usuario";
import { PagamentoProvider } from "./common/contexts/Pagamento";
import { CarrinhoProvider } from './common/contexts/Carrinho';

export default function App() {
  return (
    <Router>
      <UsuarioProvider>
        <CarrinhoProvider>
          <PagamentoProvider>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/feira" element={<Feira />} />
                  <Route path="/carrinho" element={<Carrinho />} />
              </Routes>
            </PagamentoProvider>
        </CarrinhoProvider>
      </UsuarioProvider>
    </Router>
  );
}
