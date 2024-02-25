import { Checkbox, Switch } from 'antd';
import React, { FC } from 'react';
import classes from './Settings.module.scss';

export const Settings: FC = () => {
  return (
    <div className={classes.root}>
      <div className={classes.root__settingsList}>
        <div>
          <Checkbox />
          <>&nbsp;Запоминать фильтр при выходе</>
        </div>
        <div>
          <Checkbox defaultChecked />
          <>&nbsp;Показывать предположительные дубликаты</>
        </div>
        <div>
          <>Отклонение цены в рублях&nbsp;</>
          <Switch defaultChecked />
          <>&nbsp;Отклонение цены в процентах</>
        </div>
      </div>
    </div>
  );
};

export default Settings;
