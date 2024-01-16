/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Container2 } from "../common/commonUi";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function Test () {
    const [test,setTest] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
            setTest('안녕')
        },2000)

    },[])
    return(
        <Container2 info={{className:'container-normal'}}>
            먼데
        </Container2>
    )    
}