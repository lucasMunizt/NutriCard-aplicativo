import { Text, View, Keyboard, Pressable, Image, StyleSheet, TextInput} from "react-native";
import { useState, useEffect } from 'react';
import homeImg from '../assets/icons/home.png';
import pessoaImg from '../assets/icons/pessoa.png';
import listaImg from '../assets/icons/lista.png';
import { useRouter } from 'expo-router';

export default function Footer() {
  const router = useRouter();
  return (

    <View style={{ flex: 1,alignItems:"center",marginBottom:40}}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 70,
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderTopColor: "#C8C8C8",
          borderTopWidth: 1,
          
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          {/* HOME */}
          <Pressable onPress={() =>router.replace('/Home')}>
            <Image
              source={homeImg}
              style={{
                width: 30,
                height: 30,
                
              }}
              />
              <Text>Início</Text>
          </Pressable>

          {/* LISTA */}
          <Pressable onPress={() => router.replace('/Lista')}>
            <Image
              source={listaImg}
              style={{
                width: 30,
                height: 30,
                
              }}
            />
              <Text>Lista</Text>
          </Pressable>

          {/* PERFIL */}
          <Pressable onPress={() => router.replace('/Perfil')}>
            <Image
              source={pessoaImg}
              style={{
                width: 30,
                height: 30,
               
              }}
            />
              <Text>Perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
