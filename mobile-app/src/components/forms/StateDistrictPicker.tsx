import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { districtsOf, STATES } from '../../data/geography';

export type DropdownOption = string | { label: string; value: string };

export type DropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  options: readonly DropdownOption[];
  onSelect: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export function Dropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  error,
  disabled = false,
}: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const query = search.toLowerCase();
    return options.filter((option) => {
      if (typeof option === 'string') {
        return option.toLowerCase().includes(query);
      }
      return (
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
      );
    });
  }, [options, search]);

  const close = () => {
    setVisible(false);
    setSearch('');
  };

  const pick = (val: string) => {
    onSelect(val);
    close();
  };

  const selectedOption = options.find((opt) =>
    typeof opt === 'string' ? opt === value : opt.value === value,
  );
  const displayValue = selectedOption
    ? typeof selectedOption === 'string'
      ? selectedOption
      : selectedOption.label
    : value || placeholder;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label} *</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.box,
          error && styles.boxError,
          disabled && styles.boxDisabled,
        ]}
        onPress={() => !disabled && setVisible(true)}
      >
        <Text
          numberOfLines={1}
          style={[styles.value, !value && styles.placeholder]}
        >
          {displayValue}
        </Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={close}
      >
        <Pressable style={styles.overlay} onPress={close}>
          <Pressable
            style={styles.sheet}
            onPress={(event: any) => event.stopPropagation?.()}
          >
            <View style={styles.header}>
              <Text style={styles.title}>{label}</Text>
              <TouchableOpacity onPress={close}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            {options.length > 7 && (
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#9CA3AF"
                value={search}
                onChangeText={setSearch}
                style={styles.search}
                autoCapitalize="none"
              />
            )}

            <FlatList
              data={filtered}
              keyExtractor={(item) =>
                typeof item === 'string' ? item : item.value
              }
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const itemLabel = typeof item === 'string' ? item : item.label;
                const itemValue = typeof item === 'string' ? item : item.value;
                const selected = itemValue === value;

                return (
                  <TouchableOpacity
                    style={[styles.row, selected && styles.rowSelected]}
                    onPress={() => pick(itemValue)}
                  >
                    <Text
                      style={[
                        styles.rowText,
                        selected && styles.rowTextSelected,
                      ]}
                    >
                      {itemLabel}
                    </Text>

                    {selected && <Text style={styles.check}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={styles.empty}>No options available</Text>
              }
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export type StateDistrictValue = {
  state: string;
  district: string;
  location: string;
};

export type StateDistrictPickerErrors = {
  state?: string;
  district?: string;
};

export type StateDistrictPickerProps = {
  state?: string;
  district?: string;
  initialState?: string;
  initialDistrict?: string;
  onChange?: (value: StateDistrictValue) => void;
  errors?: StateDistrictPickerErrors;
};

export function StateDistrictPicker({
  state: controlledState,
  district: controlledDistrict,
  initialState = '',
  initialDistrict = '',
  onChange,
  errors = {},
}: StateDistrictPickerProps) {
  const [internalState, setInternalState] = useState(initialState);
  const [internalDistrict, setInternalDistrict] = useState(initialDistrict);

  const state = controlledState !== undefined ? controlledState : internalState;
  const district =
    controlledDistrict !== undefined ? controlledDistrict : internalDistrict;

  const districtOptions = useMemo(
    () => (state ? districtsOf(state) : []),
    [state],
  );

  const report = (selectedState: string, selectedDistrict: string) => {
    onChange?.({
      state: selectedState,
      district: selectedDistrict,
      location:
        selectedDistrict && selectedState
          ? `${selectedDistrict}, ${selectedState}`
          : '',
    });
  };

  const handleState = (selectedState: string) => {
    setInternalState(selectedState);
    setInternalDistrict('');
    report(selectedState, '');
  };

  const handleDistrict = (selectedDistrict: string) => {
    setInternalDistrict(selectedDistrict);
    report(state, selectedDistrict);
  };

  return (
    <View style={styles.rowWrap}>
      <View style={styles.col}>
        <Dropdown
          label="State"
          placeholder="Select state"
          value={state}
          options={STATES}
          onSelect={handleState}
          error={errors.state}
        />
      </View>

      <View style={styles.col}>
        <Dropdown
          label="District"
          placeholder={state ? 'Select district' : 'Pick a state first'}
          value={district}
          options={districtOptions}
          onSelect={handleDistrict}
          error={errors.district}
          disabled={!state}
        />
      </View>
    </View>
  );
}

export default StateDistrictPicker;

export function validateLocation({
  state,
  district,
}: {
  state: string;
  district: string;
}) {
  const errors: StateDistrictPickerErrors = {};

  if (!state) errors.state = 'Please select a state';
  if (!district) errors.district = 'Please select a district';

  return errors;
}

const styles = StyleSheet.create({
  rowWrap: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
  wrapper: {
    marginVertical: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 4,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  boxError: {
    borderColor: '#DC2626',
  },
  boxDisabled: {
    backgroundColor: '#F9FAFB',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  placeholder: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  chevron: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  error: {
    fontSize: 11,
    color: '#DC2626',
    marginTop: 2,
    marginLeft: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  sheet: {
    width: '100%',
    maxWidth: 360,
    maxHeight: '75%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  close: {
    fontSize: 18,
    color: '#111827',
  },
  search: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    fontSize: 14,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  rowSelected: {
    backgroundColor: 'rgba(219, 193, 254, 0.4)',
  },
  rowText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  rowTextSelected: {
    color: '#7B4CE2',
    fontWeight: '600',
  },
  check: {
    fontSize: 16,
    color: '#7B4CE2',
  },
  empty: {
    padding: 24,
    textAlign: 'center',
    color: '#9CA3AF',
  },
});
