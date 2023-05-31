import {
  Button,
  MenuItem,
  Select,
  Snackbar,
  InputLabel,
} from "@mui/material";
import MuiAlert from "@mui/lab/Alert";
import { useCarrinhoContext } from "../../common/contexts/Carrinho";
import Produto from "../../components/Produto";
import { useContext, useMemo, useState } from "react";
import {
  Container,
  Voltar,
  TotalContainer,
  PagamentoContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../../common/contexts/Usuario";
import { usePagamento } from "../../common/contexts/Pagamento";

function Carrinho() {
  const {
    carrinho,
    quantidadeCarrinho,
    comprar,
    valorTotal = 0,
  } = useCarrinhoContext();
  const { saldo = 0 } = useContext(UsuarioContext);
  const {
    formaPagamento,
    mudarFormaPagamento,
    tipoPagamento = [],
  } = usePagamento();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const total = useMemo(() => saldo - valorTotal, [saldo, valorTotal]);

  return (
    <Container>
      <Voltar onClick={() => navigate(-1)} />
      <h2>Carrinho</h2>
      {carrinho.map((produto) => (
        <Produto {...produto} key={produto.id} />
      ))}

      <PagamentoContainer>
        <InputLabel>Forma de Pagamento</InputLabel>

        <Select
          value={formaPagamento.id}
          onChange={(event) => mudarFormaPagamento(event.target.value)}
        >
          {tipoPagamento.map((pagamento) => (
            <MenuItem value={pagamento.id} key={pagamento.id}>
              {pagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>

      <TotalContainer>
        <h3>Valor Total: R$ {valorTotal.toFixed(2)}</h3>
        <h3>Saldo Atual: R$ {saldo.toFixed(2)}</h3>
        <h3>Saldo Restante: R$ {total.toFixed(2)}</h3>
      </TotalContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (total >= 0) {
            comprar();
            setOpenSnackbar(true);
          } else {
            alert("Saldo insuficiente.");
          }
        }}
      >
        Finalizar Compra
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Compra realizada com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Carrinho;
