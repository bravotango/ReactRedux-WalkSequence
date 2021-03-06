import React, { Component } from "react";
import "../App.scss";
import { connect } from "react-redux";

class Controls extends Component {
  render() {
    const {
      images,
      interval,
      increment,
      decrement,
      pause,
      cycle,
      reset,
      setIntervalId,
      clearIntervalId
    } = this.props;

    const handleClickPlay = () => {
      cycle();
      if (!interval) {
        setIntervalId(
          setInterval(() => {
            increment(1, images.length - 1);
          }, 250)
        );
      }
    };

    const handleClickPause = () => {
      pause();
      if (interval) {
        clearInterval(interval);
        clearIntervalId(interval);
      }
    };

    return (
      <>
        <div className="btn-group" role="group">
          <button
            class="btn"
            type="link"
            onClick={event => {
              handleClickPlay();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              width="32"
              height="32"
            >
              <path d="M1792 1024L512 1920V128l1280 896zM640 1674l929-650-929-650v1300z" />
            </svg>
          </button>
          <button class="btn" onClick={() => decrement(1, images.length - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              width="32"
              height="32"
            >
              <path d="M896 1674L90 1024l806-645v1295zm-128-267V645l-474 379 474 383zm218-383l806-645v1295l-806-650zm678 383V645l-474 379 474 383z" />
            </svg>
          </button>
          <button class="btn" onClick={() => increment(1, images.length - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              width="32"
              height="32"
            >
              <path d="M1152 379l806 645-806 650V379zm128 266v762l474-383-474-379zM256 1674V379l806 645-806 650zM384 645v762l474-383-474-379z" />
            </svg>
          </button>
          <button class="btn" onClick={() => handleClickPause()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              width="32"
              height="32"
            >
              <path d="M640 256h128v1536H640V256zm768 0v1536h-128V256h128z" />
            </svg>
          </button>
          <button class="btn" onClick={() => reset()}>
            reset
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.images,
    interval: state.interval,
    isCycling: state.isCycling
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: (num, len) => {
      dispatch({ type: "INCREMENT", payload: { num, len } });
    },
    decrement: (num, len) => {
      dispatch({ type: "DECREMENT", payload: { num, len } });
    },
    pause: () => {
      dispatch({ type: "PAUSE" });
    },
    cycle: () => {
      dispatch({ type: "CYCLING" });
    },
    reset: () => {
      dispatch({ type: "RESET" });
    },
    setIntervalId: cycleId => {
      dispatch({ type: "SET_INTERVAL", payload: cycleId });
    },
    clearIntervalId: cycleId => {
      dispatch({ type: "CLEAR_INTERVAL", payload: cycleId });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
