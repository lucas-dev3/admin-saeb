import React from "react";
import { File } from "./styles";
import { FileOutlined } from "@ant-design/icons";
interface FileTreeFileProps {
  name: string;
  className?: string;
  icon?: React.ReactNode;
  nameColor?: string;
}

const FileTreeFile: React.FC<FileTreeFileProps> = ({
  name,
  className,
  icon = <FileOutlined style={{ color: "#6a7282", fontSize: 14 }} />,
  nameColor = "#6a7282",
}) => {
  return (
    <File className={className}>
      <span style={{ marginRight: 6, fontSize: 18, lineHeight: 1 }}>
        {icon}
      </span>
      <span style={{ color: nameColor }}>{name}</span>
    </File>
  );
};

export { FileTreeFile };
