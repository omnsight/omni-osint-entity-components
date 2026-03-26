import { Avatar, Tooltip } from '@mantine/core';
import { XMarkIcon } from '@heroicons/react/16/solid';

export const EmptyAvatar: React.FC = () => {
  return (
    <Tooltip key="notfound" label="X" withArrow>
      <Avatar size="md" radius="xl" color="gray" variant="light">
        <XMarkIcon />
      </Avatar>
    </Tooltip>
  );
};
