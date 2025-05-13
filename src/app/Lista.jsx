import Footer from "../../components/Footer";
import { Text, View, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable } from "react-native";
import cafe from "../../assets/icons/cofee.png";
import almoco from "../../assets/icons/arroz-frito.png";
import jantar from "../../assets/icons/jantar-romantico.png";
import { useRouter } from 'expo-router';
import CardRefeicao from "../../components/CardRefeicao";
export default function Home() {
   const router = useRouter();
    const AdicionarProduto = (refeicao) =>{
      router.push({
        pathname: "AdicionarAlimento",
        params: { refeicao: refeicao }
      });
    }


  return (
    <View
      style={{
        flex: 1,
        alignItems:'center',
        justifyContent:"center",
        marginTop:20
      }}
    >
      <View
        style={{
          width: 370,
          height: 350,
          backgroundColor: "rgba(119, 230, 208, 0.5)",
          marginTop: 70,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              width: 105,
              height: 105,
              textAlign: "center",
              color: "black",
              padding: 10,
              borderRadius: 110,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              textAlignVertical: "center",
              marginTop: 30,
              fontWeight: 500,
              borderWidth: 2,
              borderColor: "#05cdff",
            }}
          >
            1200 Consumidos
          </Text>

          <Text
            style={{
              width: 105,
              height: 105,
              textAlign: "center",
              color: "black",
              padding: 10,
              borderRadius: 110,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              textAlignVertical: "center",
              marginTop: 30,
              fontWeight: 500,
              borderWidth: 2,
              borderColor: "#ff053f",
            }}
          >
            40KCal Restantes
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            width: 340,
            height: 140,
            marginTop: 10,
            marginLeft: 12,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: 700,
              fontSize: 18,
              marginTop: 10,
            }}
          >
            Macronutrientes
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginRight: 180,
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                width: 60,
                height: 60,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginLeft: 20,
                marginTop: 30,
                fontWeight: 500,
                borderWidth: 2,
                borderColor: "#ff053f",
              }}
            >
              0/40g
            </Text>
            <Text
              style={{
                width: 60,
                height: 60,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginLeft: 20,
                marginTop: 30,
                fontWeight: 500,
                borderWidth: 2,
                borderColor: "#da05ff",
              }}
            >
              0/40g
            </Text>

            <Text
              style={{
                width: 60,
                height: 60,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginLeft: 20,
                marginTop: 30,
                fontWeight: 500,
                borderWidth: 2,
                borderColor: "#05ffbc",
              }}
            >
              0/40g
            </Text>

            <Text
              style={{
                width: 60,
                height: 60,
                textAlign: "center",
                color: "black",
                padding: 10,
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                textAlignVertical: "center",
                marginLeft: 20,
                marginTop: 30,
                fontWeight: 500,
                borderWidth: 2,
                borderColor: "#b4ff05",
              }}
            >
              0/40g
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginRight: 40,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "black", fontWeight: 700 }}>Carboidratos</Text>
          <Text style={{ color: "black", fontWeight: 700 }}>Proteinas</Text>
          <Text style={{ color: "black", fontWeight: 700 }}>Fibras</Text>
          <Text style={{ color: "black", fontWeight: 700 }}>Sódio</Text>
        </View>
      </View>

      <View>
        <View
          style={{
            width: 360,
            backgroundColor: "white",
            marginTop: 10,
            padding: 10,
            borderRadius: 12,
            borderBottomWidth: 2,          // define a espessura da linha
            borderBottomColor: "#ccc",
          }}
        >
          <CardRefeicao
            imagem={cafe}
            nome="Café da Manhã"
            kcal="0/1200KCal"
            onAdicionar={() => AdicionarProduto("Café da Manhã")}
            adicionarAlimento = {true}
          />

          <CardRefeicao
            imagem={almoco}
            nome="Almoço"
            kcal="0/1200KCal"
            onAdicionar={() => AdicionarProduto("Almoço")}
            adicionarAlimento = {true}
          />

          <CardRefeicao
            imagem={jantar}
            nome="Jantar"
            kcal="0/1200KCal"
            onAdicionar={() => AdicionarProduto("Jantar")}
            adicionarAlimento = {true}
          />
          <CardRefeicao
            imagem={jantar}
            nome="Merenda"
            kcal="0/1200KCal"
            onAdicionar={() => AdicionarProduto("Jantar")}
            adicionarAlimento = {true}
          />
      </View>
      </View>
      <Footer />
    </View>
  );
}
