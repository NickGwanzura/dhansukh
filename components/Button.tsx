import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface ButtonProps {
  message?: string;
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({ 
  message, 
  label, 
  fullWidth = false, 
  onClick, 
  variant = 'primary',
  icon: Icon = MessageCircle
}) => {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-dark text-white hover:bg-black shadow-md hover:shadow-lg';
      case 'outline':
        return 'bg-white text-gray-dark border-2 border-gray-200 hover:border-gray-dark hover:bg-gray-50';
      case 'primary':
      default:
        return 'bg-brand text-white hover:bg-brand-hover shadow-lg hover:shadow-brand/30';
    }
  };

  const baseClasses = `
    group 
    ${fullWidth ? 'w-full' : ''} 
    ${getVariantClasses()}
    font-medium py-3.5 px-6 rounded-xl 
    transform transition-all duration-500 ease-spring
    hover:-translate-y-1 hover:scale-[1.03]
    active:scale-95 active:shadow-sm active:translate-y-0
    flex items-center justify-center gap-3
    cursor-pointer
    no-underline
  `;

  const iconClasses = `transition-transform duration-500 ease-spring ${variant === 'primary' ? 'group-hover:-rotate-12 group-hover:scale-110' : ''}`;

  // If a message is provided, render as an anchor tag for robust linking
  if (message && !onClick) {
    const encodedMessage = encodeURIComponent(message);
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        <Icon size={20} className={iconClasses} />
        <span className="tracking-wide text-base">{label}</span>
      </a>
    );
  }

  // Otherwise render as a standard button
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={baseClasses}
      type="button"
    >
      <Icon size={20} className={iconClasses} />
      <span className="tracking-wide text-base">{label}</span>
    </button>
  );
};

export default Button;