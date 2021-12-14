import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import {HomeComponent} from "./components/home";
import {useState} from "react";
import {HeaderComponent} from "./components/core/header";
import {AuthComponent} from "./components/core/auth";
import {FooterComponent} from "./components/core/footer";

const App = () => {
    const [token, setToken] = useState(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null)
    return (
        <div className="App">
            {token &&
                <HeaderComponent/>
            }
            <Routes>
                <Route path="/" element={token ? <HomeComponent/> : <AuthComponent setToken={setToken}/>}/>
            </Routes>
            {token &&
                <FooterComponent/>
            }
        </div>
    );
}

export default App;
