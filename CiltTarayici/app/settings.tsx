import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const bilgiMetinleri: Record<string, string> = {
    'Kişisel Bilgilerim': `Bu uygulama yalnızca cihaz üzerinden görsel taraması yapar. Kişisel verileriniz sunucuda saklanmaz.`,
    'Nasıl kullanılır?': `Ana ekrandan fotoğraf seçerek cilt analizi yapabilir, geçmiş taramaları görebilir ve yapay zeka asistanına sorular sorabilirsiniz.`,
    'KVKK Hakkında': `Bu uygulama, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında verilerinizi yalnızca cihazınızda tutar ve üçüncü şahıslarla paylaşmaz.`,
    'Kullanım Koşulları': `Bu uygulama teşhis amacı taşımaz. Sadece bilgilendirme sağlar. Tıbbi durumlar için mutlaka doktora danışın.`,
  };

  const handleInfo = (title: string) => {
    Alert.alert(title, bilgiMetinleri[title]);
  };

  return (
    <View className="flex-1 bg-gray-300 px-4 pt-10">
      <Pressable onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <Text className="text-xl font-semibold text-center mb-4">Ayarlar</Text>

      {Object.keys(bilgiMetinleri).map((item, i) => (
        <Pressable
          key={i}
          className="bg-gray-200 py-3 px-4 rounded-xl mb-3 items-center"
          onPress={() => handleInfo(item)}
        >
          <Text className="text-base font-semibold">{item}</Text>
        </Pressable>
      ))}
    </View>
  );
}
