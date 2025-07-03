import type { Theme } from './ThemeTypes';
import type { Control } from 'react-hook-form';
import type { modalSchema } from 'src/schemas';
import type { z } from 'zod';

export interface IAppGradientModalProps {
  cancelIcon?: boolean;
  icon?: React.ReactElement;
  onClose: () => void;
  visible: boolean;
  title?: string;
  description?: string;
  btnTitle?: string;
  onBtnPress?: () => void;
  
}

