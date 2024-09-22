import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
useGLTF.preload('/untitled.glb')

const RouletteThree = () => {
  const { nodes, materials } = useGLTF('/untitled.glb')
  const rouletteRef = useRef<any>()

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 'rgb(10,10,20)',
    metalness: 0.3,
  })

  return (
    <RigidBody
      type="kinematicPosition"
      colliders="trimesh"
      friction={2}
      restitution={0.2}
      scale={0.1}
    >
      <group dispose={null} ref={rouletteRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.outer_circle.geometry}
          material={materials['Material.001']}
          rotation={[0, 0, Math.PI]}
          scale={13.458}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.inner_circle.geometry}
          material={materials['Material.002']}
          rotation={[0, 0, Math.PI]}
          scale={13.458}
        />
      </group>
    </RigidBody>
  )
}

export default RouletteThree
