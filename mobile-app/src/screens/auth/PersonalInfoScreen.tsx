import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { FormField, SelectField } from '@/components/auth/FormField';
import { PillButton } from '@/components/auth/PillButton';
import { STATES, districtsOf } from '@/data/geography';
import { AUTH_ROUTES, AUTH_STRINGS } from '@/constants/auth';
import { LANGUAGES } from '@/data/languages';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  RADIUS,
  SPACING,
  UI,
} from '@/theme';

const STRINGS = AUTH_STRINGS.personalInfo;

type ModalType = keyof typeof STRINGS.modalTitles | null;

export function PersonalInfoScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [language, setLanguage] = useState<string>(STRINGS.defaultLanguageKey);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
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

  // Every field must be filled before the user can continue
  const isValid =
    name.trim().length > 0 && Boolean(state) && Boolean(district) && Boolean(language);

  const handleContinue = () => {
    if (!isValid) return;
    router.push(AUTH_ROUTES.onboarding);
  };

  return (
    <View style={styles.screen}>
      <AuthHeader title={STRINGS.header} fallbackRoute={AUTH_ROUTES.otp} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formSection}>
          <FormField label={STRINGS.nameLabel} focused={nameFocused}>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.namePlaceholder}
              placeholderTextColor={AUTH_COLORS.placeholder}
              value={name}
              onChangeText={setName}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              cursorColor={AUTH_COLORS.purple}
              selectionColor={AUTH_COLORS.purpleLight}
            />
          </FormField>

          <SelectField
            label={STRINGS.stateLabel}
            value={state}
            placeholder={STRINGS.statePlaceholder}
            onPress={() => setActiveModal('state')}
          />

          <SelectField
            label={STRINGS.districtLabel}
            value={district}
            placeholder={
              state ? STRINGS.districtPlaceholder : STRINGS.districtLocked
            }
            onPress={() => setActiveModal('district')}
            disabled={!state}
          />

          <SelectField
            label={STRINGS.languageLabel}
            value={selectedLanguageLabel}
            placeholder={STRINGS.defaultLanguageName}
            onPress={() => setActiveModal('language')}
          />
        </View>
      </ScrollView>

      {/* Continue button, fixed near the bottom */}
      <View style={styles.bottomSection}>
        <PillButton
          label={AUTH_STRINGS.continue}
          arrowPosition="left"
          fullWidth={false}
          disabled={!isValid}
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
                hitSlop={UI.hitSlop}
                accessibilityRole="button"
                accessibilityLabel={STRINGS.closeSelector(modalTitle)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
    paddingBottom: SPACING.xxl,
  },
  formSection: {
    paddingTop: SPACING.xl,
  },
  input: {
    ...AUTH_TYPOGRAPHY.bodySmallMedium,
    height: '100%',
    color: COLORS.text.primary,
    padding: UI.zeroInset,
    borderWidth: UI.zeroInset,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as object,
    }),
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: AUTH_LAYOUT.bottomGap,
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
    maxHeight: AUTH_LAYOUT.sheetMaxHeight,
    paddingTop: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? AUTH_LAYOUT.sheetIosBottomInset : SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.md,
    borderBottomWidth: UI.borderWidth,
    borderBottomColor: COLORS.divider,
  },
  modalTitle: {
    ...AUTH_TYPOGRAPHY.sheetTitle,
    color: COLORS.text.primary,
  },
  searchContainer: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: UI.borderWidth,
    borderBottomColor: COLORS.divider,
  },
  searchInput: {
    ...AUTH_TYPOGRAPHY.option,
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
    borderBottomWidth: UI.borderWidth,
    borderBottomColor: COLORS.divider,
  },
  selectionItemSelected: {
    backgroundColor: AUTH_COLORS.buttonFill,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  selectionItemText: {
    ...AUTH_TYPOGRAPHY.option,
    color: COLORS.text.primary,
  },
  selectionItemSelectedText: {
    ...AUTH_TYPOGRAPHY.optionSelected,
    color: AUTH_COLORS.purple,
  },
  emptyText: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    textAlign: 'center',
    paddingVertical: SPACING.xl,
  },
});
