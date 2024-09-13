import { useCustomTheme } from '@/hooks/useCustomTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import LoadingOverlay from '../components/Loading';
import Header from '../components/Header';

export default function TabLayout() {
  const theme = useCustomTheme();
  return (
    <>
      <LoadingOverlay />
      <Header />
      <Tabs screenOptions={{tabBarInactiveTintColor: theme.sub, tabBarActiveTintColor: theme.main, tabBarActiveBackgroundColor: theme.subAlt, tabBarInactiveBackgroundColor: theme.bg
      }}>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-cart" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}