import SlotsSignIn from "../components/SlotsSignIn"
import background from '/images/login.jpg'

const Login = () => {
    return (
        <>
            <div className="border h-screen bg flex " style={{ 
                background: ` url(${background})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat'
                 }}>
                <SlotsSignIn  />
            </div>

        </>
    )
}

export default Login