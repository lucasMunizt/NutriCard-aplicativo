import Footer from "../../components/Footer";
import { Text, View, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable ,SafeAreaView } from "react-native";
import cafe from "../../assets/icons/cofee.png";
import almoco from "../../assets/icons/arroz-frito.png";
import jantar from "../../assets/icons/jantar-romantico.png";
import merenda from "../../assets/icons/merenda.png";
import { useRouter } from 'expo-router';
import CardRefeicao from "../../components/CardRefeicao";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home() {
   const router = useRouter();
    const AdicionarProduto = (refeicao) =>{
      console.log("Lista - Refeição selecionada:", refeicao);
      router.push({
        pathname: "AdicionarAlimento",
        params: { refeicao: refeicao }
      });
    }
      const [dadosUsuario, setDadosUsuario] = useState([]);
      const [caloriasConsumidas, setCaloriasConsumidas] = useState();
      const [caloriasRestantes, setCaloriasRestantes] = useState();
      //const [dadosUsuario, setDadosUsuario] = useState();

  const DadosUsuario = async () =>{
    try{
        const valoresDados = await AsyncStorage.getItem("user");
        if(valoresDados != null){
         const user = JSON.parse(valoresDados)
         console.log("user", user);
         setDadosUsuario(user)
         setCaloriasConsumidas(user[0].calories_consumed)
         setCaloriasRestantes(user[0].calorie_goal)
          return dadosUsuario
        }else{
          alert("dados não encontrados");
        }
    }catch(error){
      console.error('Erro ao ler AsyncStorage', e);
      return null;
    }
  }
  useEffect(() => {
    DadosUsuario()
  }, []);

  return (
      <SafeAreaView style={{flex:1}}>

        <View
          style={{
            flex: 1,
            justifyContent:"center",
            marginTop:30,
          
          }}
        >
          <View
            style={{
              width: 370,
              height: 350, 
              marginTop: 40,
              alignSelf:"center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  width: 105,
                  height: 105,
                  textAlign: "center",
                  color: "black",
                  padding: 10,
                  borderRadius: 110,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  textAlignVertical: "center",
                  marginTop: 30,
                  fontWeight: 500,
                  borderWidth: 2,
                  borderColor: "#05cdff",
                }}
              >
                {caloriasConsumidas}KCal Consumidos
              </Text>

              <Text
                style={{
                  width: 105,
                  height: 105,
                  textAlign: "center",
                  color: "black",
                  padding: 10,
                  borderRadius: 110,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  textAlignVertical: "center",
                  marginTop: 30,
                  fontWeight: 500,
                  borderWidth: 2,
                  borderColor: "#ff053f",
                }}
              >
                {caloriasRestantes}KCal Restantes
              </Text>
            </View>

            <View
              style={{
                marginTop: 10, 
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontWeight: 700,
                  fontSize: 18,
                  marginTop: 10,
                }}
              >
                Macronutrientes
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{
                    width: 60,
                    height: 60,
                    textAlign: "center",
                    color: "black",
                    padding: 10,
                    borderRadius: 110,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    textAlignVertical: "center",
                   
                    marginTop: 30,
                    fontWeight: 500,
                    borderWidth: 2,
                    borderColor: "#ff053f",
                  }}
                >
                  0/40g
                </Text>
                <Text
                  style={{
                    width: 60,
                    height: 60,
                    textAlign: "center",
                    color: "black",
                    padding: 10,
                    borderRadius: 110,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    textAlignVertical: "center",
                    marginTop: 30,
                    fontWeight: 500,
                    borderWidth: 2,
                    borderColor: "#da05ff",
                  }}
                >
                  0/40g
                </Text>

                <Text
                  style={{
                    width: 60,
                    height: 60,
                    textAlign: "center",
                    color: "black",
                    padding: 10,
                    borderRadius: 110,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    textAlignVertical: "center",
                    marginTop: 30,
                    fontWeight: 500,
                    borderWidth: 2,
                    borderColor: "#05ffbc",
                  }}
                >
                  0/40g
                </Text>

                <Text
                  style={{
                    width: 60,
                    height: 60,
                    textAlign: "center",
                    color: "black",
                    padding: 10,
                    borderRadius: 110,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    textAlignVertical: "center",
                    marginTop: 30,
                    fontWeight: 500,
                    borderWidth: 2,
                    borderColor: "#b4ff05",
                  }}
                >
                  0/40g
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "black", fontWeight: 700 }}>Carboidratos</Text>
              <Text style={{ color: "black", fontWeight: 700,marginRight:25 }}>Proteinas</Text>
              <Text style={{ color: "black", fontWeight: 700,marginRight:30 }}>Fibras</Text>
              <Text style={{ color: "black", fontWeight: 700 }}>Sódio</Text>
            </View>
          </View>

          <View style={{
              alignItems:"center"
          }}>
            <View
              style={{
                width: 360,
                marginTop: 10,
                padding: 10,     
              }}
            >
              <CardRefeicao
                imagem={cafe}
                nome="Café da Manhã"
                kcal="0/1200KCal"
                onAdicionar={() => AdicionarProduto("Café da Manhã")}
                adicionarAlimento = {true}
              />

              <CardRefeicao
                imagem={almoco}
                nome="Almoço"
                kcal="0/1200KCal"
                onAdicionar={() => AdicionarProduto("Almoço")}
                adicionarAlimento = {true}
              />

              <CardRefeicao
                imagem={jantar}
                nome="Jantar"
                kcal="0/1200KCal"
                onAdicionar={() => AdicionarProduto("Jantar")}
                adicionarAlimento = {true}
              />
              <CardRefeicao
                imagem={merenda}
                nome="Merenda"
                kcal="0/1200KCal"
                onAdicionar={() => AdicionarProduto("Merenda")}
                adicionarAlimento = {true}
              />
          </View>
          </View>
          <Footer />
        </View>
      </SafeAreaView>
  );
}
