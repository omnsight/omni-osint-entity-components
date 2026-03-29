import { useState, type PropsWithChildren, type CSSProperties } from "react";
import type { Relation, Permissive } from "omni-osint-crud-client";
import { EditingForm } from "./EditingForm";
import { StaticForm } from "./StaticForm";

interface Props extends PropsWithChildren {
  relation: Relation;
  isAdmin?: boolean;
  onSubmit?: (data: Relation) => void;
  onUpdate?: (data: Partial<Relation>) => void;
  onUpdatePermissive?: (data: Permissive) => void;
  onClose?: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
}

export const RelationForm: React.FC<Props> = ({
  relation,
  isAdmin = false,
  onSubmit,
  onUpdate,
  onUpdatePermissive,
  onClose,
  exitButton,
  children,
  style,
}) => {
  const [isEditing, setIsEditing] = useState(onSubmit !== undefined || false);

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
      relation={relation}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onClose={handlClose}
      style={style}
    />
  ) : (
    <StaticForm
      relation={relation}
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
