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

function SidebarIcon({ src, selected = false }) {
  return (
    <div className={`ui-sidebar__item${selected ? ' is-selected' : ''}`}>
      <img src={src} alt="" />
    </div>
  );
}

function SidebarDivider() {
  return <div className="ui-sidebar__divider"><img src={dividerUrl} alt="" /></div>;
}

export default function UiSidebar() {
  return (
    <aside className="ui-sidebar" aria-hidden="true">
      <div className="ui-sidebar__mark"><img src={sidebarUrl} alt="" /></div>
      <SidebarIcon src={frameUrl} />
      <SidebarIcon src={cubeUrl} />
      <SidebarIcon src={barsUrl} />
      <SidebarIcon src={dotsUrl} selected />
      <SidebarIcon src={activityUrl} />
      <SidebarDivider />
      <SidebarIcon src={gpuUrl} />
      <SidebarIcon src={calendarUrl} />
      <SidebarIcon src={cubesUrl} />
      <div className="ui-sidebar__spacer" />
      <div className="ui-sidebar__spacer" />
    </aside>
  );
}
