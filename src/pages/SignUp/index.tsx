import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('users', data);

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no GoBarber!'
      });

      history.push('/');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return
      }
      addToast({
        title: 'Erro no cadastro',
        type: 'error',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber' />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input icon={FiUser} name='name' type='text' placeholder='Nome' />
            <Input icon={FiMail} name='email' type='text' placeholder='E-mail' />
            <Input icon={FiLock} name='password' type='password' placeholder='Senha' />
            <Button type='submit'>Cadastrar</Button>
          </Form>
          <Link to='/'>
            <FiArrowLeft />
          Voltar para o logon
        </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp;
