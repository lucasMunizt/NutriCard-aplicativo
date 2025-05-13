import { Text, View, Keyboard, Pressable, Image, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from 'react';
import homeImg from '../assets/icons/home.png';
import pessoaImg from '../assets/icons/pessoa.png';
import listaImg from '../assets/icons/lista.png';
import { useRouter } from 'expo-router';

export default function Footer() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Lista');
  const getTintColor = (tab) => (activeTab === tab ? '#008000' : '#000');
  const handlePress = (tab, route) => {
    setActiveTab(tab);
    router.push(route);
  };
  return (
    <View style={{ flex: 1,alignItems:"center"}}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopColor: "#C8C8C8",
          borderTopWidth: 1,
          marginTop:800
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
          <Pressable onPress={() => handlePress('Home', '/Home')}>
            <Image
              source={homeImg}
              style={{
                width: 30,
                height: 30,
                tintColor: getTintColor('Home'),
              }}
              />
              <Text style={{ color: getTintColor('Home') }}>Início</Text>
          </Pressable>

          {/* LISTA */}
          <Pressable onPress={() => handlePress('Lista', '/Lista')}>
            <Image
              source={listaImg}
              style={{
                width: 30,
                height: 30,
                tintColor: getTintColor('Lista'),
              }}
            />
              <Text style={{ color: getTintColor('Lista') }}>Lista</Text>
          </Pressable>

          {/* PERFIL */}
          <Pressable onPress={() => handlePress('Perfil', '/Perfil')}>
            <Image
              source={pessoaImg}
              style={{
                width: 30,
                height: 30,
                tintColor: getTintColor('Perfil'),
              }}
            />
              <Text style={{ color: getTintColor('Perfil') }}>Perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
