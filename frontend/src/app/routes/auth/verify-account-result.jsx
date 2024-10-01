import { Spin } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { useVerifyAccount } from '~/features/auth/api/others';
import { LoadingOutlined } from '@ant-design/icons';
import { AccountVerificationFail, AccountVerificationSuccess } from '~/features/auth/components/account-verification';

const AccountVerificationResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const { id } = useParams();

  const { isError, isPending } = useVerifyAccount(id, token);
  return (
    <div
      className="p-8 rounded-[8px] w-[90%] md:w-[460px]"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
      }}
    >
      {isPending ? (
        <Spin indicator={<LoadingOutlined spin />} size="small" />
      ) : isError ? (
        <AccountVerificationFail />
      ) : (
        <AccountVerificationSuccess />
      )}
    </div>
  );
};

export default AccountVerificationResult;
