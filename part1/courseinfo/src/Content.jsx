const Content = (props) => {
  return (
    <>
      <p>{props.part1.title} {props.part1.exercises}</p>
      <p>{props.part2.title} {props.part2.exercises}</p>
      <p>{props.part3.title} {props.part3.exercises}</p>
    </>
  )
}

export default Content