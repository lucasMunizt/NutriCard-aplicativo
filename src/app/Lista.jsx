import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { Text, View, SafeAreaView,StatusBar,Dimensions } from "react-native";
import cafe from "../../assets/icons/cofee.png";
import almoco from "../../assets/icons/arroz-frito.png";
import jantar from "../../assets/icons/jantar-romantico.png";
import merenda from "../../assets/icons/merenda.png";
import { useRouter } from 'expo-router';
import CardRefeicao from "../../components/CardRefeicao";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const router = useRouter();

  const AdicionarProduto = (refeicao) => {
    console.log("Lista - Refeição selecionada:", refeicao);
    router.push({
      pathname: "AdicionarAlimento",
      params: { refeicao: refeicao }
    });
  };

  const { width, height } = Dimensions.get('window');

// Define the color palette (as used in PerfilScreen)
  const COLORS = {
    primaryGreen: '#4CAF50', // Main green for header
    white: '#FFFFFF',       // For text on green backgrounds and page background
    // Add other colors if needed for this screen, e.g., lightGreenBackground, black, darkText, etc.
    black: '#000000',       // For text color on white background
    borderColorBlue: "#05cdff", // Existing color from your script
    borderColorRed: "#ff053f",   // Existing color from your script
    borderColorPurple: "#da05ff",// Existing color from your script
    borderColorTeal: "#05ffbc",  // Existing color from your script
    borderColorLime: "#b4ff05", // Existing color from your script
  };

  const [dadosUsuario, setDadosUsuario] = useState({});
  const [caloriasConsumidas, setCaloriasConsumidas] = useState(0);
  const [caloriasRestantes, setCaloriasRestantes] = useState(0);
  const [caloriasjantar,setCaloriasJantar] = useState(0);
  const [caloriasAlmoco,setCaloriasAlmoco] = useState(0);
  const [caloriasMerenda,setCaloriasMerenda] = useState(0);
  const [caloriasCafemanha,setCafemanha] = useState(0);

  const DadosUsuario = async () => {
    try {
      const valoresDados = await AsyncStorage.getItem("user");
      const valoresMeals = await AsyncStorage.getItem("meals");

      if (valoresDados != null) {
        const user = JSON.parse(valoresDados);
        const meals = valoresMeals ? JSON.parse(valoresMeals):[];
        let totalCalorias = 0;
        let totalCarboidratos = 0;
        let totalLipidios = 0;
        let totalProteinas = 0;
        let totalFibras = 0;
        let totalSodio = 0;
        meals.map((index)=>{
          if(index.name === "Jantar"){
           // console.log('name ref', index.name);
              setCaloriasJantar(index.calories);
          }else if(index.name === "Café da Manhã"){
            setCafemanha(index.calories);
          }else if(index.name === "Almoço"){
            setCaloriasAlmoco(index.calories);
          }else if(index.name === "Merenda"){
            setCaloriasMerenda(index.calories)
          }
        })
        console.log("calorias jantar ",caloriasjantar);
        if (meals.length > 0) {
          meals.forEach((meal) => {
            totalCalorias += meal.calories || 0;
            totalCarboidratos += meal.carbohydrates || 0;
            totalLipidios += meal.fat || 0;
            totalProteinas += meal.protein || 0;
            totalFibras += meal.fiber || 0;
            totalSodio += meal.sodium || 0;
          });
        }


        setCaloriasConsumidas(totalCalorias);
        setCaloriasRestantes(user[0].calorie_goal || 0);
        setDadosUsuario({
          ...user[0],
          calorias: totalCalorias,
          carboidratos: totalCarboidratos,
          lipidios: totalLipidios,
          proteinas: totalProteinas,
          fibras: totalFibras,
          sodio: totalSodio
        });
        
        
        
      } else {
        alert("Dados não encontrados");
      }
    } catch (e) {
      console.error('Erro ao ler AsyncStorage', e);
    }
  };

  useEffect(() => {
    DadosUsuario();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1,}}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryGreen} />
      <View style={{ flex: 1, justifyContent: "center", marginTop: 30, }}>
        <View style={{ width: 370, height: 350, marginTop: 40, alignSelf: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

            <Text style={{
              width: 105,
              height: 105,
              textAlign: "center",
              color: "black",
              padding: 10,
              borderRadius: 110,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              textAlignVertical: "center",
              marginTop: 30,
              fontWeight: "500",
              borderWidth: 2,
              borderColor: "#05cdff"
            }}>
              {(caloriasConsumidas || 0).toFixed(2)}KCal Consumidos
            </Text>
          
            
            <Text style={{
              width: 105,
              height: 105,
              textAlign: "center",
              color: "black",
              padding: 10,
              borderRadius: 110,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              textAlignVertical: "center",
              marginTop: 30,
              fontWeight: "500",
              borderWidth: 2,
              borderColor: "#ff053f",
              
              
            }}>
              {(caloriasRestantes || 0).toFixed(0)}KCal meta
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{
              textAlign: "center",
              color: "black",
              fontWeight: "700",
              fontSize: 18,
              marginTop: 10
            }}>
              Macronutrientes
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{
                alignItems:"center",
                justifyContent:"center",
                gap:10
              }}>
              <Text style={{
                width: 70,
                height: 70,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginTop: 30,
                fontWeight: "500",
                borderWidth: 2,
                borderColor: "#ff053f"
              }}>
                {(dadosUsuario.carboidratos || 0).toFixed(2)}
              </Text>
                   <Text style={{ color: "black", fontWeight: "700" }}>Carboidratos</Text>
              </View>

              <View style={{
                alignItems:"center",
                justifyContent:"center",
                gap:10
              }}>
              <Text style={{
                width: 70,
                height: 70,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginTop: 30,
                fontWeight: "500",
                borderWidth: 2,
                borderColor: "#da05ff"
              }}>
                {(dadosUsuario.proteinas || 0).toFixed(2)}
              </Text>
               <Text style={{ color: "black", fontWeight: "700"}}>Proteinas</Text>
              </View>

              <View style={{
                alignItems:"center",
                justifyContent:"center",
                gap:10
              }}>

              <Text style={{
                width: 70,
                height: 70,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginTop: 30,
                fontWeight: "500",
                borderWidth: 2,
                borderColor: "#05ffbc"
              }}>
                {(dadosUsuario.fibras || 0).toFixed(2)}
              </Text>
                <Text style={{ color: "black", fontWeight: "700"}}>Fibras</Text>
              </View>

              <View style={{
                alignItems:"center",
                justifyContent:"center",
                gap:10
              }}>
              <Text style={{  
                width: 70,
                height: 70,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginTop: 30,
                fontWeight: "500",
                borderWidth: 2,
                borderColor: "#b4ff05"
              }}>
                {(dadosUsuario.sodio || 0).toFixed(2)}
              </Text>
               <Text style={{ color: "black", fontWeight: "700" }}>Sódio</Text>
              </View>
            </View>
          </View>

        </View>

        <View style={{ alignItems: "center" }}>
           <View style={{ width: 360, marginTop: 10, padding: 10 }}>
            <CardRefeicao
              imagem={cafe}
              nome="Café da Manhã"
              kcal={caloriasCafemanha}
              onAdicionar={() => AdicionarProduto("Café da Manhã")}
              adicionarAlimento={true}
            />
            <CardRefeicao
              imagem={almoco}
              nome="Almoço"
              kcal={caloriasAlmoco}
              onAdicionar={() => AdicionarProduto("Almoço")}
              adicionarAlimento={true}
            />
            <CardRefeicao
              imagem={jantar}
              nome="Jantar"
              kcal={caloriasjantar}
              onAdicionar={() => AdicionarProduto("Jantar")}
              adicionarAlimento={true}
            />
            <CardRefeicao
              imagem={merenda}
              nome="Merenda"
              kcal={caloriasMerenda}
              onAdicionar={() => AdicionarProduto("Merenda")}
              adicionarAlimento={true}
            />
          </View>
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
