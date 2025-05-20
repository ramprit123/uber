import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabIcon from '~/components/TabIcon';

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
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="home" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="rides"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="map" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="chat" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="person" color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;
