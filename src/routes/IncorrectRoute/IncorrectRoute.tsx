import React from 'react';

import styles from './IncorrectRoute.module.scss';

const IncorrectRoute = () => {
  return (
    <div className={styles.incorrectRouteWrapper}>
      <div className={styles.alertWindow}>
        <div className={styles.alertText}>
          Данной страницы не существует
        </div>
      </div>
    </div>
  );
};

export default IncorrectRoute;