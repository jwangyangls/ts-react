import Home from '../pages/Home/index'
import About from '../pages/About/index'

const routes = [
  {
    path:'/',
    component: Home,
    name:'Home'
  },
  {
    path:'/about',
    component: About,
    name:'About'
  },
]
export default routes