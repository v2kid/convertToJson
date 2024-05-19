import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [listName, setListName] = useState("items"); // initial list name
  const [inputValue, setInputValue] = useState("cau-chuyen-1"); // initial input value
  const changeListName = (newName: string) => {
    setListName(newName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    changeListName(inputValue);
  };

  useEffect(() => {
    form.setFieldsValue({ [listName]: [{}] });
  }, [listName]);

  return (
    <>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        autoComplete="off"
        initialValues={{ [listName]: [{}] }}
      >
        <Row>
          <Col span={6}>
            <Form.List name={listName}>
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size="small"
                      title={`Item ${(field.key + 1, "Text")}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item label="Text" name={[field.name, "text"]}>
                        <TextArea
                          rows={4}
                          maxLength={200}
                          placeholder="maxLength is 6"
                        />
                      </Form.Item>
                      <Form.Item label="startSecond">
                        <Space>
                          <Form.Item name={[field.name, "startSecond", "1_1"]}>
                            <InputNumber placeholder="1_1" />
                          </Form.Item>
                          <Form.Item name={[field.name, "startSecond", "1_2"]}>
                            <InputNumber placeholder="1_2" />
                          </Form.Item>
                        </Space>
                      </Form.Item>
                    </Card>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add(undefined, fields.length)}
                    block
                  >
                    + Add New Object
                  </Button>
                </div>
              )}
            </Form.List>
          </Col>
          <Col span={12}>
            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  <Space.Compact style={{ width: "100%" }}>
                    <Input
                      onChange={handleInputChange}
                      defaultValue={inputValue}
                    />
                    <Button type="default" onClick={handleButtonClick}>
                      Submit
                    </Button>
                  </Space.Compact>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </Typography>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        form={form2}
        name="dynamic_form_complex"
        autoComplete="off"
        initialValues={{ clip: {} }}
      >
        <Row>
          <Col span={12}></Col>
          <Col span={12}>
            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  <Form.Item label="Clip Input">
                    <Space>
                      <Form.Item name={[inputValue, "name"]}>
                        <Input placeholder="name" />
                      </Form.Item>
                      <Form.Item name={[inputValue, "fileName"]}>
                        <Input placeholder="fileName.mp3" />
                      </Form.Item>
                      <Form.Item name={[inputValue, "duration"]}>
                        <InputNumber placeholder="duration" />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <pre>{JSON.stringify(form2.getFieldsValue(), null, 2)}</pre>
                </Typography>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default App;
