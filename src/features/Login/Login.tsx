import { auth, logInWithEmailAndPassword } from '@shared/firebase/firebase';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import './Login.css';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const { t, i18n } = useTranslation();
  const [err, setErr] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate('/main');
    }
  }, [user, loading, navigate]);

  const logIn = async (value: LoginData) => {
    const user = await logInWithEmailAndPassword(value.email, value.password);
    if (typeof user !== 'string') {
      return;
    } else {
      setErr(user);
    }
  };

  return (
    <>
      <Container className=" d-flex justify-content-center align-items-center">
        <div className="singup w-50 p-5 border rounded ">
          <Form onSubmit={handleSubmit(logIn)}>
            <h1 className="h3 mb-3 text-center">{t('singUp.psu')}</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('placeholder.ee')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('placeholder.ee').toString()}
                {...register('email', {
                  required: t('error.iea').toString(),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('error.iea').toString(),
                  },
                })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t('placeholder.ps')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.ps').toString()}
                {...register('password', {
                  required: t('error.ep').toString(),
                  minLength: {
                    value: 8,
                    message:
                      'Minimum eight characters, at least one letter, one number and one special character',
                  },
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </Form.Group>
            {err && <div className="mb-3 text-danger">{err}</div>}
            <Button variant="dark" type="submit">
              {t('header.SI')}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Login;
