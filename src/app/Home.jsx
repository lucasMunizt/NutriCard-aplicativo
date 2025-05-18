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

  const [refeicaoAberta, setRefeicaoAberta] = useState(null);

  const toggleDropdown = (nomeRefeicao) => {
    setRefeicaoAberta(refeicaoAberta === nomeRefeicao ? null : nomeRefeicao);
  };

  const refeicoes = [
    {
      nome: "Cafe",
      imagem: cafe,
      kcal: "0/1200KCal",
      alimentos: ["Pão", "Café preto", "Banana", "Banana", "Banana", "Banana"]
    },
    {
      nome: "Almoço",
      imagem: almoco,
      kcal: "0/1200KCal",
      alimentos: ["Arroz", "Feijão", "Frango grelhado"]
    },
    {
      nome: "Jantar",
      imagem: jantar,
      kcal: "0/1200KCal",
      alimentos: ["Sopa", "Torrada integral"]
    }
    ,{
      nome: "Merenda",
      imagem: jantar,
      kcal: "0/1200KCal",
      alimentos: ["Sopa", "Torrada integral"]
    }
  ];

  const goToPreviousDay = () => {
    setCurrentDate(prev => moment(prev).subtract(1, 'days'));
  };

  const goToNextDay = () => {
    setCurrentDate(prev => moment(prev).add(1, 'days'));
  };

  if (!fontLoaded) return null;

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      marginTop: 90,
      alignItems: 'center',
    }}>
      {/* Cabeçalho com Data */}
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
            marginRight: 40
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
            marginLeft: 40
          }}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Refeições com Dropdown */}
      <View style={{
        width: 360,
        elevation: 5,
        marginTop: 30,
        padding: 10,
        borderRadius: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        backgroundColor: '#fff',
      }}>
        {refeicoes.map((refeicao, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleDropdown(refeicao.nome)}>
              <CardRefeicao
                imagem={refeicao.imagem}
                nome={refeicao.nome}
                kcal={refeicao.kcal}
                adicionarAlimento={false}
                mostraAlimentos={true}
              />
            </TouchableOpacity>

            {/* Dropdown de alimentos */}
            {refeicaoAberta === refeicao.nome && (
              <View style={{ paddingLeft: 20, paddingBottom: 10 }}>
                {refeicao.alimentos.map((item, idx) => (
                  <Text key={idx} style={{ 
                    fontSize: 17, 
                    color: '#555', 
                    fontFamily:"Nunito_500Medium",
                    fontWeight:500,
                  }}>
                     {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <Footer />
    </View>
  );
}
