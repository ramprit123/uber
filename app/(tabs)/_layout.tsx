import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const TabLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#2D2D2D',
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
            borderRadius: 30,
            marginHorizontal: 20,
            paddingTop: 7,
            position: 'absolute',
          },
          tabBarActiveTintColor: '#00DC8A',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={30} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="rides"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="car" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chat" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;
