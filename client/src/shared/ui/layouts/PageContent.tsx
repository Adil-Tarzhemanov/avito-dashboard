import type { ReactNode } from 'react';
import clsx from 'clsx';

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

interface PageContentProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  paddingX?: string; // px-4, px-6, etc.
  paddingY?: string; // py-4, py-8, etc.
}

export const PageContent = ({
  children,
  className,
  maxWidth = 'sm',
  paddingX = 'px-4',
  paddingY = 'py-4',
}: PageContentProps) => {
  return (
    <div className={clsx('w-full mx-auto', maxWidthMap[maxWidth], paddingX, paddingY, className)}>
      {children}
    </div>
  );
};
