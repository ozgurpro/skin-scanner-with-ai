import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import './globals.css';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'green',
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'index') iconName = 'home-outline';
          else if (route.name === 'history') iconName = 'time-outline';
          else if (route.name === 'camera') iconName = 'camera-outline';
          else if (route.name === 'ai-helper') iconName = 'chatbubble-ellipses-outline';
          else if (route.name === 'settings') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Ana Sayfa' }} />
      <Tabs.Screen name="history" options={{ title: 'Geçmiş' }} />
      <Tabs.Screen name="camera" options={{ title: 'Kamera' }} />
      <Tabs.Screen name="ai-helper" options={{ title: 'Yapay Zeka' }} />
      <Tabs.Screen name="settings" options={{ title: 'Ayarlar' }} />
    </Tabs>
  );
}
