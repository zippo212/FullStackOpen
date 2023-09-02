import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content 
        part1={{title:part1, exercises:exercises1}}
        part2={{title:part2, exercises:exercises2}} 
        part3={{title:part3, exercises:exercises3}}
      /> 
      <Total total={exercises1 + exercises2 + exercises3}/> 
    </>
  )
}

export default App