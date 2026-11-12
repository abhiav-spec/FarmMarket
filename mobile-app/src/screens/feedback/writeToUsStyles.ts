import { StyleSheet } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

export const writeToUsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Main content
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
  },

  heading: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 360,
    marginTop: SPACING.md,
  },

  description: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },

  // Rating cards
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.xs,
  },

  ratingOption: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.purpleSurface,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.xs,
  },
  ratingSelected: {
    backgroundColor: COLORS.purpleSurface,
    borderColor: COLORS.purple,
  },

  ratingEmoji: {
    width: 36,
    height: 36,
    marginBottom: SPACING.xs,
  },

  ratingLabel: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: 10,
    textAlign: 'center',
  },

  ratingLabelSelected: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
  },

  // Labels and dropdown
  label: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },

  dropdown: {
    minHeight: 54,
    backgroundColor: COLORS.purpleSurface,
    borderColor: COLORS.purpleBorder1,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownText: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
  },

  placeholderText: {
    color: COLORS.text.muted,
  },

  dropdownIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  // Message input
  messageContainer: {
    width: '100%',
  },

  messageInputWrapper: {
    position: 'relative',
  },

  messageInputContainer: {
    minHeight: 150,
    alignItems: 'stretch',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.purpleBorder1,
    borderWidth: 1,
    borderRadius: RADIUS.md,
  },

  messageInputFocused: {
    borderColor: COLORS.purple,
    borderWidth: 1,
  },

  messageInput: {
    minHeight: 150,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    textAlignVertical: 'top',
  },

  characterCount: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    color: COLORS.text.muted,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
  },

  supportNote: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
    marginTop: SPACING.xxl,
    marginBottom: SPACING.md,
  },

  // Validation
  errorText: {
    color: COLORS.error,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.xs,
  },

  // Footer
  footer: {
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },

  purpleButton: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.md,
    height: 56,
  },

  // Subject modal
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    padding: SPACING.lg,
  },

  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  modalTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACING.md,
  },

  subjectOption: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },

  subjectText: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
  },

  selectedSubjectText: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
  },

  checkmark: {
    color: COLORS.purple,
    fontSize: FONT_SIZE.lg,
  },

  // Success screen
  successScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  successIllustration: {
    width: '100%',
    maxWidth: 360,
    height: 250,
    marginBottom: SPACING.xl,
  },

  successTitle: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xxl,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },

  successDescription: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    lineHeight: 22,
    textAlign: 'center',
  },

  successFooter: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xxxl,
    backgroundColor: COLORS.background,
  },

  returnHomeButton: {
    height: 48,
    width: '100%',
    backgroundColor: COLORS.purpleSurface,
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  returnHomeButtonText: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
  },
});
