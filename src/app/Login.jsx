import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logins from '../../components/cadastro/Logins';

export default function Login() {
    const router = useRouter();

    const [email,setEmail] =  useState('');
    const [senha,setSenha] =  useState('');
    const [urlValor,setUrlValor] = useState('');
    const handleLogin =  async() =>{
      
      const url = "http://192.168.0.6:3000/user/login";
    
      try{
        const response  = await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type' : 'application/json',
          },
          body:JSON.stringify({
            mail: email,
            password: senha
          }
          )
        });

        if(!response.ok){
          const errorMessage = await response.text();
          throw new Error(`Erro na requisição: ${errorMessage || response.statusText}`);
        }

        const result = await response.json();
        console.log('Resposta do servidor:', result);
        await AsyncStorage.setItem('user', JSON.stringify(result)); // Salva no AsyncStorage
        router.replace("Lista");
      }catch(error){
        console.error("erro ao enviar os dados",error);
        alert("Falha no login. Verifique seu e-mail e senha e tente novamente.");
      }

       
      
    }
    return (
      <Logins
        telaLogin={true}
        funcaoButaoLogin={handleLogin}
        onInputChangeEmail={(e)=>{setEmail(e)}}
        onInputChangeSenha={(e)=>{setSenha(e)}}
        valorButao='entrar'
      />
     
    );
  }
  

  