import styled from 'styled-components'
import { Stage } from './Stage'

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`

function App() {

  return (
    <Wrapper>
      <Stage />
    </Wrapper>
  )
}

export default App
