import {RouterProvider} from "react-router"
import { router } from "./app.routes";
import "./features/shared/styles/global.scss"
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/song.context";

function App() {
  
//authprovider mai wrap kr k poori react application ko user,setUser , loading, setLoading ka access de dete hai taki hum kisi bhi component me inhe use kar sake
  return (
   <AuthProvider>
    <SongContextProvider>
     <RouterProvider router={router} />
    </SongContextProvider>
   </AuthProvider>
  )
}

export default App
