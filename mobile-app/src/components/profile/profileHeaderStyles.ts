import { StyleSheet } from 'react-native';

import { COLORS, SPACING } from '@/theme';

export const profileHeaderStyles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: COLORS.purple,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxl,
    borderBottomLeftRadius: 52,
    borderBottomRightRadius: 52,
    overflow: 'hidden',
  },

  decorations: {
    ...StyleSheet.absoluteFill,
  },

  shapeOne: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 28,
    right: 32,
    bottom: 78,
    backgroundColor: 'rgba(255,255,255,0.10)',
    transform: [{ rotate: '-25deg' }],
  },

  shapeTwo: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 28,
    right: -22,
    bottom: 78,
    backgroundColor: 'rgba(255,255,255,0.10)',
    transform: [{ rotate: '-25deg' }],
  },

  shapeThree: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 28,
    right: 66,
    bottom: 8,
    backgroundColor: 'rgba(255,255,255,0.10)',
    transform: [{ rotate: '-25deg' }],
  },

  shapeFour: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 28,
    right: -22,
    bottom: 8,
    backgroundColor: 'rgba(255,255,255,0.10)',
    transform: [{ rotate: '-25deg' }],
  },

  shapeFive: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 28,
    right: 22,
    bottom: -62,
    backgroundColor: 'rgba(255,255,255,0.10)',
    transform: [{ rotate: '-25deg' }],
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },

  editIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.text.inverse,
  },

  details: {
    position: 'absolute',
    left: SPACING.xxxl,
    right: SPACING.xl,
    bottom: 30,
    gap: SPACING.sm,
  },
});
