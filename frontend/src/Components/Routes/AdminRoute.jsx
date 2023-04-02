import { Route, Redirect } from 'react-router-dom';
import { authMiddleware, isAdmin } from '../../../../backend/middleware/authMiddleware';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    authMiddleware(props) && isAdmin(props) ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  } />
);

export default AdminRoute;