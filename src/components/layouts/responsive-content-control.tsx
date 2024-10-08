import React from 'react';
import { forwardRef } from 'react';
import { cn } from '../../helpers/utils';

export interface ResponsiveContentControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export const ResponsiveContentControl = forwardRef<
  HTMLDivElement,
  ResponsiveContentControlProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'responsive-content-control',
        'box-border mx-auto',
        'w-[900px] max-2xl:w-[800px] max-xl:w-[720px] max-lg:w-[640px] max-md:w-[560px] max-sm:w-[340px]',
        className,
      )}
      {...props}
    />
  );
});
