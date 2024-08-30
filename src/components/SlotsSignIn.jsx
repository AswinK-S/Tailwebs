import * as React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Container,
  Box,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const providers = [{ id: 'credentials', name: 'Email and Password' }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Username"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
      sx={{
        '& .MuiInputBase-input': { color: 'white' },  // Text color inside the input field
        '& .MuiInputLabel-root': { color: 'white' },  // Label color
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },  // Border color
      }}
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2, color: 'white' }} fullWidth variant="outlined"  >
      <InputLabel size="small" htmlFor="outlined-adornment-password" sx={{ color: 'white' }} >
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end" sx={{ color: 'white' }} >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
              sx={{ color: 'white' }}
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton >
          </InputAdornment>
        }
        label="Password"
        sx={{

          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        }}
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2, color: 'white', borderColor: 'white' }}
    >
      Sign In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2" sx={{ color: 'white' }}>
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2" sx={{ color: 'white' }}>
      Forgot password?
    </Link>
  );
}

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
});

export default function SlotsSignIn() {
  // const theme = useTheme();  
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppProvider theme={theme}>
          <Box
            sx={{

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '35px'

            }}
          >
            <Container
              maxWidth="xs"
              sx={{
                backgroundColor: 'rgba(252, 252, 252, 0)',
                padding: theme.spacing(4),
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[5],
              }}
            >
              <SignInPage

                signIn={(provider, formData) =>
                  alert(
                    `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
                  )
                }
                slots={{
                  emailField: CustomEmailField,
                  passwordField: CustomPasswordField,
                  submitButton: CustomButton,
                  signUpLink: SignUpLink,
                  forgotPasswordLink: ForgotPasswordLink,
                }}
                providers={providers}
              />
            </Container>
          </Box>
        </AppProvider>
      </ThemeProvider>

    </>
  );
}
