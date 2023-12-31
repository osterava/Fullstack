import React from 'react'

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
    
    export default Course
    