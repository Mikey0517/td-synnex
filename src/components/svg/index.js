import { useEffect, useState } from 'react'
import './index.less'

export default function Svg (props) {
  const [ svg, setSvg ] = useState('')
  
  useEffect(() => {
    fetch(props.src)
    .then(data => {
      return data.text()
    })
    .then(data => {
      setSvg(data)
    })
  }, [])

  return (
    <span
      className='svg'
      style={{
        cursor: props.onClick ? 'pointer' : 'default'
      }}
      onClick={props.onClick}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}