import sidebarUrl from '../assets/ui/training-sidebar.svg?url';
import frameUrl from '../assets/ui/training-frame.svg?url';
import cubeUrl from '../assets/ui/training-cube.svg?url';
import barsUrl from '../assets/ui/training-bars.svg?url';
import dotsUrl from '../assets/ui/training-dots.svg?url';
import activityUrl from '../assets/ui/training-activity.svg?url';
import gpuUrl from '../assets/ui/training-gpu.svg?url';
import calendarUrl from '../assets/ui/training-calendar-days.svg?url';
import cubesUrl from '../assets/ui/training-cubes.svg?url';

const icons = [frameUrl, cubeUrl, barsUrl, dotsUrl, activityUrl, gpuUrl, calendarUrl, cubesUrl];

export default function UiSidebar() {
  return (
    <aside className="ui-sidebar" aria-hidden="true">
      <div className="ui-sidebar__mark"><img src={sidebarUrl} alt="" /></div>
      <div className="ui-sidebar__separator" />
      {icons.map((icon, index) => (
        <div key={icon} className={`ui-sidebar__item${index === 3 ? ' is-selected' : ''}`}>
          <img src={icon} alt="" />
        </div>
      ))}
      <div className="ui-sidebar__separator ui-sidebar__separator--lower" />
    </aside>
  );
}
