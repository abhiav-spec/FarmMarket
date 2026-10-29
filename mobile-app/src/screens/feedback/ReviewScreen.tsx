import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { FeedbackRatingSelector } from '@/components/feedback/FeedbackRatingSelector';
import { AppInput } from '@/components/forms/AppInput';
import { AppButton } from '@/components/ui/AppButton';
import { useReviews } from '@/context/ReviewContext';

import { styles } from './styles';

const MAX_PHOTOS = 3;
const UPLOAD_INCREMENT = 20;
const UPLOAD_INTERVAL_MS = 140;
type ReviewPhoto = Pick<ImagePicker.ImagePickerAsset, 'uri'>;

export function ReviewScreen() {
  const { entryId, productId, reviewId } = useLocalSearchParams<{
    entryId?: string;
    productId?: string;
    reviewId?: string;
  }>();
  return (
    <ReviewForm
      key={`${reviewId ?? 'new'}:${entryId ?? 'initial'}`}
      productId={productId}
      reviewId={reviewId}
    />
  );
}

function ReviewForm({
  productId,
  reviewId,
}: {
  productId?: string;
  reviewId?: string;
}) {
  const router = useRouter();
  const { submitReview, submittedReviews, updateReview } = useReviews();
  const existingReview = submittedReviews.find((item) => item.id === reviewId);
  const activeProductId = productId ?? existingReview?.productId ?? 'prod-001';
  const isEditing = existingReview !== undefined;
  const [rating, setRating] = useState<number | null>(
    () => existingReview?.stars ?? null,
  );
  const [review, setReview] = useState(() => existingReview?.text ?? '');
  const [reviewFocused, setReviewFocused] = useState(false);
  const [photos, setPhotos] = useState<ReviewPhoto[]>(
    () => existingReview?.photoUris.map((uri) => ({ uri })) ?? [],
  );
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        existingReview?.photoUris.map((uri) => [uri, 100]) ?? [],
      ),
  );
  const [photoMessage, setPhotoMessage] = useState('');
  const [errors, setErrors] = useState({
    rating: '',
    review: '',
  });

  const isUploading = photos.some(
    (photo) => (uploadProgress[photo.uri] ?? 0) < 100,
  );
  const canSubmit = rating !== null && review.trim().length > 0 && !isUploading;
  const overallUploadProgress = useMemo(() => {
    if (photos.length === 0) {
      return 0;
    }

    const total = photos.reduce(
      (sum, photo) => sum + (uploadProgress[photo.uri] ?? 0),
      0,
    );

    return Math.round(total / photos.length);
  }, [photos, uploadProgress]);

  useEffect(() => {
    const pendingPhotos = photos.filter(
      (photo) => (uploadProgress[photo.uri] ?? 0) < 100,
    );

    if (pendingPhotos.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setUploadProgress((current) => {
        const next = { ...current };

        pendingPhotos.forEach((photo) => {
          next[photo.uri] = Math.min(
            (current[photo.uri] ?? 0) + UPLOAD_INCREMENT,
            100,
          );
        });

        return next;
      });
    }, UPLOAD_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [photos, uploadProgress]);

  const pickPhotos = async () => {
    const remainingSlots = MAX_PHOTOS - photos.length;

    if (remainingSlots === 0) {
      setPhotoMessage(`You can add a maximum of ${MAX_PHOTOS} photos.`);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const existingUris = new Set(photos.map((photo) => photo.uri));
    const uniquePhotos = result.assets.filter(
      (photo) => !existingUris.has(photo.uri),
    );
    const acceptedPhotos = uniquePhotos.slice(0, remainingSlots);

    if (acceptedPhotos.length === 0) {
      setPhotoMessage('Those photos have already been added.');
      return;
    }

    setPhotos((current) => [...current, ...acceptedPhotos]);
    setUploadProgress((current) => ({
      ...current,
      ...Object.fromEntries(acceptedPhotos.map((photo) => [photo.uri, 0])),
    }));
    setPhotoMessage(
      uniquePhotos.length > remainingSlots
        ? `Only ${MAX_PHOTOS} photos can be added.`
        : '',
    );
  };

  const removePhoto = (uri: string) => {
    setPhotos((current) => current.filter((photo) => photo.uri !== uri));
    setUploadProgress((current) => {
      const next = { ...current };
      delete next[uri];
      return next;
    });
    setPhotoMessage('');
  };

  const handleSubmit = () => {
    const nextErrors = {
      rating: rating === null ? 'Please select a rating.' : '',
      review: review.trim() ? '' : 'Please write your review.',
    };

    setErrors(nextErrors);

    if (nextErrors.rating || nextErrors.review) {
      return;
    }

    if (isUploading) {
      setPhotoMessage('Please wait for your photos to finish uploading.');
      return;
    }

    if (rating === null) {
      return;
    }

    const reviewData = {
      photoUris: photos.map((photo) => photo.uri),
      productId: activeProductId,
      stars: rating,
      text: review.trim(),
    };

    if (existingReview) {
      updateReview(existingReview.id, reviewData);
    } else {
      submitReview(reviewData);
    }
    router.replace({
      pathname: '/review-success',
      params: { productId: activeProductId },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title={isEditing ? 'Edit review' : 'Write a review'}
        onBackPress={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>
          Your rating<Text style={styles.requiredMark}> *</Text>
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

        <Text style={styles.label}>
          Write a review<Text style={styles.requiredMark}> *</Text>
        </Text>
        <View style={styles.messageInputWrapper}>
          <AppInput
            containerStyle={styles.messageContainer}
            error={errors.review}
            inputContainerStyle={[
              styles.messageInputContainer,
              reviewFocused && styles.messageInputFocused,
            ]}
            inputStyle={styles.messageInput}
            maxLength={1000}
            multiline
            onBlur={() => setReviewFocused(false)}
            onChangeText={(value) => {
              setReview(value);

              if (value.trim()) {
                setErrors((previous) => ({ ...previous, review: '' }));
              }
            }}
            onFocus={() => setReviewFocused(true)}
            placeholder="Tell us what you liked or what we can improve"
            textAlignVertical="top"
            value={review}
          />
          <Text style={styles.characterCount}>{review.length}/1000</Text>
        </View>

        <Text style={styles.label}>Upload photos</Text>
        <Text style={styles.photoDescription}>
          Add up to {MAX_PHOTOS} photos (optional).
        </Text>
        <View style={styles.photoUploadContainer}>
          {photos.length > 0 ? (
            <View style={styles.photosGrid}>
              {photos.map((photo, index) => {
                return (
                  <View key={photo.uri} style={styles.photoCard}>
                    <Image
                      source={{ uri: photo.uri }}
                      style={styles.photoPreview}
                    />
                    <Pressable
                      accessibilityLabel={`Remove photo ${index + 1}`}
                      accessibilityRole="button"
                      hitSlop={6}
                      onPress={() => removePhoto(photo.uri)}
                      style={styles.photoRemoveButton}
                    >
                      <Ionicons color="#FFFFFF" name="close" size={16} />
                    </Pressable>
                  </View>
                );
              })}
              {photos.length < MAX_PHOTOS ? (
                <Pressable
                  accessibilityLabel="Add another photo"
                  accessibilityRole="button"
                  onPress={pickPhotos}
                  style={styles.addMorePhotoButton}
                >
                  <Ionicons color="#6A00FF" name="add" size={30} />
                  <Text style={styles.addMorePhotoText}>Add</Text>
                </Pressable>
              ) : null}
            </View>
          ) : (
            <Pressable
              accessibilityLabel="Upload a photo"
              accessibilityRole="button"
              onPress={pickPhotos}
              style={styles.uploadPhotoAction}
            >
              <View style={styles.uploadPhotoIconContainer}>
                <Ionicons color="#6A00FF" name="images-outline" size={26} />
              </View>
              <View style={styles.uploadPhotoCopy}>
                <Text style={styles.uploadPhotoTitle}>Upload a photo</Text>
                <Text style={styles.uploadPhotoHint}>
                  JPG or PNG, up to 3 photos
                </Text>
              </View>
              <View style={styles.photoCountBadge}>
                <Text style={styles.photoCount}>0 of {MAX_PHOTOS}</Text>
              </View>
            </Pressable>
          )}

          <View style={styles.photoCountRow}>
            <Text style={styles.photoCountLabel}>
              {photos.length} of {MAX_PHOTOS} photos added
            </Text>
          </View>

          {isUploading ? (
            <View style={styles.uploadStatus}>
              <Text style={styles.uploadStatusLabel}>
                Uploading photos… {overallUploadProgress}%
              </Text>
              <View style={styles.uploadProgressTrack}>
                <View
                  style={[
                    styles.uploadProgress,
                    { width: `${overallUploadProgress}%` },
                  ]}
                />
              </View>
            </View>
          ) : null}
        </View>
        {photoMessage ? (
          <Text style={styles.errorText}>{photoMessage}</Text>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          disabled={!canSubmit}
          fullWidth
          onPress={handleSubmit}
          size="large"
          style={styles.sendMessageButton}
          title={isEditing ? 'Update Review' : 'Submit Review'}
        />
      </View>
    </SafeAreaView>
  );
}
