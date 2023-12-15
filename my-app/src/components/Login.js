import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/login`, {
            email: email,
            password: password
        }).then(response => {
            // handle success
            // console.log(response)
            localStorage.setItem('user', response.data.user);
            localStorage.setItem('token_type', response.data.token_type);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expired_at', response.data.expired_at);

            var alert_var = "Name: " + response.data.user + "\n" + "Token type: " + response.data.token_type + "\n" + "Token: " + response.data.token + "\n" + "Expired at: " + response.data.expired_at;
            alert(alert_var)

            window.location.href = "/"
        })
        .catch(error => {
            // handle error
            // console.log(error)
            alert(error.response.data.message)
        });
    }

    if(localStorage.getItem("token") != null){
        window.location.href = "/"
    }else{
        return (
            <div>
                <Form className="create-form" onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder="Email..." autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Field>

                    <Form.Field>
                        <label>Password</label>
                        <input placeholder="Password..." type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Field>

                    <Button type='submit' disabled={!validateForm()}>Login</Button>
                    <Link to='/'>
                        <Button>Cancel</Button>
                    </Link>
                </Form>
            </div>
        );
    }
    
}