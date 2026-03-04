import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Sphere } from '@react-three/drei'
import { useColorMode } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005
      meshRef.current.rotation.y += 0.0003
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <meshStandardMaterial
        color="#0ea5e9"
        emissive="#0284c7"
        metalness={0.7}
        roughness={0.2}
        wireframe={false}
      />
    </Sphere>
  )
}

function FloatingParticles() {
  const particlesRef = useRef(null)
  const positionsRef = useRef(null)

  useEffect(() => {
    if (!particlesRef.current) return

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(100 * 3)

    for (let i = 0; i < 100 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesRef.current.geometry = geometry
    positionsRef.current = positions
  }, [])

  useFrame(() => {
    if (
      particlesRef.current?.geometry?.attributes?.position &&
      positionsRef.current
    ) {
      const positions = positionsRef.current
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.05
        if (positions[i] > 10) {
          positions[i] = -10
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <pointsMaterial
        size={0.05}
        color="#0ea5e9"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  )
}

export default function Canvas3D() {
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? '#f9fafb' : '#0f172a'

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: bgColor, opacity: 0.3 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />

      {/* 3D Objects */}
      <AnimatedSphere />
      <FloatingParticles />

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  )
}
