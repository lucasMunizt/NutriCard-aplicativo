import { Text, View, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";
import moment from 'moment'; 
import CardRefeicao from '../../components/CardRefeicao';
import 'moment/locale/pt-br';
import almoco from "../../assets/icons/arroz-frito.png";
import jantar from "../../assets/icons/jantar-romantico.png";
import cafe from "../../assets/icons/cofee.png";
import Footer from "../../components/Footer";
export default function Home() {
  const [fontLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold
  });

  const [currentDate, setCurrentDate] = useState(moment());

  const goToPreviousDay = () => {
    setCurrentDate(prev => moment(prev).subtract(1, 'days'));
  };

  const goToNextDay = () => {
    setCurrentDate(prev => moment(prev).add(1, 'days'));
  };

  if (!fontLoaded) return null;

  return (
    <View
        style={{
            flex:1,
            flexDirection:'column',
            marginTop:90,
            alignItems:'center',
        }}
    >

    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    }}>
      <TouchableOpacity onPress={goToPreviousDay}>
        <Text style={{
            fontSize: 24,
            color: '#333', 
            marginRight:40          
        }}>◀</Text>
      </TouchableOpacity>

      <Text style={{
        fontSize: 16,
        fontWeight: 900,
        textTransform: 'capitalize',
        fontFamily: 'Nunito_700Bold'
      }}>
        {currentDate.locale('pt-br').format('dddd, D [de] MMMM')}
      </Text>

      <TouchableOpacity onPress={goToNextDay}>
        <Text style={{ 
            fontSize: 24, 
            color: '#333', 
            marginLeft:40   
        }}>▶</Text>
      </TouchableOpacity>
    </View>
      <View style={{
            width: 360,
            elevation:5,
            marginTop: 30,
            padding: 10,
            borderRadius: 12,
            borderBottomWidth: 2,          // define a espessura da linha
            borderBottomColor: "#ccc",

      }}>
        <CardRefeicao
        imagem={cafe}
        nome="Cafe"
        kcal="0/1200KCal"
        adicionarAlimento = {false}
        />
        <CardRefeicao
        imagem={almoco}
        nome="Almoço"
        kcal="0/1200KCal"
        adicionarAlimento = {false}
        />
        <CardRefeicao
        imagem={jantar}
        nome="Jantar"
        kcal="0/1200KCal"
        adicionarAlimento = {false}
        />
      </View>
      <Footer/>
    </View>
  );
}
