import styles from './page.module.css'
import TwoShapes from './TwoShapes'

const iniitalSeed = Math.random()

export default function Home() {
    return (
        <div className={styles.container}>
            {/* <h1>Shape Game!</h1> */}
            <h1 className={styles.title}>Which shape has a bigger volume?</h1>
            <TwoShapes initialSeed={iniitalSeed}/>
        </div>
    )
}
