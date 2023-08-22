import styles from './Popper.module.css'
function Wrapper({children}) {
    return ( <div className={styles.wrap}>
        {children}
    </div> );
}

export default Wrapper;