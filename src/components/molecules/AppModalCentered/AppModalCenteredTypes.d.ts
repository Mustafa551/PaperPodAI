import type { Theme } from './ThemeTypes';
import type { Control } from 'react-hook-form';
import type { modalSchema } from 'src/schemas';
import type { z } from 'zod';

export interface IAppModalCenteredProps {
  cancelIcon?: boolean;
  icon?: React.ReactElement;
  onClose: () => void;
  visible: boolean;
  title?: string;
  description?: string;
  btn1Title?: string;
  onBtn1Press?: () => void;
  btn2Title?: string;
  onBtn2Press?: () => void;
}

export type modalInputForm = z.infer<ReturnType<typeof modalSchema>>;
