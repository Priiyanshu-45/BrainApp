import { useState } from 'react'
import { Card } from './components/Card'
import { Modal } from './components/ui/Modal'

function App() {
  const [val, setVal] = useState(true);
  function clickme() {
    setVal(v => !v);
  }

  return (
    <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <Card title='My Project is good that' description='Hello Guys this is it' tags={["productivity", "app", "hello", "genius", "hi"]} date={new Date()} cardIcon='note'/>
  <Card title='My Project' description='To center an element, we use the align-items property to align the item on the cross axis, which in this case is the block axis running vertically. We use justify-content to align the item on the main axis, which in this case is the inline axis running horizontally.' tags={["productivity", "cute", "nice", "hello", "genius", "hi"]} date={new Date()} cardIcon='instagram'/>
  <Card title='My Project' description='Hello Guys this is it' link="www.milkyway.com" date={new Date()} cardIcon='link'/>
  <Card title='My Project' description='Hello Guys this is it' date={new Date()} cardIcon='youtube'/>
  <Card title='My Project' description='Hello Guys this is it' date={new Date()} cardIcon='twitter'/>
  <Card title='My Project' description='Hello Guys this is it' date={new Date()} cardIcon='other'/>
    <Modal isOpen={val} onClose={clickme}/> 
</div>

    </>
  )
}

export default App
