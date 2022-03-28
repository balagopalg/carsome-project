import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import * as ROUTES from './routes'
import Home from './pages/Home/Home'

const ViewReview = React.lazy(() => import('./pages/ViewReviews/ViewReview'))

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path={ROUTES.viewReview}
            element={
              <React.Suspense fallback={<>...</>}>
                <ViewReview />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
