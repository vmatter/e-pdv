import { ChangeEventHandler, forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

interface NumberFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function currencyFormatter(value: any) {
  if (!Number(value)) return 'R$ 0,00';

  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);

  return amount;
}

export const NumberFormatCustom = forwardRef<
  NumberFormat,
  NumberFormatCustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format={currencyFormatter}
    />
  );
});

type Props = {
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  defaultValue?: number;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: boolean;
  id: string;
};

export const NumberInput = ({
  defaultValue,
  handleChange,
  disabled = false,
  label = 'Preço',
  placeholder = '',
  value,
  error = false,
  id = 'price',
}: Props) => {
  return (
    <TextField
      variant="standard"
      margin="dense"
      defaultValue={defaultValue ? defaultValue * 100 : 0}
      onChange={handleChange}
      name="price"
      label={label}
      placeholder={placeholder}
      id={id}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
      disabled={disabled}
      value={value}
      error={error}
    />
  );
};
