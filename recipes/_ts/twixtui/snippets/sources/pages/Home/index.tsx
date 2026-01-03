import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './Home'

const container = document.getElementById('test')
const root = createRoot(container)
root.render(<App />)
