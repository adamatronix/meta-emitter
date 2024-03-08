import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MarchingCube } from '@react-three/drei'
import { RigidBody, BallCollider } from '@react-three/rapier'

interface MetaBallProps {
  color:any,
  vec?:THREE.Vector3,
  position: any
}

export const MetaBall = ({
  color,
  vec = new THREE.Vector3(),
  position,
  ...props
}:MetaBallProps) => {
  const api = useRef<any>(null)

  useFrame((_state, delta) => {
    delta = Math.min(delta, 0.1)
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiplyScalar(delta * -0.05),
    )
  })

  return (
    <RigidBody ref={api} colliders={false} linearDamping={80} angularDamping={23.95} position={position} {...props}>
      <MarchingCube strength={0.15} subtract={0.8} color={color} />
      <BallCollider args={[0.08]}/>
    </RigidBody>
  )
}