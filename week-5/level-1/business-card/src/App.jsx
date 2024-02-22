import { useState, useRef } from 'react'
import './App.css'
import Card from './Components/Card';

function App() {
  const [businessInfo, setCount] = useState([
    {
      title:"ravinder",
      description:"Software engineer",
      interests:["bike rides","coding"],
      linkedIn:"www.bla.com",
      twitter:"www.bla2.com"
    }
  ])

  const bizform = useRef(null)

  let handleSubmit = (e) => {
    e.preventDefault();
    const form = bizform.current;
    console.log(`${form['hobbies'].value}`)
    let title = `${form['title'].value}`;
    let description = `${form['description'].value}`;
    let hobbies = `${form['hobbies'].value}`;
    let linkedIn = `${form['linkedin'].value}`;
    let twitter = `${form['twitter'].value}`;
    setCount([...businessInfo,
      {
        title:title,description,hobbies,linkedIn,twitter
      }
    ])
  }

  return (
    <>
    <form ref={bizform}>
      <button onClick={handleSubmit} id="add-button">Add Business card</button>
      <input name="title" type='text' placeholder='Title'/>
      <input name="description" type='text' placeholder='Description'/>
      <input name="hobbies" type='text' placeholder='Hobbies'/>
      <input name="linkedin" type='text' placeholder='LinkedIn profile'/>
      <input name="twitter" type='text' placeholder='Twitter profile'/>
    </form>
    <div id="App">
      {businessInfo.map(info => {
        return <Card 
                title = {info.title}
                description = {info.description}
                interests = {info.interests}
                linkedIn = {info.linkedIn}
                twitter = {info.twitter}
              />
      })}
    </div>
    </>
  )
}

export default App
