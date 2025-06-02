import { Text, View, Keyboard } from "react-native";
import { useState, useEffect,useRef  } from "react";
import { Image, StyleSheet, TextInput, Pressable,Animated, TouchableOpacity } from "react-native";
import lixo from '../assets/icons/lixo.png'
import ComponenteMas from "./ComponenteMas";
export default function CardRefeicao ({ imagem, nome, kcal, onAdicionar,adicionarAlimento=false,mostraAlimentos=false,excluir,excluirRefeicoes=false }){
  const rotation = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);

    return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop:15,
            marginRight:20
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center",}}>
            <Image
              source={imagem}
              style={{
                width: 40,
                height: 40,
                marginRight: 10,
                marginLeft: 10,
              }}
            />
            <View>
              <Text>{nome}</Text>
              <Text>{kcal}/kcal</Text>
            </View>
          </View>
          {adicionarAlimento &&(

            <ComponenteMas
            onAdicionar={onAdicionar}/>
          )}

          {excluirRefeicoes &&(
            <Pressable onPress={excluir} style={{width:30,height:30,backgroundColor:'#FFF',alignItems:"center",justifyContent:"center",borderRadius:15}}>
              <Image source={lixo} style={{width:20,height:20}}>
              </Image>
            </Pressable>
          )}

          {/* {mostraAlimentos &&(
           <TouchableOpacity onPress={toggleRotation}>
              <Animated.Text style={[{ fontSize: 24 }, animatedStyle]}>
                {'>'}
              </Animated.Text>
            </TouchableOpacity>
          )
          } */}
        </View>
      );
}

