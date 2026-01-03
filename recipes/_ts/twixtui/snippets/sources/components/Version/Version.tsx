import React from 'react';

const Version = (): JSX.Element => {
  return <div>Version: {process.env.VERSION}</div>;
};

export default Version;
