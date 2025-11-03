import { TopLevelFormatterParams } from "echarts/types/dist/shared.js";
import { ZERO } from "../../constants";
import { CategorySpends, SpendsVsIncome, SpendsVsIncomeGrouped } from "../../types";

import * as echarts from "echarts";

export const getSpendsByCategoryOptions = (
  data: CategorySpends[]
): echarts.EChartsOption => {
  return {
    title: {
      text: "Spending by Category",
      left: "left",
    },
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const [item] = params as echarts.DefaultLabelFormatterCallbackParams[];
        return `${item.name}: ${item?.value?.toLocaleString()} USD`;
      },
    },
    xAxis: {
      type: "category",
      data: data?.map((item) => item.category),
    },
    yAxis: {
      type: "value",
      name: "Amount",
    },
    series: [
      {
        name: "Amount",
        type: "bar",
        data: data?.map((item) => item.amount),
      },
    ],
  };
};

export const getSpendsVsIncomeOptions = (
  data: SpendsVsIncome[]
): echarts.EChartsOption => {
  const { incomes, expenses, periods } = getIncomesExpensesPeriods(data);

  return {
    title: {
      text: 'Spends vs Income',
      left: 'left',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: TopLevelFormatterParams) => {
        const list = Array.isArray(params) ? params : [params];

        const incomeItem = list.find(p => p.seriesName === 'Income');
        const expenseItem = list.find(p => p.seriesName === 'Expense');

        const income = (incomeItem?.data as number) ?? ZERO;
        const expense = (expenseItem?.data as number) ?? ZERO;

        return `
          Income: <b style="color:#4caf50">${income}</b><br/>
          Expense: <b style="color:#f44336">${expense}</b>
        `;
      },
    },

    legend: {
      data: ['Income', 'Expense'],
      top: 30,
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      data: periods,
      axisLabel: {
        rotate: 30,
      },
    },

    yAxis: {
      type: 'value',
    },

    series: [
      {
        name: 'Income',
        type: 'bar',
        data: incomes,
        itemStyle: { color: '#4caf50' },
      },
      {
        name: 'Expense',
        type: 'bar',
        data: expenses,
        itemStyle: { color: '#f44336' },
      },
    ],
  };
};

export const getIncomesExpensesPeriods = (data: SpendsVsIncome[] = []) => {
  return data.reduce<SpendsVsIncomeGrouped>(
    (acc, d) => {
      acc.periods.push(d.period);
      acc.incomes.push(d.income);
      acc.expenses.push(d.expense);
      return acc;
    }, { periods: [], incomes: [], expenses: [] }
  );
};
