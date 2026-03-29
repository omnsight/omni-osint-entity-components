import { useState, type PropsWithChildren, type CSSProperties } from "react";
import type { Organization, Permissive } from "omni-osint-crud-client";
import { EditingForm } from "./EditingForm";
import { StaticForm } from "./StaticForm";

interface Props extends PropsWithChildren {
  organization: Organization;
  isAdmin?: boolean;
  onSubmit?: (data: Organization) => void;
  onUpdate?: (data: Partial<Organization>) => void;
  onUpdatePermissive?: (data: Permissive) => void;
  onClose?: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
}

export const OrganizationForm: React.FC<Props> = ({
  organization,
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
      organization={organization}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onClose={handlClose}
      style={style}
    />
  ) : (
    <StaticForm
      organization={organization}
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
