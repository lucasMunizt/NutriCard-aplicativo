import { Text, View, Keyboard, Dimensions, TextInput, Pressable, Image } from "react-native";
import { useState, useEffect } from 'react';
import frasesMotivacionais from "./frasesMotivacionais";
import imagens from "../../assets/Imagens";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";
import RNPickerSelect from 'react-native-picker-select';

const { width: screenWidth } = Dimensions.get('window');

export default function Logins({
    telaLogin = false,
    funcaoButaoLogin,
    funcaoButaoCadastro,
    onInputChangeEmail,
    onInputChangeSenha,
    onInputChangeConfirmacaoSenha,
    valorButao,
    TelaCadastro = false,
    onInputChangeNome,
    onInputChangeIdade,
    onInputChangePeso,
    onInputChangeAltura,
    onInputChangeGenero,
}) {

    const [fontLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold
    });

    const [frase, setFrase] = useState(frasesMotivacionais[0]);
    const [imagemFrutas, setImagemFrutas] = useState(imagens[0]);
    const [etapaCadastro, setEtapaCadastro] = useState(1);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const novaFrase = () => {
        const indiceAleatorio = Math.floor(Math.random() * frasesMotivacionais.length);
        const indiceAleatorioImagem = Math.floor(Math.random() * imagens.length);
        setFrase(frasesMotivacionais[indiceAleatorio]);
        setImagemFrutas(imagens[indiceAleatorioImagem]);
    };

    useEffect(() => {
        novaFrase();

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    if (!fontLoaded) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#F2F2F2', flex: 1, marginTop: keyboardVisible ? 0 : 40}}>
                <View style={{ borderRadius: 10, marginTop: 10, alignItems: "center", flex: 1, padding: 10 }}>
                    {!keyboardVisible && (
                        <>
                            <Image source={imagemFrutas} style={{ width: 130, height: 130, marginBottom: 20 }} />
                            <Text style={{ color: 'black', textAlign: 'center', fontFamily: "Nunito_400Regular", fontWeight: '400' }}>{frase}</Text>
                        </>
                    )}

                    {(telaLogin || TelaCadastro) && (
                        <View style={{ marginTop: 20, width: '100%', paddingHorizontal: screenWidth * 0.05, alignItems: 'center', flex: 1 }}>
                            {telaLogin && (
                                <>
                                    <TextInput
                                        placeholder='email'
                                        underlineColorAndroid="transparent"
                                        keyboardType='email-address'
                                        onChangeText={onInputChangeEmail}
                                        style={{ borderColor: "transparent", color: "black", borderRadius: 12, width: "100%", marginTop: 40, padding: 20, borderWidth: 5, backgroundColor: '#dee9fa', maxWidth: 280 }}
                                    />
                                    <TextInput
                                        placeholder='senha'
                                        secureTextEntry={true}
                                        onChangeText={onInputChangeSenha}
                                        style={{
                                            borderColor: "transparent",
                                            color: "black",
                                            borderRadius: 12,
                                            width: "100%", 
                                            marginTop: 40, 
                                            padding: 20, 
                                            borderWidth: 5, 
                                            backgroundColor: '#dee9fa',
                                            maxWidth: 280 
                                        }}
                                    />
                                </>
                            )}

                            {TelaCadastro && (
                                <>
                                    {etapaCadastro === 1 && (
                                        <>
                                            <TextInput
                                                placeholder='Nome'
                                                underlineColorAndroid="transparent"
                                                onChangeText={onInputChangeNome}
                                                style={{ 
                                                    borderColor: "transparent", 
                                                    color: "black", 
                                                    borderRadius: 12, 
                                                    width: "100%", 
                                                    marginTop: 40, 
                                                    padding: 20, 
                                                    borderWidth: 5, 
                                                    backgroundColor: '#dee9fa',
                                                     maxWidth: 280 
                                                }}
                                            />
                                            <RNPickerSelect
                                                onValueChange={(value) => onInputChangeGenero(value)}
                                                items={[
                                                    { label: 'Masculino', value: 'MAN' },
                                                    { label: 'Feminino', value: 'SHER' },
                                                ]}
                                                style={{
                                                    placeholder: { color: 'black' },
                                                    inputAndroid: { color: 'black', marginTop: 30 },
                                                    inputIOS: { color: 'black', marginTop: 30 },
                                                }}
                                                placeholder={{
                                                    label: 'Selecione seu gênero',
                                                    value: null,
                                                    color: 'black'
                                                }}
                                            />
                                        </>
                                    )}
                                    {etapaCadastro === 2 && (
                                        <>
                                            <TextInput
                                                placeholder='Email'
                                                keyboardType='email-address'
                                                onChangeText={onInputChangeEmail}
                                                style={{ borderColor: "transparent", color: "black", borderRadius: 12, width: "100%", marginTop: 40, padding: 20, borderWidth: 5, backgroundColor: '#dee9fa', maxWidth: 280 }}
                                            />
                                            <TextInput
                                                placeholder='senha'
                                                secureTextEntry={true}
                                                onChangeText={onInputChangeSenha}
                                                style={{ borderColor: "transparent", color: "black", borderRadius: 12, width: "100%", marginTop: 40, padding: 20, borderWidth: 5, backgroundColor: '#dee9fa', maxWidth: 280 }}
                                            />
                                            <TextInput
                                                placeholder='Confirmar sua senha'
                                                secureTextEntry={true}
                                                onChangeText={onInputChangeConfirmacaoSenha}
                                                style={{ borderColor: "transparent", color: "black", borderRadius: 12, width: "100%", marginTop: 40, padding: 20, borderWidth: 5, backgroundColor: '#dee9fa', maxWidth: 280 }}
                                            />
                                        </>
                                    )}
                                    {etapaCadastro === 3 && (
                                        <>
                                            <TextInput
                                                placeholder='Idade'
                                                keyboardType='numeric'
                                                onChangeText={onInputChangeIdade}
                                                style={{ borderColor: "transparent", color: "black", borderRadius: 12, width: "100%", maxWidth: 320, marginTop: 40, padding: 20, borderWidth: 5, backgroundColor: '#dee9fa' }}
                                            />
                                            <TextInput
                                                placeholder='Peso'
                                                keyboardType='numeric'
                                                onChangeText={onInputChangePeso}
                                                style={{ borderColor: "transparent", color: "black", borderRadius: 12, width: "100%", maxWidth: 320, marginTop: 40, padding: 20, borderWidth: 5, backgroundColor: '#dee9fa' }}
                                            />
                                            <TextInput
                                                placeholder='Altura'
                                                keyboardType='numeric'
                                                onChangeText={onInputChangeAltura}
                                                style={{ borderColor: "transparent", color: "black", borderRadius: 12, width: "100%", maxWidth: 320, marginTop: 40, padding: 20, borderWidth: 5, backgroundColor: '#dee9fa' }}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </View>
                    )}

                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <Pressable
                            style={{ width: '100%', height: 60, backgroundColor: '#45C8AE', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                if (TelaCadastro) {
                                    if (etapaCadastro < 3) {
                                        setEtapaCadastro(etapaCadastro + 1);
                                    } else if (funcaoButaoCadastro) {
                                        funcaoButaoCadastro();
                                    }
                                } else if (telaLogin && funcaoButaoLogin) {
                                    funcaoButaoLogin();
                                }
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 18, textAlign: 'center' }}>{valorButao}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}
