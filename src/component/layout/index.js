
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Sidebar from "../Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { uiAction } from "@/store/store_login";
import { useEffect } from "react";
function Layout({children}) {
    const accessToken = Cookies.get('token');
    const isCheck = useSelector(state=>state.ui.isCheckLogin)
    const isCheckSideBar = useSelector(state=>state.ui.isCheckSideBar)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(accessToken){
            dispatch(uiAction.toggleLogin())
        }
    },[])
    return (
        
    <div>
        <Header isCheck={isCheck} />
        <div className="col-12 container d-flex flex-wrap">
        <main className="col-lg-9 col-md-12">{children}</main>
        {isCheckSideBar&&<Sidebar/>}
        </div>
        
    </div> );
}

export default Layout;