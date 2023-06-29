import {
  FooterHeadContainer,
  FooterHeadText,

} from './Styles';
import githublogo from "../images/githublogo.png";

const FooterBottom = () => {
    return (
      
        <FooterHeadContainer>
            <FooterHeadText>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                {/* <img src={githublogo}/> */}
                Library Management System
            </FooterHeadText>
        </FooterHeadContainer>
    );
  };
  
export default FooterBottom;
