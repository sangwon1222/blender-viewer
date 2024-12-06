/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

interface ModelProps {
  modelPath: string
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
  const group = useRef<THREE.Group>(new THREE.Group())

  useEffect(() => {
    const loader = new FBXLoader()
    loader.load(
      modelPath,
      (fbx) => {
        fbx.name = 'model'
        fbx.scale.set(0.02, 0.02, 0.02)

        group.current.clear()
        group.current.add(fbx)
      },
      undefined,
      (error) => {
        console.error('Error loading FBX model:', error) // 에러 처리
      }
    )
  }, [modelPath])

  return <group ref={group} />
}

const App: React.FC = () => {
  const path = `${(window as any).api.getModelPath()}`

  const [modelList, setModelList] = useState<{ label: string; url: string }[]>([
    { label: '무드등', url: `${path}/light001.FBX` },
    { label: '의자', url: `${path}/chair001.FBX` },
    { label: '큐브룸', url: `${path}/cuberoom.FBX` }
  ])

  const [currentModel, setCurrentModel] = useState<string>(modelList[0].url)

  const changeModel = (path: string): void => setCurrentModel(path)

  const uploadModel = (e: any): void => {
    const name = e.target.files[0].name.toLowerCase().split('.')[0]
    const url = URL.createObjectURL(e.target.files[0])

    changeModel(url)
    setModelList((list) => {
      const stored = list.find((model) => model.url === url)
      if (stored) return list
      return [...list, { label: name, url }]
    })
  }
  return (
    <>
      <ul>
        <li>
          <input type="file" accept="image/fbx" onChange={uploadModel} />
        </li>
        <ol>
          예시
          {modelList.map(({ label, url }) => (
            <li key={url}>
              <button onClick={() => changeModel(url)}>{label}</button>
            </li>
          ))}
        </ol>
      </ul>
      <Canvas
        eventSource={document.getElementById('root') as HTMLElement}
        eventPrefix="client"
        camera={{ position: [2, 2, 2], fov: 40 }}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[0, 0, 0]} intensity={2} castShadow />
        <spotLight intensity={4} angle={2.5} penumbra={1} position={[0, 0, 1.4]} castShadow />
        <Model modelPath={currentModel} />
        <OrbitControls
          enableZoom={true} // 확대/축소 활성화
          enableRotate={true} // 회전 활성화
          enablePan={false} // 팬 비활성화
          minDistance={2} // 최소 확대 거리
          maxDistance={10} // 최대 확대 거리
          maxPolarAngle={Math.PI / 2} // 수직 각도 제한 (90도)
          minPolarAngle={0} // 하단 각도 제한
        />
      </Canvas>
    </>
  )
}

export default App
