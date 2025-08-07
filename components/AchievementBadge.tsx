import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Achievement } from '../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  onPress?: () => void;
}

export default function AchievementBadge({ achievement, onPress }: AchievementBadgeProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { opacity: achievement.unlocked ? 1 : 0.6 }
      ]}
      onPress={onPress}
    >
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{achievement.emoji}</Text>
      </View>
      <Text style={styles.title}>{achievement.title}</Text>
      {achievement.progress && achievement.maxProgress && (
        <Text style={styles.progress}>
          {achievement.progress}/{achievement.maxProgress}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 80,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.darkGray,
    textAlign: 'center',
  },
  progress: {
    fontSize: 10,
    color: Colors.gray,
    marginTop: 2,
  },
});