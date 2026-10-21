import { StyleSheet } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
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

  messageInput: {
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    textAlignVertical: 'top',
  },

  characterCount: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted,
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

  sendMessageButton: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.md,
    height: 56,
  },

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
  },

  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    overflow: 'visible',
  },

  successIllustration: {
    width: '100%',

    height: 250,
    marginBottom: SPACING.xl,
  },

  successTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.purple,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },

  successDescription: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.primary,
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
    borderWidth: 2,
    borderColor: COLORS.purple,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  returnHomeButtonText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.purple,
    textAlign: 'center',
  },
});
