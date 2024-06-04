import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            {/* <p className="text-xl text-center mt-8 font-medium"> do you marry me? biye korle ei chotto ghoree tmi ar ami takbo eksatee..😘</p>
            <div className="flex justify-center mt-4 gap-4 text-center">
                    <Link to='/love'><button className="btn bg-[#FD136C] px-6 text-lg text-white font-semibold">Yes</button></Link>
                    <Link to="/fuck"><button className="btn bg-[#F7E730] px-6 text-lg  font-semibold">No</button></Link>
                </div> */}
            <div className='flex justify-center mt-20 md:mt-32'>
                <img className='w-[300px] md:w-[400px]' src="https://i.ibb.co/V9gjLRF/home.jpg" alt="" />
            </div>
        </div>

    );
};

export default Home;