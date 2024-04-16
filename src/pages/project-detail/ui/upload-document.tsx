import { Document } from '@/entities/document/model';
import { useCreateDocument, useDeleteDocument } from '@/features/document';
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { message, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useParams } from 'react-router';
import { Avatar, List } from 'antd';

type Props = {
  documents: Document[];
  refetchProjectDetail: () => void;
};

export const UploadDocument = ({ documents, refetchProjectDetail }: Props) => {
  const params = useParams();
  const createDocument = useCreateDocument();
  const deleteDocument = useDeleteDocument();

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    customRequest: async (file) => {
      const formData = new FormData();
      formData.append('file', file.file as Blob);

      await createDocument.mutateAsync({
        project_id: params.projectId!,
        file: formData!
      });

      refetchProjectDetail();
      message.success('Upload file success!');
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };

  const data = documents.map((document) => ({
    id: document.id,
    file: document.file,
    content: document.content,
    user: document.user
  }));

  return (
    <div className="">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      <div className="documents-list">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 4
          }}
          dataSource={data}
          footer={null}
          renderItem={(item) => (
            <List.Item
              key={item.content}
              actions={[]}
              extra={
                <div>
                  <EditOutlined />
                  <DeleteOutlined
                    className="mx-4"
                    onClick={async () => {
                      await deleteDocument.mutateAsync({
                        project_id: params.projectId!,
                        id: item.id
                      });
                      refetchProjectDetail();
                      message.success('Delete file success!');
                    }}
                  />
                </div>
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.user.src} />}
                title={<div>{item.user.username}</div>}
              />
              <a
                target="_blank"
                className="cursor-pointer"
                href={item.file as string}
              >
                <FileAddOutlined /> {item.content}
              </a>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
