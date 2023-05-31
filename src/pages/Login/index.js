import { Button } from '@material-ui/core';
import { Container, Titulo, InputContainer } from './styles';
import { Input, InputLabel, InputAdornment } from '@material-ui/core';
import { useContext } from 'react';
import { UsuarioContext } from '../../common/contexts/Usuario';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { nome, setNome, saldo, setSaldo } = useContext(UsuarioContext);
  
  return (
    <Container>
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          value={saldo}
          type="number"
          onChange={event => setSaldo(Number(event.target.value))}
          startAdornment={
            <InputAdornment position="start">
              R$
            </InputAdornment>
          }
        />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={nome.length < 4}
        onClick={() => navigate('/feira')}
      >
        Avançar
      </Button>
    </Container>
  )
};

export default Login;