import React from 'react';
import { Avatar } from '@mantine/core';
import { EmptyAvatar } from '../EmptyAvatar';

interface Props {
  showEmptyAvatar?: boolean;
  children: React.ReactNode[];
}

export const AvatarSpan: React.FC<Props> = ({ showEmptyAvatar = true, children }) => {
  return (
    <Avatar.Group>
      {children.length === 0 && showEmptyAvatar ? <EmptyAvatar /> : children}
    </Avatar.Group>
  );
};
