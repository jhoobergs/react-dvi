import React, { useState, useEffect, Fragment } from 'react'

import { DviViewer } from 'react-dvi'
import 'react-dvi/dist/index.css'

const ExerciseView = (props) => {
  const [dviLoaded, setDviLoaded] = useState(false)

  return (
    <Fragment>
    <DviViewer display={dviLoaded} dvi={props.dvi} onLoaded={() => setDviLoaded(true)} />
      {dviLoaded || <div style={{ width: '100%', height: 100, textAlign: 'center' }}><span>Loading exercise...</span></div>}
    </Fragment>
  )
}

const App = () => {
  return (
    <Fragment>
    <ExerciseView dvi={{ type: "src", src: "/ijkHWex1.dvi" }} />
    <ExerciseView dvi={{ type: "src", src: "/ijkHWex5.dvi" }} />
    <ExerciseView dvi={{ type: "src", src: "/ijkHWex13.dvi" }} />
    </Fragment>
  )
    
}

export default App
