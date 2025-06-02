import { Text, View, Keyboard, ScrollView, TouchableOpacity, SafeAreaView, Image, StyleSheet, TextInput, Platform, Pressable } from "react-native";
import { useState, useEffect } from "react";
// import Circulos from "../../components/Circulos"; // We'll replace this with a new layout
// import Footer from "../../components/Footer"; // Removed to match the image
import ComponenteMas from "../../components/ComponenteMas"; // Assuming this is for +/- buttons
import favoritoIcon from '../../assets/icons/favorito.png'; // Renamed for clarity
import { useLocalSearchParams, useRouter } from "expo-router";
import env from "../../env";
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponente from "../../components/ModalComponente";
import { useSearchParams } from 'expo-router';

// A simple ProgressBar component
const ProgressBar = ({ progress, color = "#4CAF50", height = 8 }) => (
    <View style={{
        height,
        backgroundColor: '#e0e0e0',
        borderRadius: height / 2,
        overflow: 'hidden',
        marginTop: 4,
    }}>
        <View style={{
            height: '100%',
            width: `${Math.min(progress, 100)}%`, // Cap progress at 100%
            backgroundColor: color,
            borderRadius: height / 2,
        }} />
    </View>
);

export default function Card() {
    const [fontLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold
    });
    
    const [quantidade, setQuantidade] = useState(1);
    const [idUsuario, setIdUsuario] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false); // State for favorite
    const [modalVisivel, setModalVisivel] = useState(false);
    const router = useRouter();
    
    const {
        nome,
        imagem,
        calorias, // Base calories per portion
        proteinas, // Base protein per portion
        gordura,   // Base fat per portion
        carboidrato, // Base carbs per portion
        sodio,     // Base sodium per portion
        fibra,     // Base fiber per portion
        id,        // Food ID
        refeicao,// Meal type (e.g., Café da manhã)
    } = useLocalSearchParams();

    

    // Convert base values to numbers, defaulting to 0 if undefined/NaN
    const baseCalories = parseFloat(calorias) || 0;
    const baseProteinas = parseFloat(proteinas) || 0;
    const baseGordura = parseFloat(gordura) || 0;
    const baseCarboidrato = parseFloat(carboidrato) || 0;
    const baseSodio = parseFloat(sodio) || 0;
    const baseFibra = parseFloat(fibra) || 0;

    // Calculate current nutritional values based on quantity
    const currentCalories = baseCalories * quantidade;
    const currentProteinas = baseProteinas * quantidade;
    const currentGordura = baseGordura * quantidade;
    const currentCarboidrato = baseCarboidrato * quantidade;
    const currentSodio = baseSodio * quantidade;
    const currentFibra = baseFibra * quantidade;

    // Example daily goals (from image, or could be dynamic)
    const dailyGoalCalories = 545;
    const dailyGoalProteinas = 34;
    // Add other goals if needed for progress bars

    const DadosUsuario = async () => {
        try {
            const valoresDados = await AsyncStorage.getItem("user");
            if (valoresDados != null) {
                const user = JSON.parse(valoresDados);
                setIdUsuario(user[0].user_id);
            } else {
                // alert("dados não encontrados"); // Consider less intrusive feedback
                console.warn("Dados do usuário não encontrados no AsyncStorage");
            }
        } catch (error) {
            console.error('Erro ao ler AsyncStorage', error);
        }
    }

    const AdicionarFavoritos = async () =>{        
        try{
            const url  = `${env.ip}food/favorites`;
            console.log('food', id);
            console.log('url', url);
            console.log('usuario', idUsuario);
            
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    food_id: id,
                    user_id: idUsuario,
                })
            });
            if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(`Erro na requisição: ${errorMessage || response.statusText}`);
            } 
            const result = await response.json();
            console.log('result', result);
            alert("alimento salvo")
        }catch(e){
            console.error("erro ao fazer a chamada", e);
            
        }
    }

    useEffect(() => {
        DadosUsuario();
        // Here you could also load if this food 'id' is a favorite for 'idUsuario'
    }, []);

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Add logic to save favorite status to AsyncStorage or backend
        console.log("Toggle Favorite for food ID:", id);
    };

    const FinalizarAdicao = () => {
        router.push({
            pathname: "/AdicionarAlimento",
            params: {
                alimentoSelecionadoCard:JSON.stringify({
                    name:nome,
                    imagem:imagem,
                    calories: currentCalories,
                    protein: currentProteinas,
                    fat: currentGordura,
                    carbohydates: currentCarboidrato,
                    sodium: currentSodio,
                    fiber: currentFibra,
                    food_id:id,
                    refeicao:refeicao,

                })
            }
        });
    };

    const handleQuantityChange = (text) => {
        const num = parseInt(text, 500);
        if (text === "") {
            setQuantidade(""); // Allow empty input for typing
        } else if (!isNaN(num) && num > 0) {
            setQuantidade(num);
        } else if (!isNaN(num) && num <= 0) {
            setQuantidade(1); // Reset to 1 if <=0
        }
    };

    const incrementQuantity = () => setQuantidade(prev => (isNaN(parseInt(prev)) ? 1 : parseInt(prev) + 1));
    const decrementQuantity = () => setQuantidade(prev => Math.max(1, (isNaN(parseInt(prev)) ? 1 : parseInt(prev) - 1)));


    if (!fontLoaded) {
        return null; // Or a loading spinner
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingHorizontal: 15, 
                paddingVertical: 10, 
                backgroundColor: '#fff', 
                borderBottomWidth: 1, 
                borderBottomColor: '#E0E0E0', 
                height: Platform.OS === 'android' ? 56 : 44, 
                marginTop: 30 
                }}>
                <TouchableOpacity style={{ padding: 8 }}></TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: 'Nunito_700Bold', color: '#333' }}>Detalhes do Alimento</Text>
                
            </View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
             
                <View style={{ width: '100%', height: 250, position: 'relative' }}>
                    <Image source={{ uri: imagem }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 15, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <Text style={{ fontSize: 26, fontFamily: 'Nunito_700Bold', color: '#FFF', fontWeight: 'bold' }}>{nome}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EFEFEF' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable onPress={AdicionarFavoritos} style={{ 
                    padding: 8,
                    backgroundColor:"#4CAF50",
                    position:'relative',
                    alignItems:"center",    
                    borderRadius:20,
                    flexDirection: 'row'
                    }}>
                    <Image source={favoritoIcon}  style={{ width: 24, height: 24, tintColor: isFavorite ? '#fff' : '#fff' }} />
                    <Text style={{fontSize:20,zIndex:10001,marginLeft:10,color:"#fff"}}>Favoritos</Text>
                </Pressable>
                    </View>
                    <Text style={{ fontSize: 24, fontFamily: 'Nunito_700Bold', color: '#4CAF50', fontWeight: 'bold' }}>{currentCalories.toFixed(0)} kcal</Text>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EFEFEF' }}>
                    <TouchableOpacity style={{ flex: 1, paddingVertical: 15, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 3, borderBottomColor: '#4CAF50' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Nunito_700Bold', color: '#4CAF50' }}>Nutrição</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 20, backgroundColor: '#fff', marginTop: 8 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontFamily: 'Nunito_700Bold', color: '#333', marginBottom: 10 }}>Informações nutricionais</Text>
                        
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Nunito_500Medium', color: '#444' }}>Total de calorias</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Nunito_400Regular', color: '#666', marginTop: 2 }}>
                                {currentCalories.toFixed(0)} / {dailyGoalCalories} kcal
                            </Text>
                            <ProgressBar progress={(currentCalories / dailyGoalCalories) * 100} />
                            <Text style={{ fontSize: 14, fontFamily: 'Nunito_400Regular', color: '#888', textAlign: 'right', marginTop: 2 }}>
                                {(dailyGoalCalories - currentCalories > 0 ? dailyGoalCalories - currentCalories : 0).toFixed(0)} kcal restantes
                            </Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Nunito_500Medium', color: '#444' }}>Proteínas</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Nunito_400Regular', color: '#666', marginTop: 2 }}>
                                {currentProteinas.toFixed(1)} / {dailyGoalProteinas} g
                            </Text>
                            <ProgressBar progress={(currentProteinas / dailyGoalProteinas) * 100} />
                        </View>
                        
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Nunito_500Medium', color: '#444' }}>Carboidratos</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Nunito_400Regular', color: '#666', marginTop: 2 }}>{currentCarboidrato.toFixed(1)} g</Text>
                        </View>
                        
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Nunito_500Medium', color: '#444' }}>Gorduras</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Nunito_400Regular', color: '#666', marginTop: 2 }}>{currentGordura.toFixed(1)} g</Text>
                        </View>
                        
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Nunito_500Medium', color: '#444' }}>Fibras</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Nunito_400Regular', color: '#666', marginTop: 2 }}>{currentFibra.toFixed(1)} g</Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Nunito_500Medium', color: '#444' }}>Sódio</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Nunito_400Regular', color: '#666', marginTop: 2 }}>{currentSodio.toFixed(0)} g</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <ModalComponente
                visible={modalVisivel}
                onClose={() => setModalVisivel(false)}
                alimento={{
                    nome,
                    imagem,
                    calorias: currentCalories,
                    proteinas: currentProteinas,
                    gordura: currentGordura,
                    carboidrato: currentCarboidrato,
                    sodio: currentSodio,
                    fibra: currentFibra,
                    id,
                    refeicao
                }}
                onConfirm={FinalizarAdicao}
            />

            <TouchableOpacity 
                style={{ 
                    backgroundColor: '#4CAF50',
                    paddingVertical: 18,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: Platform.OS === 'ios' ? 0 : 10,
                    marginBottom: Platform.OS === 'ios' ? 20 : 10,
                    borderRadius: 12
                }} 
                onPress={FinalizarAdicao}
            >
                <Text style={{ color: '#FFF', fontSize: 18, fontFamily: 'Nunito_700Bold', fontWeight: 'bold' }}>Adicionar este alimento</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // Light background for the whole screen
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff', // White header background
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        height: Platform.OS === 'android' ? 56 : 44,
        marginTop:30
    },
    headerButton: {
        padding: 8,
    },
    headerButtonText: {
        fontSize: 24,
        color: '#4CAF50', // Green color for back arrow
        fontFamily: 'Nunito_700Bold',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
        color: '#333',
    },
    favoriteIcon: {
        width: 24,
        height: 24,
        tintColor: '#CCCCCC', // Default color for favorite icon
    },
    favoriteIconActive: {
        tintColor: '#FFC107', // Gold color when active
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80, // Space for the fixed "Adicionar" button
    },
    imageContainer: {
        width: '100%',
        height: 250, // Adjust as needed
        position: 'relative',
    },
    foodImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    foodNameOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent overlay
    },
    foodName: {
        fontSize: 26,
        fontFamily: 'Nunito_700Bold',
        color: '#FFF',
        fontWeight: 'bold',
    },
    mainInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusEmoji: {
        fontSize: 24,
        marginRight: 8,
    },
    statusText: {
        fontSize: 18,
        fontFamily: 'Nunito_500Medium',
        color: '#333',
    },
    mainCalories: {
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        color: '#4CAF50', // Green for calories
        fontWeight: 'bold',
    },
    quantitySection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10 : 6,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Nunito_500Medium',
        minWidth: 60,
        marginHorizontal:10,
    },
    quantityAdjustButton: {
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    quantityAdjustText: {
        fontSize: 20,
        color: '#333',
        fontFamily: 'Nunito_700Bold',
    },
    portionText: {
        fontSize: 16,
        fontFamily: 'Nunito_400Regular',
        color: '#666',
        marginLeft: 15,
        flex: 1, // Allows text to wrap if needed
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    tabButtonActive: {
        borderBottomColor: '#4CAF50', // Green underline for active tab
    },
    tabText: {
        fontSize: 16,
        fontFamily: 'Nunito_500Medium',
        color: '#666',
    },
    tabTextActive: {
        color: '#4CAF50',
        fontFamily: 'Nunito_700Bold',
    },
    nutritionContent: {
        padding: 20,
        backgroundColor: '#fff', // White background for content sections
        marginTop: 8, // Small separation from tabs
    },
    benefitsSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
        color: '#333',
        marginBottom: 10,
    },
    benefitsText: {
        fontSize: 16,
        fontFamily: 'Nunito_400Regular',
        color: '#555',
        marginBottom: 10,
        lineHeight: 22,
    },
    viewBenefitsButton: {
        backgroundColor: '#E8F5E9', // Light green background
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'flex-start', // Button doesn't take full width
    },
    viewBenefitsButtonText: {
        color: '#4CAF50',
        fontFamily: 'Nunito_700Bold',
        fontSize: 15,
    },
    nutritionalInfoSection: {
        // Styles for this section if needed, already has sectionTitle
    },
    nutrientItem: {
        marginBottom: 20,
    },
    nutrientLabel: {
        fontSize: 17,
        fontFamily: 'Nunito_500Medium',
        color: '#444',
    },
    nutrientValues: {
        fontSize: 15,
        fontFamily: 'Nunito_400Regular',
        color: '#666',
        marginTop: 2,
    },
    caloriesRemaining: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color: '#888',
        textAlign: 'right',
        marginTop: 2,
    },
    addFoodButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 18,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // Fixed at bottom - these styles work when button is direct child of SafeAreaView and ScrollView has flex:1
        // position: 'absolute', // If it needs to overlay ScrollView content more directly
        // bottom: 0,
        // left: 0,
        // right: 0,
        // For now, simple placement after ScrollView is fine if ScrollView doesn't fill all space
        margin: Platform.OS === 'ios' ? 0 : 10, // Margin for Android to avoid system nav
        marginBottom: Platform.OS === 'ios' ? 20 : 10, // More bottom margin for iOS home indicator
        borderRadius: 12,
    },
    addFoodButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
        fontWeight: 'bold',
    },
});