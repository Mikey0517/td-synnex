import { useEffect } from 'react'

export default function Redirect({ to }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return null;
}