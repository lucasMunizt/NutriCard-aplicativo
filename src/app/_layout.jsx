import {Stack, stack} from "expo-router"
import { StatusBar } from 'expo-status-bar';


export default function Layout(){
    return(
        <>
        <StatusBar style="dark" backgroundColor="#F2F2F2" translucent={false} />
        <Stack screenOptions={{
            headerTitle: '', // tirar o título
            headerTransparent: true, // deixa o header transparente
            headerStyle: {
              backgroundColor: 'transparent', // sem cor
              elevation: 0, // remove sombra no Android
              shadowOpacity: 0, // remove sombra no iOS
              borderBottomWidth: 0, // remove linha
            },
            contentStyle: {
              backgroundColor: '#F2F2F2', 
            },
          }}>
            <Stack.Screen name="index" options={{title:"index"}}/>
            <Stack.Screen name="Login" options={{title:"Login"}}/>
            <Stack.Screen name="Cadastro" options={{title:"Cadastro"}}/>
        </Stack>
        </>

    );
}