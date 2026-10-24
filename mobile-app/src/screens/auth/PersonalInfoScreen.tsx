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
import { LANGUAGES } from '@/data/languages';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SIZES, SPACING } from '@/theme';

type ModalType = 'language' | 'state' | 'district' | null;

export function PersonalInfoScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [language, setLanguage] = useState('english');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [search, setSearch] = useState('');

  // Location string in format: `${district}, ${state}`
  const location = district && state ? `${district}, ${state}` : '';

  const selectedLanguageLabel =
    LANGUAGES.find((lang) => lang.key === language)?.name || 'English';

  const modalTitle = useMemo(() => {
    switch (activeModal) {
      case 'language':
        return 'Select Language';
      case 'state':
        return 'Select State';
      case 'district':
        return 'Select District';
      default:
        return '';
    }
  }, [activeModal]);

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
        opt.key.toLowerCase().includes(query)
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
      <AuthHeader title="Personal Information" fallbackRoute="/(auth)/otp" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formSection}>
          {/* Name Field */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>Name</AppText>
            <TextInput
              style={styles.input}
              placeholder="What should we call you?"
              placeholderTextColor={COLORS.text.muted}
              value={name}
              onChangeText={setName}
            />
            <View style={styles.underline} />
          </View>

          {/* State Field */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>State</AppText>
            <Pressable
              onPress={() => setActiveModal('state')}
              style={styles.pickerTrigger}
            >
              <AppText
                style={[
                  styles.pickerText,
                  !state && styles.placeholderText,
                ]}
              >
                {state || 'Select your state'}
              </AppText>
              <AppIcon name="chevronDown" size="sm" color={COLORS.text.muted} />
            </Pressable>
            <View style={styles.underline} />
          </View>

          {/* District Field */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>District</AppText>
            <Pressable
              onPress={() => state && setActiveModal('district')}
              style={styles.pickerTrigger}
              disabled={!state}
            >
              <AppText
                style={[
                  styles.pickerText,
                  !district && styles.placeholderText,
                ]}
              >
                {district || (state ? 'Select your district' : 'Select state first')}
              </AppText>
              <AppIcon name="chevronDown" size="sm" color={COLORS.text.muted} />
            </Pressable>
            <View style={styles.underline} />
          </View>

          {/* Language Selection */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.label}>Language</AppText>
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

        {/* Continue Button */}
        <View style={styles.bottomSection}>
          <PillButton
            label="Continue"
            arrowPosition="left"
            fullWidth={false}
            onPress={handleContinue}
            style={styles.button}
          />
        </View>
      </ScrollView>

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
                  placeholder="Search..."
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
                      <AppIcon name="check" size="sm" color="#7B4CE2" />
                    )}
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <AppText style={styles.emptyText}>No options found</AppText>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'space-between',
    paddingBottom: SPACING.xxl,
  },
  formSection: {
    paddingTop: SPACING.xl,
  },
  fieldGroup: {
    marginBottom: SPACING.xxl,
  },
  label: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  input: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    paddingVertical: SPACING.sm,
  },
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  pickerText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  placeholderText: {
    color: COLORS.text.muted,
  },
  underline: {
    height: 1.5,
    backgroundColor: COLORS.border,
  },
  bottomSection: {
    paddingTop: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: SIZES.continueButtonWidth,
    height: SIZES.authButtonHeight,
    borderRadius: SIZES.authButtonRadius,
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
    backgroundColor: 'rgba(219, 193, 254, 0.4)',
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
    color: '#7B4CE2',
  },
  emptyText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted,
    textAlign: 'center',
    paddingVertical: SPACING.xl,
  },
});
