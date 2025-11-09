import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { getStatCards } from '@/views/dashboards/dashboard/data';
import SalesCharts from '@/views/dashboards/dashboard/components/SalesCharts';
import ProductInventory from '@/views/dashboards/dashboard/components/ProductInventory';
import RecentOrders from '@/views/dashboards/dashboard/components/RecentOrders';
import StatCard from "@/views/dashboards/dashboard/components/StatCard";
const Index = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getStatCards();
      setCards(data);
    })();
  }, []);
  return <Container fluid>
    <PageBreadcrumb title={'Dashboard'} />
    <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
      {cards.map((card) => <Col key={card.id}>
        <StatCard item={card} />
      </Col>)}
    </Row>

    <Row>
      <Col xs={12}>
        <SalesCharts />
      </Col>
    </Row>

    <Row>
      <Col xxl={6}>
        <ProductInventory />
      </Col>

      <Col xxl={6}>
        <RecentOrders />
      </Col>
    </Row>
  </Container>;
};
export default Index;