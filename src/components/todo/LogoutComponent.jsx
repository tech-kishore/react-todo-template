import {Link} from "react-router-dom";
function LogoutComponent() {

    return(
        <div className="logout">
            <h1>You have been logged out!</h1>
            <div><Link to="/login">Login again</Link></div>
        </div>
    );
}

export default LogoutComponent;