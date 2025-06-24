'use client';

import { useState } from 'react';
import { login} from '../Services/userService.js';
import { Button, Input, Card } from 'antd';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  function doLogin(e) {
    e.preventDefault();
    console.log(email)

    try {
      const user = login(email, password);
      setError(false)
      router.push('/books')
    } catch (error) {
      console.log(error.message)
      setError(true)
      alert(error.message);
    }
  }

  return (
    <div>
      <Card className = "card">
        <h2 className="h2-login">Login</h2>

        <h3>Utilize Email e Senha para Entrar</h3>
      </Card>
      <Card className = "card">
        <form onSubmit={doLogin}>
          <h1> EMAIL </h1>
          <Input className="input-login" status={error ? "error" : ""} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

          <h1> SENHA </h1>
          <Input.Password className="input-login" status={error ? "error" : ""} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <Button className="button-login" htmlType="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;