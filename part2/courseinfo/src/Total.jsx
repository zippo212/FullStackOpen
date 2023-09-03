
const Total = ({content}) => {
  let sum = 0
  for (let i=0; i < content.length; i++) {
    sum += content[i].exercises
  }

  return (
    <h3>Total of {sum} exercises</h3>
  )
}

export default Total