export const MOTION_STEP = 20;

const step = (count) => count * MOTION_STEP;

const motionTiming = {
  rewardCurve: {
    delay: step(8),
    duration: step(67),
    valueDuration: step(68),
  },
  evaluationTable: {
    delay: step(14),
    duration: step(52),
  },
  observability: {
    delay: step(6),
    crossDuration: step(14),
    centerDuration: step(39),
  },
  yourModel: {
    plusDelay: step(4),
    plusDuration: step(22),
    flowDelay: step(6),
    flowDuration: step(14),
  },
  customBehavior: {
    delay: step(6),
    duration: step(20),
  },
  models: {
    flowDelay: step(6),
    flowDuration: step(24),
    branchStagger: step(5),
    dotDuration: step(5),
  },
  productionTraces: {
    delay: step(6),
    duration: step(22),
  },
  environments: {
    textDelay: step(5),
    characterDuration: step(1),
    durationOffset: step(2),
    textGap: step(2),
  },
  continuousImprovement: {
    rotationDuration: step(75),
  },
  docker: {
    flowDelay: step(6),
    flowDuration: step(30),
    activationDuration: step(10),
  },
  loop: {
    delay: step(6),
    duration: step(40),
    checkpointDuration: step(8),
    checkpointStagger: step(5),
  },
  liquid: {
    fillDuration: step(8),
    initialDelay: step(50),
    fillInterval: step(50),
  },
  onDemand: {
    delay: step(6),
    duration: step(30),
  },
  ui: {
    lineDelay: step(8),
    lineDuration: step(67),
    nextTickPulseDuration: step(80),
  },
  trainingUi: {
    backgroundTickInterval: step(200),
  },
  inferenceUi: {
    requestInterval: step(200),
    successRateInterval: step(400),
  },
};

for (const [groupName, group] of Object.entries(motionTiming)) {
  for (const [timingName, value] of Object.entries(group)) {
    if (!Number.isInteger(value / MOTION_STEP)) {
      throw new Error(`${groupName}.${timingName} must align to the ${MOTION_STEP}ms motion step`);
    }
  }
}

export const MOTION_TIMING = Object.freeze(motionTiming);
