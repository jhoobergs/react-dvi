import * as React from 'react'
// import styles from './styles.module.css'
import { process, DviHTML } from './dvi'

export interface SrcType {
  type: 'src'
  src: string
}

export interface DataType {
  type: 'data'
  data: string
}

interface Props {
  dvi: SrcType | DataType
  onLoaded?: () => void
  display?: boolean
}

export const DviViewer = ({ dvi, onLoaded, display }: Props) => {
  const [data, setData] = React.useState<DviHTML>()
  const displayStyle: React.CSSProperties = {}
  if (display === false) {
    displayStyle.display = 'none'
  }

  React.useEffect(() => {
    if (dvi.type === 'src')
      process(dvi.src).then((r) => {
        setData(r)
        if (onLoaded) {
          onLoaded()
        }
      })
  }, [dvi])

  if (!data) {
    return <div style={displayStyle}>Loading...</div>
  } else {
    return (
      <div
        style={{
          ...displayStyle,
          position: 'relative',
          width: data.width,
          height: data.height
        }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    )
  }
}
