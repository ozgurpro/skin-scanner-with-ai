import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-200 px-4 pt-10">
      {/* Üst Başlık */}
      <View className="relative items-center justify-center h-12 mb-6">
        <Pressable
          className="absolute left-4 top-2"
          onPress={() =>
            Alert.alert('Ana Sayfa', 'Buradan tarama, geçmiş ve AI asistanına erişebilirsiniz.')
          }
        >
          <Ionicons name="information-circle" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-semibold">Ana Sayfa</Text>
      </View>

      {/* Cilt Tarayıcı */}
      <View className="bg-white rounded-2xl p-6 mb-4 border-2 border-purple-300">
        <Text className="text-xl font-bold mb-1">Cilt Tarayıcı</Text>
        <Text className="text-gray-600 mb-4">Cilt hastalıklarını ortaya çıkar</Text>
        <Link href="/camera" asChild>
          <Pressable className="bg-green-600 rounded-full px-4 py-2 self-start">
            <Text className="text-white font-semibold">Tara</Text>
          </Pressable>
        </Link>
      </View>

      {/* Geçmiş */}
      <View className="bg-white rounded-2xl p-6 mb-4">
        <Text className="text-xl font-bold mb-2">Geçmiş</Text>
        <Link href="/history" asChild>
          <Pressable className="bg-green-600 rounded-full px-4 py-2 self-start">
            <Text className="text-white font-semibold">Geçmiş</Text>
          </Pressable>
        </Link>
      </View>

      {/* Yapay Zeka Yardımcısı */}
      <View className="bg-white rounded-2xl p-6">
        <Text className="text-xl font-bold mb-2">Yapay Zeka Yardımcısı</Text>
        <Link href="/ai-helper" asChild>
          <Pressable className="bg-green-600 rounded-full px-4 py-2 self-start">
            <Text className="text-white font-semibold">Yaz</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
