import React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import { QuestionDetail} from './QuestionDetail'
import EmptyQuestionMessage from './EmptyQuestionMessage'
import { Loader } from './Loader'
import ServerSideError from './ServerSideError'



export const QuestionList = () => {

  const questionsTags = [
    { label: 'All', value: 0    },
    { label: 'Ruby', value: 1    },
    { label: 'Rails', value: 2    },
    { label: 'Ejemplo', value: 3    },
  ]
  const questionsTags2 = [

    { label: 'Ruby', value: 'Ruby'    },
    { label: 'Rails', value:   'Rails'  },
    { label: 'Ejemplo', value: 'Ejemplo'   },
    { label: 'Data Structure', value: 'Data Structure'  }
  ]

  // const [title, setTitle] = useState('');
  // const [tag, setTag] = useState(questionsTags2[0].value);

  // const handleTitleChange = ( event) => {
  //   setTitle(event.target.value)
  // }

  // const handleTagChange = ( event) => {
  //   setTag(event.target.value)
  // }
  const [isServerSideError, setIsServerSideError] = useState(false)
  const [ serverErrors, setServerErrors] = ([])

  const [formField, setFormFiel] = useState({
    title: '',
    tag: questionsTags2[0].value
  })

  const handleQuestionSubmit = (event) =>{
    event.preventDefault();
    console.log(formField)
    createQuestion(formField)
  }

  const handleFormFields = (event) =>{
    setFormFiel({ ... formField, [event.target.name]: event.target.value})
  }

  const createQuestion = (data) => {
    fetch(`/api/v1/questions`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
    .then((response) => response.json())
    .then((data) =>  {
      console.log('Success:', data)
      if(data['status'] === "failure"){
        setIsServerSideError(true)
        setServerErrors(data['data'])
      } else {
        setIsServerSideError(false)
        setServerErrors([])
      }
    })
    .catch((error) => {
      console.log('Error:', error)
    })
  }


  const [ selectedOption, setSelectedOption] = useState(questionsTags[0].value)
  const [ isShowAlert, setIsShowAlert ] = useState(false)

  const [ isShowLoader, setIsShowLoader ] = useState(true)

  const [questionsList, setQuestionsList] = useState([])
  const questionsUrl = 'http://[::1]:3000/api/v1/questions'





  const fetchQuestionList = () => {
    setIsShowLoader(false)
    fetch(questionsUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setQuestionsList(data)
    })
  }

  useEffect(() => {
    fetchQuestionList()
  }, [])

  const updateSelectedItem = (event) => {
    setIsShowLoader(false)
    setIsShowAlert (false)
    setQuestionsList([])
    setSelectedOption(event.target.value)


    fetch(questionsUrl + `?tags=${questionsTags[event.target.value].label}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setQuestionsList(data)
      if(data.length == 0){
        setIsShowAlert(true)
        setIsShowLoader(true)
    }

    })
  }

  return (
    <div className = "row">
      <div className='col -lg-10 mx-auto'>



        <form onSubmit={handleQuestionSubmit}>
          <div className="form-group">
            {isServerSideError && < ServerSideError errors={serverErrors} /> }
            <label className='form-label mt-3 mb-3' for="exampleInputEmail1">Title</label>
            <input type="text" className="form-control form-control-lg rounded-0"  placeholder="Escribe" value={formField.title} onChange={event => handleFormFields(event) } name="title"></input>

          </div>
          <div className="form-group">
            <label className='form-label mt-3 mb-3' >Select the question tag</label>
            <select className="form-select form-select-lg form-select" onChange = {event => handleFormFields(event) } name="tag" value={formField.tag} >
            {questionsTags2.map(tag => (
              <option key={tag.value} value={tag.value}>{tag.label}</option>
            ))}

            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit Question</button>
        </form>


        <p className='lead fw-bold' >Filter Questions</p>
          <select className='form-select form-select-lg' value={
            selectedOption} onChange={event => updateSelectedItem(event)}>
              { questionsTags.map(tag =>(
                  <option key={tag.value} value={tag.value}>{tag.label}</option>
                ))}
            </select>
            { questionsList.length > 0 ?
                  questionsList.map((question) =>
                    <QuestionDetail  question={question} key={question.id}/>
                  ) :
                  <Loader isShowLoader={isShowLoader} />
                  }
                  {
                    isShowAlert && <EmptyQuestionMessage tagname={questionsTags[
                      selectedOption].label}/>
                  }
      </div>

    </div>
  )
}
