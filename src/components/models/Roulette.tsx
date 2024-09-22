import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'

useGLTF.preload('/roulette.glb')

const Roulette = (props: any) => {
  const { nodes, materials } = useGLTF('/roulette.glb')
  const rouletteRef = useRef<any>()

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 'white',
    metalness: 0.3,
  })
  const centerMaterial = new THREE.MeshStandardMaterial({
    color: 'rgb(250,250,250)',
    metalness: 0.8,
    roughness: 0.5,
  })

  return (
    <RigidBody
      type="kinematicPosition"
      colliders="trimesh"
      friction={1}
      restitution={0.2}
    >
      <group {...props} dispose={null} ref={rouletteRef}>
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
          material={nodes.center.material}
          position={[0, -0.098, -0.014]}
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
          geometry={nodes.park_lines037.geometry}
          material={nodes.park_lines037.material}
          position={[0, -0.178, 0]}
          rotation={[-0.022, 0.779, 0.016]}
          scale={[0.041, 0.008, 0.008]}
        />
      </group>
    </RigidBody>
  )
}

export default Roulette
