"use client"
import {React, useState, useEffect} from "react"
import axios from "axios"
import styles from "../../../public/styles/tracking.module.css"
import Image from "next/image"
import CheckMark from "../../../public/images/checkmark.png"
import Circle from "../../../public/images/circle.png"
import Truck from "../../../public/images/truck.png"

export default function TrackingView(){
    
    const [trackingData, setTrackingData] = useState([])
    const [trackingNumber, setTrackingNumber] = useState("BPS1EP58YI5SKBR")
    const [isValidTrackingNumber, setIsValidTrackingNumber] = useState(true)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    var count = 0

    useEffect( () => {
        // Make a request to Tracking_parcel endpoint

        // handleGetRequest()
        axios.get(`http://localhost:3001/Tracking_parcel?tracking_number=${trackingNumber}`)
            .then(response =>setTrackingData(response.data))
            .catch(error => console.log(error))
    }, [])

    function handleGetRequest(){

        axios.get(`http://localhost:3001/Tracking_parcel?tracking_number=${trackingNumber}`)
            .then(response =>{
                setTrackingData(response.data)
                console.log("REsponse Data: ",response.data)
                setIsValidTrackingNumber(true)
            })
            .catch(error => {
                setTrackingData([])
                setIsValidTrackingNumber(false)
            })
    }

    return (
        <div className={`flex justify-center ${styles.tracking_container}`}>

            <div className={`${styles.tracking_details_container}`}>
                <div className={`grid place-items-center ${styles.tracking_details}`}>
                    <h1 className={`${styles.title}`}>BPS Tracking</h1>
                    <p className={`${styles.description}`}>Enter your tracking number</p>
                    <input 
                        type="text" 
                        id="t_number" 
                        name="t_number" 
                        value={trackingNumber} 
                        className={styles.input}
                        onChange={e => {setTrackingNumber(e.currentTarget.value)}}
                    />
                    <button className={styles.search_button} onClick={handleGetRequest}>Search</button>
                    <button className={styles.map_button}>Show Map</button>
                </div>
                {isValidTrackingNumber && (
                    <div className={`grid place-items-center ${styles.tracking_details}`}>
                        <div className={`columns-2 ${styles.tracking_details}`}>
                            <div className="w-full">
                                <button className={`${styles.tracking_button}`} onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>{trackingNumber}</button>
                            </div>
                            <div className="w-full">
                                <button className={`${styles.tracking_button_2}`} onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>{trackingNumber}</button>
                            </div>
                        </div>  
                        <div className={`${styles.order_details}`}>
                            {trackingData.parcel_tracking_items?.map((orderDetails) => {
                                {count += 1}
                                return (
                                    <div key={orderDetails.id} className={`flex gap-3 ${styles.orderDetails_container}`}>
                                        <div className={styles.time_container}>
                                            <h3 className={styles.date_title}>{`${months[new Date(orderDetails.timestamp).getMonth()]} ${new Date(orderDetails.timestamp).getDate()}, ${new Date(orderDetails.timestamp).getFullYear()}`}</h3>
                                            <p className={styles.date_time}>{`${new Date(orderDetails.timestamp).getHours() > 12? new Date(orderDetails.timestamp).getHours() - 12 : new Date(orderDetails.timestamp).getHours()}:${new Date(orderDetails.timestamp).getMinutes() < 10? `0${new Date(orderDetails.timestamp).getMinutes()}`:new Date(orderDetails.timestamp).getMinutes()} ${new Date(orderDetails.timestamp).getHours() > 11 && new Date(orderDetails.timestamp).getHours() < 24? 'AM':'PM'}`}</p>
                                        </div>
                                        {count == 1 && (
                                            <div>
                                                <Image 
                                                    src={CheckMark}
                                                    className={styles.image}
                                                    alt="Checkmark Image"
                                                />
                                                <p className={styles.line}></p>
                                            </div>
                                        )}
                                        {count == trackingData.parcel_tracking_items.length && (
                                            <div>
                                                <Image 
                                                    src={Truck}
                                                    className={styles.image}
                                                    alt="Truck Image"
                                                />
                                                <p className={styles.line}></p>
                                            </div>
                                        )}
                                        {count > 1 && count < trackingData.parcel_tracking_items.length && (
                                            <div>
                                                <Image 
                                                    src={Circle}
                                                    className={styles.image}
                                                    alt="Circle Image"
                                                />
                                                <p className={styles.line}></p>
                                            </div>
                                        )}
                                        {orderDetails.tracking_code == undefined && (
                                            <div>
                                                <h3 className={`${styles.sub_title}`}>{orderDetails.tracking_code_vendor.tracking_code.tracking_code_locales[0].description}</h3>
                                                <p className={`${styles.sub_title_country}`}>{`${orderDetails.city? `${orderDetails.city},${orderDetails.state},${orderDetails.country.isoCode}`:`${orderDetails.location},${orderDetails.country.isoCode}`}`}</p>
                                            </div>
                                        )}
                                        {orderDetails.tracking_code && (
                                            <div>
                                                <h3 className={`${styles.sub_title}`}>{orderDetails.tracking_code.tracking_code_locales[0].description}</h3>
                                                <p className={`${styles.sub_title_country}`}>{`${orderDetails.city? `${orderDetails.city},${orderDetails.state},${orderDetails.country.isoCode}`:`${orderDetails.location},${orderDetails.country.isoCode}`}`}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
                {!isValidTrackingNumber && (
                    <div className={`grid place-items-center ${styles.tracking_details}`}>
                        <h3 className={styles.sub_title}>Tracking Number Does Not Exist</h3>
                        <p className={`${styles.description}`}>Please contact us if you have any doubt</p>
                        <button className={styles.search_button}>Contact</button>
                    </div>
                )}
            </div>
        </div>
    )
}