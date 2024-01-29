import type { FC } from 'react';

import './index.less';

import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';
import { LocaleFormatter, useLocale } from '@/shared/locales';
import { auth, googleProvider, signInWithPopup } from '@/configs/firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { loginGoogleAsync } from '@/stores/actions/user.action';
import { formatSearch } from '@/shared/utils/formatSearch';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        // dispatch(
        //   await loginGoogleAsync({
        //     username: user.displayName,
        //     email: user.email,
        //     token,
        //     avatar: user.photoURL
        //   })
        // );

        const search = formatSearch(location.search);
        const from = search.from || { pathname: '/' };
        navigate(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
        return;
      });
  };

  return (
    <div className="login-page">
      <Form className="login-page-form" initialValues={{}}>
        <h2>xpia365</h2>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'gloabal.tips.enterUsernameMessage'
              })
            }
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'gloabal.tips.username'
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
        <Form.Item>
          <Button
            type="default"
            className="login-page-form_button"
            icon={<GooglePlusOutlined />}
            onClick={loginWithGoogle}
          >
            Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
