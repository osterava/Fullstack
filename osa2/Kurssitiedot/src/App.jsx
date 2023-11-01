import React from 'react'
const App = () => {

  const course ={
    name: 'Half Stack application development',
    parts : [
      {
        name:'Fundamentals of React',
        exercises: 10
      },
      {
        name:'Using props to pass data',
        exercises: 7
      },
      {
        name:'State of a component',
        exercises: 4
      }
    ]
  }   
    return (
      <div>
         <Course course={course} />
      </div>
        )
      }
const Course = (props) => {
  return(
    <div>
      <Header course={props.course.name} />
      <Content part ={props.course.parts}/>
      {/*<Total total = {props.course.parts} /> */}
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
      <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part part = {props.part[0].name} exercises = {props.part[0].exercises} />
        <Part part = {props.part[1].name} exercises = {props.part[1].exercises} />
        <Part part = {props.part[2].name} exercises = {props.part[2].exercises} />
      </div>
    )
  }
  
  const Total = (props) => {
    console.log(props)
    return (
      <div>
        <p>
          Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
        </p>
      </div>
    )
  }
  
  
  export default App  