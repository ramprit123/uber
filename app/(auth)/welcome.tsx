import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { onboarding } from '~/constants';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const isLastSlide = currentIndex === onboarding.length - 1; // update if you change number of slides
  return (
    <SafeAreaView className="flex- flex-1 justify-between">
      <View className="mt-3 flex items-end justify-end pr-8">
        <TouchableOpacity onPress={() => console.log('clicked')}>
          <Text className="font-PlusJakartaSans-Bold text-sm">Skip</Text>
        </TouchableOpacity>
      </View>
      <Swiper
        ref={swiperRef}
        onIndexChanged={(index) => setCurrentIndex(index)}
        showsPagination={true}
        dot={<View className="mx-1 h-2 w-2 rounded-full bg-white/30" />}
        activeDot={<View className="mx-1 h-2 w-2 rounded-full bg-[#2F80ED]" />}>
        {onboarding.map((item) => (
          <View className="mx-4 flex-1 gap-4" key={item.id}>
            <Image source={item.image} className="h-[400px] w-full" resizeMode="contain" />
            <View className="mt-10 flex items-center justify-center gap-3">
              <Text className="font-PlusJakartaSans-Bold text-2xl font-bold">{item.title}</Text>
              <Text className="max-w-sm text-center font-PlusJakartaSans-Regular text-lg text-slate-700">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View className="mx-4 my-10">
        <TouchableOpacity
          className="rounded-full bg-[#2F80ED] px-6 py-4 shadow-md shadow-[#2F80ED]/50"
          onPress={() => {
            if (isLastSlide) {
              router.push('/(auth)/onboarding');
            } else {
              swiperRef.current?.scrollBy(1, true);
            }
          }}>
          <Text className="text-center font-PlusJakartaSans-Bold text-[17px] font-bold text-white">
            {isLastSlide ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
