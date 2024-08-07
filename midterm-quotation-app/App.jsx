import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const distRef = useRef();
  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    const item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      dist: parseFloat(distRef.current.value),
    };

    setDataItems((prevDataItems) => {
      const existingItemIndex = prevDataItems.findIndex(
        (dataItem) =>
          dataItem.item === newItem.item && dataItem.ppu === newItem.ppu
      );

      if (existingItemIndex >= 0) {
        const updatedItems = prevDataItems.map((dataItem, index) => {
          if (index === existingItemIndex) {
            return {
              ...dataItem,
              qty: dataItem.qty + newItem.qty,
              dist: parseFloat(dataItem.dist) + parseFloat(newItem.dist),
            };
          }
          return dataItem;
        });
        return updatedItems;
      } else {
        return [...prevDataItems, newItem];
      }
    });
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    setDataItems((prevDataItems) =>
      prevDataItems.filter((_, i) => i !== index)
    );
  };

  const productChange = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(parseFloat(e.target.value))}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" ref={distRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
