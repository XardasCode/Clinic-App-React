import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <body>
        <Header/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {children}
                </div>
            </div>
        </div>
        <Footer/>
        </body>
    )
}

export default Layout;