import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, Keyboard, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import tomate from "../../assets/fruts/tomate.png";
import camera from '../../assets/icons/camera.png';
import favorito from '../../assets/icons/favorito.png';
import iconePesquisa from '../../assets/icons/lupa.png';
import compras from '../../assets/icons/shopping-bag.png';
import CardAlimentos from "../../components/CardAlimentos";
import Footer from "../../components/Footer";
import ModalComponente from "../../components/ModalComponente";
import env from '../../env';
export default function AdicionarAlimento() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [userData, setUserData] = useState(null);

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
    const [test, seTest] = useState([]);
    const [idUsuario,setIdUsuario] = useState()
    const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);
    const [refeicaoP,setRefeicaoP] = useState()
    const [listaFavoritos, setListaFavoritos] = useState([]);
    const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
    const [alimentoCard,setAlimentoCard] = useState()
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString) {
                    setUserData(JSON.parse(userDataString));
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        };
        loadUserData();
    }, []);

    useEffect(() => {
        if (params.nome) {
            setSelectedFood({
                nome: params.nome,
                imagem: params.imagem,
                calorias: parseFloat(params.calorias),
                proteinas: parseFloat(params.proteinas),
                gordura: parseFloat(params.gordura),
                carboidrato: parseFloat(params.carboidrato),
                sodio: parseFloat(params.sodio),
                fibra: parseFloat(params.fibra),
                id: params.id,
                refeicao: params.refeicao,
                quantidade: parseFloat(params.quantidade)
            });
            setModalVisivel(true);
        }
    }, [params]);

    const handleConfirmarAdicao = async (quantidade) => {
        if (!selectedFood || !userData) return;

        try {
            const response = await fetch(`${env.apiUrl}/refeicoes/${userData.id}`);
            const refeicoes = await response.json();

            const refeicaoAtual = refeicoes.find(r => r.nome === selectedFood.refeicao);
            const alimentosAtuais = refeicaoAtual ? refeicaoAtual.alimentos : [];

            const alimentoAtualizado = {
                ...selectedFood,
                quantidade: quantidade
            };

            const novosAlimentos = [...alimentosAtuais, alimentoAtualizado];

            const payload = {
                nome: selectedFood.refeicao,
                alimentos: novosAlimentos
            };


            if (updateResponse.ok) {
                setModalVisivel(false);
                router.back();
            }
        } catch (error) {
            console.error('Erro ao adicionar alimento:', error);
        }
    };

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

    let {
        refeicao
    } = useLocalSearchParams();
    
    let{
        alimentoSelecionadoCard
    } = useLocalSearchParams();
    console.log("params", alimentoSelecionadoCard);
    
    //setAlimentoCard(alimentoSelecionadoCard)
  useEffect(() => {
    if (params.alimentoSelecionadoCard) {
        try {
            const alimento = JSON.parse(params.alimentoSelecionadoCard);
            console.log("effect alimento", JSON.stringify(alimento));
              
            setAlimentosSelecionados([alimento].concat(alimentosSelecionados));
                
            console.log("Alimento recebido e adicionado:", JSON.stringify(alimentosSelecionados));
        } catch (e) {
            console.error("Erro ao fazer parse do alimentoSelecionadoCard:", e);
        }
    }
}, [params.alimentoSelecionadoCard]);

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
            refeicao:refeicao,
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
             
             setIdUsuario(user[0].user_id)
            }else{
              alert("dados não encontrados");
            }
        }catch(error){
          console.error('Erro ao ler AsyncStorage', error);
          return null;
        }
    }

    useEffect(() => {
        DadosUsuario()
    }, []);

    const SalvarRefeicoes = async (alimento,alimentoSelecionadoCard) => {

       // const alimentos= [];
        //alimentos = alimentoSelecionadoCard.concat(alimento)
       // console.log("alimentos array", alimentos);
        
       console.log("Alimento adicionado à lista ",alimentosSelecionados);
        setAlimentosSelecionados([alimento].concat(alimentosSelecionados));
        setTextInput('');
        setbuscaAlimento(false);
        setData([]);
    }

    const FinalizarAdicao = async () => {
        console.log("exite oppp");
        const hoje = new Date();
        const dataFormatada = hoje.toISOString().split('T')[0];
        let valoresMeals = await AsyncStorage.getItem("meals");
        valoresMeals = JSON.parse(valoresMeals)
        console.log("exite meal", valoresMeals);
        const existeRefeicao =  valoresMeals.find(meal => meal.name ===  refeicao || meal.name === alimentosSelecionados[0].refeicao);
        console.log("exite ref", existeRefeicao);
        try {
            const evento = {
                    meal: {
                        start_date: dataFormatada,
                        end_date: dataFormatada,
                        user_id: idUsuario,
                        name: refeicao || alimentosSelecionados[0].refeicao,
                        foods: alimentosSelecionados.map(alimento => ({
                            food_id: alimento.food_id,
                            amount: quantidadeAdicionadaInput,
                            calories: alimento.calories || 0,
                            fat: alimento.fat || 0,
                            carbohydrates: alimento.carbohydrates || 0,
                            sodium: alimento.sodium || 0,
                            fiber: alimento.fiber || 0,
                            protein: alimento.protein || 0
                        }))
                    }
                };
                
            if (existeRefeicao) {  
                const urlAlimentos = `${env.ip}food/meal/${existeRefeicao.meal_id}`;
                 const resultAlimentos = await fetch(urlAlimentos);
                 const foods = await resultAlimentos.json();
                evento.meal.meal_id = existeRefeicao.meal_id;
                foods.forEach(food => {                 
                    evento.meal.foods.push(food)
                });
                const urlUpdate = `${env.ip}meal/update`;
               const updateResponse = await fetch(urlUpdate, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(evento)
                });
                
                if (!updateResponse.ok) {
                    throw new Error('Erro ao atualizar refeição');
                }
    
                console.log("Refeição atualizada com sucesso");
                 router.replace("/Home");
            }else{
                const urlCriarRefeicao = `${env.ip}meal/create`;
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
                router.replace("/Home");
            }   
        } catch (error) {
            console.error("Erro ao cadastrar alimentos:", error);
            alert("Erro ao adicionar alimentos. Tente novamente.");
        }
    }

    const handleTextChange = (text) => {
        setTextInput(text.toLowerCase());
    };

    const FavoritosAlimentos = async () =>{
        const url = `${env.ip}food/favorites/${idUsuario}`
        try{
            const response = await fetch(url);
            if(!response.ok){
                 throw new Error("erro na busca");
            }
            const resposta = await response.json();
            setListaFavoritos(resposta)
            console.log("favoritos", JSON.stringify(resposta));
            
        }catch(e){
            console.error("erro ao buscar", e);
            
        }
    }

    const PrintFavoritosAlimentos = () =>{
        return(
              <View style={{ height: 380 }}>
            <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingVertical: 10,
                }}
            >
                {listaFavoritos.map((favorito, index) => (
                    <Pressable key={index} onPress={() => abrirCard(favorito)}>
                        <CardAlimentos
                            nome={favorito.name}
                            kcal={favorito.calories}
                            onAdicionar={() => SalvarRefeicoes(favorito,alimentoSelecionadoCard)}
                        />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
        )
    }

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
                                onAdicionar={() => SalvarRefeicoes(alimento,alimentoSelecionadoCard)}
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
          

            <View style={{ alignItems: 'center', marginTop: 85 }}>
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
                        >{alimentosSelecionados.length || 0}</Text>
                        <Image source={compras}
                         style={{width:30,height:30}}
                        />
                    </View>
                        </Pressable>   

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Pressable onPress={()=>{
                            if(mostrarFavoritos){
                                setMostrarFavoritos(false);
                            }else{
                                 FavoritosAlimentos();
                                setMostrarFavoritos(true);
                            }
                            
                            }} style={{flexDirection:"row",alignItems:"center"}}>

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
                        </Pressable>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: 60
                }}>
                  {mostrarFavoritos ? PrintFavoritosAlimentos() : renderContent()}
                </View>
                   { modalVisivel &&(

                       <ModalComponente
                        tituloModal={`Alimentos selecionados: ${alimentosSelecionados.length}`}
                        alimentoSelecionados={true}
                        textoAlimentos={alimentosSelecionados}
                        onClose={()=>setModalVisivel(false)}
                        handleSave={FinalizarAdicao}
                        quantidaeValor={(e)=>{setquantidadeAdicionadaInput(e)}}
                        TextoSalvar="Salvar"
                       />

                   )}
                 
            </View>
            <Footer/>

        </SafeAreaView>
    );
}