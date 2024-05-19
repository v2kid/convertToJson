import { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import story from "./story";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";

const MODEL_NAME = "gemini-1.5-flash-latest";
const API_KEY = "AIzaSyB8yIU_vv9WXmJyT10wM10YPJ0pyl9Z3Hc";

const CharacterGenerating = () => {
  const [form] = Form.useForm();
  const [fileContent, setFileContent] = useState<string>("");

  const handleFileRead = (event: ProgressEvent<FileReader>) => {
    const fileReader = event.target as FileReader;
    setFileContent(fileReader.result as string);
  };

  const handleFileChosen = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
  const genAI = new GoogleGenerativeAI(API_KEY);
  const generationConfig = {
    stopSequences: ["red"],
    temperature: 2,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 8192,
  };
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig,
  });
  useEffect(() => {
    form.setFieldsValue({
      parts: [{ text: fileContent }],
    });
  }, [fileContent]);

  const [result, setResult] = useState<any>();

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];
  const confirm = useCallback(async () => {
    const { parts } = form.getFieldsValue();
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      safetySettings,
    });
    const response = result.response;
    setResult(response.text());
  }, [form, model]);

  return (
    <>
      <input
        type="file"
        accept=".txt"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileChosen(e.target.files[0]);
          }
        }}
      />
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="new_form"
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.List name={"parts"}>
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
                        <PlusOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item label="Text" name={[field.name, "text"]}>
                        <Input.TextArea
                          rows={4}
                          maxLength={200}
                          placeholder="maxLength is 200"
                        />
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
            <textarea value={fileContent} readOnly rows={10} cols={50} />
            {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
            <textarea value={result} readOnly rows={10} cols={50} />
          </Col>
          <Col span={24}>
            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  <div>
                    <button onClick={confirm}>Generate</button>
                    <br />

                  
                  </div>
                </Typography>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CharacterGenerating;
