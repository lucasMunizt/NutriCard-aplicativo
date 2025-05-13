import { Text, View } from "react-native";
import { Image, StyleSheet, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import Logins from "../../components/cadastro/Logins";
import { useState,useEffect } from 'react';
import { useRouter } from 'expo-router';
//const Stack = createStackNavigator();
export default function Cadastro (){
    const router = useRouter();
    const [calculoImc,setCalculoImc] = useState();
    const [height,setHeight] = useState();
    const [weight,setWeight] = useState();
    const [age,setAge] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setpasswordConfirmation] = useState();
    const [gender, SetGender] = useState();
    const url ='';
  const CalcularImc = () =>{
    if(height && weight){
      const imc = (weight / (height * height)).toFixed(2);
      setCalculoImc(imc)
    }
  } 

  async function createUser(user, url) {
    try {
      const res = await fetch(url,{
        method:"POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      if(res.ok) return router.push("Login");
      else return alert('Erro ao criar usuário prenchar todos os campos')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Erro:', error));
      return res;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
  }

   const handleSave =  async (e) =>{
    CalcularImc()
   try{
       const user = {
         "user": {
             "height": height,
             "weight": weight,
             "age": age,
             "name": name,
             "password": password,
             "mail": email,
             "bmi": calculoImc,
             "gender": gender
         }
       }
       if(!password === passwordConfirmation){
           return alert("Senhas não compativeis");
       }else{
           const res = createUser(user, url);
           router.push("Login")
       }
   }catch(error){
        console.error(error);
   }

  };

    return(
      <>
          <Logins
            valorButao='seguir'
            TelaCadastro = {true}
            onInputChangeNome={(e)=>{setName(e)}}
            onInputChangeEmail={(e)=>{setEmail(e)}}
            onInputChangeSenha={(e)=>{setPassword(e)}}
            onInputChangeConfirmacaoSenha={(e)=>{setpasswordConfirmation(e)}}
            onInputChangeGenero={(e)=>{SetGender(e)}}
            onInputChangeAltura={(e)=>{setHeight(e)}}
            onInputChangePeso={(e)=>{setWeight(e)}}
            onInputChangeIdade={(e)=>{setAge(e)}}
            funcaoButaoCadastro={handleSave}
          />  
      </>
    )
}