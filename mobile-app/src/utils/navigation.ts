import { useRouter } from 'expo-router';

type Href = Parameters<ReturnType<typeof useRouter>['replace']>[0];

/** Returns a handler that goes back, or replaces with `fallback` when there is no history (e.g. deep link). */
export function useGoBack(fallback: Href) {
  const router = useRouter();
  return () => (router.canGoBack() ? router.back() : router.replace(fallback));
}
