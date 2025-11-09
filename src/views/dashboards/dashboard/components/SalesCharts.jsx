import React, { useState, useEffect } from 'react';
import { Card, Row, CardBody, Col } from 'react-bootstrap';
import { Link } from "react-router";
import { TbArrowRight } from 'react-icons/tb';
import ChartJsClient from '@/components/CustomChartJs';
import { salesAnalyticsChart, totalSalesChart } from '@/views/dashboards/dashboard/data';
import { ArcElement, BarController, BarElement, LineController, LineElement, PieController, PointElement } from 'chart.js';
const SalesCharts = () => {
  const [chartConfig, setChartConfig] = useState({
    data: { labels: [], datasets: [] },
    options: {}
  });
  const [salesChartConfig, setSalesChartConfig] = useState({
    data: { labels: [], datasets: [] },
    options: {}
  });

  useEffect(() => {
    const fetchChart = async () => {
      const config = await totalSalesChart();
      setChartConfig(config);
    };
    fetchChart();
  }, []);

  useEffect(() => {
    const fetchSalesChart = async () => {
      const config = await salesAnalyticsChart();
      setSalesChartConfig(config);
    };
    fetchSalesChart();
  }, []);
  return <Card>
    <CardBody className="p-0">
      <Row className="g-0">
        <Col xxl={3} xl={6} className="order-xl-1 order-xxl-0">
          <div className="p-3 border-end border-dashed">
            <h4 className="card-title mb-0">División de articulos</h4>
            <p className="text-muted fs-xs">Se muestra la clasificicación de los articulos por stock.</p>

            <Row className="mt-4">
              <Col lg={12}>
                <ChartJsClient type={'doughnut'} getOptions={() => chartConfig} height={300} plugins={[PieController, ArcElement]} />
              </Col>
            </Row>
          </div>
          <hr className="d-xxl-none border-light m-0" />
        </Col>
        <Col xxl={9} className="order-xl-3 order-xxl-1">
          <div className="px-4 py-3">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="card-title">Flujo de movimientos</h4>
            </div>

            <div dir="ltr">
               <ChartJsClient type={'bar'} getOptions={() => salesChartConfig} height={330} plugins={[BarController, BarElement, PointElement, LineElement, LineController]} />
             </div>
          </div>
        </Col>
      </Row>
    </CardBody>
  </Card>;
};
export default SalesCharts;