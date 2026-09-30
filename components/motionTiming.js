export const MOTION_STEP = 20;

const step = (count) => count * MOTION_STEP;

export const MOTION_TIMING = Object.freeze({
  rewardCurve: {
    delay: step(8),
    duration: step(67),
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
    dashDuration: step(45),
    dotDuration: step(450),
  },
});
