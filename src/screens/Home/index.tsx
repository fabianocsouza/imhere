import React, { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import { Participant } from '../../components/Participant';

export function Home() {
  const [ participants, setParticipants ] = useState<string[]>([]);
  const [ participantName, setParticipantName ] = useState('');

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
      setParticipantName('')
      return Alert.alert("Participante existe", "Já existe um participante na lista com este nome!")
    }

    setParticipants(prevState => [ ...prevState, participantName ]);
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
      Alert.alert("Remover: ", `Remover o participante ${name}?`, [
        {
          text: 'Sim',
          onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ])
  }

  return (
    <View style={styles.container}>
          <Text style={styles.eventName}>
            Nome do evento
          </Text>
    
          <Text style={styles.eventDate}>
            Sábado, 12 de Abril de 2025.
          </Text>

          <View style={styles.form}>
            <TextInput 
              style={styles.input}
              placeholder='Nome do participante'
              placeholderTextColor='#6B6B6B'
              value={participantName}
              onChangeText={setParticipantName}
            />
            <TouchableOpacity 
              style={styles.button}
              onPress={handleParticipantAdd}
            >
              <Text style={styles.buttonText}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={participants}
            keyExtractor={item => item}
            renderItem={({ item }) => 
              <Participant name={item} onRemove={() => handleParticipantRemove(item)}/>}
            showsVerticalScrollIndicator={false}   
            ListEmptyComponent={() => (
              <Text style={styles.listEmptyText}>
                Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
              </Text>
            )}     
          />
          
        </View>
  );
}