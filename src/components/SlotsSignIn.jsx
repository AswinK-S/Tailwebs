// import React, { useState } from 'react';
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   TextField,
//   InputAdornment,
//   Link,
//   IconButton,
//   Container,
//   Box,
// } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { AppProvider, SignInPage } from '@toolpad/core';
// // import { useTheme } from '@mui/material/styles';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axiosApi from '../service/api';


// const providers = [{ id: 'credentials', name: 'Email and Password' }];




// function CustomEmailField() {
//   return (
//     <TextField
//       id="input-with-icon-textfield"
//       label="Username"
//       name="email"
//       type="email"
//       size="small"
//       required
//       fullWidth
//       slotProps={{
//         input: {
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle fontSize="inherit" />
//             </InputAdornment>
//           ),
//         },
//       }}
//       variant="outlined"
//       sx={{
//         '& .MuiInputBase-input': { color: 'white' },  // Text color inside the input field
//         '& .MuiInputLabel-root': { color: 'white' },  // Label color
//         '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },  // Border color
//       }}
//     />
//   );
// }

// function CustomPasswordField() {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <FormControl sx={{ my: 2, color: 'white' }} fullWidth variant="outlined"  >
//       <InputLabel size="small" htmlFor="outlined-adornment-password" sx={{ color: 'white' }} >
//         Password
//       </InputLabel>
//       <OutlinedInput
//         id="outlined-adornment-password"
//         type={showPassword ? 'text' : 'password'}
//         name="password"
//         size="small"
//         endAdornment={
//           <InputAdornment position="end" sx={{ color: 'white' }} >
//             <IconButton
//               aria-label="toggle password visibility"
//               onClick={handleClickShowPassword}
//               onMouseDown={handleMouseDownPassword}
//               edge="end"
//               size="small"
//               sx={{ color: 'white' }}
//             >
//               {showPassword ? (
//                 <VisibilityOff fontSize="inherit" />
//               ) : (
//                 <Visibility fontSize="inherit" />
//               )}
//             </IconButton >
//           </InputAdornment>
//         }
//         label="Password"
//         sx={{

//           '& .MuiInputBase-input': { color: 'white' },
//           '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
//         }}
//       />
//     </FormControl>
//   );
// }

// function CustomButton({handleSubmit}) {
//   return (
//     <Button
//       type="submit"
//       variant="outlined"
//       color="info"
//       size="small"
//       disableElevation
//       fullWidth
//       sx={{ my: 2, color: 'white', borderColor: 'white' }}
//       onClick={handleSubmit}
//     >
//       Sign In
//     </Button>
//   );
// }

// function SignUpLink() {
//   return (
//     <Link href="/" variant="body2" sx={{ color: 'white' }}>
//       Sign up
//     </Link>
//   );
// }

// function ForgotPasswordLink() {
//   return (
//     <Link href="/" variant="body2" sx={{ color: 'white' }}>
//       Forgot password?
//     </Link>
//   );
// }

// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           color: 'white',
//         },
//       },
//     },
//   },
// });

// export default function SlotsSignIn() {
//   // const theme = useTheme();  


//   const [email,setEmail] =useState('')
//   const [password,setPassword] = useState('')

//   const handleSubmit =async(e)=>{
//     e.preventDefault()
//     try {

//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <AppProvider theme={theme}>
//           <Box
//             sx={{

//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               margin: '25px'

//             }}
//           >
//             <Container
//               maxWidth="xs"
//               sx={{
//                 backgroundColor: 'rgba(252, 252, 252, 0.2)',
//                 padding: theme.spacing(4),
//                 borderRadius: theme.shape.borderRadius,
//                 boxShadow: theme.shadows[5],
//               }}
//             >
//               <SignInPage
//                 signIn={(provider, formData) =>
//                   alert(
//                     `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
//                   )
//                 }
//                 slots={{
//                   emailField: CustomEmailField,
//                   passwordField: CustomPasswordField,
//                   submitButton: CustomButton,
//                   signUpLink: SignUpLink,
//                   forgotPasswordLink: ForgotPasswordLink,
//                 }}
//                 providers={providers}
//               />
//             </Container>
//           </Box>
//         </AppProvider>
//       </ThemeProvider>

//     </>
//   );
// }


import { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Box,
  Link,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosApi from '../service/api';

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

export default function CustomSignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axiosApi.post('/api/login', formData);
        console.log('Sign in successful', response.data);

      } catch (error) {
        console.error('Sign in failed', error.response?.data || error.message);
        setErrors({ submit: 'Sign in failed. Please check your credentials.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '25px',

        }}
      >

        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: 'rgba(252, 252, 252, 0.4)',
            padding: theme.spacing(6),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
          }}
        >
          <Typography component="h6" variant="h6" align="center" sx={{  color: 'black' ,fontSize:'15px'}}>
            Teacher's
          </Typography>

          <Typography component="h1" variant="h5" align="center" sx={{ mb: 3, color: 'white' ,fontSize:'35px'}}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="small" sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              }}
            />

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="password" sx={{ color: 'white' }}>Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: 'white' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                sx={{
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                }}
              />
              {errors.password && (
                <Typography variant="caption" color="red">
                  {errors.password}
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="outlined"
              color="info"
              fullWidth
              disabled={isSubmitting}
              sx={{
                 mt: 3, 
                 mb: 2,
                 color: 'white', 
                 borderColor: 'white' ,
                 backgroundColor: 'rgba(138, 138, 138, 0.8)',
                 '&:hover': {
                  backgroundColor: 'rgb(128, 128, 128)',
                 
                },

                }}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2, color: 'white' }}>
              Don't have an account? <Link href="/register" sx={{ color: 'blue' }}>Register</Link>
            </Typography>
          </form>

          {errors.submit && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
              {errors.submit}
            </Typography>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}