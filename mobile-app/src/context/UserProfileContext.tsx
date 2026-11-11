import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_STORAGE_KEY = '@farmmarket/user-profile';

export type UserProfile = {
  name: string;
  phone: string;
  state: string;
  district: string;
  language: string;
};

type UserProfileContextType = {
  profile: UserProfile;
  isProfileLoaded: boolean;
  pendingPhone: string;
  setPendingPhone: (phone: string) => void;
  saveProfile: (updates: Partial<UserProfile>) => Promise<void>;
};

const INITIAL_PROFILE: UserProfile = {
  name: '',
  phone: '',
  state: '',
  district: '',
  language: 'English',
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined,
);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [pendingPhone, setPendingPhone] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

        if (storedProfile && isMounted) {
          const parsedProfile = JSON.parse(
            storedProfile,
          ) as Partial<UserProfile>;

          setProfile({
            ...INITIAL_PROFILE,
            ...parsedProfile,
          });
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
      } finally {
        if (isMounted) {
          setIsProfileLoaded(true);
        }
      }
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      const updatedProfile = {
        ...profile,
        ...updates,
      };

      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(updatedProfile),
      );

      setProfile(updatedProfile);
    },
    [profile],
  );

  const value = useMemo(
    () => ({
      profile,
      isProfileLoaded,
      pendingPhone,
      setPendingPhone,
      saveProfile,
    }),
    [profile, isProfileLoaded, pendingPhone, saveProfile],
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }

  return context;
}
