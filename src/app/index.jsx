
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { Image,StyleSheet,Platform,TouchableOpacity,ImageBackground } from 'react-native';
import { Text, View } from "react-native";
import imagemTelaInicial from "../../assets/imagens/shopping-bag.png"
import LogoTelaInicial from "../../assets/imagens/LogoNutriCard.png"
import LogoVegetal from "../../assets/imagens/vegetable.png"
import {useFonts,Nunito_400Regular,Nunito_500Medium,Nunito_700Bold} from "@expo-google-fonts/nunito";
import { useRouter } from 'expo-router';
export default function Index (){
  const router = useRouter();
    const [fontLoaded] = useFonts({
      Nunito_400Regular,
      Nunito_500Medium,
      Nunito_700Bold
    })

    if(!fontLoaded){
      return null;
    }

    const Entrar = () =>{
      router.push("Login");
    }

    const CadastroFunction = () =>{
      router.push("Cadastro");
    }

    return(
        <GestureHandlerRootView 
          style=
          {{
            flex: 1, 
            alignItems:"center",
            justifyContent:"space-around",
            gap:0
          }}>

            <View style={{
                marginTop:30
              }}>
              <Image source={LogoTelaInicial}
               style={{
               width:300,
               height:180,
               marginRight:46,
                marginBottom:0
              }
               }></Image>
            </View>

            <View style={{
              width:200,
              height:0,
              alignItems:"center",
              justifyContent:'center',
              flex:0,
              padding:60
              }}>
              <Image 
              source={LogoVegetal}
              style={{
                width:200,
                height:200,
                marginTop:0

              }}
              resizeMode="contain"
              
              />
            </View>
            
            <View style={{gap:20}}>
              <Pressable style={{
                  width:300,
                  height:70,
                  backgroundColor:'#45C8AE',
                  padding:13,
                  borderRadius:50,
              }}
              onPress={Entrar}
              >
                <Text
                style={{
                  color:"#525252",
                  fontFamily:"Nunito_700Bold",
                  textAlign:"center",
                  fontSize:30,
                  alignItems:"center",
                  display:"flex",
                  justifyContent:"center"
                }}
                  >Entrar</Text>
              </Pressable>

               <Text style={{
                textAlign:"center",
                color:'#000000',
                fontFamily:"Nunito_400Regular",
                fontWeight:700,
                textDecorationLine:"underline",
                fontSize:18
               }}
               onPress={CadastroFunction}
               >Criar uma conta?</Text>
            </View>

              
        </GestureHandlerRootView>
    );
}