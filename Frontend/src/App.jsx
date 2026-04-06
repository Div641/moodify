import {RouterProvider} from "react-router"
// App.jsx
import { router } from "./app.routes";
import './App.css'
import "./features/shared/styles/global.scss"
import { AuthProvider } from "./features/auth/auth.context";

function App() {
  
//authprovider mai wrap kr k poori react application ko user,setUser , loading, setLoading ka access de dete hai taki hum kisi bhi component me inhe use kar sake
  return (
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  )
}

export default App