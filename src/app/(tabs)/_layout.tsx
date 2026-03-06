/*Função: definir o fluxo de navegação entre as telas disponíveis em Tab Navigator:
Explorar, Reservas, Perfil*/
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function TabLayout() {
  const { token, isLoading } = useAuth();

  if (isLoading) return null;

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Pesquisar',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
    />
      <Tabs.Screen
        name="reservations"
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
    />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Minha Conta',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
    />
    </Tabs>
  );

}
