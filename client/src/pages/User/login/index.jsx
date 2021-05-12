import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  SolutionOutlined,
  KeyOutlined,
  RobotOutlined
} from '@ant-design/icons';

import { Alert, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { Form } from 'antd';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { FormattedMessage } from 'umi';
import styles from './index.less';
import { connect } from 'umi';
import axios from 'axios'

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const [verifiedCode, setVerifiedCode] = useState(null)
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('account');
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (type === 'account') {
      // console.log('login values', values);
      const { dispatch } = props;
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    }
    if (type === 'register') {
      // console.log('props', props);
      axios.post('/api/user/register', {
        ...values
      }).then(res => {
        if (res.data.code === 0) {
          message.success(res.data.message)
          form.resetFields();
          setType('account')
        } 
        if (res.data.code === 2) {
          message.warning(res.data.message)
        }
      }).catch(err => {
        message.error('注册失败')
      })
    }
   
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        form={form}
        submitter={{
          searchConfig: {
            submitText: '登录 / 注册',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
         <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab="登陆"
          />
          <Tabs.TabPane
            key="register"
            tab="注册"
          />
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content="账户或密码错误"
          />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="用户名: 测试账号admin"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空"
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码: 测试账号admin"
              rules={[
                {
                  required: true,
                  message: "密码不能为空"
                },
              ]}
            />
            <div
              style={{
                marginBottom: 24,
              }}
            >
              {/* <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox> */}
              <a
                style={{
                  float: 'right',
                  padding: '0 0 24px 0'
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div>
          </>
        )}

        {type === 'register' && (
          <>
           <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入用户名"
              rules={[
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (typeof value === 'undefined' || value.trim() === '')
                      return Promise.reject(new Error('字符不能为空'))
                      let res = await axios.get(`/api/user/register/${value}`)
                      if (res.data.code === 0) {
                        return Promise.resolve(res.data.message)
                      }
                      if ( res.data.code === 2) {
                        return Promise.reject(new Error(res.data.message))
                      }
                      return Promse.reject(new Error(res.data.message))
                  },
                }),
              ]}
            />
             <ProFormText
              name="realname"
              fieldProps={{
                size: 'large',
                prefix: <SolutionOutlined  className={styles.prefixIcon} />,
              }}
              placeholder="请输入真实姓名"
              rules={[
                {
                  required: true,
                  message: "真实姓名不能为空"
                },
              ]}
            />
             <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                },
              ]}
            />
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              name="email"
              placeholder="邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱",
                },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$$/,
                  message: '邮箱格式错误',
                },
              ]}
            />
            <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <KeyOutlined className={styles.prefixIcon} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            phoneName="email"
            name="code"
            rules={[
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (typeof value === 'undefined' || value.trim() === '')
                    return Promise.reject(new Error('验证码不能为空'))
                    if (value != verifiedCode) {
                      return Promise.reject(new Error('验证码不正确'))
                    } else {
                      return Promise.resolve('验证码正确')
                    }
                },
              }),
            ]}
            placeholder="请输入验证码"
            onGetCaptcha={async (email) => {
              let res = await axios.get(`/api/email/${email}`)
              if (res.data.code === 0) {
                setVerifiedCode(res.data.VerificationCode)
                message.success(res.data.message)
              }
              if (res.data.code === 1) {
                message.error(res.data.message+',请检查邮箱是否正确')
              }
            }}
          />
          <ProFormSelect
             fieldProps={{
              size: 'large',
              prefix: <RobotOutlined className={styles.prefixIcon} />,
            }}
              options={[
                {
                  value: 'tea',
                  label: '专家',
                },
                {
                  value: 'stu',
                  label: '参训者'
                }
              ]}
              name="identity"
              placeholder="请选择角色"
              rules={[
                {
                  required: true,
                  message: "角色不能为空",
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="验证码错误" />
        )}
       
      </ProForm>
    </div>
  );
};



export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
