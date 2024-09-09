
import './App.css'
import './bootstrap.min.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Header from './components/Header'
import Movies from './components/Movies'
import Test2 from './components/Test2'
import Watched from './components/Watched'
import Watchlist from './components/Watchlist'

function App() {

  return (
    <>
      <Header/>
      {/* <Test2/> */}
      <Banner/>
      <Movies/>
      <Watchlist/>
      <Watched/>
      <Footer/>
    </>
  )
}

export default App
