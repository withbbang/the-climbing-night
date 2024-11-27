import React from 'react';

export const levelCellRenderer = (props: any) => (
  <div dangerouslySetInnerHTML={{ __html: props.value }} />
);
