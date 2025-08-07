import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CreditCard from '../../components/creditcard';
import { Colors } from '../../constants/Colors';
import { mockUserStats } from '../../data/mockData';

export default function CreditsScreen() {
  const { offsets } = mockUserStats;

  const handleDownloadCertificate = (projectName: string) => {
    Alert.alert(
      'Certificate Download',
      `Downloading certificate for ${projectName}...`,
      [{ text: 'OK' }]
    );
  };

  const handleConnectAccount = () => {
    Alert.alert(
      'Connect Account',
      'Choose a platform to connect:',
      [
        { text: 'Verra Registry', onPress: () => console.log('Connecting to Verra...') },
        { text: 'GoldStandard', onPress: () => console.log('Connecting to GoldStandard...') },
        { text: 'KlimaDAO', onPress: () => console.log('Connecting to KlimaDAO...') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Carbon Credits</Text>
        <Text style={styles.subtitle}>
          {offsets.length} verified offset{offsets.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {offsets.map((offset) => (
          <CreditCard
            key={offset.id}
            offset={offset}
            onDownloadCertificate={() => handleDownloadCertificate(offset.projectName)}
          />
        ))}
        
        <TouchableOpacity style={styles.connectButton} onPress={handleConnectAccount}>
          <Text style={styles.connectButtonText}>Connect Another Account</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
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
  content: {
    flex: 1,
  },
  connectButton: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  connectButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
  },
});