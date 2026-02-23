import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Transaction } from '../backend';

export function useProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      try {
        return await actor.getProfile();
      } catch (error) {
        // If user not found, register them
        if (error instanceof Error && error.message.includes('User not found')) {
          await actor.registerUser();
          return await actor.getProfile();
        }
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
  });
}

export function useTransactions() {
  const { actor, isFetching } = useActor();

  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getTransactions();
      } catch (error) {
        // If user not found, return empty array
        if (error instanceof Error && error.message.includes('User not found')) {
          return [];
        }
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCompleteTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.completeTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
