import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';

const REVIEW_STORAGE_KEY = 'farm-market-submitted-reviews';

export type SubmittedReview = {
  id: string;
  productId: string;
  author: string;
  stars: number;
  date: string;
  text: string;
  photoUris: readonly string[];
};

type NewReview = Pick<
  SubmittedReview,
  'productId' | 'stars' | 'text' | 'photoUris'
>;

type ReviewContextValue = {
  submittedReviews: readonly SubmittedReview[];
  submitReview: (review: NewReview) => void;
  updateReview: (id: string, review: NewReview) => void;
  deleteReview: (id: string) => void;
};

type BrowserStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

const ReviewContext = createContext<ReviewContextValue | undefined>(undefined);

function formatReviewDate(date: Date) {
  return date.toLocaleDateString('en-GB');
}

function getBrowserStorage(): BrowserStorage | undefined {
  if (Platform.OS !== 'web') {
    return undefined;
  }

  return (globalThis as { localStorage?: BrowserStorage }).localStorage;
}

function getStoredReviews(): SubmittedReview[] {
  const storage = getBrowserStorage();

  if (!storage) {
    return [];
  }

  try {
    const storedReviews = storage.getItem(REVIEW_STORAGE_KEY);

    if (!storedReviews) {
      return [];
    }

    const parsedReviews: unknown = JSON.parse(storedReviews);
    return Array.isArray(parsedReviews)
      ? (parsedReviews as SubmittedReview[]).map((review) => ({
          ...review,
          // Reviews saved before reviews were linked to a product belong to
          // the original product in this mock catalogue.
          productId: review.productId ?? 'prod-001',
        }))
      : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: readonly SubmittedReview[]) {
  const storage = getBrowserStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // Reviews still remain available in memory when browser storage is unavailable.
  }
}

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [submittedReviews, setSubmittedReviews] =
    useState<SubmittedReview[]>(getStoredReviews);

  const submitReview = useCallback((review: NewReview) => {
    const submittedAt = new Date();

    setSubmittedReviews((current) => {
      const nextReviews = [
        {
          ...review,
          author: 'You',
          date: formatReviewDate(submittedAt),
          id: `review-${submittedAt.getTime()}`,
        },
        ...current,
      ];

      saveReviews(nextReviews);
      return nextReviews;
    });
  }, []);

  const updateReview = useCallback((id: string, review: NewReview) => {
    setSubmittedReviews((current) => {
      const nextReviews = current.map((currentReview) =>
        currentReview.id === id
          ? { ...currentReview, ...review }
          : currentReview,
      );

      saveReviews(nextReviews);
      return nextReviews;
    });
  }, []);

  const deleteReview = useCallback((id: string) => {
    setSubmittedReviews((current) => {
      const nextReviews = current.filter((review) => review.id !== id);

      saveReviews(nextReviews);
      return nextReviews;
    });
  }, []);

  const value = useMemo(
    () => ({ submittedReviews, submitReview, updateReview, deleteReview }),
    [submittedReviews, submitReview, updateReview, deleteReview],
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReviews(): ReviewContextValue {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }

  return context;
}
