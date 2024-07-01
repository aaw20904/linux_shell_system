/* React component names MUST always start with a capital letter, while HTML tags must be lowercase.
For example:*/

function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}
//The "export default" keywords specify the main component in the file
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
/*to generate React app don`t use "create-react-app" because it is deprecated**/
/**us VITE.JS tool**/
/***LISTS
When you generating content from an array- you must pass the "key" property inside 
each item-component: because React must know the order of your components in list 
**/
 let content = places.map((x)=><TravelCard tr={x} key={x.key} />)
//You musn`t assign each DOM element "key" property:   <section key="a">....</section>
 //You pass "key" when you render the component as a variable , NOT as a property

  /*
  
█░█ █▀ █▀▀   █▀ ▀█▀ ▄▀█ ▀█▀ █▀▀     █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   ▄█ ░█░ █▀█ ░█░ ██▄     █▀█ █▄█ █▄█ █░█
  */
/*The web app can have several states : for example: button has been pushed, http request is in process, http process finished, 
 , http fetching error,correct ansver, incorrect ansver. You must avoid redundancy in states.In according to each state we can
  have diferent content.So, we can use different rendering depends on state.To represent each 
  state React offers us  using the state variables. */
                          const [stateVar, stateVarSetter] = React.useState(INITIAL_VALUE);
/* when we want to change view - we use these state variables.When a state variable has been changed,
React see - which parts of the content must be re-rendering and change them, when it neccessary.
The DOM element rendering again*/
///Set a new value to the state variable:
stateVarSetter(NEW_VALUE);
///Set a new value to the state variable , but using old value
   stateVarStter(OLD_VALUE => OLD_VALUE+"helloWord");
/*In case of an Array, or Object, we MUST pass to the setter a new Array or Object,
because we can`t change sataeVariable directly (it must be immutable).
To renew object, use ... spread operator and re-define properties**/
  stateVarSetter({...stateVar,myProperty:"new_value"});

/*
█░█ █▀ █▀▀   █▀▀ █▀▀ █▀▀ █▀▀ █▀▀ ▀█▀     █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   ██▄ █▀░ █▀░ ██▄ █▄▄ ░█░     █▀█ █▄█ █▄█ █░█
*/
useEffect(setup, dependencies?) 
/* you can only call it at the top level of your component or your
own Hooks. You can’t call it inside loops or conditions.*/

//for example
const [x, setx] = useState(0)
useEffect(()=>{  /*runs when a component had been added to the DOM*/
                  return ()=>{ /*optionally, runs when component is removed from the DOM*/ }
              },  [x]);

//To run once , insert an empty array in "dependencies".There may be any state variables

/*

█▀█ █▀▀ ▄▀█ █▀▀ ▀█▀ ▄▄ █▀█ █▀█ █░█ ▀█▀ █▀▀ █▀█ ▄▄ █▀▄ █▀█ █▀▄▀█   █░░ █ █▄▄ █▀█ ▄▀█ █▀█ █▄█
█▀▄ ██▄ █▀█ █▄▄ ░█░ ░░ █▀▄ █▄█ █▄█ ░█░ ██▄ █▀▄ ░░ █▄▀ █▄█ █░▀░█   █▄▄ █ █▄█ █▀▄ █▀█ █▀▄ ░█░
*/

// It is SHORT, NOT FULLY description
/* 
This library allows to create routes inside your REACT project.For example , we need to create three routes :"/home","/menu","/contact".
 THe contact.jsx file:*/

 export const Contact =() =>{
    return <h1>Contact page</h1>
}
/*To create the Navigation panel - here are the "Link" or "NavLink" objects , that we must imported.Here is the <Navbar> component: */

import {NavLink} from "react-router-dom"

export const Navbar = () =>{
    return (
        <div className="d-flex flex-row justify-content-start align-items-center nav  p-0">
      /*When we are inside page with the same link - isActive is TRUE*/
            <NavLink  className={( {isActive} ) =>  isActive ? "ref-active p-2"  : "ref p-2"  } to="/">HOME </NavLink>
            <NavLink  className={( {isActive}  ) =>  isActive ? "ref-active p-2" : "ref p-2"  } to="/menu" isActive="text-danger">menu </NavLink>
            <NavLink className={( {isActive}  ) =>  isActive ? "ref-active p-2" : "ref p-2"  } to="/contact">contact </NavLink>
        </div>
    )
}

/*
To create three pages, we create three files "Home.jsx","Menu.jsx","Contact.jsx" where we creating apges and import them as Rect components.
After this , we insert exported components snside th structure in the Main file*/
  import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
   <Router>
      <div>
      <h5>navbar</h5>
        /*here is our navigation menu*/
      <Navbar />
      </div>
     <Routes>
       /*here are our routes*/
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<p>Page not found</p>}/>
     </Routes>
   </Router>


/*The navigation menu can be created by the "Link" or "NavLink" objects.
*/

/*

█▀▀ █▀█ █▄░█ ▀█▀ █▀▀ ▀▄▀ ▀█▀   ▄▀█ █▀█ █
█▄▄ █▄█ █░▀█ ░█░ ██▄ █░█ ░█░   █▀█ █▀▀ █
*/
/*Aloows us to pass context in other modules and components.So the variables 
can be avaliable outside in an another module without passing directly (as a parameter) like exchange.
It may be usefull in case of update/change state variables*/
//For example main file App.jsx:
 import { Home } from './Home'
 import { Profile } from './Profile'
 import { Contact } from './Contact'
 import {Navbar} from './Navbar'

import { useState,  createContext } from 'react'
  //creating global context
 export const AppContext = createContext();

function App() {
  //-----------create state variable
  const [username, setUsername] = useState("PedroTech");
 return ( 
  <div className='container d-flex flex-column'>
          //------begin area of exchange ---names of the variables, which must be stored into our context
        <AppContext.Provider value={{username, setUsername}}>
         <Router>
            <div>
            <h5>navbar</h5>
            <Navbar />
            </div>
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<p>Page not found</p>}/>
           </Routes>
         </Router>
          ///----end area of exchange 
       </AppContext.Provider>
       </div> 
       )
      }  

   ////----the component "Profile":

 
///useContext hook - to use context (imported) from another module 
 import { useContext } from "react"
///importing context from an another module
import { AppContext } from "./App"

export const Profile = (props) =>{
  ///extracting as a property and setter
    const {username, setUsername} = useContext(AppContext)
  const [newUserName, setNewUserName] = useState("");
    return(
        <div>
            <input onChange={(event)=>{
                  setNewUserName(event.target.value); }} />
           <button className="btn btn-dark mx-2" onClick={
                    ()=>{ setUsername(newUserName);
                     }}> Change user Name
           </button>
         
        </div>
       
    )

}
   /*
   
█▀█ █▀▀ ▄▀█ █▀▀ ▀█▀   █▀█ █░█ █▀▀ █▀█ █▄█   █░░ █ █▄▄
█▀▄ ██▄ █▀█ █▄▄ ░█░   ▀▀█ █▄█ ██▄ █▀▄ ░█░   █▄▄ █ █▄█
   */
//    npm i @tanstack/react-query
/*
THis library allows to fetching, re-fetching resources from the API or WEB.
*/

/*
The main App file where are inner components
*/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
//the cparameter in constructor is optionally 
const client = new QueryClient({
   defaultOptions:{
      queries:{  ///---------refresh when you change focus of pages in a browser
         refetchOnWindowFocus: false
      }
   }
});

return (
  ///--------create wrapper-providre and pass a client inside 
    <QueryClientProvider client={client}>
       <Test />
    </QueryClientProvider>
)



   /*************************The code of a component "Test"********************/
import {useQuery} from "@tanstack/react-query"
import Axios from "axios"

const Test =()=>{
    const {data,isFetched, refetch } = useQuery({
      queryKey: ["cat"], 
      queryFn: ()=>{
        return Axios.get("https://catfact.ninja/fact").then((res=>res.data))
    }, })

    return (
        <div>
          <h2>cat fact</h2>
          <p>{data?.fact}</p>
        <button onClick={refetch} className="btn btn-dark">Fetching again (update)</button>
        </div>
    )
}

export {Test}
    

