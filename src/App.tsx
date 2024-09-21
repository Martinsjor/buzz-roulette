import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { Suspense, useRef, useState } from 'react'
import { Physics } from '@react-three/rapier'
import { JotaiProvider, swipeAtom } from './jotai/store'
import { useAtom } from 'jotai'

type TouchPosition = { x: number; y: number }

function App() {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const [swipe, setSwipe] = useAtom(swipeAtom)

  const maxSwipeDistance = 300 // Maksimal bredde for fylling
  const [fillWidth, setFillWidth] = useState(0) // Ny tilstand for fyllebredden
  const [endX, setEndX] = useState<number | null>(null) // Lagre endeposisjonen

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = e.touches[0].clientX
    setTouchStart({ x: startX, y: 0 })
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX
    if (touchStart) {
      const distanceX = touchStart.x - currentX // Beregn avstanden til venstre
      setFillWidth(Math.max(0, Math.min(maxSwipeDistance, distanceX))) // Oppdater fyllebredden
      setEndX(currentX) // Oppdater endeposisjonen
    }
  }

  const onTouchEnd = () => {
    if (touchStart && endX !== null) {
      const distanceX = touchStart.x - endX // Beregn den totale swipe avstanden
      setSwipe(distanceX) // Oppdater swipe-staten med avstanden
    }
    setTouchStart(null) // Nullstill touch-start
    setFillWidth(0) // Tilbakestill fylling til null
    setEndX(null) // Nullstill endeposisjonen
  }

  return (
    <JotaiProvider>
      <div
        style={{
          position: 'absolute', // Posisjoner absolutt
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'auto', // Sørger for at div tar imot berøringer
          backgroundColor: 'transparent', // Transparent bakgrunn
          zIndex: 10, // Sørger for at den ligger over alt annet
          touchAction: 'none',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      {/* Fyllingsanimasjon */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px', // Total bredde for fyllingen
          height: '30px',
          borderRadius: '15px',
          backgroundColor: 'lightgrey',
          overflow: 'hidden',
          zIndex: 9,
        }}
      >
        <div
          style={{
            width: `${fillWidth}px`, // Fyll bredden basert på swipe
            height: '100%',
            borderRadius: '15px',
            backgroundColor: 'blue',
            transition: 'none', // Ingen overgang for å oppdatere i sanntid
          }}
        />
      </div>
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], fov: 40 }}
        style={{ touchAction: 'none' }}
      >
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
