import { Text, View, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable } from "react-native";

import ComponenteMas from "./ComponenteMas";
export default function CardRefeicao ({ imagem, nome, kcal, onAdicionar,adicionarAlimento=false }){
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
          onAdicionar={onAdicionar}
          />
              )}
        </View>
      );
}

