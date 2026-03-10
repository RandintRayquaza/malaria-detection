import React from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { useNextSteps } from '../../hooks/useNextSteps';
import { Button } from '../../../../shared/components/Button';

const ROLES = ['Lab Technician', 'Doctor', 'Nurse', 'Researcher', 'Other'];
const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Expert'];
const GOAL_OPTIONS = [
  'Faster diagnosis',
  'Track patient scans',
  'Research & training',
  'Remote health support',
  'Monitor trends',
];

export function NextStepsScreen() {
  const router = useRouter();
  const {
    user,
    facility,
    setFacility,
    role,
    setRole,
    experienceLevel,
    setExperienceLevel,
    notifications,
    setNotifications,
    goals,
    toggleGoal,
    saveProfile,
  } = useNextSteps();

  function handleDone() {
    saveProfile();
    router.replace('/scan');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8">
          <View className="w-16 h-16 rounded-2xl bg-primary-100 items-center justify-center mb-4">
            <Feather name="user-check" size={28} color="#0F82F5" />
          </View>
          <Text className="text-3xl font-bold text-gray-900">
            Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </Text>
          <Text className="text-base text-gray-500 mt-2">
            Tell us a bit about yourself to personalise your experience.
          </Text>
        </View>

        {/* Facility */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Facility / Hospital{' '}
            <Text className="text-gray-400 font-normal">(optional)</Text>
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-2xl px-4 py-3.5 bg-gray-50">
            <Feather name="home" size={16} color="#9CA3AF" style={{ marginRight: 10 }} />
            <TextInput
              className="flex-1 text-base text-gray-900"
              value={facility}
              onChangeText={setFacility}
              placeholder="Enter your facility name"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Role */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">Your Role</Text>
          <View className="flex-row flex-wrap" style={{ gap: 8 }}>
            {ROLES.map((r) => (
              <Pressable
                key={r}
                onPress={() => setRole(r)}
                className={[
                  'px-4 py-2 rounded-full border',
                  role === r
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-200 bg-white',
                ].join(' ')}
              >
                <Text
                  className={
                    role === r
                      ? 'text-white font-semibold text-sm'
                      : 'text-gray-600 text-sm'
                  }
                >
                  {r}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Experience */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">
            Experience Level
          </Text>
          <View className="flex-row" style={{ gap: 8 }}>
            {EXPERIENCE_LEVELS.map((lvl) => (
              <Pressable
                key={lvl}
                onPress={() => setExperienceLevel(lvl)}
                className={[
                  'flex-1 py-3 rounded-xl border items-center',
                  experienceLevel === lvl
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-200 bg-white',
                ].join(' ')}
              >
                <Text
                  className={
                    experienceLevel === lvl
                      ? 'text-white font-semibold text-sm'
                      : 'text-gray-600 text-sm'
                  }
                >
                  {lvl}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Goals */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">Your Goals</Text>
          <View style={{ gap: 8 }}>
            {GOAL_OPTIONS.map((goal) => {
              const selected = goals.includes(goal);
              return (
                <Pressable
                  key={goal}
                  onPress={() => toggleGoal(goal)}
                  className={[
                    'flex-row items-center px-4 py-3 rounded-xl border',
                    selected
                      ? 'bg-primary-50 border-primary-300'
                      : 'border-gray-200 bg-white',
                  ].join(' ')}
                >
                  <View
                    className={[
                      'w-5 h-5 rounded-md border-2 items-center justify-center mr-3',
                      selected
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-gray-300',
                    ].join(' ')}
                  >
                    {selected ? (
                      <Feather name="check" size={12} color="white" />
                    ) : null}
                  </View>
                  <Text className="text-sm text-gray-700">{goal}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Notifications toggle */}
        <Pressable
          className="flex-row items-center justify-between px-4 py-4 bg-gray-50 rounded-xl mb-8 border border-gray-100"
          onPress={() => setNotifications(!notifications)}
        >
          <View className="flex-row items-center flex-1">
            <Feather name="bell" size={18} color="#6B7280" style={{ marginRight: 12 }} />
            <View>
              <Text className="text-sm font-semibold text-gray-800">
                Enable notifications
              </Text>
              <Text className="text-xs text-gray-500">Get alerts for new scan results</Text>
            </View>
          </View>
          <View
            className={[
              'w-6 h-6 rounded-md border-2 items-center justify-center',
              notifications
                ? 'bg-primary-500 border-primary-500'
                : 'border-gray-300 bg-white',
            ].join(' ')}
          >
            {notifications ? <Feather name="check" size={14} color="white" /> : null}
          </View>
        </Pressable>

        {/* CTA */}
        <Button label="Finish Setup & Start Scanning" icon="arrow-right" onPress={handleDone} />
        <View style={{ marginTop: 12 }}>
          <Button label="Skip for now" variant="ghost" onPress={handleDone} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
