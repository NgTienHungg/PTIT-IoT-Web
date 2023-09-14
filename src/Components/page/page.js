import Charts from '../Chart/Charts';
import { useState } from 'react';
import Nhietdo from '../nhietdo/nhietdo';
import Doam from '../doam/Doam';
import Anhsang from '../anhsang/Anhsang';
import Menu from '../menu/Menu';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './page.css'

// Khai báo các biến hằng
const urlLightOn = "https://i.imgur.com/imqSxdm.png";
const urlLightOff = "https://i.imgur.com/OXXnlPH.png";
const urlFanOn = "https://i.imgur.com/Wx2lXcJ.png";
const urlFanOff = "https://i.imgur.com/ynfVzo0.png";

const Page = () => {
    // Khởi tạo các trạng thái cho đèn và quạt
    const [isLightOn, setIsLightOn] = useState(false);
    const [isFanOn, setIsFanOn] = useState(false);

    // Hàm bật/tắt đèn
    const toggleLight = () => {
        setIsLightOn(prevState => !prevState);
    };

    // Hàm bật/tắt quạt
    const toggleFan = () => {
        setIsFanOn(prevState => !prevState);
    };

    // Render giao diện
    return (
        <div className="pagee">
            {/* <div className="menuu">
                <Menu/>
            </div> */}
            <div className="page-chucnang">
                <Nhietdo />
                <Doam />
                <Anhsang />
            </div>
            <div className="page-btn">
                <div className="page-bieudo">
                    <Charts />
                </div>

                <div className="page-btn-chucnang">
                    <div className="page-btn-den">
                        <div className="btn-icon">
                            <img className="btn-icon-den" src={isLightOn ? urlLightOn : urlLightOff} alt="Bulb" />
                            <br />
                            <button className={`light-btn ${isLightOn ? 'on' : 'off'}`} onClick={toggleLight}>
                                <span className="light-icon"></span>
                            </button>
                        </div>
                    </div>

                    <div className="page-btn-quat">
                        <div className="btn-icon">
                            <img className="btn-icon-den" src={isFanOn ? urlFanOn : urlFanOff} alt="Bulb" />
                            <br />
                            <button className={`light-btn ${isFanOn ? 'on' : 'off'}`} onClick={toggleFan}>
                                <span className="light-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page;