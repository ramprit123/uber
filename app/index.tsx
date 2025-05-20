import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    let timer = setTimeout(() => {
      router.push('/(auth)/welcome');
    }, 1000);
    return () => clearTimeout(timer); // Clear the timer on unmount to avoid memory leakag
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-PlusJakartaSans-Bold text-2xl font-bold text-black">Home</Text>
    </View>
  );
};

export default Home;
