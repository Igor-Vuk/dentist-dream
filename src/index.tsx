import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import "./style.css"

import Experience from "./Experience"

const rootElement = document.querySelector("#root")
if (!rootElement) {
  throw new Error("Root element not found")
}

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <StrictMode>
    <Experience />
  </StrictMode>,
)
