export const lineChartDataSet = (label, backColor, borderColor, data) => {
  return {
    label: label,
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    backgroundColor: backColor,
    borderWidth: 3,
    borderColor: borderColor,
    hitRadius: 5,
    radius: 2,
    data: data,
  }
}

export const chartOptions = (title = "") => {
  return {
    scales: {
      scaleLabel: {},
    },
    title: {
      display: true,
      text: title,
      fontSize: 15,
      padding: 0,
    },
    legend: {
      display: true,
    },
    responsive: true,
    maintainAspectRatio: false,
  }
}