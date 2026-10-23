export const REVIEW_RATING_VALUES = [1, 2, 3, 4, 5] as const;

export const REVIEW_RATING_LABELS: Record<
  (typeof REVIEW_RATING_VALUES)[number],
  string
> = {
  1: 'Very bad',
  2: 'Bad',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};
