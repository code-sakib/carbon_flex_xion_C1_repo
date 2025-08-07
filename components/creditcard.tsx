import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { CarbonOffset } from '../types/index';

interface CreditCardProps {
  offset: CarbonOffset;
  onDownloadCertificate?: () => void;
}

export default function CreditCard({ offset, onDownloadCertificate }: CreditCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleExpanded}>
        <View style={styles.projectInfo}>
          <Text style={styles.emoji}>{offset.emoji}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.projectName}>{offset.projectName}</Text>
            <Text style={styles.platform}>
              {offset.platform} • Verified via zkTLS
            </Text>
          </View>
        </View>
        <View style={styles.offsetInfo}>
          <Text style={styles.tonsOffset}>{offset.tonsOffset}t</Text>
          <Text style={styles.co2}>CO₂</Text>
        </View>
      </TouchableOpacity>
      
      <Animated.View style={[styles.expandedContent, { maxHeight }]}>
        <View style={styles.details}>
          <Text style={styles.description}>{offset.description}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{offset.location}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Project Type:</Text>
            <Text style={styles.detailValue}>{offset.projectType}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Verified:</Text>
            <Text style={styles.detailValue}>{offset.verifiedDate}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={onDownloadCertificate}
          >
            <Text style={styles.downloadButtonText}>Download Certificate</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  projectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 4,
  },
  platform: {
    fontSize: 12,
    color: Colors.gray,
  },
  offsetInfo: {
    alignItems: 'flex-end',
  },
  tonsOffset: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  co2: {
    fontSize: 12,
    color: Colors.gray,
  },
  expandedContent: {
    overflow: 'hidden',
  },
  details: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  description: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '400',
  },
  downloadButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  downloadButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});