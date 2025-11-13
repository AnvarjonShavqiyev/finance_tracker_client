import { useForm } from 'react-hook-form';
import { AuthOptions, CREATED_CODE, defaultSignInValues, defaultSignUpValues, SIDEBAR_ROUTES, SIGN_IN_URL, SUCCES_CODE, ZERO } from '@constants';
import { SignInSchema, SignUpSchema, type SignInForm, type SignUpForm } from '@customTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation, useRegisterUserMutation } from '@services/users';
import { useMemo } from 'react';
import { useAppDispatch } from '@hooks/reduxHooks';
import { setToken } from '@store/reducers/user.reducer';

import ControlledTextField from '@components/ControlledTextField';

import styles from './Auth.module.scss';

interface AuthProps {
  mode: AuthOptions;
}

const Auth = ({ mode }: AuthProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const isSignIn = useMemo(() => {
    return mode === AuthOptions.SIGN_IN
  },[mode]);

  const { control, handleSubmit } = useForm<SignInForm | SignUpForm>({
    resolver: zodResolver(isSignIn ? SignInSchema : SignUpSchema),
    defaultValues: isSignIn ? defaultSignInValues : defaultSignUpValues,
  });

  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const [loginUser, {isLoading: isLoginLoading}] = useLoginUserMutation();

  const onSubmit = async (data: SignInForm | SignUpForm) => {
    if (isSignIn) {
      const {data: response} = await loginUser(data as SignInForm);

      if(response?.statusCode === SUCCES_CODE) {
        navigate(SIDEBAR_ROUTES[ZERO].url)
        dispatch(setToken(response.token))
      }
    } else {
      const {data: response} = await registerUser(data as SignUpForm);
      
      if(response?.statusCode === CREATED_CODE) {
        navigate(SIGN_IN_URL)
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Typography>{isSignIn ? 'Login' : 'Register'}</Typography>

        {!isSignIn && (
          <ControlledTextField name="username" control={control} label="Username" />
        )}

        <ControlledTextField name="email" control={control} label="Email" />
        <ControlledTextField name="password" control={control} label="Password" />

        <Button type="submit" variant="contained" loading={isLoading || isLoginLoading}>Submit</Button>

        {isSignIn ? (
          <Typography>
            Don’t have an account? <Link to="/auth/signUp">Sign Up</Link>
          </Typography>
        ) : (
          <Typography>
            Already have an account? <Link to="/auth/signIn">Sign In</Link>
          </Typography>
        )}
      </form>
    </div>
  );
};

export default Auth;
