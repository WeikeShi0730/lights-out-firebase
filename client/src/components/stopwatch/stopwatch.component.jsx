import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import UserService from "../../services/user-service";
import { toast } from "react-toastify";
import "./stopwatch.styles.scss";
import { setCurrentUser } from "../../redux/actions/user.action";
import { setLeaderboard } from "../../redux/actions/leaderboard.action";

const Stopwatch = ({
  currentUser,
  setCurrentUser,
  setLeaderboard,
  onLightsChange,
  clickedInside,
}) => {
  const [on, setOn] = useState(false);
  const [click, setClick] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [jump, setJump] = useState(false);
  const [intervalTimer, setIntervalTimer] = useState(0);
  const [intervalLights, setIntervalLights] = useState(0);
  const [timeOut, setTimeOut] = useState(0);
  const [currentBest, setCurrentBest] = useState(
    currentUser ? currentUser.timer : null
  );
  const history = useHistory();

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
    const random = Math.floor((Math.random() * 3 + 1) * 1000);
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
      await updateLeaderboard();
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

  const updateLeaderboard = async () => {
    const leaderboard = await UserService.getAll();
    setLeaderboard(leaderboard.data);
  };

  const handleBestTime = async (currentTimer) => {
    currentTimer = currentTimer / 1000;
    if (currentTimer < currentBest) {
      setCurrentBest(currentTimer);
      try {
        let updatedUser = { ...currentUser };
        updatedUser["timer"] = currentTimer;
        const { token, ...updatedUserNoToken } = updatedUser;
        setCurrentUser(updatedUser);
        await UserService.update(updatedUserNoToken, token);
        toast.success("new personal record 🎉", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 3000,
        });
      } catch (error) {
        setCurrentUser(null);
        history.push("/sign-in");
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
        console.error(error.response.data.message);
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
      <h3 className="notice text-sm lg:text-md">
        tap/click when you are ready to race, and tap again when the lights go
        out
      </h3>
      <div className="text-xl time">
        {jump ? <div>jump start</div> : <div>{formatTimer(timer)}</div>}
      </div>

      <div className="footer">
        <div className="text-sm md:text-base lg:text-lg">
          best:
          {currentBest
            ? currentBest !== Number.MAX_VALUE
              ? currentBest.toPrecision(3) + " s"
              : " no data"
            : " please sign in to record time!"}
        </div>
        <div className="text-xs md:text-sm">
          create by{" "}
          <a
            className="flex justify-center items-center font-black"
            href="https://www.linkedin.com/in/weike-shi/"
          >
            @ weike shi
            <img src="/icons8-linkedin-24.png" alt="linkedin" />
          </a>
        </div>
        <div className="text-xs md:text-sm">
          <a
            className="flex justify-center items-center font-black"
            href="https://github.com/WeikeShi0730/lights-out-node"
          >
            @ github
            <img src="/icons8-github-24.png" alt="github" />
          </a>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, { setLeaderboard, setCurrentUser })(
  Stopwatch
);
