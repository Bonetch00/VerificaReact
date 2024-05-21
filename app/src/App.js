
import './App.css';
import {useState,useEffect} from 'react';

function App() {

  const [mostraSignUp,setMostraSignUp]=useState(false);
  const [mostraLogin,setMostraLogin]=useState(false);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [risp,setRisp]=useState("");
  
  function gestisciUsername(e){
      setUsername(e.target.value);
  }
  function gestisciPassword(e){
      setPassword(e.target.value);
  }
  function gestisciEmail(e){
      setEmail(e.target.value);
  }

  async function inviaRegistrazione(){
      console.log(JSON.stringify({username:username,password:password,email:email}))
      const response= await fetch(`http://localhost:8080/signup`, 
      {  
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({username:username,password:password,email:email})
      });

      const json= await response.json();

      if(json.status===true){
        setRisp("Registrato con successo");
      }
      else{
        setRisp("username o mail già in uso");
      }
  }

  async function signIn(){
    const token = await fetch(`http://localhost:8080/login`, 
    {  
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({username:username,password:password})
    });

    const json= await token.json();

    console.log(json.token);

    const response= await fetch(`http://localhost:8080/user/${json.token}`,{method:"GET"});
    console.log(response)

    const user= await response.json();

    setRisp(
      `
      id:${user.id}
      username:${user.username}
      email:${user.email}
      token:${user.token}
      reg_date:${user.reg_date}
      `
    )


  }
  
  
  return (
    <div className='App'>
      
      { !mostraSignUp? 
        <>
        <button onClick={()=>setMostraSignUp(true)}>SignUp</button>
        </>
        
        :
        <>
          <label>Username:</label><input type="text" onChange={gestisciUsername}></input>
          <label>Password:</label><input type="password" onChange={gestisciPassword}></input>
          <label>email:</label><input type="email" onChange={gestisciEmail}></input><br></br>
          <button onClick={inviaRegistrazione}>Invia</button>
          <button onClick={()=>setMostraSignUp(false)}>Annulla Registrazione</button><br></br>
        </>
      }
      <hr></hr>
      { !mostraLogin?
        <>
        <button onClick={()=>setMostraLogin(true)}>Login</button>
        </>
      :
        <>
        <label>Username:</label><input type="text" onChange={gestisciUsername}></input>
        <label>Password:</label><input type="password" onChange={gestisciPassword}></input><br></br>
        <button onClick={signIn}>signIn</button>
        <button onClick={()=>setMostraLogin(false)}>Annulla</button><br></br>
        </>
      }
      {
        risp!== null &&
        <>
        <p>{risp}</p>
        </>
      }


    </div>

  );
}

export default App;
