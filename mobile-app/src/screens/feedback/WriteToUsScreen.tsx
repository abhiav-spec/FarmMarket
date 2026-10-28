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
import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { FeedbackRatingSelector } from '@/components/feedback/FeedbackRatingSelector';
import { AppInput } from '@/components/forms/AppInput';
import { AppButton } from '@/components/ui/AppButton';

import { styles } from './styles';

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
      <FeedbackHeader title="Write to us" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.heading}>Share your feedback and suggestions</Text>

        <Text style={styles.description}>
          Share your feedback, suggestions, or report an issue. We&apos;re
          always looking for ways to improve your experience.
        </Text>

        <FeedbackRatingSelector
          value={rating}
          onChange={(value) => {
            setRating(value);
            setErrors((previous) => ({ ...previous, rating: '' }));
          }}
        />

        {errors.rating ? (
          <Text style={styles.errorText}>{errors.rating}</Text>
        ) : null}

        <Text style={styles.label}>Subject</Text>

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
            source={require('../../../assets/icons/dropdown-chevron.png')}
            style={styles.dropdownChevron}
            resizeMode="contain"
          />
        </Pressable>

        {errors.subject ? (
          <Text style={styles.errorText}>{errors.subject}</Text>
        ) : null}

        <Text style={styles.label}>Message</Text>

        <View style={styles.messageInputWrapper}>
          <AppInput
            value={message}
            onChangeText={(value) => {
              setMessage(value);

              if (value.trim()) {
                setErrors((previous) => ({ ...previous, message: '' }));
              }
            }}
            placeholder="Describe your experience or issue in detail so we can assist you better"
            multiline
            maxLength={1000}
            textAlignVertical="top"
            inputStyle={styles.messageInput}
            inputContainerStyle={styles.messageInputContainer}
            containerStyle={styles.messageContainer}
            error={errors.message}
          />

          <Text style={styles.characterCount}>{message.length}/1000</Text>
        </View>
      </ScrollView>
      <Text style={styles.description}>
        Your message will be reviewed by our support team.
      </Text>
      <View style={styles.footer}>
        <AppButton
          title="Send Message"
          onPress={handleSubmit}
          fullWidth
          size="large"
          style={styles.sendMessageButton}
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
            <Text style={styles.modalTitle}>Select a topic</Text>

            {SUBJECTS.map((item) => (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityState={{ selected: subject === item }}
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
