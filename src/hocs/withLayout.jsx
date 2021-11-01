import React from 'react';
import { Route} from 'react-router-dom';
const withLayout = WrappedComponent =>{
    return ({ component: Component, isPrivate, ...rest }) => {
        const content = (
            <Route
            {...rest}
            render={routeProps => (
              <WrappedComponent>
                <Component {...routeProps} />
              </WrappedComponent>
            )}
          />
        )
        return content;
        
    }
}
export default withLayout;