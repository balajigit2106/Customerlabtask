import React, { useState } from "react";
import "./App.css";
import { Button, Modal, Form, Select, Input } from "antd";

const { Option } = Select;
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemaList, setSchemaList] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [availableOptions, setAvailableOptions] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSchema(null);
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      const selectedOption = availableOptions.find(
        (opt) => opt.value === selectedSchema
      );
      setSchemaList([...schemaList, selectedOption]);

      // Remove selected option from availableOptions
      const remainingOptions = availableOptions.filter(
        (opt) => opt.value !== selectedSchema
      );
      setAvailableOptions(remainingOptions);

      // reset the dropdown
      setSelectedSchema(null);
    }
  };

  const handleSaveSegment = () => {
    const payload = {
      segment_name: segmentName,
      schema: schemaList.map((item) => ({ [item.value]: item.label })),
    };
    console.log("Data to send:", payload);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Button type="primary" onClick={showModal}>
        Save Segment
      </Button>

      {/* save segment modal */}
      <Modal
        title="Save Segment"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSaveSegment}
      >
        <Form layout="vertical">
          <Form.Item label="Segment Name">
            <Input
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Add schema to segment">
            <Select
              value={selectedSchema}
              onChange={(value) => setSelectedSchema(value)}
              style={{ width: "100%" }}
              placeholder="Select schema"
            >
              {availableOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="link" onClick={handleAddSchema}>
            + Add new schema
          </Button>

          <div
            style={{
              backgroundColor: "lightblue",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            {schemaList.map((schema, index) => (
              <Select
                key={index}
                value={schema.value}
                style={{ width: "100%", marginBottom: "10px" }}
                onChange={(value) => {
                  const updatedList = [...schemaList];
                  updatedList[index] = availableOptions.find(
                    (opt) => opt.value === value
                  );
                  setSchemaList(updatedList);
                }}
              >
                {availableOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            ))}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
