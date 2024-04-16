import { Button, Checkbox, Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LocaleFormatter, useLocale } from '@/shared/locales';
import { formatSearch } from '@/shared/utils/formatSearch';
import { AuthLoginDto } from '@/entities/user/dto';
import { FC } from 'react';
import useAuth from '@/hooks/useAuth';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/shared/configs/constants';

import './index.less';

const LoginForm: FC = () => {
  const { handleLoginWithEmailAndPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { formatMessage } = useLocale();

  const onFinish = (value: AuthLoginDto) => {
    handleLoginWithEmailAndPassword({
      email: value.email,
      password: value.password
    })
      .then((data) => {
        Cookies.set(COOKIE_ACCESS_TOKEN_KEY, data.access_token, {
          expires: 30,
          secure: true
        });

        const search = formatSearch(location.search);
        search.from || { pathname: '/' };
        (window as any).location.href = '/worklog';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <Form className="login-page-form" initialValues={{}} onFinish={onFinish}>
        <h2>Fishub</h2>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'gloabal.tips.enterEmailMessage'
              })
            }
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'gloabal.tips.email'
            })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'gloabal.tips.enterPasswordMessage'
              })
            }
          ]}
        >
          <Input
            type="password"
            placeholder={formatMessage({
              id: 'gloabal.tips.password'
            })}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            <LocaleFormatter id="gloabal.tips.rememberUser" />
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="login-page-form_button"
          >
            <LocaleFormatter id="gloabal.tips.login" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
