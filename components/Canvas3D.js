import { Canvas } from '@react-three/fiber'
import {
  PerspectiveCamera,
  OrbitControls,
  Sphere,
} from '@react-three/drei'
import { useColorMode } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef(null)

  useEffect(() => {
    if (!meshRef.current) return

    const animate = () => {
      meshRef.current.rotation.x += 0.0005
      meshRef.current.rotation.y += 0.0003
      requestAnimationFrame(animate)
    }

    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <meshStandardMaterial
        color="#0ea5e9"
        emissive="#0284c7"
        metall
        ness={0.7}
        roughness={0.2}
        wireframe={false}
      />
    </Sphere>
  )
}

function FloatingParticles() {
  const particlesRef = useRef(null)
  const particleCount = 100

  useEffect(() => {
    if (!particlesRef.current) return

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const animations = setInterval(() => {
      const positions = geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.05
        if (positions[i + 1] > 10) {
          positions[i + 1] = -10
        }
      }
      geometry.attributes.position.needsUpdate = true
    }, 50)

    return () => clearInterval(animations)
  }, [])

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" />
      <pointsMaterial
        attach="material"
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
