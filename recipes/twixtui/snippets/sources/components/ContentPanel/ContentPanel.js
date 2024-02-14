import React from 'react'
import { ContentPane } from 'TwixtUI/react'

export default function ContentPanel({ children }) {
  return (
    <ContentPane>
      {children}
    </ContentPane>
  );
}