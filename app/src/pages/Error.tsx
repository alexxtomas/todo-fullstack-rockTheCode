import { useRouteError } from 'react-router-dom'
interface IError {
  statusText?: string
  message?: string
}
export default function Error() {
  const error: any = useRouteError()
  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has ocurred</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  )
}
