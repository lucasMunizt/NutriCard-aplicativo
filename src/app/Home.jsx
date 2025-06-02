import { Text, View, TouchableOpacity, StatusBar, Dimensions, SafeAreaView, Pressable,Alert  } from "react-native";
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
import { useRouter } from 'expo-router';


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
  const [valoresidRefeicoes, setValoresidRefeicoes] = useState([])
    const router = useRouter();
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
        setAlimentosPorRefeicao([]);
        const userData = await AsyncStorage.getItem("user");
        const user = JSON.parse(userData);
        const userId = user[0].user_id;

        let start = moment().clone().startOf('month').format('YYYY-MM-DD');
        let end = moment().clone().endOf('month').format('YYYY-MM-DD');

        const urlRefeicoes = `${env.ip}meal/${userId}/${start}/${end}`;
        console.log("url zz", urlRefeicoes);
        
        const responseRefeicoes = await fetch(urlRefeicoes);

        if (!responseRefeicoes.ok) {
          console.error("Erro ao buscar refeições:", await responseRefeicoes.text());
          return;
        }

        const refeicoesData = await responseRefeicoes.json();
      //  console.log("refeicoes do dia a", JSON.stringify(refeicoesData));
        
        await AsyncStorage.setItem('meals', JSON.stringify(refeicoesData));

        const mapaAgrupado = {};
        

        const refeicoesComAlimentos = await Promise.all(
          refeicoesData.map(async (refeicao) => {
            console.log("id alimentos ", refeicao.meal_id);
            
            const urlAlimentos = `${env.ip}food/meal/${refeicao.meal_id}`;
            const resAlimentos = await fetch(urlAlimentos);
           // console.log('todas as ref', refeicao.meal_id);
            
             setValoresidRefeicoes(refeicao.meal_id); 
            if (!resAlimentos.ok) {
              const errorText = await resAlimentos.text();
              // Só mostra o erro se realmente for uma refeição não encontrada
              if (errorText.includes("Refeição não encontrada")) {
                console.log(`Refeição ${refeicao.name} (ID: ${refeicao.meal_id}) não tem alimentos associados`);
              } else {
                console.error(`Erro ao buscar alimentos para ${refeicao.name}:`, errorText);
              }
              return null;
            }

            const alimentosData = await resAlimentos.json();
         //   console.log("quantidade de elementos na busca", JSON.stringify(alimentosData));
            if (!mapaAgrupado[refeicao.name]) {
              mapaAgrupado[refeicao.name] = [...alimentosData];
            } else {
              const nomesExistentes = new Set(mapaAgrupado[refeicao.name].map(a => a.name));
              alimentosData.forEach(alimento => {
                if (!nomesExistentes.has(alimento.name)) {
                  mapaAgrupado[refeicao.name].push(alimento);
                }
              });
            }

            return {
              nome: refeicao.name,
              kcal: `${refeicao.calories || 0}`,
              imagem: getImagemPorRefeicao(refeicao.name),
              meal_id: refeicao.meal_id 
            };
          })
        );

        const refeicoesUnicas = {};
        refeicoesComAlimentos.forEach(refeicao => {
          if (refeicao && !refeicoesUnicas[refeicao.nome]) {
            refeicoesUnicas[refeicao.nome] = refeicao;
          }
        });

        setRefeicoes(Object.values(refeicoesUnicas));

        const agrupadoConvertido = Object.entries(mapaAgrupado).map(([nomeRefeicao, alimentos]) => ({
          nomeRefeicao,
          alimentos
        }));
        setAlimentosPorRefeicao(agrupadoConvertido);

      } catch (e) {
        console.error("Erro geral ao buscar dados:", e);
      }
    };

    buscarRefeicoesComAlimentos();
  }, [currentDate]);


    const abrirDetalhes = (alimento) => {
        console.log("dados alimentos aa", alimento.name);
        
        router.push({
           pathname: '/Card', // Certifique-se que o caminho está correto
           params: {
            nome: alimento.name,
            imagem: `https://img.spoonacular.com/ingredients_500x500/${alimento.image}`,
            calorias: alimento.calories,
            proteinas: alimento.protein,
            gordura: alimento.fat,
            carboidrato: alimento.carbohydates,
            sodio: alimento.sodium,
            fibra: alimento.fiber,
            id: alimento.food_id,
           }
           
         });
      
      console.log("alimentos",JSON.stringify(alimentosPorRefeicao));
      
  };

    
  const confirmarExclusao = (mealId) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir está refeição?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => ExcluirRefeicoes(mealId), // ⬅️ Só chama se confirmar
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

    const ExcluirRefeicoes = async (mealId) =>{
      console.log("valoresidRefeicoes:", mealId);
        try{
          const url = `${env.ip}meal/${mealId}`
          console.log("url", url);
            
            const res = await fetch(url,{
              method:"DELETE"
            });
            router.replace("/Home");
        }catch(e){
          console.error("erro ao excluir refeições", e);
          
        }
    }





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
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" backgroundColor="#4CAF50" translucent={false} />
        
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
              <TouchableOpacity onPress={() => {toggleDropdown(refeicao.nome);}}>
                <CardRefeicao
                  imagem={getImagemPorRefeicao(refeicao.nome)}
                  nome={refeicao.nome}
                  kcal={refeicao.kcal}
                  adicionarAlimento={false}
                  mostraAlimentos={true}
                  excluirRefeicoes={true}
                  excluir={()=>confirmarExclusao(refeicao.meal_id)}
                />
              </TouchableOpacity>

              {refeicaoAberta === refeicao.nome && (
                <View style={{ paddingLeft: 20, paddingBottom: 10 }}>
                  {alimentosPorRefeicao
                    .find(item => item.nomeRefeicao === refeicao.nome)
                    ?.alimentos.map((alimento, idx) => (
                      <Pressable key={alimento.id || `${refeicao.nome}-${idx}`} onPress={()=>{abrirDetalhes(alimento);}}>

                      <Text
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
                      </Pressable>
                    ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
      <Footer />
    </View>
  );
}
