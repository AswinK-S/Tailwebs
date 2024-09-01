import NavBar from "../components/NavBar"
import StudentTable from "../components/StudentTable"

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="p-5  flex items-center justify-center">
                <StudentTable />
            </div>

        </>
    )
}

export default Home