import React from 'react';

const Version = () => {
  return (
    <div>
      Version: {process.env.VERSION}
    </div>
  );
};

export default Version;
