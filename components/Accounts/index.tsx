import { useState } from 'react';
import { Button, TextField, Typography, Card } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import {
  Wrapper,
  HeaderWrapper,
  InputWrapper,
  FormHeader
} from './styles';

const Accounts = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showPersonError, setShowPersonError] = useState(false);
  const [name] = useState('');
  const [person, setPerson] = useState('');
  const [displayFisica, setDisplayFisica] = useState('none');
  const [displayJuridica, setDisplayJuridica] = useState('none');
  const [displayEstrangeiro, setDisplayEstrangeiro] = useState('none');

  const handleChange = (event: any) => {
    setPerson(event.target.value);

    if(event.target.value == "fisica"){
      setDisplayFisica('block');
      setDisplayJuridica('none');
      setDisplayEstrangeiro('none');
    }
    else if(event.target.value == "juridica"){
      setDisplayFisica('none');
      setDisplayJuridica('block');
      setDisplayEstrangeiro('none');
    }
    else if(event.target.value == "extrangeiro"){
      setDisplayFisica('none');
      setDisplayJuridica('none');
      setDisplayEstrangeiro('block');
    }

  };

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    if (name === '' || person === '') {
      name === '' && setShowNameError(true);
      person === '' && setShowPersonError(true);
    }

  };

  return (
    <Wrapper>
      <Card variant="outlined" elevation={2}>
        <HeaderWrapper>
          <FormHeader>
            <Typography variant="h4" paddingBottom={1}>
              Gerenciar pessoa
            </Typography>
            <Typography component="p">
              Informações Principais
            </Typography>
          </FormHeader>
        </HeaderWrapper>
        
        <Box></Box>
        <InputWrapper autoComplete="off">
          <TextField
            id="input-name"
            variant="outlined"
            type="text"
            name="name"
            label="Nome"
            placeholder="ex: João da Silva"
            fullWidth
            helperText={showNameError && 'Este campo deve ser preenchido.'}
            error={showNameError || showWarning}
            onChange={() => {
              setShowNameError(false);
              setShowWarning(false);
            }}
            inputProps={{
              'data-testid': 'input-name',
            }}
          />
          <TextField
            id="select-type-person"
            variant="outlined"
            name="typePerson"
            label="Tipo Pessoa"
            fullWidth
            value={person}
            select
            helperText={showPersonError && 'Este campo deve ser preenchido.'}
            error={showPersonError || showWarning}
            onChange={(e: any) => {
              setShowPersonError(false);
              setShowWarning(false);
              handleChange(e);
            }}
            inputProps={{
              'data-testid': 'select-type-person',
            }}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value={"fisica"}>Física</MenuItem>
            <MenuItem value={"juridica"}>Jurídica</MenuItem>
            <MenuItem value={"extrangeiro"}>Estrangeiro</MenuItem>
          </TextField>
        </InputWrapper>
        <Box
          id="box-fisica"
          display={displayFisica}
        >
          <InputWrapper autoComplete="off">
            <TextField
              id="input-cpf"
              variant="outlined"
              type="text"
              name="cpf"
              label="CPF"
              placeholder="ex: 999.999.999-99"
              fullWidth
              inputProps={{
                'data-testid': 'input-cpf',
              }}
            />
          </InputWrapper>
        </Box>

        <Box
          id="box-juridica"
          display={displayJuridica}
        >
          <InputWrapper autoComplete="off">
            <TextField
              id="input-cnpj"
              variant="outlined"
              type="text"
              name="cnpj"
              label="CNPJ"
              placeholder="ex: 99.999.999/9999-99"
              fullWidth
              inputProps={{
                'data-testid': 'input-cnpj',
              }}
            />
            <TextField
              id="input-razao-social"
              variant="outlined"
              type="text"
              name="razaoSocial"
              label="Razão Social"
              placeholder="Razão Social"
              fullWidth
              inputProps={{
                'data-testid': 'input-razao-social',
              }}
            />
            <TextField
              id="input-nome-fantasia"
              variant="outlined"
              type="text"
              name="nomeFantasia"
              label="Nome Fantasia"
              placeholder="Nome Fantasia"
              fullWidth
              inputProps={{
                'data-testid': 'input-nome-fantasia',
              }}
            />
          </InputWrapper>
        </Box>

        <Box
          id="box-fisica"
          display={displayEstrangeiro}
        >
          <InputWrapper autoComplete="off">
            <TextField
              id="input-passaporte"
              variant="outlined"
              type="text"
              name="passaporte"
              label="Nº Passaporte"
              placeholder="Nº Passaporte"
              fullWidth
              inputProps={{
                'data-testid': 'input-passaporte',
              }}
            />
            </InputWrapper>
        </Box>

        <InputWrapper>
          <Button
            id="button-save"
            data-testid="button-save"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Salvar
          </Button>
        </InputWrapper>
      </Card>
    </Wrapper>
  );
};

export default Accounts;
