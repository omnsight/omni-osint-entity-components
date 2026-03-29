import { useState, type PropsWithChildren } from "react";
import type { MonitoringSource } from "omni-monitoring-client";
import { EditingForm } from "./EditingForm";
import { StaticForm } from "./StaticForm";

interface Props extends PropsWithChildren {
  source: MonitoringSource;
  onSubmit?: (data: MonitoringSource) => void;
  onUpdate?: (data: Partial<MonitoringSource>) => void;
  onClose?: () => void;
  exitButton?: React.ReactNode;
}

export const MonitoringSourceForm: React.FC<Props> = ({
  source,
  onSubmit,
  onUpdate,
  onClose,
  exitButton,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(onSubmit !== undefined || false);

  if (onSubmit !== undefined && (onUpdate !== undefined)) {
    throw new Error("onSubmit cannot be defined at the same time with onUpdate");
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
      source={source}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onClose={handlClose}
    />
  ) : (
    <StaticForm
      source={source}
      onClose={handlClose}
      onDoubleClick={handleDoubleClick}
      exitButton={exitButton || <></>}
    >
      {children}
    </StaticForm>
  );
};
