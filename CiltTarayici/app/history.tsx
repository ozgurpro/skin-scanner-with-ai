import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const json = await AsyncStorage.getItem('history');
      const data = json ? JSON.parse(json) : [];
      setHistory(data.reverse());
    } catch (e) {
      console.log('Geçmiş alınamadı:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4 text-center">Geçmiş Taramalar</Text>
      {loading ? (
        <Text className="text-center text-gray-500">Yükleniyor...</Text>
      ) : history.length === 0 ? (
        <Text className="text-center text-gray-500">Kayıt bulunamadı.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 rounded-xl shadow">
              <Image source={{ uri: item.uri }} className="w-full h-48 rounded-md mb-2" />
              <Text className="text-lg font-semibold mb-1">{item.result}</Text>
              <Text className="text-sm text-gray-600">{item.timestamp}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
