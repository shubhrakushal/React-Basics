import React from 'react'

// higher order function
const withClass = (WrappedComponent, className) => {
    // ...props will spread the props and add it into the component
    return props =>(
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
};

export default withClass;
