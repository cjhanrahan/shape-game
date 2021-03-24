import {
    ArcRotateCamera,
    Engine,
    // HemisphericLight,
    MeshBuilder,
    Scene,
    Vector3,
} from '@babylonjs/core'

export const TutorialShape = {
    main: () => {
        const canvas = document.querySelector('canvas')
        const engine = new Engine(canvas, true)
        const scene = new Scene(engine)
        const camera = new ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            2,
            Vector3.Zero(),
            scene
        )
        camera.attachControl(canvas, true)
        // const light1 = new HemisphericLight(
        //     'light1',
        //     new Vector3(1, 1, 0),
        //     scene
        // )
        MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene)
        window.addEventListener('keydown', e => {
            if (e.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide()
                } else {
                    scene.debugLayer.show()
                }
            }
        })

        engine.runRenderLoop(() => {
            scene.render()
        })
    },
}
