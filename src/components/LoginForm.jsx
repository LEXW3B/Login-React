import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [email, setEmail] = useState({
    value: '',
    error: '',
    hasError: true,
    wasTouched: false,
  });

  const [password, setPassword] = useState({
    value: '',
    error: '',
    hasError: true,
    wasTouched: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const validateEmail = (Email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(Email);
  };

  const validatePassword = (passWord) => {
    if (passWord.length < 6) return false;
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      const isEmailValid = validateEmail(value);
      setEmail({
        value,
        error: !isEmailValid ? 'Enter a valid email' : '',
        hasError: !isEmailValid,
        wasTouched: true,
      });
    } else if (name === 'password') {
      const isPasswordValid = validatePassword(value);
      setPassword({
        value,
        error: !isPasswordValid ? 'Password must be at least 6 characters' : '',
        hasError: !isPasswordValid,
        wasTouched: true,
      });
    }
  };

  const handleSubmit = () => {
    if (email.hasError || password.hasError) return 'Please fix the errors';
    return 'Login successful';
  };

  return (
    <main>
      <form className={styles.form}>
        <h1 className={[styles.title, styles.title2].join(' ')}>Sign In</h1>
        <fieldset>
          <input
            type="email"
            name="email"
            placeholder="Login"
            value={email.value}
            onChange={handleChange}
          />
          <br />
          {email.hasError && email.wasTouched
            && <small className={styles.error}>{email.error}</small>}
        </fieldset>

        <fieldset>
          <div className={styles['password-wrapper']}>
            <input
              className={styles['password-input']}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password.value}
              name="password"
              onChange={handleChange}
            />
            { showPassword ? (
              <FaEyeSlash
                className={styles['show-password-input']}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className={styles['show-password-input']}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {password.hasError && password.wasTouched && (
            <small>{password.error}</small>
          )}
        </fieldset>
        <fieldset className={styles['remember-wrapper']}>
          <label htmlFor="remember" className={styles['remember-input']}>
            <input
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <p>Remember me</p>
            <a
              href="https://accounts.google.com/"
            >
              Forgot password?
            </a>
          </label>
        </fieldset>
        <button
          type="submit"
          onChange={handleSubmit}
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginForm;
