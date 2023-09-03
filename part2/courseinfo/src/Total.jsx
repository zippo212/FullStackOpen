
const Total = ({content}) => {
  const total = content.reduce((total, current) => total + current.exercises,0);

  return (
    <h3>Total of {total} exercises</h3>
  )
}

export default Total