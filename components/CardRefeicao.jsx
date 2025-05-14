import { Text, View, Keyboard } from "react-native";
import { useState, useEffect,useRef  } from "react";
import { Image, StyleSheet, TextInput, Pressable,Animated, TouchableOpacity } from "react-native";

import ComponenteMas from "./ComponenteMas";
export default function CardRefeicao ({ imagem, nome, kcal, onAdicionar,adicionarAlimento=false,mostraAlimentos=false }){
  const rotation = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);

  const toggleRotation = () => {
    Animated.timing(rotation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setExpanded(!expanded);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'], 
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };
    return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
           
            margin:15
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <Text>{kcal}</Text>
            </View>
          </View>
          {adicionarAlimento &&(

            <ComponenteMas
            onAdicionar={onAdicionar}/>
          )}
          {mostraAlimentos &&(
           <TouchableOpacity onPress={toggleRotation}>
              <Animated.Text style={[{ fontSize: 24 }, animatedStyle]}>
                {'>'}
              </Animated.Text>
            </TouchableOpacity>
          )
          }
        </View>
      );
}

