import { Nav } from './styles';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from '../../../common/contexts/Carrinho';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { quantidadeCarrinho } = useCarrinhoContext();
  const navigate = useNavigate();
  return (
    <Nav>
      <Logo />
      <IconButton
        onClick={() => navigate('/carrinho')}
        disabled={quantidadeCarrinho === 0}
      >
        <Badge
          badgeContent={quantidadeCarrinho}
          color="primary"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}