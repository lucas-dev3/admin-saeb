import React from 'react';
import { Root } from './styles';

interface FileTreeRootProps {
  children: React.ReactNode;
  className?: string;
}

const FileTreeRoot: React.FC<FileTreeRootProps> = ({ children, className }) => {
  return (
    <Root className={className}>
      {children}
    </Root>
  );
};

export { FileTreeRoot }; 