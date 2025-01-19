// MyPage.js
import React from "react";
import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Upload,
  Form,
  Input,
} from "antd";
import {
  HomeOutlined,
  IdcardOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";

/* (추가) CSS Module import */
import styles from "../../css/myPage/MyPage.module.css";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function MyPage() {
  // (예시) 업로드 후 이미지를 보관할 state
  // const [imageUrl, setImageUrl] = useState(null);

  // 업로드 이벤트 (백엔드 업로드 등 실제 로직은 필요 시 추가)
  const handleUploadChange = (info) => {
    // setImageUrl(...)
  };

  return (
    <Layout className={styles.layout}>
      {/* 사이드바 */}
      <Sider breakpoint="lg" collapsedWidth="80" className={styles.sider}>
        <div className={styles.logoArea}>{/* 로고 자리 */}</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className={styles.menu}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<IdcardOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<FileDoneOutlined />}>
            Documents
          </Menu.Item>
          <Menu.Item key="4" icon={<NotificationOutlined />}>
            Notifications
          </Menu.Item>
        </Menu>
      </Sider>

      {/* 메인 영역 */}
      <Layout>
        {/* 상단 헤더 */}
        <Header className={styles.header}>
          <div>
            <SettingOutlined style={{ fontSize: 20, marginRight: 16 }} />
            <BellOutlined style={{ fontSize: 20 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              icon={<UserOutlined />}
              style={{ marginRight: 8, backgroundColor: "#FFB74D" }}
            />
            <Text strong>User Name</Text>
          </div>
        </Header>

        {/* 실제 컨텐츠 */}
        <Content className={styles.content}>
          <Card className={styles.profileCard}>
            <Title level={3} className={styles.profileTitle}>
              Profile
            </Title>

            <Row gutter={[32, 32]}>
              {/* 왼쪽: 프로필 이미지, 업로드 */}
              <Col xs={24} md={8}>
                <div className={styles.avatarWrapper}>
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#FFD180" }}
                  />
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    onChange={handleUploadChange}
                    style={{ marginTop: 16 }}
                  >
                    <Button type="primary">이미지 업로드</Button>
                  </Upload>
                </div>

                {/* 아래쪽 구역 */}
                <div className={styles.uploadExtra}>
                  <Button style={{ borderStyle: "dashed" }}>Logo</Button>
                  <Button style={{ borderStyle: "dashed" }}>
                    Vendor Documents
                  </Button>
                </div>
              </Col>

              {/* 오른쪽: 사용자 정보 */}
              <Col xs={24} md={16}>
                <Form layout="vertical" className={styles.userForm}>
                  <Form.Item label="Name">
                    <Input placeholder="User name" />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input type="email" placeholder="user@example.com" />
                  </Form.Item>
                  <Form.Item label="Phone Number">
                    <Input placeholder="+82-10-1234-5678" />
                  </Form.Item>
                  <Form.Item label="Address">
                    <Input placeholder="서울시 OO구 OO동 123-45" />
                  </Form.Item>
                  <div style={{ marginTop: 16 }}>
                    <Button type="primary">Edit Profile</Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyPage;
