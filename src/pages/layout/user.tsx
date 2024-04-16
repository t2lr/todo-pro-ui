import { Button, Drawer, Input, message, Upload } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '@/stores';
import { setStatusModal } from '@/stores/store';
import { STATUS } from '@/shared/configs/constants';
import useAuth from '@/hooks/useAuth';
import { useUploadFile } from '@/features/upload-file';
import { useUpdateUser } from '@/features/user/update-user';

interface Values {
  email: string;
  username: string;
  src: string;
}

export const User = () => {
  const useUpload = useUploadFile();

  const { userId, email, username, src } = useAuth();
  const { mutateAsync, isPending } = useUpdateUser();

  const dispatch = useDispatch();
  const { status_modal } = useSelector((state: AppState) => state.project);
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      email: email || '',
      username: username || '',
      src: src || ''
    },
    onSubmit: async (values) => {
      await mutateAsync({
        id: userId!,
        email: values.email || email!,
        username: values.username || username!,
        src: values.src || src!
      });

      actionModal(STATUS.NO);
      message.success('Create Project Success!');
    }
  });

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <div className="">
      <Drawer
        title={'Profile'}
        closable={false}
        onClose={() => actionModal(STATUS.NO)}
        open={status_modal === STATUS.USER_INFO}
        width="40vw"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center mb-3">
            <div className="">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={async (file) => {
                  const formData = new FormData();
                  formData.append('file', file.file as Blob, file.filename);
                  const data = await useUpload.mutateAsync(formData);
                  formik.setFieldValue('src', data?.src);
                }}
              >
                {formik.values.src ? (
                  <img
                    src={formik.values.src}
                    alt="avatar"
                    style={{ borderRadius: '50%' }}
                  />
                ) : (
                  'Upload'
                )}
              </Upload>
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-2">Email</div>
            <Input
              disabled
              name="email"
              value={formik.values.email}
              onChange={onChangeText}
            />
          </div>

          <div className="mb-3">
            <div className="mb-2">Username</div>
            <Input
              name="username"
              value={formik.values.username}
              onChange={onChangeText}
            />
          </div>

          <Button className="my-3" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </form>
      </Drawer>
    </div>
  );
};
