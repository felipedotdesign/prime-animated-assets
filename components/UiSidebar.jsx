import sidebarUrl from '../assets/ui/training-sidebar.svg?url';
import frameUrl from '../assets/ui/training-frame.svg?url';
import dividerUrl from '../assets/ui/training-icon.svg?url';
import cubeUrl from '../assets/ui/training-cube.svg?url';
import barsUrl from '../assets/ui/training-bars.svg?url';
import dotsUrl from '../assets/ui/training-dots.svg?url';
import activityUrl from '../assets/ui/training-activity.svg?url';
import gpuUrl from '../assets/ui/training-gpu.svg?url';
import calendarUrl from '../assets/ui/training-calendar-days.svg?url';
import cubesUrl from '../assets/ui/training-cubes.svg?url';
import inferenceSidebarUrl from '../assets/ui/inference-sidebar.svg?url';
import inferenceFrameUrl from '../assets/ui/inference-frame.svg?url';
import inferenceDividerUrl from '../assets/ui/inference-icon.svg?url';
import inferenceCubeUrl from '../assets/ui/inference-cube.svg?url';
import inferenceBarsUrl from '../assets/ui/inference-bars.svg?url';
import inferenceDotsUrl from '../assets/ui/inference-dots.svg?url';
import inferenceActivityUrl from '../assets/ui/inference-activity.svg?url';
import inferenceGpuUrl from '../assets/ui/inference-gpu.svg?url';
import inferenceCalendarUrl from '../assets/ui/inference-calendar-days.svg?url';
import inferenceCubesUrl from '../assets/ui/inference-cubes.svg?url';

const iconSets = {
  training: {
    sidebar: sidebarUrl,
    frame: frameUrl,
    divider: dividerUrl,
    cube: cubeUrl,
    bars: barsUrl,
    dots: dotsUrl,
    activity: activityUrl,
    gpu: gpuUrl,
    calendar: calendarUrl,
    cubes: cubesUrl,
  },
  inference: {
    sidebar: inferenceSidebarUrl,
    frame: inferenceFrameUrl,
    divider: inferenceDividerUrl,
    cube: inferenceCubeUrl,
    bars: inferenceBarsUrl,
    dots: inferenceDotsUrl,
    activity: inferenceActivityUrl,
    gpu: inferenceGpuUrl,
    calendar: inferenceCalendarUrl,
    cubes: inferenceCubesUrl,
  },
};

function SidebarIcon({ src, selected = false }) {
  return (
    <div className={`ui-sidebar__item${selected ? ' is-selected' : ''}`}>
      <img src={src} alt="" />
    </div>
  );
}

function SidebarDivider({ src }) {
  return <div className="ui-sidebar__divider"><img src={src} alt="" /></div>;
}

export default function UiSidebar({ variant = 'training', selected = 'dots' }) {
  const icons = iconSets[variant] ?? iconSets.training;

  return (
    <aside className="ui-sidebar" aria-hidden="true">
      <div className="ui-sidebar__mark"><img src={icons.sidebar} alt="" /></div>
      <SidebarIcon src={icons.frame} selected={selected === 'frame'} />
      <SidebarIcon src={icons.cube} selected={selected === 'cube'} />
      <SidebarIcon src={icons.bars} selected={selected === 'bars'} />
      <SidebarIcon src={icons.dots} selected={selected === 'dots'} />
      <SidebarIcon src={icons.activity} selected={selected === 'activity'} />
      <SidebarDivider src={icons.divider} />
      <SidebarIcon src={icons.gpu} selected={selected === 'gpu'} />
      <SidebarIcon src={icons.calendar} selected={selected === 'calendar'} />
      <SidebarIcon src={icons.cubes} selected={selected === 'cubes'} />
      <div className="ui-sidebar__spacer" />
      <div className="ui-sidebar__spacer" />
    </aside>
  );
}
