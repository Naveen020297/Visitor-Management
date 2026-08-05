import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
}

interface UseUsersParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string;
}

interface UseUsersReturn {
  data: User[];
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSort: (sort: string) => void;
  setFilter: (filter: string) => void;
}

// Mock data
const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  name: `User ${i + 1}`,
  phone: `+1 234-567-${String(1000 + i + 1).slice(-4)}`,
  lastVisit: new Date(2024, 0, 1 + (i % 30)).toISOString().split('T')[0],
}));

// Mock API call
const fetchUsers = async (params: UseUsersParams): Promise<{ data: User[]; total: number }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filtered = mockUsers;
  if (params.filter) {
    const filterLower = params.filter.toLowerCase();
    filtered = mockUsers.filter(user =>
      user.name.toLowerCase().includes(filterLower) ||
      user.phone.includes(filterLower)
    );
  }

  let sorted = [...filtered];
  if (params.sort) {
    const sortField = params.sort.startsWith('-') ? params.sort.slice(1) : params.sort;
    const descending = params.sort.startsWith('-');
    sorted.sort((a, b) => {
      if (a[sortField as keyof User] < b[sortField as keyof User]) return descending ? 1 : -1;
      if (a[sortField as keyof User] > b[sortField as keyof User]) return descending ? -1 : 1;
      return 0;
    });
  }

  const page = params.page ?? 1;
  const size = params.size ?? 10;
  const start = (page - 1) * size;
  const paginated = sorted.slice(start, start + size);

  return {
    data: paginated,
    total: sorted.length,
  };
};

export function useUsers(initialParams: UseUsersParams = {}): UseUsersReturn {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPageState] = useState<number>(initialParams.page ?? 1);
  const [size, setSizeState] = useState<number>(initialParams.size ?? 10);
  const [sort, setSortState] = useState<string>(initialParams.sort ?? '');
  const [filter, setFilterState] = useState<string>(initialParams.filter ?? '');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchUsers({ page, size, sort, filter });
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, size, sort, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setPage = (newPage: number) => {
    setPageState(newPage);
  };

  const setSize = (newSize: number) => {
    setSizeState(newSize);
    setPageState(1); // Reset to first page when size changes
  };

  const setSort = (newSort: string) => {
    setSortState(newSort);
    setPageState(1); // Reset to first page when sort changes
  };

  const setFilter = (newFilter: string) => {
    setFilterState(newFilter);
    setPageState(1); // Reset to first page when filter changes
  };

  return {
    data,
    loading,
    error,
    setPage,
    setSize,
    setSort,
    setFilter,
  };
}
