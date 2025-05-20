import styled from 'styled-components';

export const Root = styled.div`
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  font-size: 15px;
  color: #e0e0e0;
  background: none;
`;

export const FolderContainer = styled.div<{ level?: number }>`
  margin-left: 16px;
`;

export const FolderLabel = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  color: #e0e0e0;
  padding: 2px 0;
`;

export const FolderChildren = styled.div<{ collapsed: boolean; level?: number }>`
  margin-left: 16px;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  max-height: ${({ collapsed }) => (collapsed ? '0' : '1000px')};
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  display: block;
`;

export const File = styled.div`
  margin-left: 16px;
  display: flex;
  align-items: center;
  color: #bdbdbd;
  padding: 2px 0;
  font-weight: 400;
  cursor: pointer;
`; 