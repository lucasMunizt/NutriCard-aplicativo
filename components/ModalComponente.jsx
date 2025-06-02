import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const { height } = Dimensions.get('window');

// Defina as cores aqui para consistência
const COLORS = {
  primaryGreen: '#4CAF50',
  white: '#FFFFFF',
  darkText: '#212121',
  mediumText: '#757575',
  borderColor: '#BDBDBD',
  transparentBg: 'rgba(0, 0, 0, 0.5)',
};

const ModalComponente = ({ 
   visible, onClose,
  initialHeight, initialWeight,
  tituloModal, modalEditor = false, 
  alimentoSelecionados = false, textoAlimentos,
  quantidaeValor,
  onInputChangePeso, valuePeso,
  onInputChangeAltura, valueAltura,
  onInputChangeEmail, valueEmail,
  onInputChangeObjetivo,OnSave,TextoSalvar,
  handleSave}) => {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [listaAlimentos,setListaAlimentos] = useState([textoAlimentos]) 
  // Efeito para preencher os dados iniciais quando o modal abrir
  useEffect(() => {
    if (visible) {
      setAltura(String(initialHeight || ''));
      setPeso(String(initialWeight || ''));
    }
  }, [visible, initialHeight, initialWeight]);


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Permite fechar com o botão "voltar" do Android
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        {/* Fundo semi-transparente */}
        <TouchableOpacity style={styles.background} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.modalContent}>
          <Text style={styles.title}>{tituloModal}</Text>

          {modalEditor &&(
           <ScrollView>

          <View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Altura (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 175"
                  keyboardType="numeric"
                  value={valueAltura}
                  onChangeText={onInputChangeAltura}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 70.5"
                  keyboardType="decimal-pad" // Permite usar "." ou ","
                  value={valuePeso}
                  onChangeText={onInputChangePeso}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address" // Permite usar "." ou ","
                  onChangeText={onInputChangeEmail}
                  value={valueEmail}
                />
              </View>

              <RNPickerSelect
                onValueChange={(value) => onInputChangeObjetivo(value)}
                items={[
                    { label: 'Perder Peso', value: 'perder peso' },
                    { label: 'Ganhar Peso', value: 'ganhar massa' },
                ]}
                style={{
                    placeholder: { color: 'black' },
                    inputAndroid: { color: 'black', marginTop: 30 },
                    inputIOS: { color: 'black', marginTop: 30 },
                }}
                placeholder={{
                    label: 'Selecione seu objetivo',
                    value: null,
                    color: 'black',
                }}
              />

          </View>
           </ScrollView> 

          )}

           {alimentoSelecionados &&(
                <ScrollView>
              <View>
                {/* CORREÇÃO DO MAP: adicione key, return e acesse a propriedade .name */}
                {textoAlimentos.map((alimento, index) => (
                  <View key={`${alimento.food_id}-${index}`} style={styles.listItem}>
                    <View style={{flex:1,flexDirection:'row',alignItems:"center",gap:10,marginBottom:10}}>

                     <View style={styles.inputGroup}>
                          <Text style={styles.label}>{alimento.name}</Text>
                          <TextInput
                            placeholder='QTD'
                            keyboardType='numeric'
                            onChangeText={quantidaeValor}
                            style={styles.input}
                            
                          />
                        </View>
                  </View>

                      </View>
                ))}
              </View>
                </ScrollView>
           )} 

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{TextoSalvar}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Alinha o modal na parte de baixo
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Preenche toda a tela
    backgroundColor: COLORS.transparentBg,
  },
  listItem:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
  },

   listItemText: {
    fontSize: 16,
    color: COLORS.darkText,
  
  },
  modalContent: {
    height: height * 0.5, // Ocupa 50% da altura da tela
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  
    width:500
  },
  label: {
    fontSize: 16,
    color: COLORS.mediumText,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    width:300
  },
  saveButton: {
    backgroundColor: COLORS.primaryGreen,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ModalComponente;