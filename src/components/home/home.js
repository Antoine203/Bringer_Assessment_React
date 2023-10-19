import React from 'react'
import styles from '../../../public/styles/home.module.css'

import Link from 'next/link'
export default function HomeView(){


    return (
        <div className={`${styles.container}`}>
            <div className={`flex justify-center gap-5 ${styles.context}`}>
                <div className={styles.button}>
                    <Link href="/tracking">
                        <p className={styles.text}>Tracking</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link href="/login">
                        <p className={styles.text}>Login</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}