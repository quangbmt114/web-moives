
import Header from "../Header";
import Sidebar from "../Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout({children}) {
    return (
    <div>
        <Header/>
        <div className="col-12 container d-flex flex-wrap">
        <main className="col-lg-9 col-md-12">{children}</main>
        <Sidebar/>
        </div>
        
    </div> );
}

export default Layout;