import { ChangeEvent, FunctionComponent, useState, DragEvent } from 'react';
import classes from './News.module.scss';
import { Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { FolderAddOutlined } from '@ant-design/icons';

interface NotificationsProps {
  prop?: null;
}

interface DropzoneProps {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImportDropzone: React.FC<DropzoneProps> = ({ selectedFile, setSelectedFile }) => {
  // const { loading_import } = useSelector(selectSession);

  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/x-zip-compressed') {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/x-zip-compressed') {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  return (
    <div
      // className={dragOver ? styles.container__dragOver : styles.container}
      onDragOver={handleDragOver}
      onDragLeave={() => {
        setDragOver(false);
      }}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div>
          <div>
            <span>{selectedFile.name}</span>
          </div>
          <div>
            <Button onClick={handleClear}>{/* <IconButton > */}х</Button>
          </div>
        </div>
      ) : (
        <div>
          <input
            // className={styles.input}
            id="file-input"
            type="file"
            accept=".zip"
            onChange={handleFileChange}
          />
          <label
            // className={styles.label}
            htmlFor="file-input"
          >
            <div>
              <FolderAddOutlined />
            </div>
            <span>Нажмите или перенесите файлы в данную область</span>
          </label>
        </div>
      )}
    </div>
  );
};

const Notifications: FunctionComponent<NotificationsProps> = () => {
  return (
    <div className={classes.root}>
      <div>Страница НОВОСТЕЙ находится в процессе разработки</div>
      <ImportDropzone />
    </div>
  );
};

export default Notifications;
