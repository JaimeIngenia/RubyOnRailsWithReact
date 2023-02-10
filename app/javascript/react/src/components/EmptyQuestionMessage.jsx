import * as React from 'react'
import * as ReactDOM from 'react-dom'

const EmptyQuestionMessage = (props) => {
  return(
    <div>
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>OOPs!</strong> No questions found with the tag: {props.tagname}. Plese select another options form the list.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}
export default EmptyQuestionMessage;
