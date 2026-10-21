import { StyleSheet } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 58,
    backgroundColor: COLORS.purpleSurface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 36,
    color: COLORS.text.primary,
    lineHeight: 40,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  heading: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.purple,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },

  description: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  label: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.xs,
  },
  ratingOption: {
    flex: 1,
    minHeight: 86,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  ratingSelected: {
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purpleSurface,
  },
  ratingEmoji: {
    fontSize: 25,
    marginBottom: SPACING.xs,
  },
  ratingLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 10,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  ratingLabelSelected: {
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.purple,
  },
  dropdown: {
    minHeight: 54,
    backgroundColor: COLORS.purpleSurface,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },

  placeholderText: {
    color: COLORS.text.primary,
  },

  dropdownChevron: {
    width: 24,
    height: 24,
  },
  messageContainer: {
    width: '100%',
  },

  messageInputContainer: {
    minHeight: 120,
    alignItems: 'stretch',
    borderColor: COLORS.purpleBorder1,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    backgroundColor: COLORS.surface,
  },
  messageInputWrapper: {
    position: 'relative',
  },

  characterCount: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted,
  },
  messageInput: {
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    textAlignVertical: 'top',
  },

  errorText: {
    color: COLORS.error,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.xs,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  sendMessageButton: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.md,
    height: 56,
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  modalTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.primary,
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
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  selectedSubjectText: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
  },
  checkmark: {
    color: COLORS.purple,
    fontSize: FONT_SIZE.lg,
  },

  // Feedback success screen
  successScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  successIllustration: {
    width: '100%',
    maxWidth: 320,
    height: 280,
    marginBottom: SPACING.xl,
  },
  successTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  successDescription: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  successFooter: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  requiredIndicator: {
    color: COLORS.error,
    fontSize: FONT_SIZE.sm,
  },
});
