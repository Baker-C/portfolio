<script>
  import { interactivity, useGltf, useDraco, OrbitControls } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'
  import { Spring } from 'svelte/motion'


  const dracoLoader = useDraco()
  const gltf = useGltf('assets/scene.glb', { dracoLoader })


  interactivity()
  const scale = new Spring(1)
  const rotationMultiplierSpring = new Spring(0.5)

  let rotation = 0
  useTask((delta) => {
    rotation += delta * rotationMultiplierSpring.current
  })
</script>

<T.PerspectiveCamera makeDefault
  position={[0, 1.5, 3]}
  zoom={0.5}
  fov={50}
>
  <OrbitControls
    enablePan={false}
    enableZoom={false}
    enableDamping={true}
    dampingFactor={0.05}
    minPolarAngle={Math.PI / 2}
    maxPolarAngle={Math.PI / 2}
    target={[0, 1, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight 
position={[10, 10, 10]} 
castShadow  
/>
  
{#await gltf then { scene }}
  <T is={scene} 
    rotation.y={rotation}
    scale={scale.current}
    onpointerenter={() => {
      rotationMultiplierSpring.set(0.1)
    }}
    onpointerleave={() => {
      scale.target = 1
      rotationMultiplierSpring.set(0.5)
    }}
    castShadow
    >
  </T>
{/await}
