
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FormWrapper, InputWrapper } from "./styles";


const LoginForm = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loggedIn && router.push('/');
  }, [loggedIn]);


  const onSubmit = async (e: any) => {
    e?.preventDefault();

    setLoading(true);
    console.log(`email`, email);
    console.log(`password`, password);

    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true)
    }, 2000)

  }

  return (
    <FormWrapper>
      <Typography variant="h5" component="h2">
        e-PDV Sign In
      </Typography>
      <InputWrapper>
        <TextField
          id="input-email"
          data-testid="input-email"
          variant="outlined"
          name="username"
          label="username"
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="input-password"
          data-testid="input-password"
          variant="outlined"
          type="password"
          name="password"
          label="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <Button
          id="button-login"
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={onSubmit}
        >
          Login
      </Button>
      </InputWrapper>
    </FormWrapper>
  )
}

export default LoginForm