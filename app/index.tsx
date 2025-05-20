import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  const router = useRouter();
  const { sessionId } = useAuth();

  useEffect(() => {
    if (sessionId) {
      router.replace('/(tabs)/home');
    } else {
      const timer = setTimeout(() => {
        router.push('/(auth)/welcome');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [sessionId, router]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-PlusJakartaSans-Bold text-2xl font-bold text-black">Home</Text>
    </View>
  );
};

export default Home;
