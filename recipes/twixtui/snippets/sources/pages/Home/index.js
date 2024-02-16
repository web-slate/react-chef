import React from 'react'
import { createRoot } from 'react-dom/client'
import '../../TwixtUI/react/dist/tailwind.css'

import App from './Home'

const container = document.getElementById('dist')
const root = createRoot(container)
root.render(<App />)
