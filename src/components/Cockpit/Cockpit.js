import React,{useEffect,useRef,useContext} from 'react';
import AuthContext from "../../context/auth-context"
const cockpit = (props) =>{

    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    //important
    useEffect(() =>{
        console.log("cockpit.js useeffect");
        //Http request

        toggleBtnRef.current.click();
        setTimeout(() =>{
            alert("saved data to cloud");
        },1000);
    },[]);

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
    let classes=[];
    if(props.showPersons){
        style.backgroundColor ='red';
        style[':hover'] ={
            backgroundColor:'salmon',
            color: 'black'
        };
    }
    if(props.persons.length <= 2){
        classes.push('red') // classes =['red']
    }
    if(props.persons.length <= 1){
        classes.push('italic') // classes =['red','italic']
    }
    return(
        <div>
        <h1 className={classes.join(' ')}> Hi, I am create app.</h1>
        <button style={style}
                onClick={props.clicked}
                ref={toggleBtnRef}>Toggle Persons</button>
          {/*  <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>Login</button>}
            </AuthContext.Consumer>*/}
            <button onClick={authContext.login}>Login</button>


        </div>
);
};

export default cockpit;
