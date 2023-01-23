import Home from "./pages/home/Home"
import './globalStyle.css'
import { fas} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)

function App() {
  return (
    <>
      <Home />
    </>
  )
}

export default App
