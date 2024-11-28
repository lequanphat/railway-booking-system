import { Button, Divider, Flex, Form, Input, message, Space, Typography } from 'antd';
import RULES from '~/config/rule';
import fb from '~/assets/svg/fb.svg';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '~/stores/auth-store';
import LocalStorageManager from '~/utils/localStorageManager';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useLoginMutation } from '~/features/auth/api/login';
import { useGoogleLoginMutation } from '~/features/auth/api/login-google';
import { useFacebookLoginMutation } from '~/features/auth/api/login-facebook';

const LoginRoute = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [form] = Form.useForm();
  const mutation = useLoginMutation({
    mutationConfig: {
      onSuccess: (data) => {
        LocalStorageManager.setAccessToken(data?.token);
        LocalStorageManager.setRefreshToken(data?.refreshToken);
        setUser(data?.user);
        navigate(redirect ? redirect : '/');
      },
      onError: ({ response }) => {
        message.error(response?.data?.detail || 'Something went wrong!');
      },
    },
  });

  const handleLogin = () => {
    mutation.mutate({ data: form.getFieldsValue() });
  };

  return (
    <div className="p-8 rounded-[8px] w-[90%] md:w-[460px] bg-white border shadow-sm">
      <Typography className="text-[22px] font-semibold">Đăng nhập</Typography>
      <Form form={form} className="pt-4" onFinish={handleLogin} layout="vertical" variant="filled">
        <Flex vertical>
          <Form.Item label="Email" name="email" rules={RULES.login.email} required={false} validateTrigger="onBlur">
            <Input placeholder="Nhập email..." />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={RULES.login.password}
            required={false}
            validateTrigger="onBlur"
          >
            <Input.Password placeholder="Nhập mật khẩu..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-2 m-0">
          <a href="forgot-password" className="block mb-3">
            Quên mật khẩu?
          </a>
          <Button loading={mutation.isPending} type="primary" htmlType="submit" className="w-full">
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item className="pt-4 m-0">
          <Divider>
            <Typography className="text-[#333] mb-2">Hoặc</Typography>
          </Divider>
          <Space direction="vertical" className="w-full">
            <LoginGoogleButton setUser={setUser} redirect={redirect} />
            <LoginFacebookButton setUser={setUser} redirect={redirect} />
          </Space>
          <Typography className="text-center mt-6">
            Bạn chưa có tài khoản? <Link to="/auth/register">Đăng ký</Link>
          </Typography>
        </Form.Item>
      </Form>
    </div>
  );
};

const LoginGoogleButton = ({ setUser, redirect }) => {
  const navigate = useNavigate();
  const googleLoginMutation = useGoogleLoginMutation({
    mutationConfig: {
      onSuccess: (data) => {
        LocalStorageManager.setAccessToken(data?.token);
        LocalStorageManager.setRefreshToken(data?.refreshToken);
        setUser(data?.user);
        navigate(redirect ? redirect : '/');
      },
      onError: ({ response }) => {
        message.error(response?.data?.detail || 'Something went wrong!');
      },
    },
  });

  const handleGoogleLogin = (credential) => {
    googleLoginMutation.mutate({ data: credential });
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

const LoginFacebookButton = ({ setUser, redirect }) => {
  const navigate = useNavigate();

  const loginFacebookMutation = useFacebookLoginMutation({
    mutationConfig: {
      onSuccess: (data) => {
        LocalStorageManager.setAccessToken(data?.token);
        LocalStorageManager.setRefreshToken(data?.refreshToken);
        setUser(data?.user);
        navigate(redirect ? redirect : '/');
      },
      onError: ({ response }) => {
        message.error(response?.data?.detail || 'Something went wrong!');
      },
    },
  });

  const responseFacebook = (response) => {
    loginFacebookMutation.mutate({ accessToken: response?.accessToken });
  };

  return (
    <FacebookLogin
      appId="423573474136909"
      callback={responseFacebook}
      render={(renderProps) => (
        <Button className="flex justify-center h-[38px] rounded" onClick={renderProps.onClick} block>
          <img src={fb} alt="" />
          <p className="flex-1 text-center">Đăng nhập bằng Facebook</p>
        </Button>
      )}
    />
  );
};

export default LoginRoute;
