import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import logo from './nor_logo.png';
import {ChatBubble, ChatContainer} from './ChatBubble';
import ai_face1 from './ai_face.jpg';
import ai_face2 from './ai_face2.jpg';


function App() {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")   
  const [history, setHistory] = useState([]);
  
  const handleInput = event  => {
    setQuestion(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataQ = {
      question: question
    }

    axios.post('/question', dataQ)
    .then(res => {
      const newAnswer = res.data;
      setAnswer(newAnswer); // set the answer based on the server's response
      setHistory([...history, {question, answer:newAnswer}]);
    })
    .catch(err => console.error(err)); // handle any errors
  }

  return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Velkommen til Norconsults egne GPT for personalhåndboka.
      </p>
      <a
        className="App-link"
        href="https://handbooks.simployer.com/nb-no/handbook/100640?sasid=d3e5400f-44fb-4e4d-94db-a65caadf25c1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Personalhåndboka
      </a>
      <form onSubmit={handleSubmit}>
      <br></br>
      <div>Still et spørsmål!</div>
      <div className="form-control">
        <input
          type="text"
          placeholder='Skriv inn spørsmålet ditt her...'
          name="question"
          value={question}
          onChange={handleInput}
          style={{width: "1000px", height: "80px", backgroundColor: "rgba(0,0,0,0)", color: "white", border: "0px", fontSize: "30px", outline: "none", textAlign: "center"}}
        />
      </div>
      <div className="buttons-container">
        <button type="submit" class="button-arounder">Send inn spørsmål</button>
      </div>
    </form>
    {/*<div style={{width: "800px"}}>
      {history.map((p, index) => {
        return <p key={index}>{p.question} : {p.answer}</p>
      })}
    </div>*/}
    <div style={{width: "1200px"}}>
      {history.reverse().map((p, index) => {
        return <div>
          <ChatContainer>
          <ChatBubble
            message={p.question}
            side="left"
            avatarUrl={ai_face2}
          />
          <ChatBubble
            message={p.answer}
            side="right"
            avatarUrl={ai_face1}
          />
          </ChatContainer>
        </div>
      })}
    </div>
    </header>
  </div>
);
}

export default App;
