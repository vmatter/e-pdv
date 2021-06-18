import Button from '@material-ui/core/Button';
import { FormActions, InfoItem, InfoWrapper, SummaryWrapper } from '../styles';

export type SummaryProps = {
  cartCount: number;
  formattedTotalPrice: string;
  cartEmpty: boolean;
  loading: boolean;
  clearCart: () => void;
  totalPrice: number;
};

export const Summary = ({
  cartCount,
  formattedTotalPrice,
  cartEmpty,
  loading,
  clearCart,
  totalPrice
}: SummaryProps) => {
  return (
    <SummaryWrapper>
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
          disabled={cartEmpty || loading || totalPrice < 0.5}
        >
          Finalizar Compra
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={clearCart}
          disabled={!cartCount}>
          Limpar Carrinho
        </Button>
      </FormActions>
    </SummaryWrapper>
  );
};
