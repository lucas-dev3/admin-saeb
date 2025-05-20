import React, { useState } from "react";
import { FolderContainer, FolderLabel, FolderChildren } from "./styles";
import { DeleteOutlined, EditOutlined, FileOutlined, FolderOutlined } from "@ant-design/icons";
import { FileTreeContextMenu, ContextMenuItem } from './FileTreeContextMenu';

interface FileTreeFolderProps {
  name: string;
  children?: React.ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
  folderIcon?: React.ReactNode;
  folderColor?: string;
  nameColor?: string;
}

const defaultOptions: ContextMenuItem[] = [
  { icon: <FolderOutlined />, name: 'Criar pasta', onClick: () => {} },
  { icon: <FileOutlined />, name: 'Criar arquivo', onClick: () => {} },
  { icon: <EditOutlined />, name: 'Renomear', onClick: () => {} },
  { icon: <DeleteOutlined />, name: 'Deletar', onClick: () => {} },
];

const FileTreeFolder: React.FC<FileTreeFolderProps> = ({
  name,
  children,
  className,
  defaultCollapsed = true,
  folderIcon = <FolderOutlined style={{ color: "#6a7282", fontSize: 16 }} />,
  folderColor = "#6a7282",
  nameColor = "#6a7282",
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  };

  const closeMenu = () => setMenu(null);

  return (
    <FolderContainer className={className}>
      <FolderLabel onClick={() => setCollapsed((c) => !c)} onContextMenu={handleContextMenu}>
        <span style={{ marginRight: 6, color: folderColor }}>{folderIcon}</span>
        <span style={{ color: nameColor }}>{name}</span>
      </FolderLabel>
      <FolderChildren collapsed={collapsed}>{children}</FolderChildren>
      {menu && (
        <FileTreeContextMenu
          x={menu.x}
          y={menu.y}
          options={defaultOptions}
          onClose={closeMenu}
        />
      )}
    </FolderContainer>
  );
};

export { FileTreeFolder };
