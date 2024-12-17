import React from 'react';

interface LinkButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  primary?: boolean;
  color?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ icon, text, href, primary, color }) => {
  const buttonStyle = primary ? {
    backgroundColor: color,
    color: '#FFFFFF'
  } : {
    backgroundColor: '#FFFFFF',
    color: color || '#4A5568',
    border: '1px solid',
    borderColor: color || '#E2E8F0'
  };

  return (
    <a
      href={href}
      className="w-full flex items-center justify-center px-6 py-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-md"
      style={buttonStyle}
    >
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{text}</span>
    </a>
  );
};

export default LinkButton;