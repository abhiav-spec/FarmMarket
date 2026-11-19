import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LANGUAGES } from '../../data/languages';
import { Dropdown } from './StateDistrictPicker';

export type LanguagePickerProps = {
  value?: string;
  onSelect?: (languageKey: string) => void;
  error?: string;
  disabled?: boolean;
};

export function LanguagePicker({
  value = 'english',
  onSelect,
  error,
  disabled = false,
}: LanguagePickerProps) {
  const languageOptions = LANGUAGES.map((lang) => ({
    label: lang.name,
    value: lang.key,
  }));

  return (
    <View style={styles.wrapper}>
      <Dropdown
        label="Language"
        placeholder="Select language"
        value={value}
        options={languageOptions}
        onSelect={(selectedKey) => onSelect?.(selectedKey)}
        error={error}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});

export default LanguagePicker;
