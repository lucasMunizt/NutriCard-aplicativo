import Footer from "../../components/Footer";
import { Text, View, Keyboard, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable } from "react-native";
import iconePesquisa from '../../assets/icons/lupa.png';
import camera from '../../assets/icons/camera.png';
import favorito from '../../assets/icons/favorito.png';
import compras from '../../assets/icons/shopping-bag.png';
import tomate from "../../assets/fruts/tomate.png";
import barracaFrutas from "../../assets/icons/barracaFrutas.png";
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";
import CardAlimentos from "../../components/CardAlimentos";
import { useRouter } from 'expo-router';
import Card from "./Card";
import { useLocalSearchParams } from "expo-router";
import env from '../../env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponente from "../../components/ModalComponente";
export default function AdicionarAlimento() {
   
    const [fontLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold
    });

    const [listaBuscaAlimento, setbuscaAlimento] = useState(false);
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('');
    const [nomeAlimento,setAlimento] = useState('');
    const [quantidadeAdicionada,setquantidadeAdicionada] = useState()
    const [quantidadeAdicionadaInput,setquantidadeAdicionadaInput] = useState()
    const [dadosUsuario, setDadosUsuario] = useState([]);
    const [idUsuario,setIdUsuario] = useState()
    const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);
    const [refeicaoP,setRefeicaoP] = useState()
    const [modalVisivel, setModalVisivel] = useState(false);
    const BuscarAlimentos = async () => {
        if (textInput !== '') {
            await FecthListaAlimentos();
            setbuscaAlimento(true);
        } else {
            setbuscaAlimento(false);
        }
    };

     const handleSubmit = () => {
        Keyboard.dismiss();
        BuscarAlimentos();
    };

    const {
        refeicao
    } = useLocalSearchParams();
    const router = useRouter();

        const abrirCard = (data) => {
        router.push({
            pathname: "/Card",
            params: {
            nome: data.name,
            imagem: `https://img.spoonacular.com/ingredients_500x500/${data.image}`,
            calorias: data.calories,
            proteinas: data.protein,
            gordura: data.fat,
            carboidrato: data.carbohydates,
            sodio: data.sodium,
            fibra: data.fiber,
            id: data.food_id,
            idUsuario: idUsuario,
            amount:quantidadeAdicionada,
            refeicao:refeicao
            },
        });
        };
    
      const abrirModal = () =>{
    return setModalVisivel(true)
  }

   const FecthListaAlimentos = async () => {
        const url = `${env.ip}food?number=10&query=${textInput.toLowerCase()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("erro na busca");
            }
            const resultado = await response.json();
            console.log("achou ", resultado);
            setData(resultado);
        } catch (error) {
            console.error("erro ao buscar:", error);
        }
    };

    const DadosUsuario = async () =>{
    try{
        const valoresDados = await AsyncStorage.getItem("user");
        if(valoresDados != null){
         const user = JSON.parse(valoresDados)
         console.log('usuario',  user[0].user_id);
         
         setIdUsuario(user[0].user_id)
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

    const SalvarRefeicoes = async (alimento) => {
        // Apenas adiciona o alimento à lista de selecionados
        setAlimentosSelecionados(prev => [...prev, alimento]);
        console.log("Alimento adicionado à lista ",alimentosSelecionados);
        
        // Limpar a busca após adicionar
        setTextInput('');
        setbuscaAlimento(false);
        setData([]);
    }

    const FinalizarAdicao = async () => {
        const hoje = new Date();
        const dataFormatada = hoje.toISOString().split('T')[0];
        
        try {
            // Criar uma nova refeição com todos os alimentos selecionados
            const urlCriarRefeicao = `${env.ip}meal/create`;
            const evento = {
                meal: {
                    start_date: dataFormatada,
                    end_date: dataFormatada,
                    user_id: idUsuario,
                    name: refeicao,
                    foods: alimentosSelecionados.map(alimento => ({
                        food_id: alimento.food_id,
                        amount: quantidadeAdicionadaInput,
                        calories: alimento.calories,
                        fat: alimento.fat,
                        carbohydrates: alimento.carbohydrates,
                        sodium: alimento.sodium,
                        fiber: alimento.fiber,
                        protein: alimento.protein
                    }))
                }
            };

            const responseCriar = await fetch(urlCriarRefeicao, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(evento),
            });

            if (!responseCriar.ok) {
                throw new Error('Erro ao criar refeição');
            }

            console.log("Refeição criada com sucesso");
            router.back();
        } catch (error) {
            console.error("Erro ao cadastrar alimentos:", error);
            alert("Erro ao adicionar alimentos. Tente novamente.");
        }
    }

    // Função de callback para o TextInput
    const handleTextChange = (text) => {
        setTextInput(text.toLowerCase());
    };

    // Renderização condicional movida para uma variável
    const renderContent = () => {
        if (!listaBuscaAlimento) {
            return (
                <>
                    <Image
                        source={tomate}
                        style={{ width: 250, height: 250 }}
                    />
                    <Text style={{
                        fontFamily: "Nunito_700Bold",
                        fontSize: 25,
                        lineHeight: 40,
                        textAlign: 'center'
                    }}>
                        Não se esqueça, você pode sempre procurar o alimento por uma foto!
                    </Text>
                </>
            );
        }

        return (
            <View style={{ height: 380 }}>
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}
                >
                    {data.map((alimento, index) => (
                        <Pressable key={index} onPress={() => abrirCard(alimento)}>
                            <CardAlimentos
                                nome={alimento.name}
                                kcal={alimento.calories}
                                onAdicionar={() => SalvarRefeicoes(alimento)}
                            />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        );
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', marginTop: 80 }}>
                <View style={{ width: 340 }}>
                    <TextInput
                        style={{
                            width: '100%',
                            height: 60,
                            backgroundColor: "#e6e3e3",
                            padding: 20,
                            borderRadius: 12,
                            color: 'black',
                        }}
                        underlineColorAndroid="transparent"
                        placeholder="Coloque o nome do alimento"
                        placeholderTextColor="black"
                        onChangeText={handleTextChange}
                        onSubmitEditing={handleSubmit}
                        value={textInput}
                        returnKeyType="search"
                    />
                    <Pressable onPress={BuscarAlimentos}>
                        <Image
                            source={iconePesquisa}
                            style={{
                                width: 24,
                                height: 24,
                                position: 'absolute',
                                top: -40,
                                left: 300,
                            }}
                        />
                    </Pressable>
                </View>

                <View style={{
                    marginTop: 40,
                    alignItems: 'center',
                    justifyContent: "space-around",
                    flexDirection: "row",
                    gap:60
                }}>
                    <View style={{
                        
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={camera}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 10
                            }}
                        />
                        <Text style={{
                            marginRight: 10,
                            fontFamily: 'Nunito_500Medium',
                            fontWeight: 500
                        }}>Foto</Text>
                    </View>
                     <Pressable onPress={()=>{setModalVisivel(true)}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                position:"relative",
                                backgroundColor:"#4CAF50",
                                borderRadius:12,
                                width:25,
                                height:25,
                                textAlign:"center",
                                alignItems:"center",
                                top:-10,
                                color:"#fff",
                                fontWeight:"900",
                                left:40,
                                zIndex:50
                            }}
                        >{quantidadeAdicionada || 0}</Text>
                        <Image source={compras}
                         style={{width:30,height:30}}
                        />
                    </View>
                        </Pressable>   

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Image
                            source={favorito}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 10
                            }}
                        />
                        <Text style={{
                            fontFamily: 'Nunito_500Medium',
                            fontWeight: 500
                        }}>Favoritos</Text>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: 60
                }}>
                    {renderContent()}
                </View>

                { modalVisivel &&(
                    

                        <ModalComponente
                        tituloModal={`Alimentos selecionados: ${alimentosSelecionados.length}`}
                        alimentoSelecionados={true}
                        textoAlimentos={alimentosSelecionados}
                        onClose={()=>setModalVisivel(false)}
                        onSave={FinalizarAdicao}
                        quantidaeValor={(e)=>{setquantidadeAdicionadaInput(e)}}
                        />
                        
                        
                    )}
                    {console.log('quantidade',quantidadeAdicionadaInput)}
            </View>
            <Footer/>
        </View>
    );
}
