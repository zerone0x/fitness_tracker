import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import './App.css'; 

const initialParts = ['爬坡', '背', '腿', '肩', '臀','手臂']; 

function App() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [parts, setParts] = useState(
    JSON.parse(localStorage.getItem('parts')) || initialParts
  );
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('notes')) || {}
  );
  const [checkedNotes, setCheckedNotes] = useState(
    JSON.parse(localStorage.getItem('checkedNotes')) || {}
  );

  const daysInMonth = new Date(2024, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    localStorage.setItem('parts', JSON.stringify(parts));
  }, [parts]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('checkedNotes', JSON.stringify(checkedNotes));
  }, [checkedNotes]);

  function isToday(day, month, year) {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();
  }
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setNotes({}); // 清空备注
    setCheckedNotes({}); // 清空打勾状态
  };

  const handleNoteChange = (day, part, event) => {
    const key = `${day}-${part}`;
    const updatedNotes = { ...notes, [key]: event.target.value };
    setNotes(updatedNotes);
  };

  const handleCheckChange = (day, part, event) => {
    const key = `${day}-${part}`;
    const updatedCheckedNotes = { ...checkedNotes, [key]: event.target.checked };
    setCheckedNotes(updatedCheckedNotes);
  };

  const handlePartChange = (index, event) => {
    const updatedParts = [...parts];
    updatedParts[index] = event.target.value;
    setParts(updatedParts);
  };

  const addPart = () => {
    setParts([...parts, '']);
  };

  const removePart = (index) => {
    const updatedParts = parts.filter((_, i) => i !== index);
    setParts(updatedParts);
    // 移除部位时也应该清理备注和打勾状态
    const updatedNotes = { ...notes };
    const updatedCheckedNotes = { ...checkedNotes };
    days.forEach(day => {
      const key = `${day}-${parts[index]}`;
      delete updatedNotes[key];
      delete updatedCheckedNotes[key];
    });
    setNotes(updatedNotes);
    setCheckedNotes(updatedCheckedNotes);
  };

  // 准备传递给BarChart组件的数据
  const chartData = {
    // 可以根据需要进行格式化和计算
    notes,
    checkedNotes
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>2024年 健身计划</h1>
      <label htmlFor="month-select">选择月份：</label>
      <select id="month-select" value={month} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((monthOption) => (
          <option key={monthOption} value={monthOption}>
            {monthOption}月
          </option>
        ))}
      </select>

      <table style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>日期\部位</th>
            {parts.map((part, index) => (
              <th key={index}>
                <input
                  type="text"
                  value={part}
                  onChange={(event) => handlePartChange(index, event)}
                />
                <button onClick={() => removePart(index)}>X</button>
              </th>
            ))}
            <th><button onClick={addPart}>新增部位</button></th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
             <td className={isToday(day, month, new Date().getFullYear()) ? 'today' : ''}>
                {day}日
              </td>
              {parts.map((part, index) => {
                const key = `${day}-${part}`;
                return (
                  <td key={index}>
                    <input
                      type="checkbox"
                      checked={checkedNotes[key] || false}
                      onChange={(event) => handleCheckChange(day, part, event)}
                    />
                    <input
                      type="text"
                      value={notes[key] || ''}
                      onChange={(event) => handleNoteChange(day, part, event)}
                      placeholder="备注"
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <BarChart data={chartData} />

    </div>); }
export default App;
