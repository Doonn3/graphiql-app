import { auth, registerWithEmailAndPassword } from '@shared/firebase/firebase';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

interface SingupData {
  name: string;
  email: string;
  password: string;
}

function Singup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingupData>();

  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate('/main');
    }
  }, [user, loading, navigate]);

  const singUp = (value: SingupData) => {
    registerWithEmailAndPassword(value.email, value.password);
  };

  return (
    <>
      <Container className="singup d-flex justify-content-center">
        <div className="w-50 p-5 border rounded ">
          <Form onSubmit={handleSubmit(singUp)}>
            <h1 className="h3 mb-3 text-center">{t('singUp.psu')}</h1>
            <Form.Group className="mb-3">
              <Form.Label>{t('singUp.fl')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('placeholder.fn').toString()}
                {...register('name', {
                  required: t('error.fn').toString(),
                  minLength: {
                    value: 3,
                    message: 'Enter more then 3 symbols',
                  },
                })}
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('singUp.ea')}</Form.Label>
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
              <Form.Label>{t('singUp.ps')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.ps').toString()}
                {...register('password', {
                  required: t('error.ep').toString(),
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'Minimum 8 characters, at least one letter, one number and one special character',
                  },
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </Form.Group>
            <Button variant="dark" type="submit">
              {t('header.SU')}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Singup;
