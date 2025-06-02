
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Logins from "../../components/cadastro/Logins";
import env from "../../env";
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
    const [goal, setObjetivo] = useState();
    const url = env.ip + 'user/create';
  const CalcularImc = async () =>{
    if(height && weight){
      const imc = (weight / (height * height)).toFixed(2)
      console.log("weight " + weight + " height " + height + " imc " + imc)
      setCalculoImc(imc)
      return imc;
    }
    return null;
  } 

  async function createUser(user, url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ user })
      });

      if (res.ok) {
        router.push("Login");
      } else {
        const errorData = await res.json();
        console.error("Erro da API:", errorData);
        alert('Erro ao criar usuário. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
        alert("Falha ao criar a conta.");
    }
  }

 
  const handleSave = async () => {
    if (password !== passwordConfirmation) {
      return alert("Senhas não compatíveis.");
    }
    
    if (!CalcularImc()) {
      return alert("Preencha altura e peso para calcular o IMC.");
    }

    const user = {
      "height": height,
      "weight": weight,
      "age": age,
      "name": name,
      "password": password,
      "mail": email,
      "bmi": calculoImc,
      "gender": gender,
      "goal": goal
    }

    await createUser(user, url);
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
            onInputChangeObjetivo={(e)=>{setObjetivo(e)}}
            funcaoButaoCadastro={handleSave}
          />  
      </>
    )
}