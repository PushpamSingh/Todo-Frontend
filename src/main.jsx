import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {HomePage} from './Components/Pages/Homepage.jsx'
import {LoginPage} from './Components/Pages/Loginpage.jsx'
import {SignupPage} from './Components/Pages/SignupPage.jsx'
import {ProfilePage} from './Components/Pages/ProfilePage.jsx'
import { AuthLayOut } from './Components/AuthLayout.jsx'
import { EditProfile } from './Components/Pages/EditProfile.jsx'
import { ChangePassword } from './Components/Pages/ChangePassword.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/login',
        element:(
          <AuthLayOut authentication={false}>
            <LoginPage/>
          </AuthLayOut>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayOut authentication={false}>
            <SignupPage/>
          </AuthLayOut>
        )
      },
      {
        path:'/my-profile',
        element:(
          <AuthLayOut authentication>
            <ProfilePage/>
          </AuthLayOut>
        )
      },
      {
        path:'/edit-profile',
        element:(
          <AuthLayOut authentication>
            <EditProfile/>
          </AuthLayOut>
        )
      },
    ]
  },
  {
    path:'/change-password',
    element:(
      <AuthLayOut authentication>
        <ChangePassword/>
      </AuthLayOut>
    )
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
