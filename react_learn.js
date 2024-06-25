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

  /// h o o k s
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
