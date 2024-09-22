import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'

useGLTF.preload('/roulette1.glb')

const RouletteTwo = () => {
  const { nodes, materials } = useGLTF('/roulette1.glb')
  const rouletteRef = useRef<any>()

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 'rgb(100,1001,00)',
    metalness: 0.3,
  })

  const centerMaterial = new THREE.MeshStandardMaterial({
    color: 'rgb(155,113,40)',
    metalness: 1,
    roughness: 0,
  })
  console.log(nodes)
  return (
    <RigidBody
      type="kinematicPosition"
      colliders="trimesh"
      friction={2}
      restitution={0.2}
    >
      <group dispose={null} ref={rouletteRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials['Material.001']}
          rotation={[0, 0.166, 0]}
          scale={1.37}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.center.geometry}
          material={centerMaterial}
          position={[0, 0.022, -0.014]}
          scale={0.169}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.obstacles.geometry}
          material={nodes.obstacles.material}
          rotation={[2.48, -0.99, 2.564]}
          scale={[0.065, 0.033, 0.043]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.center_blocker.geometry}
          material={metalMaterial}
          position={[0, -0.192, 0]}
          rotation={[-3.088, -0.771, -3.094]}
          scale={[-0.041, -0.014, -0.008]}
        />
      </group>
    </RigidBody>
  )
}

export default RouletteTwo
