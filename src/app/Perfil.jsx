import Footer from "../../components/Footer";
import { Text, View, Keyboard,Dimensions, TouchableOpacity,ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable } from "react-native";
import coruja from "../../assets/icons/coruja.png";
import favoritos from "../../assets/icons/favorito.png";
import CardAlimentos from "../../components/CardAlimentos";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

export default function Perfil() {
  const [fontLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  const [favoritosAberto, setFavoritosAberto] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState();
  const [pesoAtual, setPesoAtual] = useState();
  const [pesoIdeal, setPesoIdeal] = useState();

  if (!fontLoaded) return null;
  const { width } = Dimensions.get('window');
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View>
        <View
          style={{
            marginTop: 120,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 0,
          }}
        >
          <View
            style={{
              backgroundColor: "#82563d",
              width: 80,
              height: 80,
              alignItems: "center",
              justifyContent: "center",
              border: "none",
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
              fontWeight: 900,
              fontSize: 20,
            }}
          >
            {/* nomeUsuario */}
            Lucas muniz teles
          </Text>
        </View>
        <View>
          <View
            style={{
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
              120Kg{"\n"}Peso Atual
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
              40,5Kg{"\n"}Peso Ideal
            </Text>
          </View>
          <TouchableOpacity onPress={(e)=>favoritosAberto? setFavoritosAberto(false):setFavoritosAberto(true)}>
          <View style={{
            flexDirection:'row',
            alignItems:"center",
            marginTop:30,
            justifyContent:"space-around",
            textAlignVertical: "center",
            borderWidth: 2,
            borderColor: "#6e6764",
            width: width * 0.8,
            height:70,
            borderRadius:12,
            
          }}>

            <Image source={favoritos}
                style={
                    {
                        width:40,
                        height:40
                    }
                }
            ></Image>
            <Text
                style={{
                    fontSize: 15,
                    fontFamily: "Nunito_700Medium",
                    fontWeight:800

                }}
            >Alimentos Favoritados</Text>
          </View>
             {favoritosAberto &&(
                <View style={{height:300}}>
                    <ScrollView
                     showsVerticalScrollIndicator={true}
                    contentContainerStyle={{
                    alignItems: 'center',
                    paddingVertical: 10 , 
                    
                     }}>
                         {Array.from({ length: 10 }).map((_, i) => (
                            <CardAlimentos key={i} nome="banana" kcal="1200kcal" />
                        ))}
                    </ScrollView>
                </View>
             )}   

            </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </View>
  );
}
