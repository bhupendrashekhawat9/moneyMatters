import { ThemeType } from '@/constants/theme';
import { useCallback } from 'react';
import useTheme from './useTheme';

const useGenerateStyle = (providedStyle: (theme: ThemeType) => Record<string, any>) => {
    const { theme } = useTheme();
    const styles = useCallback(()=>providedStyle(theme), [providedStyle]);

  return styles();
}

export default useGenerateStyle
