import { Button, Checkbox, InputNumber, Switch } from 'antd';
import React, { FC, useState } from 'react';
import classes from './Settings.module.scss';

export const Settings: FC = () => {
  const [otklonenie, setOtklonenie] = useState<'руб.' | '%'>('%');
  const [disabledButtons, setDisabledButtons] = useState(true);

  return (
    <div className={classes.root}>
      <div className={classes.root__settingsList}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox defaultChecked />
          <>&nbsp;Запоминать текущий фильтр при выходе</>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox defaultChecked />
          <>&nbsp;Показывать предположительные дубликаты</>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            defaultChecked={otklonenie === 'руб.'}
            onChange={() => {
              setDisabledButtons(!disabledButtons);
              setOtklonenie(otklonenie === 'руб.' ? '%' : 'руб.');
            }}
            checked={otklonenie === 'руб.'}
          />
          <>&nbsp;Отклонение цены в рублях</>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            defaultChecked={otklonenie === '%'}
            onChange={() => {
              setDisabledButtons(!disabledButtons);
              setOtklonenie(otklonenie === 'руб.' ? '%' : 'руб.');
            }}
            checked={otklonenie === '%'}
          />
          <>&nbsp;Отклонение цены в процентах</>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          Считать отклонением, начиная с <InputNumber defaultValue={15} size="large" /> {otklonenie}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch defaultChecked />
          <>&nbsp;Уведомления</>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginTop: '20px' }}>
          <Button size="large" style={{ width: '50%' }} disabled={disabledButtons}>
            Отменить
          </Button>
          <Button type="primary" size="large" style={{ width: '50%' }} disabled={disabledButtons}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
