import { Route, Redirect } from 'react-router-dom';
import { authMiddleware } from '../../../../backend/middleware/authMiddleware';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    authMiddleware(props) ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  } />
);

export default PrivateRoute;
