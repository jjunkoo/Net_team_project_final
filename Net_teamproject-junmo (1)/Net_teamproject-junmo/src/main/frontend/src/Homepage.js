import './Homepage.css';
import ButtonMypage from './components/ButtonMypage';
import Button1 from './components/Button1';
import Button2 from './components/Button2';
import Button3 from './components/Button3';
import Button4 from './components/Button4';
import ButtonLogin from './components/ButtonLogin';
function Homepage() {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '50px' }}>TripBuddy</h1>
            </div>
            <div className="user-info">
                {/* <button className="name">
                    이현승님
                </button> */}
                <ButtonLogin />
                <ButtonMypage />
            </div>
            <div className="button-wrapper" style={{ marginTop: '50px' }}>
                <Button1 />
                <div className="space"></div> {/* 간격을 주기 위한 div 요소 */}
                <Button2 />
                <div className="space"></div>
                <Button3 />
                <div className="space"></div>
                <Button4 />
            </div>
        </div>
    );
}
export default Homepage;