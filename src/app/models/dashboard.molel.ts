export const DashboardChartOptions = [
    { 
      headerText : 'Sales for last 12 months',
      chartTypeID : 1,
      loadOnInit : false,
      chartOptions : {
        chart: {
                  type: 'column'
              },
              title: {
                  text: ''
              },
              xAxis: {
                  categories: []
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'Total Net Sale Amount'
                  },
                  stackLabels: {
                      enabled: true,
                      style: {
                          fontWeight: 'bold',
                          color: 'gray'
                      }
                  }
              },
              legend: {
                  align: 'right',
                  x: 0,
                  verticalAlign: 'top',
                  y: 25,
                  floating: true,
                  backgroundColor: 'white',
                  borderColor: '#CCC',
                  borderWidth: 1,
                  shadow: false
              },
              tooltip: {
                  headerFormat: '<b>{point.x}</b><br/>',
                  pointFormat: '{series.name}: {point.y:,.2f}'
              },
              plotOptions: {
                  column: {
                      dataLabels: {
                          enabled: true,
                          color: 'white'
                      }
                  }
              },
              series: []
      }
    },
    {
      headerText : 'Brokerage for last 12 months',
      chartTypeID : 2,
      loadOnInit : false,
      chartOptions : {
              chart: {
                  type: 'column'
              },
              title: {
                  text: ''
              },
              xAxis: {
                  categories: []
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'Total Brokerage'
                  },
                  stackLabels: {
                      enabled: true,
                      style: {
                          fontWeight: 'bold',
                          color: 'gray'
                      }
                  }
              },
              legend: {
                  align: 'right',
                  x: 0,
                  verticalAlign: 'top',
                  y: 25,
                  floating: true,
                  backgroundColor: 'white',
                  borderColor: '#CCC',
                  borderWidth: 1,
                  shadow: false
              },
              tooltip: {
                  headerFormat: '<b>{point.x}</b><br/>',
                  pointFormat: '{series.name}: {point.y:,.2f}<br/>Total: {point.stackTotal:,.2f}'
              },
              plotOptions: {
                  column: {
                      stacking: 'normal',
                      dataLabels: {
                          enabled: true,
                          color: 'white'
                      }
                  }
              },
              series: []
          }
    },
    {
      headerText : 'Brokerage distribution for last 12 months',
      chartTypeID : 3,
      loadOnInit : false,
      chartOptions : {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              title: {
                  text: ''
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.y:,.2f}</b>'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          //format: '<b>{point.name}</b>: {point.percentage:.2f} % - {point.y:,.2f}',
                          format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                          style: {
                              color: 'black'
                          },
                          connectorColor: 'silver'
                      }
                  }
              },
              series: []
          }
    },
    {
      headerText : 'Interest details for last 12 months',
      chartTypeID : 4,
      loadOnInit : false,
      chartOptions : {
              chart: {
                  type: 'column'
              },
              title: {
                  text: ''
              },
              xAxis: {
                  categories: []
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'Total Pay Amount'
                  },
                  stackLabels: {
                      enabled: true,
                      style: {
                          fontWeight: 'bold',
                          color: 'gray'
                      }
                  }
              },
              legend: {
                  align: 'right',
                  x: -25,
                  verticalAlign: 'top',
                  y: 0,
                  floating: true,
                  backgroundColor: 'white',
                  borderColor: '#CCC',
                  borderWidth: 1,
                  shadow: false
              },
              tooltip: {
                  headerFormat: '<b>{point.x}</b><br/>',
                  pointFormat: '{series.name}: {point.y:,.2f}<br/>Total: {point.stackTotal}'
              },
              plotOptions: {
                  column: {
                      stacking: 'normal',
                      dataLabels: {
                          enabled: true,
                          color: 'white'
                      }
                  }
              },
              series: []
          }
    },
    {
      headerText : 'Loan given in last 24 months',
      chartTypeID : 5,
      loadOnInit : false,
      chartOptions : {
              chart: {
                  type: 'column'
              },
              title: {
                  text: ''
              },
              xAxis: {
                  categories: []
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'Total Interest Received'
                  },
                  stackLabels: {
                      enabled: true,
                      style: {
                          fontWeight: 'bold',
                          color: 'gray'
                      }
                  }
              },
              legend: {
                  align: 'right',
                  x: -25,
                  verticalAlign: 'top',
                  y: 0,
                  floating: true,
                  backgroundColor: 'white',
                  borderColor: '#CCC',
                  borderWidth: 1,
                  shadow: false
              },
              tooltip: {
                  headerFormat: '<b>{point.x}</b><br/>',
                  pointFormat: '{series.name}: {point.y:,.2f}<br/>Total: {point.stackTotal}'
              },
              plotOptions: {
                  column: {
                      stacking: 'normal',
                      dataLabels: {
                          enabled: true,
                          color: 'white'
                      }
                  }
              },
              series: []
          }
    }
  ];