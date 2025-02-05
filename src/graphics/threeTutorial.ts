'use client'

import { BoxGeometry, DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export function getRendererNode() {
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    const renderer = new WebGLRenderer()
    // renderer.shadowMap.enabled = true
    // renderer.physicallyCorrectLights = true

    const geometry = new BoxGeometry()
    const material = new MeshStandardMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    scene.add(cube)
    
    const planeGeometry = new PlaneGeometry(10, 10)
    const planeMaterial = new MeshBasicMaterial({ color: 0xffffff })
    const plane = new Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -0.5
    scene.add(plane)
    
    const light = new DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    light.castShadow = true
    scene.add(light)
    
    

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = false

    function animate() {
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
    renderer.setSize(window.innerWidth, window.innerHeight)
    return renderer.domElement
}