import React from 'react';
import { Portal } from '@gorhom/portal';
import type { PortalProps } from '@gorhom/portal/lib/typescript/components/portal/types';

import { useAppModal } from '@app/hooks';

type Props = {
  id: string;
} & PortalProps;

const AppModal = ({ id, ...rest }: Props) => {
  const optionsModal = useAppModal();

  if (optionsModal.currentOptionsId !== id) return null;
  return <Portal hostName="options" {...rest} />;
};

export default AppModal;
