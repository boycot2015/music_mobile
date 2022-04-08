import {
    Route,
    Routes,
    BrowserRouter as Router,
    Navigate
  } from 'react-router-dom'
import routes from '../routes'
import Header from './Header'
import Footer from './Footer'
import './layout.less'

function layout() {
  return (
    <Router initialEntries={['/home']}>
        <div className="music-main">
            <Header />
            <div className={'music-body'}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/home'} />} />
                    {routes.map(el => <Route key={el.key} path={el.key} element={el.element}>
                    </Route>)}
                </Routes>
            </div>
            <Footer />
        </div>
    </Router>
  );
}

export default layout;
