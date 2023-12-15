import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


export default function Read() {
    const token_login = localStorage.getItem("token");

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
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
            // console.log(data)

            const token_action = data.token;
            // console.log(data.token)
            localStorage.setItem('token_action', data.token);

            const params = { token_action: token_action };
            fetch(`http://127.0.0.1:8000/api/products?${new URLSearchParams(params)}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+token_login,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            .then((res) => res.json())
            .then(data => {
                // console.log(data)
                setAPIData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }, [])

    const token_getData = () => {
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
            // console.log(data)

            const token_action = data.token;
            // console.log(token_action)
            localStorage.setItem('token_action', data.token);

            const params = { token_action: token_action };
            fetch(`http://127.0.0.1:8000/api/products?${new URLSearchParams(params)}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+token_login,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            .then((res) => res.json())
            .then(data => {
                // console.log(data)
                setAPIData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }

    localStorage.setItem('id', "");
    localStorage.setItem('name', "");
    localStorage.setItem('detail', "");
    
    const setData = (data) => {
        let { id, name, detail } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('detail', detail)
    }

    const onDelete = (id) => {
        const konfirmasi = window.confirm("apakah kamu yakin ingin menghapus data ini ?");
        if(konfirmasi){
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
                // console.log(data)

                const token_action = data.token;
                // console.log(token_action)
                const data_send = {
                    token_action: token_action, 
                };
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer '+token_login,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify(data_send),
                };

                fetch('http://127.0.0.1:8000/api/products/delete/'+id, options)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data)

                    alert(data.message);
                    token_getData();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


            })
        }
    }

    if(localStorage.getItem("token") == null){
        window.location.href = "/"
    }else{
        return (
            <div>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Detail</Table.HeaderCell>
                            <Table.HeaderCell>Aksi</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {APIData.map((data) => {
                            return (
                            <Table.Row>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.detail}</Table.Cell>
                                <Table.Cell> 
                                    <Link to='/update'>
                                        <Button onClick={() => setData(data)}>Edit</Button>
                                    </Link>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )})}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}
