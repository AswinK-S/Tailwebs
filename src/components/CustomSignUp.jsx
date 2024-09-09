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
  Typography,
  Link,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosApi from '../service/api';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

export default function CustomSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const newErrors = {};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }else if(!/^(?=.*\d)(?=.[a-z])(?=.*[A-Z]).{6,}$/.test(formData.password)){
        newErrors.password ='Password must include at least one number, one uppercase letter, and one lowercase letter'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axiosApi.post('/api/register', formData);
        if(response.status===200){
          toast.success('Registration success')
            navigate('/login')
        }

      } catch (error) {

        if(error.response?.data.message ==='Teacher exists in this mail'){
          console.log('er1');
          toast.error("Teacher already exists with this email!");
        }else{
          toast.error('Sign up failed. Please try again.');
        }
        setErrors({ submit: 'Sign up failed. Please try again.' });

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
            backgroundColor: 'rgba(252, 252, 252, 0.3)',
            padding: theme.spacing(6),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
          }}
        >
            <Typography component='h5' variant="h5" align='center' sx={{color:'black' ,fontSize:'20px'}}>Teacher's</Typography>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 3, color: 'white', fontSize: '35px' }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
              margin="normal"
              sx={{
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              }}
            />

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

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="confirmPassword" sx={{ color: 'white' }}>Confirm Password</InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: 'white' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                sx={{
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                }}
              />
              {errors.confirmPassword && (
                <Typography variant="caption" color="red">
                  {errors.confirmPassword}
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
                borderColor: 'white',
                backgroundColor: 'rgba(138, 138, 138, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgb(128, 128, 128)',
                },
              }}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {errors.submit && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
                {errors.submit}
              </Typography>
            )}

            <Typography variant="body2" align="center" sx={{ mt: 2, color: 'white' }}>
              Already have an account? <Link href="/login" sx={{ color: 'blue' }}>Log In</Link>
            </Typography>
          </form>
        </Container>
      </Box>
      {/* <ToastContainer /> */}

    </ThemeProvider>
  );
}
