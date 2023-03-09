import sys
from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel

appGame1 = FastAPI()


class EachTrial(BaseModel):
    userID: str
    trialID: int
    Head: float
    Tail: float
    timeUsed: float


class trialManager:
    all_trials = {}
    trial_count = 0
    # user_ids = []

    # def test(self):
    #     return "Test"

    def recordTrial(self, trial: EachTrial):
        self.all_trials[self.trial_count] = trial
        trial.trialID = self.trial_count
        self.trial_count += 1
        # if trial.userID not in self.user_ids:
        #     self.user_ids.append(trial.userID)
        return "Your current trial is successfully recorded"

    def getAllTrials(self):
        return list(self.all_trials.values())


trialManager = trialManager()


# @appGame1.get("/")
# def home():
#     return trialManager.test()
@appGame1.post("/record-trial")
def record_trial(trial: EachTrial):
    return trialManager.recordTrial(trial)


@appGame1.get("/get-all-trials")
def get_all_trials():
    return trialManager.getAllTrials()


# @appGame1.get("/get-post-by-user/")
if __name__ == "__main__":
    try:
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except KeyboardInterrupt:
        sys.exit()
