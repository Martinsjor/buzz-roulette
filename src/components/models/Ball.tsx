import React, { FC, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { ballIsActiveAtom } from '../../jotai/store'

useGLTF.preload('/ball.glb')

type Props = {
  position: [number, number, number]
}

const Ball: FC<Props> = ({ position }) => {
  const ballRef = useRef(null)
  const { nodes } = useGLTF('/ball.glb')
  const [ballIsActive, setBallIsActive] = useAtom(ballIsActiveAtom)

  const impulseIsDone = useRef(false)
  useFrame(() => {
    if (ballRef.current && ballRef.current.translation) {
      // Hent posisjonen til ballen fra RigidBody
      const currentPosition = ballRef.current.translation()
      console.log(currentPosition) // Dette vil logge posisjonen til ballen

      if (!ballIsActive && !impulseIsDone.current) {
        // Påfør en sterk impuls til høyre for å simulere et "hardt kast"
        const impulse = { x: 0, y: 40, z: 0 }
        ballRef.current.applyImpulse(impulse)
        impulseIsDone.current = true
      }
    }
  })

  const material = new THREE.MeshBasicMaterial({ color: 'mediumpurple' })
  return (
    <RigidBody
      ref={ballRef}
      colliders={'ball'}
      friction={0.1}
      restitution={0.1}
      mass={10}
      gravityScale={1}
    >
      <group dispose={null} scale={0.05} position={position}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Icosphere as THREE.Mesh).geometry}
          material={material}
        />
      </group>
    </RigidBody>
  )
}

export default Ball
