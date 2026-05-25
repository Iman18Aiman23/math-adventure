import React from 'react';
import { RobotAIComponent, RobotReading, RobotSpeaking, RobotABC, RobotMath, RobotArabic, RobotSuper, SVGDefs } from './index';

/**
 * Example 1: Display all robots at once
 */
export const AllRobotsDemo = () => {
  return <RobotAIComponent />;
};

/**
 * Example 2: Display specific robots in a custom layout
 */
export const CustomLayoutDemo = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <h3>Reading Bot</h3>
        <svg width="100%" height="auto" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
          <SVGDefs />
          <RobotReading />
        </svg>
      </div>

      <div>
        <h3>Speaking Bot</h3>
        <svg width="100%" height="auto" viewBox="300 0 300 400" xmlns="http://www.w3.org/2000/svg">
          <SVGDefs />
          <RobotSpeaking />
        </svg>
      </div>

      <div>
        <h3>Math Bot</h3>
        <svg width="100%" height="auto" viewBox="0 370 300 400" xmlns="http://www.w3.org/2000/svg">
          <SVGDefs />
          <RobotMath />
        </svg>
      </div>

      <div>
        <h3>Arabic Bot</h3>
        <svg width="100%" height="auto" viewBox="300 370 300 400" xmlns="http://www.w3.org/2000/svg">
          <SVGDefs />
          <RobotArabic />
        </svg>
      </div>
    </div>
  );
};

/**
 * Example 3: Use robot in a card component
 */
export const RobotCardDemo = ({ robotComponent: RobotComponent, title, description }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
      <svg width="100%" height="200px" viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
        <SVGDefs />
        <RobotComponent />
      </svg>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

/**
 * Example 4: Display robots with selection
 */
export const SelectableRobotsDemo = () => {
  const [selected, setSelected] = React.useState('all');

  const robots = {
    all: RobotAIComponent,
    reading: RobotReading,
    speaking: RobotSpeaking,
    abc: RobotABC,
    math: RobotMath,
    arabic: RobotArabic,
    super: RobotSuper,
  };

  const SelectedRobot = robots[selected];

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Select Robot: </label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="all">All Robots</option>
          <option value="reading">Reading Bot</option>
          <option value="speaking">Speaking Bot</option>
          <option value="abc">ABC Bot</option>
          <option value="math">Math Bot</option>
          <option value="arabic">Arabic Bot</option>
          <option value="super">Super Bot</option>
        </select>
      </div>

      <svg width="100%" height="auto" viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
        <SVGDefs />
        {selected === 'all' ? (
          <SelectedRobot />
        ) : (
          <g transform="translate(300, 100)">
            <SelectedRobot />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Example 5: Single robot for course selection
 */
export const CourseRobotDemo = () => {
  const courses = [
    { id: 1, name: 'Reading', robot: RobotReading, color: '#AA46FF' },
    { id: 2, name: 'Speaking', robot: RobotSpeaking, color: '#FF46D8' },
    { id: 3, name: 'Math', robot: RobotMath, color: '#4CAF50' },
    { id: 4, name: 'Arabic', robot: RobotArabic, color: '#FF9800' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
      {courses.map((course) => {
        const RobotComponent = course.robot;
        return (
          <div
            key={course.id}
            style={{
              border: `2px solid ${course.color}`,
              borderRadius: '12px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <svg width="100%" height="150px" viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
              <SVGDefs />
              <RobotComponent />
            </svg>
            <h3 style={{ color: course.color, textAlign: 'center' }}>{course.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default AllRobotsDemo;
