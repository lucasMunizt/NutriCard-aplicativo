import { Text, View, Keyboard } from "react-native";
export default function ComponenteMas ({onAdicionar}){
     const SalvarRefeicoes = async () =>{
        
     }   

    return(
            
          <Text
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#004B2A",
                      color: "white",
                      textAlignVertical: "center",
                      textAlign: "center",
                      borderRadius: 110,
                      marginRight:20,
                      fontSize:20
                    }}
                    onPress={onAdicionar}
                  >
                    +
            </Text>

    );
}