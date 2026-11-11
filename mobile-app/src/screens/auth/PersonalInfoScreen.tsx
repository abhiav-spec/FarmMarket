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
  FONT_FAMILY,
  FONT_SIZE,
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
  const [errors, setErrors] = useState({
    name: '',
    state: '',
    district: '',
  });
  const [missingFields, setMissingFields] = useState<string[]>([]);

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
      setDistrict('');
      setErrors((e) => ({ ...e, state: '' }));
    } else if (activeModal === 'district') {
      setDistrict(key);
      setErrors((e) => ({ ...e, district: '' }));
    }
    handleCloseModal();
  };

  const handleContinue = () => {
    const missing: string[] = [];
    const nextErrors = { name: '', state: '', district: '' };

    if (!name.trim()) {
      nextErrors.name = `${STRINGS.nameLabel} is required.`;
      missing.push(STRINGS.nameLabel);
    }
    if (!state) {
      nextErrors.state = `${STRINGS.stateLabel} is required.`;
      missing.push(STRINGS.stateLabel);
    }
    if (!district) {
      nextErrors.district = `${STRINGS.districtLabel} is required.`;
      missing.push(STRINGS.districtLabel);
    }

    if (missing.length > 0) {
      setErrors(nextErrors);
      setMissingFields(missing);
      return;
    }

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
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors((e) => ({ ...e, name: '' }));
              }}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              cursorColor={AUTH_COLORS.purple}
              selectionColor={AUTH_COLORS.purpleLight}
            />
          </FormField>
          {!!errors.name && (
            <AppText style={styles.errorText}>{errors.name}</AppText>
          )}

          <SelectField
            label={STRINGS.stateLabel}
            value={state}
            placeholder={STRINGS.statePlaceholder}
            onPress={() => setActiveModal('state')}
          />
          {!!errors.state && (
            <AppText style={styles.errorText}>{errors.state}</AppText>
          )}

          <SelectField
            label={STRINGS.districtLabel}
            value={district}
            placeholder={
              state ? STRINGS.districtPlaceholder : STRINGS.districtLocked
            }
            onPress={() => setActiveModal('district')}
            disabled={!state}
          />
          {!!errors.district && (
            <AppText style={styles.errorText}>{errors.district}</AppText>
          )}

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
          onPress={handleContinue}
          style={styles.button}
        />
      </View>

      {/* Validation error modal */}
      <Modal
        visible={missingFields.length > 0}
        transparent
        animationType="fade"
        onRequestClose={() => setMissingFields([])}
      >
        <View style={styles.validationOverlay}>
          <View style={styles.validationCard}>
            <AppText style={styles.validationTitle}>
              {STRINGS.validationAlertTitle}
            </AppText>

            {missingFields.map((field) => (
              <View key={field} style={styles.validationRow}>
                <AppText style={styles.validationBullet}>{'•'}</AppText>
                <AppText style={styles.validationItem}>{field}</AppText>
              </View>
            ))}

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={STRINGS.validationAlertButton}
              onPress={() => setMissingFields([])}
              style={({ pressed }) => [
                styles.validationButton,
                pressed && styles.validationButtonPressed,
              ]}
            >
              <AppText style={styles.validationButtonText}>
                {STRINGS.validationAlertButton}
              </AppText>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  errorText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.error,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.md,
  },
  validationOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  validationCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 2,
    borderColor: COLORS.purple,
    padding: SPACING.xl,
  },
  validationTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  validationBullet: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    lineHeight: FONT_SIZE.md * 1.5,
  },
  validationItem: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    flex: 1,
    lineHeight: FONT_SIZE.md * 1.5,
  },
  validationButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  validationButtonPressed: {
    opacity: UI.disabledOpacity,
  },
  validationButtonText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.inverse,
  },
});
