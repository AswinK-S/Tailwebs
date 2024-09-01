import NavBar from "../components/NavBar"
import StudentTable from "../components/StudentTable"

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="p-5 md:p-10">
                <StudentTable />
            </div>

        </>
    )
}

export default Home