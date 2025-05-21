// hooks/useNocoMutations.ts
// https://chatgpt.com/share/682d5e99-4c3c-8009-92ac-ce52d9bb11a8
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nocodbFetch } from '~/lib/nocodbClient';

export function useNocoCreate<T>(project: string, table: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<T>) => {
      const res = await nocodbFetch(`/db/data/v1/${project}/${table}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [project, table] });
    },
  });
}

export function useNocoUpdate<T>(project: string, table: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: Partial<T> }) => {
      const res = await nocodbFetch(`/db/data/v1/${project}/${table}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [project, table] });
    },
  });
}

export function useNocoDelete(project: string, table: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const res = await nocodbFetch(`/db/data/v1/${project}/${table}/${id}`, {
        method: 'DELETE',
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [project, table] });
    },
  });
}
