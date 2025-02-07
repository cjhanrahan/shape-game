import { ShapeType } from '@/graphics/geometry'
import styles from './page.module.css'
import Shape from '@/graphics/Shape'

export default function Home() {
    return (
        <div className={styles.container}>
            {/* <h1>Shape Game!</h1> */}
            <h1 className={styles.title}>Which shape has a bigger volume?</h1>
            <div className={styles.twoShapes}>
                <Shape type={ShapeType.CUBE} volume={1}/>
                <Shape type={ShapeType.PRISM} volume={1.5} />
            </div>
        </div>
    )
}
