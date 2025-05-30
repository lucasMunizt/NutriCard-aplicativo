import React, { useState, useEffect } from 'react';
import coruja from "../../assets/icons/coruja.png";
import Footer from "../../components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image, // Kept for potential future use, though ProfilePlaceholder is used
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

// It's good practice to get screen dimensions once
const { width, height } = Dimensions.get('window');
  
  


// Define your green color palette
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

// Placeholder for profile picture with inline styles
const ProfilePlaceholder = () => (
  <View style={{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGreen, // Inner circle color
  }}>
    <Image source={coruja} 
    style={{
      width:80,
      height:80,}}/>
    
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
  const [quantidadeCalorias,setQuantidadeCalorias] = useState()
  const [modalVisivel, setModalVisivel] = useState(false);
 // const [nomeUsuario, setNomeUsuario] = useState("Lucas de Oliveira");
  // useEffect(() => { /* Your AsyncStorage logic here */ }, []);
  const DadosUsuario = async () =>{
    try{
        const valoresDados = await AsyncStorage.getItem("user");
        if(valoresDados != null){
         const user = JSON.parse(valoresDados)
         setDadosUsuario(user)
         setNomeUsuario(user[0].name) 
         setPesoAtual(user[0].weight) 
         setPesoIdeal(user[0].bmi)
         setQuantidadeCalorias(user[0].calories_consumed)
          return dadosUsuario
        }else{
          alert("dados não encontrados");
        }
    }catch(error){
      console.error('Erro ao ler AsyncStorage', e);
      return null;
    }
  }
  useEffect(() => {
    DadosUsuario()
  }, []);

  const abrirModal = () =>{
    return setModalVisivel(true)
  }

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.primaryGreen, // For notch area on iOS
    }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryGreen} />
      <View style={{ // Container
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        {/* Header */}
        <View style={{
          paddingHorizontal: width * 0.04,
          paddingVertical: height * 0.015, // Adjusted slightly for typical header height
          backgroundColor: COLORS.primaryGreen,
          height: height * 0.10,
        }}>
         
          <View style={{ width: width * 0.08 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: height * 0.03 }}>
          {/* Profile Section */}
          <View style={{
            alignItems: 'center',
            paddingTop: height * 0.01,
            paddingBottom: height * 0.03,
            backgroundColor: COLORS.white,
          }}>
            <View style={{ // profilePictureOuterCircle
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
                <View style={{ // profilePictureInnerCircle
                    width: width * 0.32,
                    height: width * 0.32,
                    borderRadius: (width * 0.32) / 2,
                    // backgroundColor: COLORS.primaryGreen, // This is now handled by ProfilePlaceholder
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
            }}>{nomeUsuario}</Text>
            
            <TouchableOpacity style={{
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
              }}>Editar</Text>
            </TouchableOpacity>
            {modalVisivel &&(
              <ModalComponente
                onClose={()=>setModalVisivel(false)}
              
              />
            )}
          </View>

          {/* Stats Section */}
          <View style={{ // statsCard
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
            <View style={{ // levelBadge
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginBottom: height * 0.02,
              paddingLeft: width * 0.02,
            }}>
          
            </View>
            <View style={{ // statsBoxesContainer
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
              <View style={{ alignItems: 'center', flex: 1 }}> 
                <Text style={{
                  fontSize: width * 0.055,
                  fontFamily: 'Nunito_700Bold',
                  color: COLORS.primaryGreen,
                }}>{(pesoAtual || 0).toFixed(2)}</Text>
                <Text style={{
                  fontSize: width * 0.03,
                  fontFamily: 'Nunito_500Medium',
                  color: COLORS.mediumText,
                  marginTop: height * 0.005,
                  textTransform: 'uppercase',
                }}>peso atual</Text>
              </View>
              <View style={{ width: 1, height: '60%', backgroundColor: COLORS.borderColor }} /> 
              <View style={{ alignItems: 'center', flex: 1 }}> 
                <Text style={{
                  fontSize: width * 0.055,
                  fontFamily: 'Nunito_700Bold',
                  color: COLORS.primaryGreen,
                }}>{(pesoIdeal || 0).toFixed(2)}</Text>
                <Text style={{
                  fontSize: width * 0.03,
                  fontFamily: 'Nunito_500Medium',
                  color: COLORS.mediumText,
                  marginTop: height * 0.005,
                  textTransform: 'uppercase',
                }}>peso ideal</Text>
              </View>
              <View style={{ width: 1, height: '60%', backgroundColor: COLORS.borderColor }} /> {/* statSeparator */}
              <View style={{ alignItems: 'center', flex: 1 }}> {/* statBox */}
                <Text style={{
                  fontSize: width * 0.055,
                  fontFamily: 'Nunito_700Bold',
                  color: COLORS.primaryGreen,
                }}>{(quantidadeCalorias || 0).toFixed(1)}</Text>
                <Text style={{
                  fontSize: width * 0.03,
                  fontFamily: 'Nunito_500Medium',
                  color: COLORS.mediumText,
                  marginTop: height * 0.005,
                  textTransform: 'uppercase',
                }}>calorias</Text>
              </View>
            </View>
          </View>

          {/* Descobertas Section 
          <View style={{
            marginTop: height * 0.03,
            paddingHorizontal: width * 0.07,
            backgroundColor: COLORS.white,
          }}>
            <Text style={{
              fontSize: width * 0.05,
              fontFamily: 'Nunito_700Bold',
              color: COLORS.darkText,
              marginBottom: height * 0.02,
            }}>Descobertas</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: height * 0.012,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.borderColor,
            }}>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_400Regular',
                color: COLORS.mediumText,
              }}>locais visitados:</Text>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_500Medium',
                color: COLORS.darkText,
              }}>55</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: height * 0.012,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.borderColor,
            }}>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_400Regular',
                color: COLORS.mediumText,
              }}>locais favoritos:</Text>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_500Medium',
                color: COLORS.darkText,
              }}>10</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: height * 0.012,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.borderColor,
            }}>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_400Regular',
                color: COLORS.mediumText,
              }}>categorias encontradas:</Text>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_500Medium',
                color: COLORS.darkText,
              }}>8</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: height * 0.012,
              borderBottomWidth: 1, // Or remove for the last item
              borderBottomColor: COLORS.borderColor,
            }}>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_400Regular',
                color: COLORS.mediumText,
              }}>data de início:</Text>
              <Text style={{
                fontSize: width * 0.04,
                fontFamily: 'Nunito_500Medium',
                color: COLORS.darkText,
              }}>01/01/2021</Text>
            </View>
          </View>*/}

          {/* Selos Recentes Section */}
        
        </ScrollView>
        <Footer />
      </View>
    </SafeAreaView>
  );
}