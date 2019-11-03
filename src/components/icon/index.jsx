import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Icon = props => {
  const renderSVG = () => React.cloneElement(props.children, { className: `${styles.icon}` });

  return <span className={styles.iconContainer}>{renderSVG()}</span>;
};
Icon.propTypes = {
  children: PropTypes.node.isRequired,
};
export { Icon };
