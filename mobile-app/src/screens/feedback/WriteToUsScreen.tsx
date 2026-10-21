import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/forms/AppInput';
import { COLORS } from '@/theme';

import { styles } from './styles';

const RATINGS = [
  { value: 1, emoji: '😞', label: 'Very bad' },
  { value: 2, emoji: '🙁', label: 'Bad' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '😊', label: 'Good' },
  { value: 5, emoji: '😍', label: 'Excellent' },
];

const SUBJECTS = [
  'Product quality',
  'Order and delivery',
  'Payment issue',
  'App experience',
  'Suggestion',
  'Other',
];

export function WriteToUsScreen() {
  const router = useRouter();

  const [rating, setRating] = useState<number | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [subjectModalVisible, setSubjectModalVisible] = useState(false);
  const [errors, setErrors] = useState({
    rating: '',
    subject: '',
    message: '',
  });

  const handleSubmit = () => {
    const nextErrors = {
      rating: rating === null ? 'Please select a rating.' : '',
      subject: subject ? '' : 'Please select a subject.',
      message: message.trim() ? '' : 'Please enter your message.',
    };

    setErrors(nextErrors);

    if (nextErrors.rating || nextErrors.subject || nextErrors.message) {
      return;
    }

    router.push('/feedback-success');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Write to Us</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.heading}>We value your feedback</Text>
        <Text style={styles.description}>
          Tell us about your experience with FarmMarket.
        </Text>

        <Text style={styles.label}>How was your experience? *</Text>

        <View style={styles.ratingRow}>
          {RATINGS.map((item) => {
            const selected = rating === item.value;

            return (
              <Pressable
                key={item.value}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityState={{ selected }}
                onPress={() => {
                  setRating(item.value);
                  setErrors((previous) => ({ ...previous, rating: '' }));
                }}
                style={[styles.ratingOption, selected && styles.ratingSelected]}
              >
                <Text style={styles.ratingEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.ratingLabel,
                    selected && styles.ratingLabelSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {errors.rating ? (
          <Text style={styles.errorText}>{errors.rating}</Text>
        ) : null}

        <Text style={styles.label}>Subject *</Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => setSubjectModalVisible(true)}
          style={styles.dropdown}
        >
          <Text
            style={[styles.dropdownText, !subject && styles.placeholderText]}
          >
            {subject || 'Select a subject'}
          </Text>
          <Text style={styles.dropdownArrow}>⌄</Text>
        </Pressable>

        {errors.subject ? (
          <Text style={styles.errorText}>{errors.subject}</Text>
        ) : null}

        <Text style={styles.label}>Your message *</Text>

        <AppInput
          value={message}
          onChangeText={(value) => {
            setMessage(value);
            if (value.trim()) {
              setErrors((previous) => ({ ...previous, message: '' }));
            }
          }}
          placeholder="Tell us what you think..."
          multiline
          maxLength={1000}
          textAlignVertical="top"
          inputStyle={styles.messageInput}
          containerStyle={styles.messageContainer}
          error={errors.message}
        />

        <Text style={styles.characterCount}>{message.length}/1000</Text>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title="Send Message"
          onPress={handleSubmit}
          fullWidth
          size="large"
        />
      </View>

      <Modal
        visible={subjectModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSubjectModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSubjectModalVisible(false)}
        >
          <Pressable
            style={styles.modalCard}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Select a subject</Text>

            {SUBJECTS.map((item) => (
              <Pressable
                key={item}
                style={styles.subjectOption}
                onPress={() => {
                  setSubject(item);
                  setErrors((previous) => ({ ...previous, subject: '' }));
                  setSubjectModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.subjectText,
                    subject === item && styles.selectedSubjectText,
                  ]}
                >
                  {item}
                </Text>
                {subject === item ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : null}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
