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
useEffect(()=>{  /*runs when a component had been added*/
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

