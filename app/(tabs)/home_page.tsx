import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AchievementBadge from '../../components/AchievementBadge';
import ProgressBar from '../../components/ProgressBar';
import { Colors } from '../../constants/Colors';
import { mockUserStats } from '../../data/mockData';

export default function HomeScreen() {
  const { totalOffset, goal, netZeroStatus, achievements } = mockUserStats;

  const handleShareBadge = () => {
    // Mock sharing functionality
    console.log('Sharing CarbonFlex Badge...');
  };

  const getBadgeColor = () => {
    switch (netZeroStatus) {
      case 'Carbon Positive':
        return Colors.success;
      case 'Net Zero':
        return Colors.primaryLight;
      default:
        return Colors.warning;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CarbonFlex</Text>
          <Text style={styles.subtitle}>Your Carbon Impact Dashboard</Text>
        </View>

        {/* Main Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.offsetContainer}>
            <Text style={styles.offsetValue}>{totalOffset}t</Text>
            <Text style={styles.offsetLabel}>CO₂ offset</Text>
          </View>
          
          <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
            <Text style={styles.badgeText}>{netZeroStatus}</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressCard}>
          <Text style={styles.sectionTitle}>Goal Progress</Text>
          <ProgressBar current={totalOffset} goal={goal} />
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsCard}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.achievementsList}
          >
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                onPress={() => console.log(`Tapped ${achievement.title}`)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Verification Badge */}
        <View style={styles.verificationCard}>
          <Text style={styles.verificationText}>
            🔒 Connected to GoldStandard.org via zkTLS
          </Text>
        </View>

        {/* Share Button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShareBadge}>
          <Text style={styles.shareButtonText}>Share My CarbonFlex Badge</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
  },
  statsCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  offsetContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  offsetValue: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  offsetLabel: {
    fontSize: 18,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementsCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 16,
  },
  achievementsList: {
    paddingVertical: 8,
  },
  verificationCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verificationText: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shareButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});