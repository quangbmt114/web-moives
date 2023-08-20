
import Header from "../Header";
import Sidebar from "../Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout({children}) {
    return (
    <div>
        <Header/>
        <div className="col-12 container d-flex">
        <main className="col-9">{children}</main>
        <Sidebar/>
        </div>
        
    </div> );
}

export default Layout;