import { useState, type PropsWithChildren } from "react";
import type { OsintView, Permissive } from "omni-osint-crud-client";
import { EditingForm } from "./EditingForm";
import { StaticForm } from "./StaticForm";

interface Props extends PropsWithChildren {
  insight: OsintView;
  onSubmit?: (data: OsintView) => void;
  onUpdate?: (data: Partial<OsintView>) => void;
  onUpdatePermissive?: (data: Permissive) => void;
  onClose?: () => void;
  exitButton?: React.ReactNode;
}

export const InsightForm: React.FC<Props> = ({
  insight,
  onSubmit,
  onUpdate,
  onUpdatePermissive,
  onClose,
  exitButton,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(onSubmit !== undefined || false);

  if (onSubmit !== undefined && (onUpdate !== undefined || onUpdatePermissive !== undefined)) {
    throw new Error("onSubmit cannot be defined at the same time with onUpdate or onUpdatePermissive");
  }

  const handlClose = () => {
    if (onSubmit !== undefined) {
      setIsEditing(false);
    }
    onClose?.();
  };

  const handleDoubleClick = () => {
    if (onSubmit !== undefined) {
      setIsEditing(true);
    }
  };

  return isEditing ? (
    <EditingForm
      insight={insight}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onClose={handlClose}
    />
  ) : (
    <StaticForm
      insight={insight}
      onUpdate={onUpdatePermissive}
      onClose={handlClose}
      onDoubleClick={handleDoubleClick}
      exitButton={exitButton || <></>}
    >
      {children}
    </StaticForm>
  );
};
