import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { Card, Button, Form, FormGroup, Label, Input } from 'reactstrap'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
        } catch(e) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.email, data.userId)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Card
            style={{
                maxWidth: '500px',
                margin: '50px auto',
                padding: '20px'
            }}
        >
            <div className="card-content white-text" style={{margin: '0 auto'}}>
                <h1 className="" style={{textAlign: 'center'}}>Авторизация</h1>

                <Form style={{marginTop: '30px'}}>
                    <FormGroup style={{marginBottom: '10px'}}>
                        <Label for="exampleEmail">Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Введите email" 
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Введите пароль" 
                            value={form.password}
                            onChange={changeHandler}
                        />
                    </FormGroup>
                </Form>
    
            </div>
                
            <div className="card-action" style={{margin: '30px auto 0'}}>
                <Button 
                    className="btn yellow darken-4" 
                    color='primary'
                    style={{marginRight: "10px"}}
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Войти
                </Button>
                <Button 
                    className="btn grey darken-1 blac-text"
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Регистрация
                </Button>
            </div>
        </Card>
    )
}