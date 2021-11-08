import React, { useState, useEffect, useRef, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  auth,
  updateUserTimer,
  getUserFirestore,
} from "../../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import "./stopwatch.styles.scss";

const Stopwatch = ({ onLightsChange, clickedInside }) => {
  const [on, setOn] = useState(false);
  const [click, setClick] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [jump, setJump] = useState(false);
  const [intervalTimer, setIntervalTimer] = useState(0);
  const [intervalLights, setIntervalLights] = useState(0);
  const [timeOut, setTimeOut] = useState(0);
  const [currentUser] = useAuthState(auth);
  const [currentBest, setCurrentBest] = useState(null);
  const history = useHistory();

  const fetchCurrentUser = async () => {
    try {
      const user = await getUserFirestore(currentUser);
      setCurrentBest(user.timer);
    } catch (error) {
      toast.error("error fecthing user data: " + error.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      console.error("error fecthing user data: ", error.message);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      console.log(currentUser);
      fetchCurrentUser();
    } else {
      setCurrentBest(null);
    }
  }, [auth]);

  const intervalLightsRef = useRef(intervalLights);
  intervalLightsRef.current = intervalLights;
  const startLights = () => {
    let lights = 0;
    setIntervalLights(
      setInterval(() => {
        lights++;
        onLightsChange(lights);
        if (lights === 5) {
          addRandom();
          clearInterval(intervalLightsRef.current);
        }
      }, 1000)
    );
  };

  const addRandom = () => {
    const random = Math.floor((Math.random() * 3 + 2) * 1000);
    setTimeOut(
      setTimeout(() => {
        setOn(true);
        startTimer();
      }, random)
    );
  };

  const onRef = useRef(on);
  onRef.current = on;
  const startTimer = () => {
    if (click === 0) {
      onLightsChange(0);
      const startTime = window.performance.now() - time;
      setIntervalTimer(
        setInterval(() => {
          setTimer(window.performance.now() - startTime);
        }, 1)
      );
    } else {
      console.log("error");
    }
  };

  const stopTimer = async () => {
    if (onRef.current === false) {
      jumpStart();
      return;
    }

    if (click === 1) {
      setTime(0);
      clearInterval(intervalTimer);
      setOn(false);
      if (!currentUser) {
        notifyPlayingWithoutSigningIn();
      }
      await handleBestTime(timer);
    } else {
      console.log("error");
    }
  };

  const resetTimer = () => {
    if (click === 2) {
      setTime(0);
      setTimer(0);
      setOn(false);
      setJump(false);
      onLightsChange(0);
    } else {
      console.log("error");
    }
  };

  const jumpStart = () => {
    setJump(true);
    clearInterval(intervalTimer);
    clearInterval(intervalLights);
    clearTimeout(timeOut);
    return;
  };

  const formatTimer = (timer) => {
    let milliseconds = ("00" + (Math.floor(timer) % 1000)).slice(-3);
    let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2);
    return (
      <div>
        {seconds}.{milliseconds}
      </div>
    );
  };

  const notifyPlayingWithoutSigningIn = () => {
    toast.info("please sign in to record time!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
      autoClose: 3000,
    });
  };

  const handleBestTime = async (currentTimer) => {
    currentTimer = currentTimer / 1000;
    if (currentTimer < currentBest) {
      setCurrentBest(currentTimer);
      try {
        await updateUserTimer(currentUser.email, currentTimer);
        toast.success("new personal record 🎉", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 3000,
        });
      } catch (error) {
        history.push("/sign-in");
        toast.error("error updating user timer, please sign in again", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
        console.error("error updating user timer, ", error.message);
      }
    }
  };

  useEffect(() => {
    if (clickedInside !== 0) {
      if (click === 2) {
        setClick(0);
        resetTimer();
      } else {
        if (click === 0) {
          startLights();
        } else if (click === 1) {
          stopTimer();
        }
        setClick(click + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedInside]);

  return (
    <Fragment>
      <h3 className="text-center text-sm lg:text-md">
        tap/click when you are ready to race, and tap again when the lights go
        out
      </h3>
      <div className="text-xl time">
        {jump ? <div>jump start</div> : <div>{formatTimer(timer)}</div>}
      </div>
      <div className="text-center">
        <div className="text-sm md:text-base lg:text-lg">
          best:{" "}
          <span className="font-black">
            {currentBest
              ? currentBest !== Number.MAX_VALUE
                ? currentBest.toFixed(3) + " s"
                : "no data"
              : "please sign in to record time!"}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Stopwatch;
