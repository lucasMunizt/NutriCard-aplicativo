import { Image, StyleSheet, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, View } from "react-native";
import { Pressable, TextInput } from 'react-native-gesture-handler';
import { useState,useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import {useFonts,Nunito_400Regular,Nunito_500Medium,Nunito_700Bold} from "@expo-google-fonts/nunito"
import imagens from '../../assets/Imagens';
import { useRouter } from 'expo-router';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import frasesMotivacionais from '../../components/cadastro/frasesMotivacionais';
import Logins from '../../components/cadastro/Logins';

export default function Login() {
    const router = useRouter();

    const [email,setEmail] =  useState('');
    const [senha,setSenha] =  useState('');
    const handleLogin = async () =>{
     /* const url = ''
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
        })
        if(!response.ok){
          const errorMessage = await response.text();
          throw new Error(`Erro na requisição: ${errorMessage || response.statusText}`);
        }
        const result = await response.json();
        console.log('Resposta do servidor:', result);
        await AsyncStorage.setItem('user', JSON.stringify(result)); // Salva no AsyncStorage
        router.push('/Home'); 
      }catch(error){
        console.error("erro ao enviar os dados",error);
      }*/
      router.replace("Lista");
      
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
  

  