import Part from "./Part"

const Content = (props) => {
  return (
    <>
      <Part content={props.parts[0]}/>
      <Part content={props.parts[1]}/>
      <Part content={props.parts[2]}/>
    </>
  )
}

export default Content