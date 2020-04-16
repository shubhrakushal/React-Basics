import React,{Component} from 'react';
import Person from "./Person/Person";


class Persons extends Component{

    static getDerivedStateFromProps(props,state){
        console.log("persons.js in getDerivedStateFromProps");
        return state;
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log( " persons.js in shouldComponentUpdate");
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log( " persons.js in getSnapshotBeforeUpdate");
        return null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log( " persons.js in componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("persons.js component will unmount");
    }

    render() {
        console.log("Persons.js in render");
        return this.props.persons.map((person,index) =>{
            return <Person
                click ={() => this.props.clicked(index)}
                name ={person.name}
                age = {person.age}
                key = {person.id}
                changed = {(event) => this.props.changed(event,person.id)}
            />
        });
    }
}
/*const persons =(props) => props.persons.map((person,index) =>{
        return <Person
            click ={() => props.clicked(index)}
            name ={person.name}
            age = {person.age}
            key = {person.id}
            changed = {(event) => props.changed(event,person.id)}
        />
    });*/

export default Persons;
