import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [question, setQuestion] = useState("")

  const handleInput = event  => {
    setItem(event.target.value)
  }
  
  const handleSubmit = (event) => {
    const newQuestion = {
      "question": question
    }

    /*Her skal det skriver inn post til backend, helst med axios, hvor newQuestion sendes inn!*/
  }


  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('/api').then(res => setPeople(res.data));
  }, [])

  return (
  <div className="App">
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Question</label>
        <input
          type="text"
          name="question"
          value={question}
          onChange={handleInput}
        />
      </div>
      <div className="form-control">
        <label></label>
        <button type="submit">Send inn spørsmål</button>
      </div>
      <div>
        {people.map((p, index) => {
        return <p key={index}>{p.id} {p.name} {p.age}</p>
        })}
      </div>
    </form>
  </div>
);
}

export default App;
