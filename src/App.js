import React,{useState, useRef} from "react";

import axios from "axios"

import People from './acces/pessoas2.png';
import Arrow from './acces/seta.svg';
import trash from './acces/lixo.svg';

import { 
  Container,
  H1, 
  Image, 
  ContainerItens, 
  Input, 
  Button, 
  InputLabel,
  User,
} from "./styles";
// essa função abaixo adiciona usuarios
function App() {
const [users,setUsers] =  useState([]);
const inputName = useRef();
const inputAge = useRef();


//async function addNewUser(){
 //setUsers([...users,{id: Math.random(),
  //name:inputName.current.value,
  //}])
  async function addNewUser(){
    const data = await axios.post("http://localhost:3001/users", {
      name:inputName.current.value,
       age:inputAge.current.value,
      });

       console.log(data)

}

function deleteUser(userId){
  const newUsers = users.filter(user => user.id !== userId); // !== diferente

  setUsers(newUsers);
}


  return (
  <Container>
    <Image alt="logo-imagem" src={People} />
    <ContainerItens>
      <H1>Olá</H1>
      <InputLabel>Nome</InputLabel>
      <Input ref={inputName} placeholder="Nome" />

      <InputLabel>Idade</InputLabel>
      <Input ref={inputAge} placeholder="Idade" />

      <Button onClick={addNewUser}>
        Cadastrar <img alt="seta" src={Arrow} />
      </Button>
      <ul>
        {users.map((user)=> (
        <User key={user.id}>
         <p>{user.name}</p> <p>{user.age}</p>
         <button onClick={()=>deleteUser(user.id)}>
          <img src={trash}>
         </img></button>
        </User>
        ))}
      </ul>
    </ContainerItens>
    </Container>
  );
};

export default App