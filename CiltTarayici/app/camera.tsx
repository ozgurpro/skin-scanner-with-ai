import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

const labelDescriptions: Record<string, string> = {
  mel: "Melanom (cilt kanseri)",
  nv: "Benign nevüs (zararsız ben)",
  bkl: "İyi huylu keratoz benzeri lezyon",
  bcc: "Bazal hücreli karsinom",
  akiec: "Aktinik keratoz (kanser öncesi lezyon)",
};

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Kamera izni gerekiyor.');
      }
    })();
  }, []);

  const saveToStorage = async (uri: string, result: string) => {
    const timestamp = new Date().toISOString();
    const newEntry = { uri, result, timestamp };
    try {
      const json = await AsyncStorage.getItem('history');
      const history = json ? JSON.parse(json) : [];
      history.push(newEntry);
      await AsyncStorage.setItem('history', JSON.stringify(history));
    } catch (e) {
      console.log('Geçmişe kaydedilemedi:', e);
    }
  };

  const simulateDiagnosis = async (uri: string) => {
    setLoading(true);
    setDiagnosis(null);

    const formData = new FormData();
    formData.append("image", {
      uri: uri,
      name: "photo.jpg",
      type: "image/jpg",
    } as any);

    try {
      const response = await fetch("http://10.0.2.2:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const label = data.result;
      setDiagnosis(labelDescriptions[label] || label);
      await saveToStorage(uri, labelDescriptions[label] || label);
    } catch (error) {
      alert("Sunucuya bağlanılamadı");
    }
    setLoading(false);
  };

  const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      simulateDiagnosis(uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    handleImageResult(result);
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });
    handleImageResult(result);
  };

  return (
    <View className="flex-1 bg-gray-200 items-center justify-center px-4">
      <Text className="text-xl font-bold mb-4">Cilt Fotoğrafı Yükle</Text>
      <View className="flex-row gap-4 mb-6">
        <Pressable onPress={pickImage} className="bg-white p-4 rounded-full">
          <Ionicons name="image-outline" size={32} color="black" />
        </Pressable>
        <Pressable onPress={takePhoto} className="bg-white p-4 rounded-full">
          <Ionicons name="camera-outline" size={32} color="black" />
        </Pressable>
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          className="w-64 h-64 rounded-xl border border-gray-400 mb-4"
        />
      )}

      {loading && <ActivityIndicator size="large" color="green" />}
      {diagnosis && !loading && (
        <View className="bg-white px-4 py-3 rounded-xl mt-2">
          <Text className="text-lg font-semibold text-center">{diagnosis}</Text>
        </View>
      )}
    </View>
  );
}
