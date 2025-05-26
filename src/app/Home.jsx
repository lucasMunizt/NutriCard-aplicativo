import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";
import moment from 'moment';
import CardRefeicao from '../../components/CardRefeicao';
import 'moment/locale/pt-br';
import Footer from "../../components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env'; // seu arquivo com a variável de IP/host da API
import cafe from "../../assets/icons/cofee.png";
import almoco from "../../assets/icons/arroz-frito.png";
import jantar from "../../assets/icons/jantar-romantico.png";
import merenda from "../../assets/icons/merenda.png";
export default function Home() {
  const [fontLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold
  });

  const [currentDate, setCurrentDate] = useState(moment());
  const [refeicaoAberta, setRefeicaoAberta] = useState(null);
  const [refeicoes, setRefeicoes] = useState([]);
  const [alimentosPorRefeicao, setAlimentosPorRefeicao] = useState([]);
  const [imgRefeicao,setImgRefeicao] = useState()

  const toggleDropdown = (nomeRefeicao) => {
    setRefeicaoAberta(refeicaoAberta === nomeRefeicao ? null : nomeRefeicao);
  };

  const goToPreviousDay = () => {
    setCurrentDate(prev => moment(prev).subtract(1, 'days'));
  };

  const goToNextDay = () => {
    setCurrentDate(prev => moment(prev).add(1, 'days'));
  };

  useEffect(() => {
    const buscarRefeicoesComAlimentos = async () => {
      try {
        setAlimentosPorRefeicao([]); // zera antes de buscar
        const userData = await AsyncStorage.getItem("user");
        const user = JSON.parse(userData);
        const userId = user[0].user_id;

         let start = moment().clone().startOf('month').format('YYYY-MM-DD')
          let end = moment().clone().endOf('month').format('YYYY-MM-DD')
           //pegar o id da refeição
           console.log("start", start);
           console.log("end", end);
           
        const urlRefeicoes = `${env.ip}meal/${userId}/${start}/${end}`;
        const responseRefeicoes = await fetch(urlRefeicoes);

        if (!responseRefeicoes.ok) {
          console.error("Erro ao buscar refeições:", await responseRefeicoes.text());
          return;
        }

        const refeicoesData = await responseRefeicoes.json();

        const refeicoesComAlimentos = await Promise.all(
            //pegando a refeição
          refeicoesData.map(async (refeicao) => {
            const urlAlimentos = `${env.ip}food/meal/${refeicao.meal_id}`;
            const resAlimentos = await fetch(urlAlimentos);

            if (!resAlimentos.ok) {
              console.error(`Erro ao buscar alimentos para ${refeicao.name}:`, await resAlimentos.text());
              return null;
            }

            const alimentosData = await resAlimentos.json();
            console.log('lista de alimentos', alimentosData[0].name);
            
            setAlimentosPorRefeicao((prev) => [
              ...prev,
              { nomeRefeicao: refeicao.name, alimentos: alimentosData }
            ]);

            return {
              nome: refeicao.name,
              kcal: `${refeicao.calories || 0}/1200KCal`,
              imagem: getImagemPorRefeicao(refeicao.name)
            };
          })
        );

        const refeicoesFiltradas = refeicoesComAlimentos.filter(Boolean);
        setRefeicoes(refeicoesFiltradas);
      } catch (e) {
        console.error("Erro geral ao buscar dados:", e);
      }
    };

    buscarRefeicoesComAlimentos();
  }, [currentDate]);

  const getImagemPorRefeicao = (nomeRefeicao) => {
  if (nomeRefeicao.includes("Café da Manhã")) return cafe;
  if (nomeRefeicao.includes("Almoço")) return almoco;
  if (nomeRefeicao.includes("Jantar")) return jantar;
  if (nomeRefeicao.includes("Merenda")) return merenda;
  return null;
};

  if (!fontLoaded) return null;

  return (
    <View style={{ flex: 1, flexDirection: 'column', marginTop: 90 }}>
      {/* Cabeçalho com Data */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
      }}>
        <TouchableOpacity onPress={goToPreviousDay}>
          <Text style={{ fontSize: 24, color: '#333', marginRight: 40 }}>◀</Text>
        </TouchableOpacity>

        <Text style={{
          fontSize: 16,
          fontWeight: '900',
          textTransform: 'capitalize',
          fontFamily: 'Nunito_700Bold'
        }}>
          {currentDate.locale('pt-br').format('dddd, D [de] MMMM')}
        </Text>

        <TouchableOpacity onPress={goToNextDay}>
          <Text style={{ fontSize: 24, color: '#333', marginLeft: 40 }}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Refeições com Dropdown */}
      <View style={{ width: 360, marginTop: 30, padding: 10 }}>
        {refeicoes.map((refeicao, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleDropdown(refeicao.nome)}>
              <CardRefeicao
                imagem={getImagemPorRefeicao(refeicao.nome)}
                nome={refeicao.nome}
                kcal={refeicao.kcal}
                adicionarAlimento={false}
                mostraAlimentos={true}
              />
            </TouchableOpacity>

            {refeicaoAberta === refeicao.nome && (
              <View style={{ paddingLeft: 20, paddingBottom: 10 }}>
                   {alimentosPorRefeicao
                    .find(item => item.nomeRefeicao === refeicao.nome)
                    ?.alimentos.map((alimento, idx) => (
                  <Text
                    key={idx}
                    style={{
                      fontSize: 17,
                      color: '#555',
                      fontFamily: "Nunito_500Medium",
                      fontWeight: "500",
                      marginVertical: 5
                    }}
                  >
                    {alimento.name}
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
