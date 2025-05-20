import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <ScrollView className="flex-1 bg-[#F7F8FA]" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <Text className="mb-6 ml-6 self-start text-[26px] font-bold text-[#222]">Your profile</Text>

      {/* Profile Image with badge */}
      <View className="mb-4 items-center justify-center">
        <Image
          source={require('~/assets/images/profile.png')}
          className="h-[100px] w-[100px] rounded-full border-4 border-white bg-[#eee]"
          resizeMode="cover"
        />
      </View>

      {/* Card */}
      <View className="mb-6 w-[90%] self-center rounded-2xl bg-white p-5 shadow-sm">
        {/* First Name */}
        <Text className="mb-1 mt-3 text-sm text-[#888]">First name</Text>
        <View className="mb-1 flex-row items-center rounded-xl bg-[#F7F8FA] px-3">
          <TextInput
            className="flex-1 bg-transparent py-3 text-base text-[#222]"
            value="Marin"
            editable={false}
          />
          <TouchableOpacity>
            <Image
              source={require('~/assets/icons/edit.png')}
              className="tint-[#888] h-[22px] w-[22px]"
            />
          </TouchableOpacity>
        </View>
        {/* Last Name */}
        <Text className="mb-1 mt-3 text-sm text-[#888]">Last name</Text>
        <View className="mb-1 flex-row items-center rounded-xl bg-[#F7F8FA] px-3">
          <TextInput
            className="flex-1 bg-transparent py-3 text-base text-[#222]"
            value="JS Mastery"
            editable={false}
          />
          <TouchableOpacity>
            <Image
              source={require('~/assets/icons/edit.png')}
              className="tint-[#888] h-[22px] w-[22px]"
            />
          </TouchableOpacity>
        </View>
        {/* Email */}
        <Text className="mb-1 mt-3 text-sm text-[#888]">Email</Text>
        <View className="mb-1 flex-row items-center rounded-xl bg-[#F7F8FA] px-3">
          <TextInput
            className="flex-1 bg-transparent py-3 text-base text-[#222]"
            value="marin@jsmastery.pro"
            editable={false}
          />
          <TouchableOpacity>
            <Image
              source={require('~/assets/icons/edit.png')}
              className="tint-[#888] h-[22px] w-[22px]"
            />
          </TouchableOpacity>
        </View>
        {/* Email Status */}
        <Text className="mb-1 mt-3 text-sm text-[#888]">Email status</Text>
        <View className="mb-1 w-[120px] flex-row items-center rounded-xl bg-[#E5F9ED] px-3 py-2">
          <Image
            source={require('~/assets/icons/check.png')}
            className="tint-[#22C55E] mr-1.5 h-[18px] w-[18px]"
          />
          <Text className="text-[15px] font-medium text-[#22C55E]">Verified</Text>
        </View>
        {/* Phone Number */}
        <Text className="mb-1 mt-3 text-sm text-[#888]">Phone number</Text>
        <View className="mb-1 flex-row items-center rounded-xl bg-[#F7F8FA] px-3">
          <TextInput
            className="flex-1 bg-transparent py-3 text-base text-[#222]"
            value="+5547824162"
            editable={false}
          />
          <TouchableOpacity>
            <Image
              source={require('~/assets/icons/edit.png')}
              className="tint-[#888] h-[22px] w-[22px]"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
