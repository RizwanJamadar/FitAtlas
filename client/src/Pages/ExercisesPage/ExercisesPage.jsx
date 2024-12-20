// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { GlobalStateContext } from "../../Context/Context.jsx"
import ExerciseCards from "../../Components/ExerciseCards/ExerciseCards.jsx"
import "./ExercisesPage.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion, useScroll, useSpring } from "framer-motion"
import { Skeleton } from "@mui/material"
import Box from "@mui/material/Box"

const ExercisesPage = () => {
  const { muscle, setMuscle } = useContext(GlobalStateContext)
  const navigate = useNavigate()
  const [exData, setExData] = useState(null)
  const [error, setError] = useState({})

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

   useEffect(() => {
    window.scroll({
    top: 0,
  });
  }, [])
  
  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/target/${muscle}`,
    headers: {
      'x-rapidapi-key': '17263075fcmshc42d4b1e4dbd7bbp155594jsnfc8461a2b332',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  }

  async function exerciseDbApi(options) {
    try {
      const res = await axios.request(options)
      console.log(res);
      setExData(res.data)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    exerciseDbApi(options)
  }, [])

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <h3 className="title">
        EXERCISES FOR <span>{muscle.toUpperCase()}</span>
      </h3>
      <div className="card-container">
        {exData ? (
          exData.map((item) => {
            return (
              <ExerciseCards
                onClick={() => {
                  navigate(`/exercises/${item.id}`)
                }}
                key={item.id}
                bodyPart={item.bodyPart}
                equipment={item.equipment}
                gifUrl={item.gifUrl}
                id={item.id}
                name={item.name}
                target={item.target}
              />
            )
          })
        ) : (
          //prettier-ignore
          <>
          
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />
            <Skeleton variant="rectangular" width={360} height={480} animation="pulse" sx={{ bgcolor: '#3b3b3b', borderRadius:"15px" ,margin: "10px 40px"}}    />

          </>
        )}
      </div>
    </>
  )
}

export default ExercisesPage
