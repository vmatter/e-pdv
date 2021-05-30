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
        console.log(`values`, values);
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalSeparator="."
      prefix="R$"
      fixedDecimalScale
    />
  );
});

type Props = {
  defaultValue: number;
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  disabled: boolean;
};

export const NumberInput = ({
  defaultValue,
  handleChange,
  disabled,
}: Props) => {
  return (
    <TextField
      variant="standard"
      margin="dense"
      defaultValue={defaultValue}
      onChange={handleChange}
      name="price"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
      disabled={disabled}
    />
  );
};
