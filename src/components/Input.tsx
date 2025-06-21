import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  { 
    label, 
    error, 
    icon, 
    className = '', 
    fullWidth = true,
    ...props 
  }, 
  ref
) => {
  const inputClasses = `
    block px-4 py-2.5 w-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 
    rounded-lg border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    shadow-sm transition-colors duration-200
  `;

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`mb-4 ${widthClass} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`${inputClasses} ${icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;