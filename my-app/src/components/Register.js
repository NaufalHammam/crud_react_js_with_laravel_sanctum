import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const postData = () => {
            const data_send = {
                name: name, 
                email: email,
                password: password
            };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(data_send),
            };

            fetch('http://127.0.0.1:8000/api/register', options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                alert(data.message);
                if(data.status == "1"){
                    window.location.href = "/login"
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input type='text' placeholder='Name...' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input type='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Save</Button>
                <Link to='/'>
                    <Button>Cancel</Button>
                </Link>
            </Form>
        </div>
    )
}
