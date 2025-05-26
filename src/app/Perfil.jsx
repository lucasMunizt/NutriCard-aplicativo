import Footer from "../../components/Footer";
import { Text, View, Keyboard,Dimensions, TouchableOpacity,ScrollView,Image,Pressable } from "react-native";
import { useState, useEffect } from "react";
import coruja from "../../assets/icons/coruja.png";
import favoritos from "../../assets/icons/favorito.png";
import CardAlimentos from "../../components/CardAlimentos";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import Login from "./Login";


export default function Perfil() {
  const [fontLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });
   
  const [favoritosAberto, setFavoritosAberto] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState();
  const [dadosUsuario, setDadosUsuario] = useState([]);

  const [pesoAtual, setPesoAtual] = useState();
  const [pesoIdeal, setPesoIdeal] = useState();
  const DadosUsuario = async () =>{
    try{
        const valoresDados = await AsyncStorage.getItem("user");
        if(valoresDados != null){
         const user = JSON.parse(valoresDados)
         //console.log("user", user[0].id);
         setDadosUsuario(user)
         setNomeUsuario(user[0].name) 
         setPesoAtual(user[0].weight) 
         setPesoIdeal(user[0].bmi)
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

  const PrintDadosUsuarios = () =>{

    dadosUsuario.map((index)=>{
      setNomeUsuario(index.name)
      setPesoAtual(index.weight)
    })

  }

  if (!fontLoaded) return null;
  const { width,height } = Dimensions.get('window');
  return (
    <View
      style={{
        flex: 1,
        marginTop:20
      }}
    >
      <View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 0,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            gap: 30,
            paddingTop:50 //40
          }}
        >
          <View
            style={{
              backgroundColor: "#82563d",
              width: 80,
              height: 80,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 0,
              borderWidth: 0,
              borderRadius: 40,
            }}
          >
            <Image
              source={coruja}
              style={{
                width: 40,
                height: 40,
              }}
            ></Image>
          </View>
          <Text
            style={{
              fontFamily: "Nunito_700Bold",
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            {/* nomeUsuario */}
           {nomeUsuario}
          </Text>
        </View>
        <View>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 40,
            }}
          >
            <Text
              style={{
                width: 105,
                height: 105,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 52.5,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginTop: 30,
                fontWeight: 700,
                borderWidth: 2,
                borderColor: "#05cdff",
                fontSize: 15,
                fontFamily: "Nunito_700Medium",
              }}
            >
                {/* pesoAtual */}
              {pesoAtual}Kg{"\n"}Peso Atual
            </Text>

            <Text
              style={{
                width: 105,
                height: 105,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 52.5,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginTop: 30,
                fontWeight: 700,
                borderWidth: 2,
                borderColor: "#ff053f",
                fontSize: 15,
                fontFamily: "Nunito_700Medium",
              }}
            >
                {/* pesoIdeal */}
             {pesoIdeal}g{"\n"}Peso Ideal
            </Text>
          </View>
         <View>
          {/* Butão Favorito */}
  <TouchableOpacity
    onPress={() => setFavoritosAberto((prev) => !prev)}
  >
    <View
      style={{
        alignSelf: 'center',
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        justifyContent: "space-around",
        textAlignVertical: "center",
        borderWidth: 2,
        borderColor: "#6e6764",
        width: 303,
        height: 70,
        borderRadius: 12,
      }}
    >
      <Image
        source={favoritos}
        style={{
          width: 40,
          height: 40,
        }}
      />
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Nunito_700Medium",
          fontWeight: 800,
        }}
      >
        Alimentos Favoritados
      </Text>
    </View>
  </TouchableOpacity>

        {favoritosAberto && (
          <View style={{ height: height /4,marginBottom:50,marginTop:height/10 }}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <CardAlimentos key={i} nome="banana" kcal="1200kcal" />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
        </View>
      </View>

      <Footer />
    </View>
  );
}
