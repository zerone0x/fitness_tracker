// BarChart.jsx
import React from 'react';

const BarChart = ({ data }) => {
  // 假设 data.notes 和 data.checkedNotes 是我们需要的数据

  // 这里是将数据转换为条形图所需的格式的逻辑
  // 你可以使用任何条形图库，比如 'recharts', 'chart.js', 'victory', 或其他任何库
  // 下面是一个非常基础的例子，没有使用外部库

  // 计算每个部位的完成次数
  const counts = Object.values(data.checkedNotes).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  // 获取最大计数值以用于规范化条形图的高度
  const maxCount = Math.max(...Object.values(counts), 0);

  return (
    <div>
      <h2>健身完成情况条形图</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {Object.keys(counts).map((part) => (
          <div key={part} style={{ textAlign: 'center' }}>
            <div
              style={{
                height: `${(counts[part] / maxCount) * 100}%`,
                width: '50px',
                backgroundColor: 'blue',
                margin: '0 auto',
                color: 'white',
              }}
            >
              {counts[part]}
            </div>
            {part}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;