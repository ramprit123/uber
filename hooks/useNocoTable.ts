// hooks/useNocoTable.ts
import { useQuery, useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { nocodbFetch } from '~/lib/nocodbClient';

type QueryParams = Record<string, string | number | boolean | undefined>;

function buildQuery(params: QueryParams) {
  return new URLSearchParams(params as Record<string, string>).toString();
}

// Regular paginated query
export function useNocoTable<T>(
  project: string,
  table: string,
  params: QueryParams = {},
  options?: UseQueryOptions<T[]>
) {
  return useQuery<T[]>({
    queryKey: [project, table, params],
    queryFn: async () => {
      const query = buildQuery(params);
      const data = await nocodbFetch(`/db/data/v1/${project}/${table}?${query}`);
      return data.list as T[];
    },
    ...options,
  });
}

// Infinite query for infinite scroll
export function useNocoTableInfinite<T>(
  project: string,
  table: string,
  pageSize = 10,
  extraParams: QueryParams = {}
) {
  return useInfiniteQuery({
    queryKey: [project, table, 'infinite', extraParams],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lp = lastPage as { page: number; pageSize: number; totalCount: number };
      const hasMore = lp.page * lp.pageSize < lp.totalCount;
      return hasMore ? allPages.length + 1 : undefined;
    },
    queryFn: async ({ pageParam = 1 }) => {
      const query = buildQuery({ page: pageParam, limit: pageSize, ...extraParams });
      const data = await nocodbFetch(`/db/data/v1/${project}/${table}?${query}`);
      return {
        ...data,
        page: pageParam,
      };
    },
  });
}
