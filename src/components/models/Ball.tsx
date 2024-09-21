import React, { FC, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { swipeAtom } from '../../jotai/store'

useGLTF.preload('/ball.glb')

type Props = {
  position: [number, number, number]
}

const Ball: FC<Props> = ({ position }) => {
  const ballRef = useRef(null)
  const { nodes } = useGLTF('/ball.glb')
  const [swipe] = useAtom(swipeAtom)

  const material = new THREE.MeshBasicMaterial({ color: 'mediumpurple' })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (ballRef.current) {
      if (swipe !== 0 && !isActive) {
        ballRef.current.applyImpulse({
          x: swipe / 2000000,
          // y: swipe / 1000000,
          y: 0,
          z: swipe / -100000,
        })
        setIsActive(true) // Aktiver ballen ved swipe
      }
    }
  }, [swipe]) // Kjører effekten hver gang swipe endres

  return (
    <RigidBody
      ref={ballRef}
      colliders={'ball'}
      mass={1}
      gravityScale={isActive ? 0.7 : 0} // Sett tyngdekraft til 0 før ballen aktiveres
      position={isActive ? undefined : position} // Sett posisjon kun når ballen er inaktiv
      restitution={0.1}
      friction={0.2}
    >
      <group dispose={null} scale={0.05}>
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
