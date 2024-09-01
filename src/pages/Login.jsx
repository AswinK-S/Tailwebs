import SlotsSignIn from "../components/SlotsSignIn"
import background from '/images/login.jpg'

const Login = () => {
    return (
        <>
            <div className="border h-screen flex flex-col  " style={{
                background: ` url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="flex justify-center mt-10  md:mt-20  ">
                    <h1 className="text-white font-semibold text-3xl font-serif"> TailWebs</h1>
                </div>
                <SlotsSignIn />                
            </div>

        </>
    )
}

export default Login