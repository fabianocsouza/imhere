import React, { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Participant } from '../../components/Participant';

export function Home() {
  const [participants, setParticipants ] = useState<string[]>([]);
  const [name, setName ] = useState('');

  function handleParticipantAdd(name: string){
    if(participants.includes(name)){
      setName('')
      return Alert.alert("Participante existe", "Já existe um participante na lista com este nome!")
    }
    setParticipants(prevParticipant => [...prevParticipant, name]);
    setName('')
  }

  function handleParticipantRemove(name: string) {
      const listParticipants = participants.filter(item => (item !== name));
      Alert.alert("Remover: ", `Remover o participante ${name}?`, [
        {
          text: 'Sim',
          onPress: () => setParticipants(listParticipants)
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
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleParticipantAdd(name)}
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