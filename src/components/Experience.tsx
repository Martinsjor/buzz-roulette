import { OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

import {
  onPlayerJoin,
  insertCoin,
  isHost,
  myPlayer,
  Joystick,
} from 'playroomkit'
import Roulette from './models/Roulette'
import { AmbientLight, SpotLight } from 'three'
import { RigidBody } from '@react-three/rapier'
import Ball from './models/Ball'
import RouletteTwo from './models/RouletteTwo'
import RouletteThree from './models/RouletteThree'

export const Experience = () => {
  // const [players, setPlayers] = useState<any>([])
  // const start = async () => {
  //   await insertCoin()
  // }

  // useEffect(() => {
  //   start()

  //   onPlayerJoin((state) => {
  //     const joystick = new Joystick(state, {
  //       type: 'angular',
  //       buttons: [{ id: 'fire', label: 'Fire' }],
  //     })
  //     const newPlayer = { state, joystick }
  //     state.setState('health', 100)
  //     state.setState('deaths', 0)
  //     state.setState('kills', 0)
  //     setPlayers((players: any) => [...players, newPlayer])
  //   })
  // }, [])

  return (
    <>
      {/* <OrbitControls /> */}
      <spotLight
        position={[0, 5, 5]} // Positioning the light as if it comes from above the user
        angle={0.3} // Narrow beam for spotlight effect
        penumbra={0.5} // Soft edge for the spotlight
        intensity={10} // Intensity of the spotlight
        distance={10} // How far the light reaches
        castShadow // To enable shadow casting
      />
      <ambientLight intensity={1} />
      {/* <Roulette /> */}
      {/* <RouletteTwo /> */}
      <RouletteThree />
      {/* <Ball position={[-1.195, 0.04, 0]} /> */}

      {/* for roulette3 */}
      <Ball position={[-1.225, 0.09, 0]} />
      {/* <Ball position={[-1.185, 0.043, 0]} /> */}
      {/* <Ball position={[-1, 0, 0]} /> */}
    </>
  )
}
