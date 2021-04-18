import Button from '@material-ui/core/Button';
import { FormActions, InfoItem, InfoWrapper, SummaryWrapper } from '../styles';

type Props = {
  cartCount: number;
  formattedTotalPrice: string;
  cartEmpty: boolean;
  loading: boolean;
  clearCart: () => void;
  isMobile: boolean;
};

export const Summary = ({
  cartCount,
  formattedTotalPrice,
  cartEmpty,
  loading,
  clearCart,
  isMobile,
}: Props) => {
  return (
    <SummaryWrapper isMobile={isMobile}>
      <InfoWrapper>
        <InfoItem>
          <strong>Total de Itens:</strong> {cartCount}
        </InfoItem>
        <InfoItem>
          <strong>Valor Total:</strong> {formattedTotalPrice}
        </InfoItem>
      </InfoWrapper>
      <FormActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={cartEmpty || loading}
        >
          Finalizar Compra
        </Button>
        <Button variant="contained" color="secondary" onClick={clearCart}>
          Limpar Carrinho
        </Button>
      </FormActions>
    </SummaryWrapper>
  );
};
