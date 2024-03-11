import { useMemo } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';

export const useValidGroup = (formNames: string[], watch: UseFormWatch<FieldValues>): boolean => {
	return useMemo(() => formNames.some((item) => Boolean(watch(item))), [formNames, watch]);
};
