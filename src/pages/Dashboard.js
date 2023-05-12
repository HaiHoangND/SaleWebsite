import React from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiShoppingBag } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "UserName",
    dataIndex: "username",
  },
  {
    title: "Address Email",
    dataIndex: "addressemail",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Payment Amount",
    dataIndex: "paymentamount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    username: `User Name ${i}`,
    addressemail: `Address Email ${i}`,
    product: `Product ${i}`,
    paymentamount: `Payment Amount ${i}`,
    status: `Status ${i}`,
    time: `Time at ${i}`,
  });
}
const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      {/* <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div> */}
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 gap-3">
          <div>
            <RiMoneyDollarCircleLine className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 gap-3">
          <div>
            <HiShoppingBag className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Orders</p>
            <h4 className="mb-0 sub-title">12</h4>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 gap-3">
          <div>
            <TiShoppingCart className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Products</p>
            <h4 className="mb-0 sub-title">198</h4>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>

      <div className="my-4">
        <h3 className="mb-5">Recent Reviews</h3>
      </div>
    </div>
  );
};

export default Dashboard;
