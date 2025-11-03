import { NavLink } from "react-router-dom"

import styles from './AuthLink.module.scss'

const AuthLink = () => {
  return (
        <NavLink to="/auth/signIn" className={styles.button}>
            Sign In
        </NavLink>
    )
}

export default AuthLink