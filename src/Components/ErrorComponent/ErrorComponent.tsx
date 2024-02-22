import { FC } from 'react';
import classes from './ErrorComponent.module.scss';

type Props = {
  errorMessage: string | null;
};

const ErrorComponent: FC<Props> = ({ errorMessage }) => {
  if (!errorMessage) return <div> </div>;
  return <div className={classes.root}>{errorMessage}</div>;
};

export default ErrorComponent;
