import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from "@expo-google-fonts/nunito";

export default function ComponenteMas({ quantidade, onQuantidadeChange, onAdicionar }) {
    const [fontLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold
    });

    const aumentarQuantidade = () => {
        onQuantidadeChange(quantidade + 1);
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            onQuantidadeChange(quantidade - 1);
        }
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity 
                onPress={diminuirQuantidade}
                style={{
                    backgroundColor: '#e6e3e3',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{ fontSize: 20, fontFamily: 'Nunito_700Bold' }}>-</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontFamily: 'Nunito_500Medium' }}>{quantidade}</Text>

            <TouchableOpacity 
                onPress={aumentarQuantidade}
                style={{
                    backgroundColor: '#e6e3e3',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{ fontSize: 20, fontFamily: 'Nunito_700Bold' }}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onAdicionar}
                style={{
                    backgroundColor: '#4CAF50',
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 8,
                    marginLeft: 10
                }}
            >
                <Text style={{ 
                    color: 'white', 
                    fontFamily: 'Nunito_700Bold',
                    fontSize: 14
                }}>
                    Adicionar
                </Text>
            </TouchableOpacity>
        </View>
    );
} 