import { ReactNode } from 'react'
import { ContentPane } from '@web-slate/twixt-ui-react'

type ContentPanelProps = {
  children: ReactNode
}

export default function ContentPanel({ children }: ContentPanelProps) {
  return (
    <ContentPane>
      {children}
    </ContentPane>
  )
}
