
const Persons = ({persons, handleClick}) => {
  return (
    <div>
      {persons.map(person => 
        <div key={person.name}>
          <span>{`${person.name} ${person.number} `}</span>
          <button onClick={() => handleClick(person.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons