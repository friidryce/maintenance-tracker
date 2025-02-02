import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  const login = async (employeeId: string) => {
    if (employeeId.trim()) {
      // TODO: Use API call in the future
      document.cookie = 'isLoggedIn=true; path=/';
      document.cookie = `employeeId=${employeeId}; path=/`;
      router.push('/');
      router.refresh();
    }
  };

  return { login };
} 