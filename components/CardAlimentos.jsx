import { Text, View, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable } from "react-native";
import ComponenteMas from "./ComponenteMas";
import { useRouter } from 'expo-router';
export default function CardAlimentos({nome,kcal,onAdicionar}){
     const router = useRouter();
    const AbrirCard = () =>{
        router.push("Card")
    }
    
    return(
        <View style={{width:340,marginBottom:10,marginTop:0}} >
        <View style={{ flexDirection: "row",alignItems: "center",justifyContent:"space-between" } }>

            <View onPress={AbrirCard}>
                <Text style={{fontSize:16}} >{nome}</Text>
                <Text>{kcal}</Text>
            </View>
       
        <ComponenteMas onAdicionar={onAdicionar}/>
        </View>
        </View>
  )
        
        
      
}