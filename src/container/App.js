import React, { Component,Fragment } from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium'
import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from "../hoc/withClass";
import AuthContext from "../context/auth-context"

/*const App = props => {
    const [personState,setPersonState] =useState({
        persons:[
            {name:"Max",age:28},
            {name:"Manu",age:23}
            ],
        otherState:"some other value"
    });
    const switchNameHandler =()=>{
        setPersonState({
            persons: [
                {name:"Max",age:28},
                {name:"Manu",age:23}
            ]
        })
    }
    return (
        // this code is at the end complied into React.createElement()-> this is the code for react.
      <div className="App">
          <hi> Hi, I am create app.</hi>
          <button onClick={switchNameHandler}>Switch names</button>
          <Person name={personState.persons[0].name} age={personState.persons[0].age}/>
          <Person name={personState.persons[1].name} age={personState.persons[1].age}>My Hobby : Writing</Person>
      </div>
    );


   // hence the JSX code with the help of build tools is complied into React.createElement, hence React is the important
      // class to be added in the project.
   // return React.createElement('div',null,'h1','Hi, I am create app');


// To rectify the above return statement. here null place we could add appropriate css
//    return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I am create app'));
  // working with React.createElement is difficult all the time, hence we use the tag way to write the code.
}

export default App;*/
class App extends Component {


    // life cycle hooks for creation 1. constructor provided default by es6.
    constructor(props){
        super(props);
        console.log("App.js Constructor");
        this.state ={
            persons:[
                {id:'1',name:"Tom",age:28},
                {id:'2',name:"Manu",age:23}
            ],
            showPersons: false,
            authenticated:false
        };
    }
   /* state ={
        persons:[
            {id:'1',name:"Max",age:28},
            {id:'2',name:"Manu",age:23}
        ],
        showPersons: false
    };*/


   static getDerivedStateFromProps(props,state){
       console.log("App.js in getDerivedStateFromProps");
       return null;
   }

   /*componentWillMount() {
       console.log("App.js component will mount-> reparing your state just like getDerivedStateFromProps")
   }*/

   shouldComponentUpdate(nextProps, nextState, nextContext) {
       console.log("App.js in shouldComponentUpdate");
       return  true;
   }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("App.js in componentDidUpdate");
   }

    componentDidMount() {
       console.log("App.js in componentdidmount");
   }

    switchNameHandler = (newName) =>{
        this.setState({
            persons:[
                {name:newName,age:28},
                {name:"Manu",age:23}
            ]
        });
    }
    nameChangedHandler = (event,id) =>{
        const personIndex = this.state.persons.findIndex(
            p =>{
                return p.id === id;
            }
        );
        const person = {
            ...this.state.persons[personIndex]
        };

        //beneath its working like this
        // const person = Object.assign({},this.state.persons[personIndex]);

        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons:persons
        });
       /* this.setState({
            persons:[
                {name:"Shubhra",age:28},
                {name:event.target.value,age:23}
            ]
        });*/
    }

    togglePersonsHandler = () =>{
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    deletePersonHandler = (personIndex) =>{
        // this is a way to update our array in the immutable fashion.
        const persons = [...this.state.persons];
        persons.splice(personIndex,1);
        this.setState({persons:persons});
    }

    loginHandler =() =>{
       this.setState({authenticated:true});
    }
    render() {

       console.log("App.js in Render");
        //inline styling in code
        const style={
            backgroundColor:'green',
            color:'white',
            font:'inherit',
            border:'1px solid blue',
            padding:'8px',
            cursor:'pointer',
            ':hover':{
                backgroundColor:'lightgreen',
                color: 'black'
            }
        };
        //preffered waay to output conditional content
        let persons = null;

            /*persons =(
                <div>
                    <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                    <Person name={this.state.persons[1].name}
                            age={this.state.persons[1].age}
                            click={this.switchNameHandler.bind(this,"Shubhra!!!!")}
                            changed={this.nameChangedHandler}>My Hobby : Writing</Person>
                </div>
            );*/

            if(this.state.showPersons){
                persons =(
                    <div>
                        <Persons persons={this.state.persons}
                                 clicked={this.deletePersonHandler}
                                 changed={this.nameChangedHandler}/>
                        {


                            /*this.state.persons.map((person,index) =>{
                                return <Person
                                    click ={() => this.deletePersonHandler(index)}
                                    name ={person.name}
                                    age = {person.age}
                                    key = {person.id}
                                    changed = {(event) => this.nameChangedHandler(event,person.id)}
                                />
                            })*/
                        }
                    </div>
                );
            }
       // let classes =['red','italic'].join(' ');
        let classes=[];
        if(this.state.persons.length <= 2){
            classes.push('red') // classes =['red']
        }
        if(this.state.persons.length <= 1){
            classes.push('italic') // classes =['red','italic']
        }
        return (

            // As JSX is a javascript hence we could add javascript experssion while adding {} braces
            // conditional binding of the data of the array.
            <StyleRoot>
                <Fragment>
            {/*<div className="App">*/}
                {/*<h1 className={classes.join(' ')}> Hi, I am create app.</h1>
                <button style={style}
                        onClick={this.togglePersonsHandler}>Toggle Persons</button>
*/}
            <AuthContext.Provider value = {{authenticated: this.state.authenticated,login:this.loginHandler}}>
            <Cockpit
                showPersons={this.state.showPersons}
                persons={this.state.persons}
                clicked={this.togglePersonsHandler}/>
                {persons}
            </AuthContext.Provider>


                {/*  { this.state.showPersons?
                   <div>
                       <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                        <Person name={this.state.persons[1].name}
                        age={this.state.persons[1].age}
                        click={this.switchNameHandler.bind(this,"Shubhra!!!!")}
                        changed={this.nameChangedHandler}>My Hobby : Writing</Person>
                   </div>:null
               }*/}
            {/*</div>*/}
                </Fragment>
            </StyleRoot>

            //we could pass reference even as the props from parent to child.
            // 2 way data binding
            /*<div className="App">
                <h1> Hi, I am create app.</h1>
                <button style={style}
                        onClick={this.switchNameHandler.bind(this,"Shubhra Kushal")}>Switch names</button>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person name={this.state.persons[1].name}
                        age={this.state.persons[1].age}
                        click={this.switchNameHandler.bind(this,"Shubhra!!!!")}
                        changed={this.nameChangedHandler}>My Hobby : Writing</Person>
            </div>*/

           // using arrow functions in the switchevent handler, but it is not a optimized solution, so avoid it if possible.
            /*<div className="App">
            <hi> Hi, I am create app.</hi>
                <button onClick={()=>this.switchNameHandler("Shubhra Kushal")}>Switch names</button>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person name={this.state.persons[1].name}
                        age={this.state.persons[1].age}
                        click={this.switchNameHandler.bind(this,"Shubhra!!!!")}>My Hobby : Writing</Person>
            </div>*/


    // this code is at the end complied into React.createElement()-> this is the code for react.
            /*<div className="App">
                <hi> Hi, I am create app.</hi>
                <button onClick={this.switchNameHandler}>Switch names</button>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobby : Writing</Person>
            </div>*/
        );


        // hence the JSX code with the help of build tools is complied into React.createElement, hence React is the important
        // class to be added in the project.
        // return React.createElement('div',null,'h1','Hi, I am create app');


// To rectify the above return statement. here null place we could add appropriate css
//    return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I am create app'));
        // working with React.createElement is difficult all the time, hence we use the tag way to write the code.
    }
}

export default withClass(App,'App');
