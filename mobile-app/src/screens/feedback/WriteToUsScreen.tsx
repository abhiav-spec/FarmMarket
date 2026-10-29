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

import { AppInput } from '@/components/forms/AppInput';
import { AppButton } from '@/components/ui/AppButton';

import { writeToUsStyles as styles } from './writeToUsStyles';

const RATINGS = [
  { value: 1, emoji: '😞', label: 'Very bad' },
  { value: 2, emoji: '🙁', label: 'Bad' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '😊', label: 'Good' },
  { value: 5, emoji: '😍', label: 'Excellent' },
] as const;

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
  const [messageFocused, setMessageFocused] = useState(false);
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
    if (!nextErrors.rating && !nextErrors.subject && !nextErrors.message)
      router.push('/feedback-success');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Write to Us</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
                accessibilityLabel={item.label}
                accessibilityRole="button"
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
          containerStyle={styles.messageContainer}
          error={errors.message}
          inputStyle={styles.messageInput}
          inputContainerStyle={[
            styles.messageInputContainer,
            messageFocused && styles.messageInputFocused,
          ]}
          maxLength={1000}
          multiline
          onBlur={() => setMessageFocused(false)}
          onChangeText={(value) => {
            setMessage(value);
            if (value.trim())
              setErrors((previous) => ({ ...previous, message: '' }));
          }}
          onFocus={() => setMessageFocused(true)}
          placeholder="Tell us what you think..."
          textAlignVertical="top"
          value={message}
        />
        <Text style={styles.characterCount}>{message.length}/1000</Text>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          fullWidth
          onPress={handleSubmit}
          size="large"
          style={styles.purpleButton}
          title="Send Message"
        />
      </View>
      <Modal
        animationType="fade"
        onRequestClose={() => setSubjectModalVisible(false)}
        transparent
        visible={subjectModalVisible}
      >
        <Pressable
          onPress={() => setSubjectModalVisible(false)}
          style={styles.modalOverlay}
        >
          <Pressable
            onPress={(event) => event.stopPropagation()}
            style={styles.modalCard}
          >
            <Text style={styles.modalTitle}>Select a subject</Text>
            {SUBJECTS.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setSubject(item);
                  setErrors((previous) => ({ ...previous, subject: '' }));
                  setSubjectModalVisible(false);
                }}
                style={styles.subjectOption}
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
