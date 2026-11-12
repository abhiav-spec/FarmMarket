import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AppInput } from '@/components/forms/AppInput';
import { AppButton } from '@/components/ui/AppButton';
import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { writeToUsStyles as styles } from './writeToUsStyles';

const RATINGS = [
  {
    value: 1,
    image: require('../../../assets/images/feedback/very-bad.png'),
    label: 'Very bad',
  },
  {
    value: 2,
    image: require('../../../assets/images/feedback/bad.png'),
    label: 'Bad',
  },
  {
    value: 3,
    image: require('../../../assets/images/feedback/okay.png'),
    label: 'Okay',
  },
  {
    value: 4,
    image: require('../../../assets/images/feedback/good.png'),
    label: 'Good',
  },
  {
    value: 5,
    image: require('../../../assets/images/feedback/excellent.png'),
    label: 'Excellent',
  },
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

    if (nextErrors.rating || nextErrors.subject || nextErrors.message) {
      return;
    }

    router.push('/feedback-success');
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <FeedbackHeader
        title="Write to us"
        onBackPress={() => router.replace('/(main)/profile')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Share your feedback and suggestions</Text>

        <Text style={styles.description}>
          Share your feedback, suggestions, or report an issue. We&apos;re
          always looking for ways to improve your experience.
        </Text>

        {/* Experience rating */}
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
                  setErrors((previous) => ({
                    ...previous,
                    rating: '',
                  }));
                }}
                style={[styles.ratingOption, selected && styles.ratingSelected]}
              >
                <Image
                  source={item.image}
                  style={styles.ratingEmoji}
                  resizeMode="contain"
                />

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

        {/* Subject */}
        <Text style={styles.label}>Subject *</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select a topic"
          onPress={() => setSubjectModalVisible(true)}
          style={styles.dropdown}
        >
          <Text
            style={[styles.dropdownText, !subject && styles.placeholderText]}
          >
            {subject || 'Select a topic'}
          </Text>

          <Image
            accessible={false}
            source={require('../../../assets/icons/dropdown-chevron.png')}
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </Pressable>

        {errors.subject ? (
          <Text style={styles.errorText}>{errors.subject}</Text>
        ) : null}

        {/* Message */}
        <Text style={styles.label}>Message *</Text>

        <View style={styles.messageInputWrapper}>
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

              if (value.trim()) {
                setErrors((previous) => ({
                  ...previous,
                  message: '',
                }));
              }
            }}
            onFocus={() => setMessageFocused(true)}
            placeholder="Describe your experience or issue in detail so we can assist you better"
            textAlignVertical="top"
            value={message}
          />

          <Text style={styles.characterCount}>{message.length}/1000</Text>
        </View>
        <Text style={styles.supportNote}>
          Your message will be reviewed by our support team.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <AppButton
          fullWidth
          onPress={handleSubmit}
          size="large"
          style={styles.purpleButton}
          title="Send Message"
        />
      </View>

      {/* Subject selection modal */}
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
            <Text style={styles.modalTitle}>Select a topic</Text>

            {SUBJECTS.map((item) => (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityState={{ selected: subject === item }}
                onPress={() => {
                  setSubject(item);
                  setErrors((previous) => ({
                    ...previous,
                    subject: '',
                  }));
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
