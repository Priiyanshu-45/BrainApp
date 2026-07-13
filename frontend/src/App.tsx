import './App.css'
import { Button } from './components/ui/Button'
import { AddIcon } from './icons/addIcon'
import { ShareIcon } from './icons/shareIcon'

function App() {
  

  return (
    <>
    <div className='flex '>
       <Button variant='secondary' size='md' text='Add Content' startIcon={<AddIcon/>}/>
    <Button variant='primary' size='md' text='Share Brain' startIcon={<ShareIcon/>}/>
    </div>
    </>
  )
}

export default App
