import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MarchingCube } from '@react-three/drei'
import { RigidBody, BallCollider } from '@react-three/rapier'

interface PointerProps {
  vec?:THREE.Vector3,
}

export const Pointer = ({
  vec = new THREE.Vector3()
}:PointerProps) => {
  const ref = useRef<any>()
  useFrame(({ pointer, viewport }) => {
    const { width, height } = viewport.getCurrentViewport()
    vec.set(pointer.x * (width / 2), pointer.y * (height / 2), 0)

    if(ref.current) {
      ref.current.setNextKinematicTranslation(vec)
    }
    
  })
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <MarchingCube strength={0.3} subtract={10} />
      <BallCollider args={[0.1]} />
    </RigidBody>
  )
}