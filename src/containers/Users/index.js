import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import People from '../../acces/3pessoas.svg';
import Arrow from '../../acces/seta.svg';
import trash from '../../acces/lixo.svg';

import { 
  Container,
  H1, 
  Image, 
  ContainerItens,
  Button,
  User,
} from "./styles";
// essa função abaixo adiciona usuarios
function Users() {
const [users,setUsers] =  useState([]);
const navigate = useNavigate();


useEffect(() => {
  async function fetchUsers(){
    const { data: newUsers} = await axios.get("http://localhost:3001/users");

    setUsers(newUsers);

  }
 
    fetchUsers();
},[]);


async function deleteUser(userId){
  await axios.delete(`http://localhost:3001/users/${userId}`);
  const newUsers = users.filter((user) => user.id !== userId); // !== diferente

  setUsers(newUsers);
}

 function goBackPage (){
  navigate('/');

 }

  return (
  <Container>
    <Image alt="logo-imagem" src={People} />
    <ContainerItens>
      <H1>Usuarios</H1>

      <ul>
        {users.map((user)=> (
        <User key={user.id}>
         <p>{user.name}</p> <p>{user.age}</p>
         <button onClick={()=>deleteUser(user.id)}>
          <img src={trash} alt="lixo" />
         </button> 
        </User>
        ))}
      </ul>

      <Button onClick={goBackPage}>
        <img alt="seta" src={Arrow} />Voltar 
      </Button>
    </ContainerItens>
    </Container>
  );
}

export default Users;