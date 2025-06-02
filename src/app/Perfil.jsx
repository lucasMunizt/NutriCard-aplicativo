import React, { useState, useEffect } from 'react';
import coruja from "../../assets/icons/coruja.png";
import Footer from "../../components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import ModalComponente from '../../components/ModalComponente';
import env from '../../env';
const { width, height } = Dimensions.get('window');

const COLORS = {
  primaryGreen: '#4CAF50',
  lightGreenBackground: '#E8F5E9',
  white: '#FFFFFF',
  black: '#000000',
  darkText: '#212121',
  mediumText: '#757575',
  lightText: '#FFFFFF',
  borderColor: '#BDBDBD',
  cardBackground: '#F5F5F5',
};

const ProfilePlaceholder = () => (
  <View style={{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGreen,
  }}>
    <Image 
      source={coruja} 
      style={{
        width: 80,
        height: 80,
      }}
    />
  </View>
);

export default function PerfilScreen() {
  const [fontLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [favoritosAberto, setFavoritosAberto] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [pesoAtual, setPesoAtual] = useState();
  const [pesoIdeal, setPesoIdeal] = useState();
  const [quantidadeCalorias, setQuantidadeCalorias] = useState();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [idUsuario,setIdUsuario] = useState();
  const [novoEmail,setNovoEmail] = useState();
  const [NovoPeso,setNovoPeso] = useState();
  const [NovaAltura,setNovaAltura] = useState();
  const [goal, setObjetivo] = useState();
  const DadosUsuario = async () => {
    try {
      const valoresDados = await AsyncStorage.getItem("user");
      const valoresMeals = await AsyncStorage.getItem("meals");
      const meals = valoresMeals ? JSON.parse(valoresMeals):[];
      if (valoresDados != null) {
        const user = JSON.parse(valoresDados);
        setDadosUsuario(user);
        setNomeUsuario(user[0].name);
        setPesoAtual(user[0].weight);
        setPesoIdeal(user[0].bmi);
        setIdUsuario(user[0].user_id)
        let todalCalorias = 0;
        if(meals.length > 0 ){
          meals.forEach((meal)=>{
           todalCalorias += meal.calories || 0;   
          })
        }
        setQuantidadeCalorias(todalCalorias);
        return dadosUsuario;
      } else {
        alert("dados não encontrados");
      }
    } catch (error) {
      console.error('Erro ao ler AsyncStorage', error);
      return null;
    }
  };

  useEffect(() => {
    DadosUsuario();
  }, []);

  const abrirModal = () => {
    return setModalVisivel(true);
  };

 const AlterarPerfil = async () => {
  const url = `${env.ip}user/update`;
 
  console.log("url alt",url);
  console.log("usuario ", idUsuario);
  const payload = {
    user: {
      mail: novoEmail || "",
      weight: NovoPeso || "",
      height: NovaAltura || "",
      goal: goal || "",
      user_id: idUsuario
    }
  };
  try {
    const response = await fetch(url, {
      method: 'PUT', // ou 'POST' dependendo do backend
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
    });
     console.log("Dados enviados:", {
    email: novoEmail,
    weight: NovoPeso,
    height: NovaAltura,
    goal: goal,
    user: idUsuario
  });
    const data = await response.json();

    if (response.ok) {
      console.log("Perfil atualizado com sucesso:", data);
      alert("Perfil atualizado com sucesso!");
      setModalVisivel(false); // fecha o modal
      DadosUsuario(); // atualiza os dados na tela
    } else {
      console.error("Erro ao atualizar perfil: ", data);
      //alert("Erro ao atualizar perfil.");
    }
  } catch (e) {
    console.error("Erro na requisição de atualização:", e);
    alert("Erro ao conectar com o servidor.");
  }
};


  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.primaryGreen,
    }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryGreen} />
      <View style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        <View style={{
          paddingHorizontal: width * 0.04,
          paddingVertical: height * 0.015,
          backgroundColor: COLORS.primaryGreen,
          height: height * 0.10,
        }}>
          <View style={{ width: width * 0.08 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: height * 0.03 }}>
          <View style={{
            alignItems: 'center',
            paddingTop: height * 0.01,
            paddingBottom: height * 0.03,
            backgroundColor: COLORS.white,
          }}>
            <View style={{
              width: width * 0.35,
              height: width * 0.35,
              borderRadius: (width * 0.35) / 2,
              backgroundColor: COLORS.lightGreenBackground,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: height * 0.015,
              elevation: 3,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}>
              <View style={{
                width: width * 0.32,
                height: width * 0.32,
                borderRadius: (width * 0.32) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
                <ProfilePlaceholder />
              </View>
            </View>
            <Text style={{
              fontSize: width * 0.06,
              fontFamily: 'Nunito_700Bold',
              color: COLORS.darkText,
              marginTop: height * 0.01,
              marginBottom: height * 0.01
            }}>
              {nomeUsuario}
            </Text>
            
            <TouchableOpacity 
              style={{
                backgroundColor: COLORS.primaryGreen,
                paddingVertical: height * 0.015,
                paddingHorizontal: width * 0.1,
                borderRadius: width * 0.07,
                elevation: 2,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.5,
              }}
              onPress={abrirModal}
            >
              <Text style={{
                color: COLORS.white,
                fontSize: width * 0.04,
                fontFamily: 'Nunito_700Bold',
              }}>
                Editar
              </Text>
            </TouchableOpacity>

            {modalVisivel && (
              <ModalComponente
                onClose={() => setModalVisivel(false)}
                modalEditor={true}
                alimentoSelecionados={false}
                onInputChangeAltura={(e)=>{setNovaAltura(e)}}
                onInputChangeEmail={(e)=>{setNovoEmail(e)}}
                onInputChangePeso={(e)=>{setNovoPeso(e)}}
                onInputChangeObjetivo={(e)=>{setObjetivo(e)}}
                handleSave={AlterarPerfil}
              />
            )}
          </View>

          <View style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            marginHorizontal: width * 0.05,
            marginTop: height * 0.01,
            paddingVertical: height * 0.02,
            paddingHorizontal: width * 0.03,
            elevation: 4,
            shadowColor: COLORS.borderColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            borderWidth: 1,
            borderColor: COLORS.borderColor,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginBottom: height * 0.02,
              paddingLeft: width * 0.02,
            }}>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_700Bold',
                color: COLORS.darkText,
              }}>
                Estatísticas
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{
                  fontSize: width * 0.055,
                  fontFamily: 'Nunito_700Bold',
                  color: COLORS.primaryGreen,
                }}>
                  {(pesoAtual || 0).toFixed(2)}
                </Text>
                <Text style={{
                  fontSize: width * 0.03,
                  fontFamily: 'Nunito_500Medium',
                  color: COLORS.mediumText,
                  marginTop: height * 0.005,
                  textTransform: 'uppercase',
                }}>
                  peso atual
                </Text>
              </View>

              <View style={{ width: 1, height: '60%', backgroundColor: COLORS.borderColor }} />

              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{
                  fontSize: width * 0.055,
                  fontFamily: 'Nunito_700Bold',
                  color: COLORS.primaryGreen,
                }}>
                  {(pesoIdeal || 0).toFixed(2)}
                </Text>
                <Text style={{
                  fontSize: width * 0.03,
                  fontFamily: 'Nunito_500Medium',
                  color: COLORS.mediumText,
                  marginTop: height * 0.005,
                  textTransform: 'uppercase',
                }}>
                  Imc
                </Text>
              </View>

              <View style={{ width: 1, height: '60%', backgroundColor: COLORS.borderColor }} />

              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{
                  fontSize: width * 0.055,
                  fontFamily: 'Nunito_700Bold',
                  color: COLORS.primaryGreen,
                }}>
                  {(quantidadeCalorias || 0).toFixed(0)}
                </Text>
                <Text style={{
                  fontSize: width * 0.03,
                  fontFamily: 'Nunito_500Medium',
                  color: COLORS.mediumText,
                  marginTop: height * 0.005,
                  textTransform: 'uppercase',
                }}>
                  calorias
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
