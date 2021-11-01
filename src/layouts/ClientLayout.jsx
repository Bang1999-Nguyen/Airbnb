
import Footer from "../components/Footer/Footer";
import HeaderOfDetail from "../components/HeaderOfDetail/HeaderOfDetail";
import withLayout from "../hocs/withLayout";

function ClientLayout(props) {
    return (
      <>
      <HeaderOfDetail/>
        {props.children}
        <Footer/>
      </>
    );
  }
  
  export default withLayout(ClientLayout);