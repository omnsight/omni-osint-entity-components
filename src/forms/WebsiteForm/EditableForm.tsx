import { useState, type PropsWithChildren, type CSSProperties } from "react";
import type { Website, Permissive } from "omni-osint-crud-client";
import { EditingForm } from "./EditingForm";
import { StaticForm } from "./StaticForm";

interface Props extends PropsWithChildren {
  website: Website;
  isAdmin?: boolean;
  onSubmit?: (data: Website) => void;
  onUpdate?: (data: Partial<Website>) => void;
  onUpdatePermissive?: (data: Permissive) => void;
  onClose?: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
}

export const WebsiteForm: React.FC<Props> = ({
  website,
  isAdmin = false,
  onSubmit,
  onUpdate,
  onUpdatePermissive,
  onClose,
  exitButton,
  children,
  style,
}) => {
  const [isEditing, setIsEditing] = useState(onSubmit !== undefined);

  if (
    onSubmit !== undefined &&
    (onUpdate !== undefined || onUpdatePermissive !== undefined)
  ) {
    throw new Error(
      "onSubmit cannot be defined at the same time with onUpdate or onUpdatePermissive",
    );
  }

  const handlClose = () => {
    if (onUpdate !== undefined) {
      setIsEditing(false);
    }
    onClose?.();
  };

  const handleDoubleClick = () => {
    if (onUpdate !== undefined) {
      setIsEditing(true);
    }
  };

  return isEditing ? (
    <EditingForm
      website={website}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onClose={handlClose}
      style={style}
    />
  ) : (
    <StaticForm
      website={website}
      isAdmin={isAdmin}
      onUpdate={onUpdatePermissive}
      onClose={handlClose}
      onDoubleClick={handleDoubleClick}
      exitButton={exitButton || <></>}
      style={style}
      editModeEnabled={onUpdate !== undefined}
    >
      {children}
    </StaticForm>
  );
};
