import Footer from "../../components/Footer";
import { Text, View, Keyboard,ScrollView  } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable } from "react-native";
import iconePesquisa from '../../assets/icons/lupa.png';
import camera from '../../assets/icons/camera.png';
import favorito from '../../assets/icons/favorito.png';
import tomate from "../../assets/fruts/tomate.png";
import barracaFrutas from "../../assets/icons/barracaFrutas.png";
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";
import CardAlimentos from "../../components/CardAlimentos";
export default function AdicionarAlimento() {
    const [fontLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold
    });
    const [listaBuscaAlimento,setbuscaAlimento] = useState(false)
  
    const [textInput, setTextInput] = useState('')

    const BuscarAlimentos = () =>{
      if(textInput.trim() !== ''){
        setbuscaAlimento(true)
      }else{
        setbuscaAlimento(false)
      }
    }

    if (!fontLoaded) {
      return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 80}}>
        <View style={{ width: 340 }}>
          <TextInput
            style={{
              width: '100%',
              height: 60,
              backgroundColor: "#e6e3e3",
              padding:20,
              borderRadius: 12,
              color: 'black',
            }}
            underlineColorAndroid="transparent"
            placeholder="Coloque o nome do alimento"
            placeholderTextColor="black"
            onChangeText={(e)=>{setTextInput(e);}}
          />
          <Pressable onPress={BuscarAlimentos}>
          <Image
            source={iconePesquisa}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              top: -40,
              left: 300,
            }}
          />
          </Pressable>
        </View>
        <View style={{
                      marginTop:40,
                      alignItems:'center',
                      justifyContent:"space-between",
                      flexDirection:"row"
                    }}>
            <View style={{marginRight:120,flexDirection:'row',alignItems:'center'}}>
            <Image
            source={camera}
            style={{width:30,height:30,marginRight:10}}
            />
            <Text style={{marginRight:10,fontFamily:'Nunito_500Medium',fontWeight:500}}>Foto</Text>
            </View>

            <View style={{flexDirection:"row",alignItems:"center"}}>

            <Image
            source={favorito}
            style={{width:30,height:30,marginRight:10}}
            />
            <Text style={{fontFamily:'Nunito_500Medium',fontWeight:500}}>Favoritos</Text>
            </View>
        </View>
        <View style={{justifyContent:'center',alignItems:"center",marginTop:60}}>
            {!listaBuscaAlimento ?(
              <>
                <Image
                 source={tomate}
                 style= {{width:250,height:250}}
             />
             <Text style={{fontFamily:"Nunito_700Bold",fontSize:25,lineHeight:40,textAlign:'center'}}>
                Não se esqueça, você pode sempre procurar o alimento por uma foto!
             </Text>
              </>
               
            ):
              <View style={{height:480}}>
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
              
            }
         
        </View>
      </View>
      <Footer/>
    </View>
  );
}
