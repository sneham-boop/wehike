import { atom, useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { recoilPersist } from "recoil-persist";
import { userState } from "./useAppData";

// Used to persist global app state after manual refreshes.
// See key in local storage for browser
const { persistAtom } = recoilPersist();

export const runsState = atom({
  key: "runsState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const runnerRunsState = atom({
  key: "runnerRunsState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const plannerRunsState = atom({
  key: "plannerRunsState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default function useRuns(options) {
  const [runs, setRuns] = useRecoilState(runsState);
  const [runnerRuns, setRunnerRuns] = useRecoilState(runnerRunsState);
  const [plannerRuns, setPlannerRuns] = useRecoilState(plannerRunsState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    Promise.all([axios.get("https://werun-server.herokuapp.com/api/runs")])
      .then((response) => {
        const { runs } = response[0].data;
        setRuns(runs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user || options.update) {
      Promise.all([
        axios.get(
          `https://werun-server.herokuapp.com/api/runs/runner/${user.id}`
        ),
        axios.get(
          `https://werun-server.herokuapp.com/api/runs/planner/${user.id}`
        ),
      ])
        .then((response) => {
          const { runnerRuns } = response[0].data;
          const { plannerRuns } = response[1].data;
          setRunnerRuns(runnerRuns);
          setPlannerRuns(plannerRuns);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [options.update, user]);
  return {
    runs,
    runnerRuns,
    plannerRuns,
  };
}
