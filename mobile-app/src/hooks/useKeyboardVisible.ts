import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

/** True while the on-screen keyboard is open. */
export function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // iOS has "will" events, so the layout moves together with the keyboard
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => setVisible(true));
    const hideSub = Keyboard.addListener(hideEvent, () => setVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return visible;
}
