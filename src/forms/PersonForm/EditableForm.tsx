import { useState, type PropsWithChildren, type CSSProperties } from "react";
import type { Person, Permissive } from "omni-osint-crud-client";
import { EditingForm } from "./EditingForm";
import { StaticForm } from "./StaticForm";

interface Props extends PropsWithChildren {
  person: Person;
  onSubmit?: (data: Person) => void;
  onUpdate?: (data: Partial<Person>) => void;
  onUpdatePermissive?: (data: Permissive) => void;
  onClose?: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
}

export const PersonForm: React.FC<Props> = ({
  person,
  onSubmit,
  onUpdate,
  onUpdatePermissive,
  onClose,
  exitButton,
  children,
  style,
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
      person={person}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onClose={handlClose}
      style={style}
    />
  ) : (
    <StaticForm
      person={person}
      onUpdate={onUpdatePermissive}
      onClose={handlClose}
      onDoubleClick={handleDoubleClick}
      exitButton={exitButton || <></>}
      style={style}
    >
      {children}
    </StaticForm>
  );
};
