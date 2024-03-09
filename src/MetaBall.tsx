import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MarchingCube } from '@react-three/drei'
import { RigidBody, BallCollider } from '@react-three/rapier'

interface MetaBallProps {
  color:any,
  vec?:THREE.Vector3,
  angularDamping?:number,
  linearDamping?:number,
  args?:number,
  strength?:number,
  subtract?:number,
  position: any
}

export const MetaBall = ({
  color,
  linearDamping = 80,
  angularDamping = 20,
  strength = 0.06,
  subtract = 0.03,
  args = 0.07,
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
    <RigidBody ref={api} colliders={false} linearDamping={linearDamping} angularDamping={angularDamping} position={position} {...props}>
      <MarchingCube strength={strength} subtract={subtract} color={color} />
      <BallCollider args={[args]}/>
    </RigidBody>
  )
}