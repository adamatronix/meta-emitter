import styled from 'styled-components';
import { Canvas } from '@react-three/fiber'
import { MarchingCubes, Environment, Bounds } from '@react-three/drei'
import { Physics} from '@react-three/rapier'
import { MetaBall } from './MetaBall';
import { Pointer } from './Pointer';

interface StageProps {

}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
export const Stage = ({...props}:StageProps) => {


  return (
    <Wrapper {...props}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 25 }}>
        <color attach="background" args={['#f0f0f0']} />
        <ambientLight intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <MarchingCubes resolution={50} maxPolyCount={9000} enableUvs={false} enableColors>
            <meshStandardMaterial color="black" metalness={0.6} 
        roughness={0.04} />
            <MetaBall color="indianred" position={[1, 1, 0.5]} />
            <MetaBall color="skyblue" position={[-1, -7, -7.5]} />
            <MetaBall color="teal" position={[4, 2, 2.5]} />
            <MetaBall color="orange" position={[-2, -2, 7]} />
            <MetaBall color="hotpink" position={[3, 3, 0.5]} />
            <MetaBall color="aquamarine" position={[-10, -3, -0.5]} />
            <Pointer />
          </MarchingCubes>

        </Physics>
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
        {/* Zoom to fit a 1/1/1 box to match the marching cubes */}
        <Bounds fit clip observe margin={1}>
          <mesh visible={false}>
            <boxGeometry />
          </mesh>
        </Bounds>
      </Canvas>
    </Wrapper>

  )

}