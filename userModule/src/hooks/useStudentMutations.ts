import { useState } from 'react';
import { Student } from '../types/student';
import { studentApi } from '../services/api';
import { getErrorMessage } from '../utils/errorHandling';

interface MutationState {
  loading: boolean;
  error: string | null;
}

export function useStudentMutations(id: string, onSuccess?: () => void) {
  const [mutationState, setMutationState] = useState<MutationState>({
    loading: false,
    error: null,
  });

  const handleMutation = async (operation: () => Promise<void>) => {
    try {
      setMutationState({ loading: true, error: null });
      await operation();
      onSuccess?.();
    } catch (error) {
      setMutationState({ loading: false, error: getErrorMessage(error) });
    } finally {
      setMutationState(prev => ({ ...prev, loading: false }));
    }
  };

  const updateStudent = async (updates: Partial<Student>) => {
    await handleMutation(async () => {
      await studentApi.updateStudent(id, updates);
    });
  };

  const deleteStudent = async () => {
    await handleMutation(async () => {
      await studentApi.deleteStudent(id);
    });
  };

  return {
    ...mutationState,
    updateStudent,
    deleteStudent,
  };
}