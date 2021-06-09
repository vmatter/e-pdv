import { ChangeEventHandler, forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

interface NumberFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
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
      decimalSeparator=","
      prefix="R$"
      fixedDecimalScale
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
};

export const NumberInput = ({
  defaultValue,
  handleChange,
  disabled = false,
  label = 'Preço',
  placeholder = '',
  value,
  error = false,
}: Props) => {
  return (
    <TextField
      variant="standard"
      margin="dense"
      defaultValue={defaultValue?.toFixed(2).replace('.', ',')}
      onChange={handleChange}
      name="price"
      label={label}
      placeholder={placeholder}
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
      disabled={disabled}
      value={value}
      error={error}
    />
  );
};
