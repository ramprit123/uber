import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const messages = [
  { id: 1, text: 'Hi there!', fromMe: false },
  { id: 2, text: 'Hello! How can I help you?', fromMe: true },
  { id: 3, text: 'I need a ride to the airport.', fromMe: false },
  { id: 4, text: 'Sure! When do you want to leave?', fromMe: true },
];

const Chat = () => {
  const [input, setInput] = useState('');
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}>
      {/* Messages */}
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ paddingBottom: 80 }}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={{
              alignSelf: msg.fromMe ? 'flex-end' : 'flex-start',
              backgroundColor: msg.fromMe ? '#007aff' : '#e5e5ea',
              borderRadius: 16,
              marginBottom: 10,
              paddingVertical: 8,
              paddingHorizontal: 14,
              maxWidth: '75%',
            }}>
            <Text style={{ color: msg.fromMe ? '#fff' : '#222', fontSize: 16 }}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          borderTopWidth: 1,
          borderColor: '#eee',
          backgroundColor: '#fafafa',
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
        }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 20,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            marginRight: 8,
          }}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#007aff',
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          onPress={() => setInput('')}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
