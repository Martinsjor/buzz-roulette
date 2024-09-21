import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { Suspense, useRef, useState } from 'react'
import { Physics } from '@react-three/rapier'
import { JotaiProvider, swipeAtom } from './jotai/store'
import { useAtom } from 'jotai'

type TouchPosition = { x: number; y: number }

function App() {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null)
  const [swipe, setSwipe] = useAtom(swipeAtom)

  const minSwipeDistance = 20

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = e.touches[0].clientX
    const startY = e.touches[0].clientY
    setTouchStart({ x: startX, y: startY })
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const endX = e.touches[0].clientX
    const endY = e.touches[0].clientY
    setTouchEnd({ x: endX, y: endY })
  }

  const onTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distanceX = touchEnd.x - touchStart.x
      const distanceY = touchEnd.y - touchStart.y

      if (Math.abs(distanceX) > minSwipeDistance) {
        setSwipe(distanceX) // Sett faktisk swipe-distanse
      }

      setTouchStart(null)
      setTouchEnd(null)
    }
  }

  return (
    <JotaiProvider>
      <p>{swipe}</p>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <Suspense>
          <Physics
          // debug
          >
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </JotaiProvider>
  )
}

export default App
