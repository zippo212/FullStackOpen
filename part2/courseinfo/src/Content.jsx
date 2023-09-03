import Part from "./Part"

const Content = ({content}) => {
  return (
    <div>
      {content.map(part => {
        return <Part key={part.id} content={part}/>
      })}
    </div>
  )
}

export default Content