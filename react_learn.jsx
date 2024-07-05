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
/*This hook used when you want initialize a component before rendering  or change a component after rendering. 
All  functions (interval, timeout, fetch) that are calling inside a hook ,must be declared inside hook.You can only call it at the top level of your component or your
own Hooks. You can’t call it inside loops or conditions.*/

//for example
const [x, setx] = useState(0)
useEffect(()=>{  /*runs when a component had been added to the DOM*/
                  return ()=>{ /*optionally, runs when component is removed from the DOM*/ }
              },  [x]);

/*
The first argument - a function , that runs when we execute useEffect.Returns value (optional) it is a callback for cleaning 
when a component demounting.
When we want that this hook call once - when a component is rendering - the second parameter must be an empty array [].
To run a hook after rendering - insert names of variables into the array (second parameter).When any of variables has been changed-
 the hook runs (executes the first parameter). When we have a function that do anything inside hook - it must be declared inside. 
EXAMPLE - we fetching resource when a component mount , and update it using another state variable "flag" , that must be inserted (it`s name)
 as a second parameter.When "flag* has benn changed - the hook runs again. When the useState hook has been used  instead 
  the application will run as loop  - continuously fetch a data /

█░█ █▀ █▀▀   █▀█ █▀▀ █▀▀   █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   █▀▄ ██▄ █▀░   █▀█ █▄█ █▄█ █░█
/*

/*In vanilla JS for access to the element using document.querySelector() , getElementById(). In React for access to a 
DOM eleemnt  using  the useRef() hook. To do this: declare hook-variable, bind it to the DOM element (assign value to "ref"
 property. As a result - access to all the properties of a DOM element*/
/*----When you change the ref.current property, React does not re-render your component. 
React is not aware of when you change it because a ref is a plain JavaScript object*/

///---------declare a hook variable
   ///-----we have only ONE property in this variable-hook : "current"
   const inputEl = useRef(null);
   //button handler
   const chPlaceholder = ()=>{
      //assign to a placeholdre new value
      inputEl.current.placeholder=Date.now().toString()
      //read value:
      console.log(inputEl.current.value);
   }
 return (
    <div className='container'>
    {/*link our variable to the <input> using "ref" property  */}
    <input ref={inputEl} type="text" placeholder='dfhdrhh' />
      <button onClick={chPlaceholder}>Change placeholder</button>
     </div>
 )
/*


/*

█░█ █▀ █▀▀   █▀▀ █▀█ █▄░█ ▀█▀ █▀▀ ▀▄▀ ▀█▀   █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   █▄▄ █▄█ █░▀█ ░█░ ██▄ █░█ ░█░   █▀█ █▄█ █▄█ █░█

THis hook using to pass a context for example from main file to a component file.
It helps avoid passing data to a component  through parameters
*/
///--------in Main file: create context and export it
export const Mycontext =  createContext();

function App() {
  ///declare our variables
 const [state, setState] = useState(false)

   return (
     ///-----insert the provider and pass to it variables, that you want to provide
       <Mycontext.Provider value={[state,setState]}>
        <div className='container'>
           <Btn />
        </div>  
       </Mycontext.Provider >
   )
}


/////-------------------in a component:
///import context firstly:
import {Mycontext} from "./App"
import {useContext} from "react"

 function Btn(){
   ////----extract variables from context
       const [state, setState] = useContext(Mycontext);
   /////-------and use imported variable in a handler of a button:
    return (
    <>
       <button onClick={()=>setState(x=>Date.now())} className="btn btn-dark">GetMS</button>
       <h1>{state}</h1>
     </>
    )
 }
 export {Btn}
/*
█░█ █▀ █▀▀   █▀█ █▀▀ █▀▄ █░█ █▀▀ █▀▀ █▀█   █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   █▀▄ ██▄ █▄▀ █▄█ █▄▄ ██▄ █▀▄   █▀█ █▄█ █▄█ █░█

When you would have more that 1 state for stste variable - this hook using for it.
In case when there are several state variables, there also are many functoins
for each variable. It leads to complex code and "spread" logic.It is particularly useful 
for handling multiple related state variables and side effects, simplifying the
state management compared to multiple useState calls.
*/
 
import {  useReducer} from "react"
/*
Initial state after rendering  
 */

const initialState={
  count:0, time:false
}

/* This function make descision - what to to 
  in dependence of an event.Returns a new object.
  "state"-previous state. 
  "action"-type of event. */

function reducer(state, action) {
  switch(action.type){
    case "increment":
       return {...state, count: state.count+1}
    break;
    case "decrement":
       return {...state, count: state.count-1}
    break;
    case "zero":
       return {time:action.time ,count: 0}
    break;
    default:
       throw new Error("WRONG event!!!")
  }
}



 function Btn(){
  const [state, dispatch] = useReducer(reducer, initialState);
  /*---"state" is an object.It contains props ,
   that had been defined in  initialSate.  
   ---"dispatch" it is a setter,that set new state value.
   Te parameter  must be an object with "type" property */
    return (
      <>    
        <h2>{state.count}</h2>
        <h3>{state?.time}</h3>
        {/**ATTENTION! you MUST wrap a function calls to prevent
        infinite loop */}
         <button  onClick={()=>dispatch({type:"increment"})} className="btn btn-dark m-1">+</button>
         <button  onClick={()=>dispatch({type:"decrement"})} className="btn btn-dark m-1">-</button>
         {/*to pass any value to reducer(), use any property:*/}
         <button  onClick={()=>dispatch({type:"zero", time:Date.now()})} className="btn btn-dark m-1">x</button>
      </>
  
    )
 }
 export {Btn}

/*

█░█ █▀ █▀▀   █▀▄▀█ █▀▀ █▀▄▀█ █▀█   █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   █░▀░█ ██▄ █░▀░█ █▄█   █▀█ █▄█ █▄█ █░█
*/

/*
When you have some deep calculations in your program - it can leads to decrease performance - 
because these calculations usually runs n each rendering. The hook allows to run deep calculating 
 functions ONLY when the variable (that pass as the second parameter to the hook) has been changed.
 EXMAPLE
*/

import { useEffect, useState, useMemo } from "react";
         
  function MemoTutorial ({str="abcd"}) {
    
   //statve variables: for sorted string and color of a button
  const [sw, setSw] = useState(false);
  const [sorted, setSorted] = useState(0);

  console.log("Rendring...") 

  const sorting=(par)=>{
    //----a function with deep calculations
    console.log("DEEP calculations...")
    return    str.split("").sort().join("");
  }

    /*----when "str" has been changed - this deep function will be running
     othervise not.*/
  const sortedStr= useMemo(()=>sorting(str),[str])

  return(
  <div className="d-flex flex-column">
    {/*we are changing background of a button after a push*/}
   <button onClick={ ()=>setSw(!sw) } className={sw ? "btn btn-success" : "btn btn-dark"}>Update</button>
    <h4>{ sortedStr}</h4>
  </div>
  )
}

export {MemoTutorial}

/*
 
█▀█ █▀▀ ▄▀█ █▀▀ ▀█▀   █▀▄▀█ █▀▀ █▀▄▀█ █▀█
█▀▄ ██▄ █▀█ █▄▄ ░█░   █░▀░█ ██▄ █░▀░█ █▄█   
*/

    /*This hook using for child components: because in React when anything
    in a parent component has been changed -  child components re-rendering
     automatically.To improve performance and avoid useless re-rendering
     React.memo hook has been built*/

 const Child = React.memo( ()=>{
   ///chis component will be re-rendering only when something changed inside:
      const [time, setTime] = useState(new Date().toLocaleTimeString());
    console.log(`rendered ${Date.now()}`)
      return (
      <div className="container d-flex flex-column">
        <button onClick={()=>{setTime(new Date().toLocaleTimeString())}} 
            className='btn btn-dark'>Time now..
        </button>
        <h2>{time}</h2>
      </div>
      )
    }  );
 
 
function App() {
const [state, setState] = useState(false)
 return (
  <div className='container d-flex flex-column'>
    <button onClick={()=>setState((x)=>!x)} className={state ? "btn btn-danger":"btn btn-success"}>Change color </button>
    <Child/>
  </div>
 )

}
 

/*
    
█░█ █▀ █▀▀   █▀▀ ▄▀█ █░░ █░░ █▄▄ ▄▀█ █▀▀ █▄▀   █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   █▄▄ █▀█ █▄▄ █▄▄ █▄█ █▀█ █▄▄ █░█   █▀█ █▄█ █▄█ █░█
    */   


    /*When we have a child component and a function-callback , that we
    pass to the child component, this function re-rendering when a 
    component re-rendering.But usual a function body the same.To avoid 
    re-building the function we using the useCallback() hook */

  
const Child = ({ cbk }) => {
  console.log("Child Rendered", Date.now());
  return (
    <div>
      {/*we call a passed callback*/}
      <button onClick={() => cbk()} className='btn btn-dark'>
        push!
      </button>
    </div>
  );
});
 
 
 
function App() {
 
const [state, setState] = useState(false)

///create cached function for next renderings - to avoid re-rendering it
 const cachedCangeState  = useCallback(()=>setState(old=>!old),[])
   
 return (
  <div className='container d-flex flex-column'>
   <Child cbk={ cachedCangeState }/>
   <h2 className={state ? "text-success" : "text-danger"}>Some test</h2>
  </div>
 )

}

/*

█░█ █▀ █▀▀   █░░ ▄▀█ █▄█ █▀█ █░█ ▀█▀   █▀▀ █▀▀ █▀▀ █▀▀ █▀▀ ▀█▀   █░█ █▀█ █▀█ █▄▀
█▄█ ▄█ ██▄   █▄▄ █▀█ ░█░ █▄█ █▄█ ░█░   ██▄ █▀░ █▀░ ██▄ █▄▄ ░█░   █▀█ █▄█ █▄█ █░█
*/

/*In contrast to useEffect() that runs  asynchronously  , useLayoutEffect runs immediately , before React updates the DOM*/

const CatFact = ()=>{
  const [trig, setTrig] = useState(false);
  const [data, setData] = useState(false);
  useEffect(()=>{
     ///----declare a function inside - to run corectly
      const getResource = async ()=>{
                              const y = await fetch("https://catfact.ninja/fact").then(data=>data.json())
                              setData(y); 
                            }
    //---call the one
      getResource();
  }, [trig])
  
  useLayoutEffect(()=>{
      document.title = data ? "Uploaded" :"Empty"
  }, [data])

  return(
    <div className="d-flex flex-column">
     <button className="btn btn-dark" onClick={()=>{
          setTrig(x=>!x);
      }}>Push</button>
     <h2>{data?.fact}</h2>
    </div>
  )

 }
 
 
function App() {
const [state, setState] = useState(false)
   
 return (
  <div className='container d-flex flex-column'>
  <CatFact />
  </div>
 )

}
 
 
    
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
///   https://tanstack.com/query/latest/docs/framework/react/quick-start
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
    /*
    
█▀█ █▀▀ ▄▀█ █▀▀ ▀█▀ ▄▄ █░█ █▀█ █▀█ █▄▀ ▄▄ █▀▀ █▀█ █▀█ █▀▄▀█       █▄█ █░█ █▀█
█▀▄ ██▄ █▀█ █▄▄ ░█░ ░░ █▀█ █▄█ █▄█ █░█ ░░ █▀░ █▄█ █▀▄ █░▀░█       ░█░ █▄█ █▀▀

npm install react-hook-form  yup  @hookform/resolvers
    */

/*To validate form info. 'react-hook-form' for validation
'yup' for validation schema create,
'@hookform/resolvers' to resolve validation
 Example of a component-form:*/

import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'

const MyForm = () =>{

///-------------the schema for validation
   const schema =yup.object().shape({
    fullName: yup.string().required("Your name is required!"),
     ///---you write directly type of data, error message
    email:yup.string().email().required("Your mail must be correct!"),
    age: yup.number().positive().integer().min(18).required("Your age must be greater that 18"),
    password: yup.string().min(4).max(20).required('Password required'),
     ///condition - both passwords must be match
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must be match!").required(),
   })

     const {register, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(schema)
   });

   const onSubmit =(data)=>{
    console.log(data)
   }
    return (  
    <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        ///-----register each input
        <input type="text" placeholder='full  name..' {...register("fullName")}/>
        ///-------when error exists - show it
            <p>{errors.fullName?.message}</p>
        <input type="text" placeholder='email..' {...register("email")} />
            <p>{errors.email?.message}</p>
        <input type="number" placeholder='age...'  {...register("age")} />
            <p>{errors.age?.message}</p>
        <input type="password" placeholder='password' {...register("password")}/>
            <p>{errors.password?.message}</p>
         <input type="password" placeholder="confirm pwd"  {...register("confirmPassword")}/>
            <p>{errors.confirmPassword?.message}</p>
        <input type="submit" placeholder="confirm pwd"/>
    </form>
    ) 
}



export {MyForm}
 
