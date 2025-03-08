import { useState, useEffect } from 'react';
import { TUser } from '../types/users.type';
import { users } from '../mocks/users';

interface FetchState {
  data: TUser[];
  isLoading: boolean;
  error: Error | null;
}

const useFetchUsers = (delay = 2000): FetchState => {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      try {
        await new Promise(resolve => setTimeout(resolve, delay));
        
        setState({
          data: users,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: [],
          isLoading: false,
          error: error instanceof Error ? error : new Error('Error desconocido al cargar usuarios'),
        });
      }
    };

    fetchUsers();
  }, [delay]);

  return state;
};

export default useFetchUsers;