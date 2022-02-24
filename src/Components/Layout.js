import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Header from './Header'
import Footer from './Footer'
import { DataProvider } from '../Context/DataContext'

// the oulet allows you to layout you routes, everything about the layout components will always show like navbar and everything below will always shoe like footer
function Layout({search, setSearch}) {
  return (
    <main className="App">
      <Header title="React Blog App" />
      <DataProvider>
        <NavBar />
        <Outlet />
      </DataProvider>
      <Footer />
    </main>
  );
}

export default Layout