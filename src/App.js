import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import logo from './nor_logo.png';
import { Button } from "@navikt/ds-react";
import Chatting from './Chat';


function PasswordPage({ children }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  function handleSubmitPassword(event) {
    event.preventDefault();
    event.preventDefault();
    const pass = {
      password: password
    }

    axios.post('/password', pass)
    .then(res => {
      const acceptPassword = res.data;
      setAuthenticated(acceptPassword);
      if (!acceptPassword){
        alert("Du må nok prøve igen!")
      } else {
        alert("Du er flink med passord og sånn.")
      }
    })
    .catch(err => console.error(err)); // handle any errors
  }

  if (authenticated) {
    return children;
  } else {
    return (
      <form onSubmit={handleSubmitPassword}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Enter</button>
      </form>
    );
  }
}
function App() {

  const [question, setQuestion] = useState("")
  const [history, setHistory] = useState([]);
  const [handlingInput, setHandlingInput] = useState(false);

  const handleInput = event  => {
    setQuestion(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataQ = {
      question: question,
      history: history
    }
    setQuestion("")
    setHandlingInput(true)
    axios.post('/question', dataQ)
    .then(res => {
      const newAnswer = res.data;
      setHistory([...history, {question, answer:newAnswer}]);
      setHandlingInput(false)
    })
    .catch(err => console.error(err)); // handle any errors
  }

  return (
  <PasswordPage>
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Velkommen til Norconsults egne GPT for personalhåndboka.
      </p>
      <a
        className='App-link'
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
        {handlingInput&&<Button loading>Tenker...</Button>}
        {!handlingInput&&<Button type="submit" class="button-arounder">Send inn spørsmål</Button>}
      </div>
      
    </form>
    <div className='ChatDiv'>
      <Chatting history={history}></Chatting>
    </div>
    </header>
  </div>
  </PasswordPage>
);
}

export default App;
