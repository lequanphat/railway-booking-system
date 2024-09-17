import { message } from "antd";
import { MESSAGE_TYPES } from "~/config/constants";

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (content, type = MESSAGE_TYPES.SUCCESS, duration = 5) => {
    messageApi.open({
      type,
      content,
      duration,
    });
  };

  return { showMessage, messageHolder: contextHolder };
};
