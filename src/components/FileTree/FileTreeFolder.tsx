import React, { useState } from "react";
import { FolderContainer, FolderLabel, FolderChildren } from "./styles";
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { FileTreeContextMenu, ContextMenuItem } from "./FileTreeContextMenu";

interface FileTreeFolderProps {
  name: string;
  children?: React.ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
  folderIcon?: React.ReactNode;
  folderColor?: string;
  nameColor?: string;
  onCreateSubject?: () => void;
  onEditSubject?: () => void;
  onDeleteSubject?: () => void;
  onCreateQuestion?: () => void;
  subjectData?: { id: string; name: string; description: string };
}

const FileTreeFolder: React.FC<FileTreeFolderProps> = ({
  name,
  children,
  className,
  defaultCollapsed = true,
  folderIcon = <FolderOutlined style={{ color: "#6a7282", fontSize: 16 }} />,
  folderColor = "#6a7282",
  nameColor = "#6a7282",
  onCreateSubject,
  onEditSubject,
  onDeleteSubject,
  onCreateQuestion,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  };

  const closeMenu = () => setMenu(null);

  const options: ContextMenuItem[] = [
    {
      icon: <FolderOutlined />,
      name: "Criar Pasta",
      onClick: onCreateSubject || (() => {}),
    },
    { icon: <FileOutlined />, name: "Criar Questão", onClick: onCreateQuestion || (() => {}) },
    {
      icon: <EditOutlined />,
      name: "Renomear",
      onClick: onEditSubject || (() => {}),
    },
    { icon: <DeleteOutlined />, name: "Deletar", onClick: onDeleteSubject || (() => {}) },
  ];

  return (
    <FolderContainer className={className}>
      <FolderLabel
        onClick={() => setCollapsed((c) => !c)}
        onContextMenu={handleContextMenu}
      >
        <span style={{ marginRight: 6, color: folderColor }}>{folderIcon}</span>
        <span style={{ color: nameColor }}>{name}</span>
      </FolderLabel>
      <FolderChildren collapsed={collapsed}>{children}</FolderChildren>
      {menu && (
        <FileTreeContextMenu
          x={menu.x}
          y={menu.y}
          options={options}
          onClose={closeMenu}
        />
      )}
    </FolderContainer>
  );
};

export { FileTreeFolder };
