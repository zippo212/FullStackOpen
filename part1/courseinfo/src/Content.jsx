import Part from "./Part"

const Content = (props) => {
  return (
    <>
      <Part content={props.part1}/>
      <Part content={props.part2}/>
      <Part content={props.part3}/>
    </>
  )
}

export default Content