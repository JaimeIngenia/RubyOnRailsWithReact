import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { QuestionList } from './QuestionList'



class Welcome  extends React.Component{
  render () {


  return (
    <div className = "container">
      <h1>Welcome Jaimeee</h1>
      <p className='lead' > Esta es la primera lectura </p>
      <QuestionList/>
    </div>
  )
} }

const root = ReactDOM.createRoot(document.getElementById('welcome'))
root.render(
  <React.StrictMode>
    <Welcome/>
  </React.StrictMode>
)
// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(<Welcome />, document.getElementById('welcome'))
// })

export default Welcome
