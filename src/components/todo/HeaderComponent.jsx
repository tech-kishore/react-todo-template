
import {Link} from "react-router-dom";
import {useAuth} from './security/AuthContext'


function HeaderComponent() {
    
    const authContext=useAuth()
    const isAuthenticated=authContext.isAuthenticated
    
    function logout() {
        authContext.logout()        
    }

    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a href="https://www.google.com/" className="navbar-brand ms-2 fs-2 fw-bold text-black">Google</a>
                        <div className="collapse navbar-collapse">                      
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                {isAuthenticated && <Link to="/welcome" className="nav-link">Home</Link>}
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated && <Link to="/todos" className="nav-link">Todos</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            {isAuthenticated && <Link to="/logout" className="nav-link" onClick={logout}>Logout</Link>}
                            </li>
                            <li className="nav-item">
                            {!isAuthenticated && <Link to="/" className="nav-link">Login</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;
