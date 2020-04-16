import React,{Component} from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import './Person.css';
import Aux from '../../../hoc/Auxillary';
import withClass from "../../../hoc/withClass";
import AuthContext from "../../../context/auth-context"

class Person extends Component{

    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();

    }

    static contextType = AuthContext;
    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log("Person.js in render");
       /* const style = {
            '@media (min-width:500px)':{
                width:'450px'
            }
        };*/
        return (
            <Aux>
                {this.context.authenticated? <p>Authenticated !</p>:<p>Please log in !</p>}
               {/* <AuthContext.Consumer>
                    {(context) => context.authenticated? <p>Authenticated !</p>:<p>Please log in !</p>}
                </AuthContext.Consumer>*/}
                <p onClick={this.props.click}>I am a {this.props.name} and I am {this.props.age}!</p>
                <p>{this.props.children}</p>
                <input type = "text"
                       ref = {this.inputElementRef}
                       onChange={this.props.changed}
                       value={this.props.name}/>

            </Aux>    );
    }

}
//Proptypes

Person.propTypes = {
    click:PropTypes.func,
    name:PropTypes.string,
    age:PropTypes.number,
    changed:PropTypes.func
};
// functional components
/*
const person = (props) => {
    const style = {
        '@media (min-width:500px)':{
           width:'450px'
        }
    }
    //added styling to the class
    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I am a {props.name} and I am {props.age}!</p>
            <p>{props.children}</p>
            <input type = "text" onChange={props.changed} value={props.name}/>
        </div>)
};
*/

export default withClass(Person, "Person");
