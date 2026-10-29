import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { PillButton } from '@/components/auth/PillButton';
import { STATES, districtsOf } from '@/data/geography';
import { AUTH_STRINGS } from '@/constants/auth';
import { LANGUAGES } from '@/data/languages';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '@/theme';

const STRINGS = AUTH_STRINGS.personalInfo;

type ModalType = keyof typeof STRINGS.modalTitles | null;

export function PersonalInfoScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [language, setLanguage] = useState<string>(STRINGS.defaultLanguageKey);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [search, setSearch] = useState('');

  const selectedLanguageLabel =
    LANGUAGES.find((lang) => lang.key === language)?.name ||
    STRINGS.defaultLanguageName;

  const modalTitle = activeModal ? STRINGS.modalTitles[activeModal] : '';

  const currentOptions = useMemo(() => {
    switch (activeModal) {
      case 'language':
        return LANGUAGES.map((lang) => ({
          key: lang.key,
          label: lang.name,
        }));
      case 'state':
        return STATES.map((s) => ({
          key: s,
          label: s,
        }));
      case 'district':
        return (state ? districtsOf(state) : []).map((d) => ({
          key: d,
          label: d,
        }));
      default:
        return [];
    }
  }, [activeModal, state]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return currentOptions;
    const query = search.toLowerCase();
    return currentOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.key.toLowerCase().includes(query),
    );
  }, [currentOptions, search]);

  const currentSelectedKey = useMemo(() => {
    switch (activeModal) {
      case 'language':
        return language;
      case 'state':
        return state;
      case 'district':
        return district;
      default:
        return '';
    }
  }, [activeModal, language, state, district]);

  const handleCloseModal = () => {
    setActiveModal(null);
    setSearch('');
  };

  const handleSelectItem = (key: string) => {
    if (activeModal === 'language') {
      setLanguage(key);
    } else if (activeModal === 'state') {
      setState(key);
      setDistrict(''); // Changing state clears previously selected district
    } else if (activeModal === 'district') {
      setDistrict(key);
    }
    handleCloseModal();
  };

  const handleContinue = () => {
    router.push('/(auth)/onboarding');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthHeader title={STRINGS.header} fallbackRoute="/(auth)/otp" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formSection}>
          {/* Name Field */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>{STRINGS.nameLabel}</AppText>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.namePlaceholder}
              placeholderTextColor={AUTH_COLORS.placeholder}
              value={name}
              onChangeText={setName}
            />
            <View style={styles.underline} />
          </View>

          {/* State Field */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>{STRINGS.stateLabel}</AppText>
            <Pressable
              onPress={() => setActiveModal('state')}
              style={styles.pickerTrigger}
            >
              <AppText
                style={[styles.pickerText, !state && styles.placeholderText]}
              >
                {state || STRINGS.statePlaceholder}
              </AppText>
              <AppIcon name="chevronDown" size="sm" color={COLORS.text.muted} />
            </Pressable>
            <View style={styles.underline} />
          </View>

          {/* District Field */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>{STRINGS.districtLabel}</AppText>
            <Pressable
              onPress={() => state && setActiveModal('district')}
              style={styles.pickerTrigger}
              disabled={!state}
            >
              <AppText
                style={[styles.pickerText, !district && styles.placeholderText]}
              >
                {district ||
                  (state
                    ? STRINGS.districtPlaceholder
                    : STRINGS.districtLocked)}
              </AppText>
              <AppIcon name="chevronDown" size="sm" color={COLORS.text.muted} />
            </Pressable>
            <View style={styles.underline} />
          </View>

          {/* Language Selection */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>{STRINGS.languageLabel}</AppText>
            <Pressable
              onPress={() => setActiveModal('language')}
              style={styles.pickerTrigger}
            >
              <AppText style={styles.pickerText}>
                {selectedLanguageLabel}
              </AppText>
              <AppIcon name="chevronDown" size="sm" color={COLORS.text.muted} />
            </Pressable>
            <View style={styles.underline} />
          </View>
        </View>
      </ScrollView>

      {/* Continue Button: fixed near the bottom, as in Figma */}
      <View style={styles.bottomSection}>
        <PillButton
          label={AUTH_STRINGS.continue}
          arrowPosition="left"
          fullWidth={false}
          onPress={handleContinue}
          style={styles.button}
        />
      </View>

      {/* Selection Modal Bottom Sheet */}
      <Modal
        visible={activeModal !== null}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>{modalTitle}</AppText>
              <Pressable
                onPress={handleCloseModal}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Close ${modalTitle} selector`}
              >
                <AppIcon name="close" size="md" color={COLORS.text.primary} />
              </Pressable>
            </View>

            {currentOptions.length > 7 && (
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder={STRINGS.search}
                  placeholderTextColor={COLORS.text.muted}
                  value={search}
                  onChangeText={setSearch}
                  style={styles.searchInput}
                  autoCapitalize="none"
                />
              </View>
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.key}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = item.key === currentSelectedKey;
                return (
                  <Pressable
                    onPress={() => handleSelectItem(item.key)}
                    style={[
                      styles.selectionItem,
                      isSelected && styles.selectionItemSelected,
                    ]}
                  >
                    <AppText
                      style={[
                        styles.selectionItemText,
                        isSelected && styles.selectionItemSelectedText,
                      ]}
                    >
                      {item.label}
                    </AppText>
                    {isSelected && (
                      <AppIcon
                        name="check"
                        size="sm"
                        color={AUTH_COLORS.purple}
                      />
                    )}
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <AppText style={styles.emptyText}>{STRINGS.empty}</AppText>
              }
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Figma rhythm: label 143 → value 180 → line 205 → next label 221
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
    paddingBottom: SPACING.xxl,
  },
  formSection: {
    paddingTop: SPACING.xl,
  },
  fieldGroup: {
    width: 318,
    marginBottom: SPACING.lg,
  },
  label: {
    ...AUTH_TYPOGRAPHY.body,
    color: COLORS.text.black,
    marginBottom: 16.2,
  },
  input: {
    ...AUTH_TYPOGRAPHY.body,
    color: COLORS.text.black,
    paddingVertical: 0,
    paddingBottom: 4.2,
  },
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4.2,
  },
  pickerText: {
    ...AUTH_TYPOGRAPHY.body,
    color: COLORS.text.black,
  },
  placeholderText: {
    color: AUTH_COLORS.placeholder,
  },
  underline: {
    height: 1,
    backgroundColor: AUTH_COLORS.inputLine,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    // Figma: 44px from the frame bottom; iOS SafeAreaView already removes ~34px
    paddingBottom: Platform.OS === 'ios' ? 10 : 44,
  },
  button: {
    width: AUTH_LAYOUT.continueButtonWidth,
    height: AUTH_LAYOUT.buttonHeight,
    borderRadius: AUTH_LAYOUT.buttonRadius,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: '60%',
    paddingTop: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  modalTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.primary,
  },
  searchContainer: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  searchInput: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  selectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  selectionItemSelected: {
    backgroundColor: AUTH_COLORS.buttonFill,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  selectionItemText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  selectionItemSelectedText: {
    fontFamily: FONT_FAMILY.semiBold,
    color: AUTH_COLORS.purple,
  },
  emptyText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted,
    textAlign: 'center',
    paddingVertical: SPACING.xl,
  },
});
