import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function Create() {
    const token_login = localStorage.getItem("token");

    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');

    const postData = () => {
        fetch(`http://127.0.0.1:8000/api/create_token`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+token_login,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            .then((res) => res.json())
            .then(data => {
                console.log(data)

                const token_action = data.token;
                console.log(token_action)
                const data_send = {
                    token_action: token_action, 
                    name: name,
                    detail: detail
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer '+token_login,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify(data_send),
                };

                fetch('http://127.0.0.1:8000/api/products/create', options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)

                    alert(data.message);
                    window.location.href = "/read"
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
    }
    if(localStorage.getItem("token") == null){
        window.location.href = "/"
    }else{
        return (
            <div>
                <Form className="create-form">
                    <Form.Field>
                        <label>Product</label>
                        <input placeholder='Product name...' onChange={(e) => setName(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Detail</label>
                        <textarea placeholder='Detail...' onChange={(e) => setDetail(e.target.value)}></textarea>
                    </Form.Field>
                    <Button onClick={postData} type='submit'>Save</Button>
                    <Link to='/'>
                        <Button>Cancel</Button>
                    </Link>
                </Form>
            </div>
        )
    }
}
