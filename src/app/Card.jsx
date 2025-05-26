import { Text, View, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable, SafeAreaView } from "react-native";
import Circulos from "../../components/Circulos";
import Footer from "../../components/Footer";
import ComponenteMas from "../../components/ComponenteMas";
import favorito from '../../assets/icons/favorito.png';
import { useLocalSearchParams, useRouter } from "expo-router";
import env from "../../env";
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Card() {
    const [fontLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold
    });

    const [quantidade, setQuantidade] = useState(1);
    const [idUsuario, setIdUsuario] = useState(null);
    const router = useRouter();

    const {
        nome,
        imagem,
        calorias,
        proteinas,
        gordura,
        carboidrato,
        sodio,
        fibra,
        id,
        refeicao
    } = useLocalSearchParams();
        
    console.log("ref ",refeicao );

    const DadosUsuario = async () => {
        try {
            const valoresDados = await AsyncStorage.getItem("user");
            if (valoresDados != null) {
                const user = JSON.parse(valoresDados);
                setIdUsuario(user[0].user_id);
            } else {
                alert("dados não encontrados");
            }
        } catch (error) {
            console.error('Erro ao ler AsyncStorage', error);
            return null;
        }
    }

    useEffect(() => {
        DadosUsuario();
    }, []);

    const FinalizarAdicao = async () => {
        if (!idUsuario) {
            alert("Erro ao identificar usuário");
            return;
        }

        // Validação dos campos obrigatórios
        if (!idUsuario || !refeicao) {
            console.log("id ", idUsuario);
            console.log("ref ", refeicao);
            alert("Dados do alimento incompletos");
            return;
        }

        const hoje = new Date();
        const dataFormatada = hoje.toISOString().split('T')[0];
        
        try {
            // Primeiro, vamos buscar a refeição existente para esta data
            const urlBuscarRefeicao = `${env.ip}meal/${idUsuario}/${dataFormatada}/${dataFormatada}`;
            console.log("URL de busca:", urlBuscarRefeicao);
            
            const responseBuscar = await fetch(urlBuscarRefeicao, {
                headers: env.headers
            });
            
            if (!responseBuscar.ok) {
                throw new Error(`Erro ao buscar refeições: ${await responseBuscar.text()}`);
            }
            
            const refeicoesExistentes = await responseBuscar.json();
            console.log("Refeições existentes:", refeicoesExistentes);
            
            // Procurar a refeição específica
            const refeicaoExistente = refeicoesExistentes.find(r => r.name === refeicao);
            console.log("Refeição encontrada:", refeicaoExistente);
            
            let urlCriarRefeicao;
            let evento;

            if (refeicaoExistente) {
                // Se a refeição existe, vamos adicionar o alimento a ela
                urlCriarRefeicao = `${env.ip}meal/${refeicaoExistente.meal_id}/food`;
                evento = {
                    food_id: parseInt(id) || 0,
                    amount: parseInt(quantidade) || 1,
                    calories: parseFloat(calorias) || 0,
                    fat: parseFloat(gordura) || 0,
                    carbohydrates: parseFloat(carboidrato) || 0,
                    sodium: parseFloat(sodio) || 0,
                    fiber: parseFloat(fibra) || 0,
                    protein: parseFloat(proteinas) || 0
                };
            } else {
                // Se a refeição não existe, vamos criar uma nova
                urlCriarRefeicao = `${env.ip}meal/create`;
                evento = {
                    meal: {
                        start_date: dataFormatada,
                        end_date: dataFormatada,
                        user_id: parseInt(idUsuario),
                        name: refeicao,
                        foods: [{
                            food_id: parseInt(id) || 0,
                            amount: parseInt(quantidade) || 1,
                            calories: parseFloat(calorias) || 0,
                            fat: parseFloat(gordura) || 0,
                            carbohydrates: parseFloat(carboidrato) || 0,
                            sodium: parseFloat(sodio) || 0,
                            fiber: parseFloat(fibra) || 0,
                            protein: parseFloat(proteinas) || 0
                        }]
                    }
                };
            }

            console.log("URL de criação:", urlCriarRefeicao);
            console.log("Dados sendo enviados:", JSON.stringify(evento, null, 2));

            const responseCriar = await fetch(urlCriarRefeicao, {
                method: 'POST',
                headers: env.headers,
                body: JSON.stringify(evento),
            });

            const responseText = await responseCriar.text();
            console.log("Resposta bruta da API:", responseText);

            if (!responseCriar.ok) {
                console.log("eventos erro", evento);
                throw new Error(`Erro ao criar refeição: ${responseText}`);
            }

            try {
                const responseData = JSON.parse(responseText);
                console.log("Resposta da API:", responseData);
            } catch (e) {
                console.log("Resposta não é um JSON válido");
            }

            console.log("Alimento adicionado com sucesso");
            router.back();
        } catch (error) {
            console.error("Erro ao cadastrar alimento:", error);
            alert(`Erro ao adicionar alimento: ${error.message}`);
        }
    }

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
            <SafeAreaView style={{flex: 1}}>
                <View style={{paddingTop: 70, flex: 1, alignItems: 'center'}}>
                    <View style={{width: 300, height: 300}}>
                        <Image source={{uri: imagem}} style={{width: 350, height: 250, alignSelf: 'center'}} />
                    </View>
                    <View style={{flexDirection: 'row', gap: 20, justifyContent: "space-evenly", alignItems: "center"}}>
                        <Text style={{fontSize: 20, fontFamily: "Nunito_700Bold", fontWeight: 500}}>{nome}</Text>
                        <ComponenteMas
                            quantidade={quantidade}
                            onQuantidadeChange={setQuantidade}
                            onAdicionar={FinalizarAdicao}
                        />   
                        <Pressable style={{flexDirection: 'row', gap: 5, alignItems: "center"}}>
                            <Image source={favorito} style={{marginTop: 5, width: 20, height: 20}} />
                            <Text style={{fontSize: 20, fontFamily: "Nunito_700Bold", fontWeight: 500}}>Favoritos</Text>
                        </Pressable>
                    </View>
                    <View style={{height: 1, backgroundColor: 'black', marginHorizontal: 20, marginTop: 5, width: '100%'}} />
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        padding: 10,
                    }}>
                        <Circulos
                            textoCirulo='Calorias'
                            valorCirculo={calorias ? calorias : 0}
                        />
                        <Circulos
                            textoCirulo="proteinas"
                            valorCirculo={proteinas ? proteinas : 0}
                        />
                        <Circulos
                            textoCirulo="Gordura"
                            valorCirculo={gordura ? gordura : 0}
                        />
                        <Circulos
                            textoCirulo="Carboidrato"
                            valorCirculo={carboidrato ? carboidrato : 0}
                        />
                        <Circulos
                            textoCirulo="Sodio"
                            valorCirculo={sodio ? sodio : 0}
                        />
                        <Circulos
                            textoCirulo="Fibra"
                            valorCirculo={fibra ? fibra : 0}
                        />
                    </View>
                </View>
            </SafeAreaView>
            <Footer />
        </View>
    );
}