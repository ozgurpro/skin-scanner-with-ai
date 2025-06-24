import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function AIHelperScreen() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://10.0.2.2:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.reply || 'Cevap alınamadı.');
    } catch (error) {
      setResponse('Sunucuya bağlanılamadı.');
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        <Text className="text-2xl font-bold text-center mb-4">Yapay Zeka Asistanı</Text>

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Bir soru yazın..."
          className="bg-white p-4 rounded-lg mb-4"
          multiline
        />

        <Pressable onPress={sendMessage} className="bg-blue-500 py-3 rounded-lg mb-4">
          <Text className="text-white text-center font-semibold">{loading ? 'Yükleniyor...' : 'Gönder'}</Text>
        </Pressable>

        {response !== '' && (
          <View className="bg-white p-4 rounded-lg">
            <Text className="text-gray-800">{response}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
