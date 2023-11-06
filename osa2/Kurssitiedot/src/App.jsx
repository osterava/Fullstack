import React from 'react'
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]  
    return (
      <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
      </div>
        )
  }
  
    
const Course = (props) => {
  return(
    <div>
      <Header course={props.course.name} />
      <Content part ={props.course.parts}/>
      <Total total = {props.course.parts} /> 
    </div>
       )
}
  
  const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
    )
  }
  
  const Part = (props) => {
    return (
      props.part.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part part={props.part}/>
      </div>
    )
  }
  
  const Total = (parts) => {
    const total = parts.total.map(total => total.exercises).reduce((a,b) => a+b)
    return (
      <div>
        <p>
          <strong>Total of {total} exercises</strong>
        </p>
      </div>
    )
  }
  
  
  export default App  