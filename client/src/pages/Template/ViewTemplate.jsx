import React, { useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom'

export default function ViewTemplate() {

    const location = useLocation();

    useEffect(() => {
        axios.post('/template/viewtemplate').then((data) => {
            console.log(data)
        })
    },[])


  return (
    <div>
      View Template {location.state.userId}
    </div>
  )
}
