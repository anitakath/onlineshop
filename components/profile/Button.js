


//STYLES
import styles from './ProfileComponents.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


const Button = ({ userProfile, setUserProfile }) =>{

    return(
        <button onClick={() => setUserProfile("Start")} className={styles.goBack_btn}> 
            <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} /> 
        </button>
    )
}

export default Button